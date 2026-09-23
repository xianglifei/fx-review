import type { ReactLike } from './react-types';
import { makeBody, type MountReviewer } from './body';
import { createSubmitFeature, type SubmitFeature } from './submit';

/** 插件在 documentPreviews 注册表与 keyed slot 里的身份 */
export const REVIEWER_BODY_ID = 'dsh-fx-review/criticmarkup';

const LOCALE_NS = 'dshFxReview';

const zh = {
  'viewer.label': 'fx-review 批注',
  'submit.chip': '批注文档 · {file} · {n} 处',
  'submit.hint': '发送时会附加到这条消息的末尾；可在输入框里先补充你的要求。',
  'submit.remove': '移除',
};

const en = {
  'viewer.label': 'fx-review',
  'submit.chip': 'Annotated doc · {file} · {n} marks',
  'submit.hint': 'Appended to the end of your message when you send it; add instructions in the composer first.',
  'submit.remove': 'Remove',
};

export interface PluginDeps {
  react: ReactLike;
  mountReviewer: MountReviewer;
  /** embed.css 的文本（构建时 ?raw 内联），启动注入一次 */
  embedCss: string;
}

/** 组件样式：幂等注入 <style>（同页多实例共享一份） */
function ensureStyle(css: string): void {
  if (document.querySelector('style[data-fxr-embed-css]')) return;
  const style = document.createElement('style');
  style.dataset.fxrEmbedCss = '';
  style.textContent = css;
  document.head.appendChild(style);
}

interface Ctx {
  effect: (fn: () => () => void, name?: string) => void;
  get: (name: string) => unknown;
  locale: {
    register: (ns: string, dicts: Record<string, unknown>) => () => void;
    bind: (ns: string) => (key: string) => string;
  };
  documentPreviews: {
    register: (definition: {
      id: string;
      extensions: string[];
      priority: 'extension' | 'builtin';
      title: () => string;
      loading: 'bytes-complete' | 'text-pages';
      wrap: boolean;
    }) => () => void;
  };
  slots: {
    inject: (name: string, register: () => unknown) => () => void;
    register: (seat: { name: string; key?: string; id?: string; order?: number; locale: string }, component: unknown) => unknown;
  };
}

/**
 * cordis 客户端插件定义：inject 声明依赖的宿主服务
 * （slots / locale / documentPreviews / sessions；conversation 惰性探测），
 * apply 注册渲染器与「提交」chip。
 * extension 优先级高于 builtin Markdown，.md 默认进批注模式；
 * 预览头部的渲染器下拉仍可切回内置 Markdown。
 */
export function makePlugin(deps: PluginDeps) {
  const Body = makeBodyWithSubmit();

  function makeBodyWithSubmit() {
    // submit 特性需要 ctx，body 拿到一个惰性句柄：apply 时填充
    let submitRef: SubmitFeature | null = null;
    const body = makeBody(deps.react, deps.mountReviewer, {
      // SubmitFeature 的最小面：commit + 一个标记对象
      commit(sessionId: string, payload: never) {
        return submitRef?.commit(sessionId, payload as never) ?? false;
      },
      remove(sessionId: string) { submitRef?.remove(sessionId); },
      subscribe(fn: () => void) { return submitRef?.subscribe(fn) ?? (() => {}); },
      recordOf(sessionId: string | undefined) { return submitRef?.recordOf(sessionId) ?? null; },
      Dock(props: { sessionId?: string; t?: (key: string) => string }) {
        return submitRef === null ? null : submitRef.Dock(props);
      },
    } as SubmitFeature);
    return { body, setSubmit(feature: SubmitFeature) { submitRef = feature; } };
  }

  const inject = ['slots', 'locale', 'documentPreviews', 'sessions'];

  function apply(ctx: Ctx): void {
    const t = ctx.locale.bind(LOCALE_NS);

    ctx.effect(() => ctx.locale.register(LOCALE_NS, { zh, en }), 'dsh-fx-review: dictionaries');

    ensureStyle(deps.embedCss);

    ctx.effect(
      () =>
        ctx.documentPreviews.register({
          id: REVIEWER_BODY_ID,
          extensions: ['md', 'markdown', 'mdown'],
          priority: 'extension',
          title: () => t('viewer.label'),
          // 一次性拿完整文件：CriticMarkup 批注依赖全文字符偏移，分页流式会让偏移漂移
          loading: 'bytes-complete',
          wrap: false,
        }),
      'dsh-fx-review: renderer metadata',
    );

    ctx.effect(
      () =>
        ctx.slots.inject('sidebar.right.tab.document', () =>
          ctx.slots.register(
            {
              name: 'sidebar.right.tab.document',
              key: REVIEWER_BODY_ID,
              locale: LOCALE_NS,
            },
            Body.body,
          ),
        ),
      'dsh-fx-review: renderer body',
    );

    // 「提交」闭环：载荷池 + sendSession 包裹 + 输入框上方的 dock chip
    const submit = createSubmitFeature({ react: deps.react, ctx: { get: (name) => ctx.get(name) } });
    Body.setSubmit(submit);
    ctx.effect(
      () =>
        ctx.slots.inject('conversation.input.dock', () =>
          ctx.slots.register(
            {
              name: 'conversation.input.dock',
              id: 'fxr-submit',
              order: 12,
              locale: LOCALE_NS,
            },
            submit.Dock,
          ),
        ),
      'dsh-fx-review: submit dock',
    );
  }

  return { inject, apply };
}
