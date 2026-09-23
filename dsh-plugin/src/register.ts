import type { ReactLike } from './react-types';
import { makeBody, type MountReviewer } from './body';

/** 插件在 documentPreviews 注册表与 keyed slot 里的身份 */
export const REVIEWER_BODY_ID = 'dsh-fx-review/criticmarkup';

const LOCALE_NS = 'dshFxReview';

const zh = {
  'viewer.label': 'fx-review 批注',
};

const en = {
  'viewer.label': 'fx-review',
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

/**
 * cordis 客户端插件定义：inject 声明依赖的宿主服务
 * （slots / locale / documentPreviews），apply 注册渲染器。
 * extension 优先级高于 builtin Markdown，.md 默认进批注模式；
 * 预览头部的渲染器下拉仍可切回内置 Markdown。
 */
export function makePlugin(deps: PluginDeps) {
  const Body = makeBody(deps.react, deps.mountReviewer);

  const inject = ['slots', 'locale', 'documentPreviews'];

  function apply(ctx: {
    effect: (fn: () => () => void, name?: string) => void;
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
      register: (seat: { name: string; key: string; locale: string }, component: unknown) => unknown;
    };
  }): void {
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
            Body,
          ),
        ),
      'dsh-fx-review: renderer body',
    );
  }

  return { inject, apply };
}
