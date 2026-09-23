import type { ReactLike } from './react-types';
import type { SubmitPayload } from '../../src/editor';

/**
 * 「提交」闭环（对齐 fi 选区引用的实现路线）：
 * 评论栏「提交」→ 载荷入池（按会话分桶）→ chip 挂 conversation.input.dock
 * （输入框正上方，宿主 Lexical 输入不受影响）→ 用户补充文字后正常点发送 →
 * ConversationController.sendSession 实例级包裹把批注文档附加到消息尾部 →
 * 发送失败随草稿回滚（载荷回到池里，chip 不丢）。
 *
 * sendSession 是 composer 的唯一发送出口且 InputHub 每次动态解析服务实例，
 * 所以在实例上打补丁、幂等标记、服务被重建时重包——与 fi-sidebar 的
 * ensureQuoteSendPatch 同一套防御（两者链式包裹互不冲突）。
 */

export interface SubmitRecord {
  fileName: string;
  count: number;
  prompt: string;
  annotatedSource: string;
  savedAt: number;
}

const FXR_PATCH_KEY = '__fxrSubmitSendPatch';

export interface SubmitFeature {
  /** 存入待提交载荷（覆盖同会话旧的）；补丁不可用时返回 false（调用方回落复制） */
  commit(sessionId: string, payload: SubmitPayload): boolean;
  remove(sessionId: string): void;
  subscribe(fn: () => void): () => void;
  recordOf(sessionId: string | undefined): SubmitRecord | null;
  /** 输入框上方 dock chip 组件（sessionId 由槽位传入） */
  Dock: (props: { sessionId?: string; t?: (key: string) => string }) => unknown;
}

/** 会话 id 提取：resident face 快照带 id，拿不到回退当前会话（composer 语义下总是对的） */
function sessionIdOf(session: unknown, sessions: unknown): string | null {
  try {
    const id = (session as { getSnapshot?: () => { id?: unknown } })?.getSnapshot?.()?.id;
    if (typeof id === 'string') return id;
  } catch { /* fallthrough */ }
  try {
    const current = (sessions as {
      list?: { getSnapshot?: () => { current?: unknown } };
    })?.list?.getSnapshot?.().current;
    if (typeof current === 'string') return current;
  } catch { /* fallthrough */ }
  return null;
}

/** 批注文档 → 附加块：分隔线 + 引导 Prompt + 围栏全文（外层四反引号防内容嵌套围栏） */
export function appendSubmitBlock(text: string, record: SubmitRecord): string {
  const doc = '````markdown\n' + record.annotatedSource + '\n````';
  const block = `---\n【fx-review 批注 · ${record.fileName}】\n${record.prompt}\n\n${doc}`;
  const base = String(text ?? '');
  return base === '' ? block : `${base}\n\n${block}`;
}

/**
 * 创建提交特性。ctx/sessions 在插件 apply 时注入；conversation 服务惰性探测
 * （可能晚于本模块就绪，commit 与 dock 渲染时都会重试）。
 */
export function createSubmitFeature(deps: {
  react: ReactLike;
  ctx: {
    get: (name: string) => unknown;
  };
}): SubmitFeature {
  const { react } = deps;
  const bySession = new Map<string, SubmitRecord>();
  const listeners = new Set<() => void>();
  const emit = (): void => {
    for (const fn of [...listeners]) {
      try { fn(); } catch { /* 订阅方异常不外溢 */ }
    }
  };

  const getSessions = (): unknown => {
    try { return deps.ctx.get('sessions'); } catch { return null; }
  };

  const patchable = (service: unknown): service is { sendSession: (...args: unknown[]) => unknown } =>
    service !== null && typeof (service as { sendSession?: unknown }).sendSession === 'function';

  const ensurePatch = (): boolean => {
    const sessions = getSessions();
    let service: unknown = null;
    try { service = deps.ctx.get('conversation') ?? null; } catch { service = null; }
    if (service === null) {
      try {
        const current = (sessions as { list?: { getSnapshot?: () => { current?: unknown } } })
          ?.list?.getSnapshot?.().current;
        const scoped = typeof current === 'string'
          ? (sessions as { scope?: (id: string) => { get?: (name: string) => unknown } })?.scope?.(current)
          : undefined;
        service = scoped?.get?.('conversation') ?? null;
      } catch { service = null; }
    }
    if (!patchable(service)) return false;
    const svc = service as { sendSession: (...args: unknown[]) => unknown } & Record<string, unknown>;
    const patch = svc[FXR_PATCH_KEY] as { wrapped: unknown } | undefined;
    if (patch === undefined || svc.sendSession !== patch.wrapped) {
      const original = svc.sendSession.bind(svc);
      const wrapped = function sendSessionWithFxrSubmit(this: unknown, ...args: unknown[]): unknown {
        const [session, text] = args;
        const id = sessionIdOf(session, sessions);
        const record = id === null ? null : bySession.get(id) ?? null;
        if (id === null || record === null) return original(...args);
        bySession.delete(id);
        emit();
        const outcome = original(session, appendSubmitBlock(String(text ?? ''), record), ...args.slice(2));
        if (outcome !== null && typeof (outcome as { catch?: unknown }).catch === 'function') {
          // 发送失败（如凭据缺失）时载荷随草稿回滚，chip 回来
          (outcome as Promise<unknown>).catch(() => {
            bySession.set(id, record);
            emit();
          });
        }
        return outcome;
      };
      svc[FXR_PATCH_KEY] = { original: svc.sendSession, wrapped };
      svc.sendSession = wrapped;
    }
    return true;
  };

  // ---- dock chip 组件 ----
  const useRecord = (sessionId: string | undefined): SubmitRecord | null => {
    const getSnapshot = react.useMemo(() => () => bySession.get(sessionId ?? '') ?? null, [sessionId]);
    const subscribe = react.useMemo(
      () => (fn: () => void) => {
        listeners.add(fn);
        return () => { listeners.delete(fn); };
      },
      [],
    );
    if (react.useSyncExternalStore !== undefined) {
      return react.useSyncExternalStore(subscribe, getSnapshot);
    }
    const [value, setValue] = react.useState<SubmitRecord | null>(getSnapshot);
    react.useEffect(() => {
      setValue(getSnapshot());
      return subscribe(() => setValue(getSnapshot()));
    }, [getSnapshot, subscribe]);
    return value;
  };

  /** 对齐输入卡片左缘（dock 容器全宽而卡片居中限宽）：量差值迭代缩进 + 观察卡片 */
  const useCardAlign = (rootRef: { current: HTMLElement | null }, active: boolean): void => {
    react.useEffect(() => {
      const el = rootRef.current;
      if (el === null || !active) return;
      const findCard = (): HTMLElement | null => {
        let scope: HTMLElement | null = el.parentElement;
        for (let i = 0; i < 4 && scope !== null; i++) {
          const card = scope.querySelector('[data-composer-card]');
          if (card !== null) return card as HTMLElement;
          scope = scope.parentElement;
        }
        return null;
      };
      const align = (): void => {
        const card = findCard();
        if (card === null) {
          el.style.paddingLeft = '';
          return;
        }
        const chip = el.querySelector('.fxr-dock-chip');
        if (chip === null) return;
        const delta = card.getBoundingClientRect().left - chip.getBoundingClientRect().left;
        if (Math.abs(delta) <= 1) return;
        const current = parseFloat(el.style.paddingLeft || '0') || 0;
        el.style.paddingLeft = `${Math.max(0, current + delta)}px`;
      };
      let frame = 0;
      let rafId = 0;
      const tick = (): void => {
        align();
        frame += 1;
        if (frame < 12) rafId = window.requestAnimationFrame(tick);
      };
      tick();
      const card = findCard();
      const observer = card !== null && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(align) : null;
      if (observer !== null && card !== null) observer.observe(card);
      window.addEventListener('resize', align);
      return () => {
        window.cancelAnimationFrame(rafId);
        observer?.disconnect();
        window.removeEventListener('resize', align);
      };
    }, [active]);
  };

  const createElement = react.createElement.bind(react);

  const Dock = (props: { sessionId?: string; t?: (key: string) => string }): unknown => {
    const sessionId = typeof props.sessionId === 'string' ? props.sessionId : undefined;
    const record = useRecord(sessionId);
    const [open, setOpen] = react.useState(false);
    const rootRef = react.useRef<HTMLElement | null>(null);
    useCardAlign(rootRef, record !== null);
    if (sessionId === undefined || record === null) return null;
    const preview = record.annotatedSource.length > 600
      ? `${record.annotatedSource.slice(0, 600)}…`
      : record.annotatedSource;
    return createElement(
      'div',
      { ref: rootRef, className: 'fxr-dock', 'data-fxr-submit-dock': '' },
      [
        createElement('button', {
          type: 'button',
          className: 'fxr-dock-chip',
          'aria-expanded': open ? 'true' : 'false',
          'data-fxr-submit-count': record.count,
          onClick: () => setOpen(!open),
        }, [
          '📝 ',
          `批注文档 · ${record.fileName} · ${record.count} 处`,
          createElement('span', { className: 'fxr-dock-chevron' }, open ? '▴' : '▾'),
        ]),
        open
          ? createElement('div', { className: 'fxr-dock-box' }, [
              createElement('div', { className: 'fxr-dock-preview' }, preview),
              createElement('div', { className: 'fxr-dock-hint' },
                '发送时会附加到这条消息的末尾；可在输入框里先补充你的要求。'),
              createElement('button', {
                type: 'button',
                className: 'fxr-dock-remove',
                onClick: () => { bySession.delete(sessionId); emit(); },
              }, '移除'),
            ])
          : null,
      ].filter((child) => child !== null && child !== false),
    );
  };

  return {
    commit(sessionId, payload) {
      if (!ensurePatch()) return false;
      bySession.set(sessionId, {
        fileName: payload.fileName,
        count: payload.count,
        prompt: payload.prompt,
        annotatedSource: payload.annotatedSource,
        savedAt: Date.now(),
      });
      emit();
      return true;
    },
    remove(sessionId) {
      if (bySession.delete(sessionId)) emit();
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => { listeners.delete(fn); };
    },
    recordOf(sessionId) {
      return sessionId === undefined ? null : bySession.get(sessionId) ?? null;
    },
    Dock,
  };
}
