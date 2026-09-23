import { Store } from './store';
import { DocPersistence, savePrompt, loadPrompt } from './persistence';
import { createMarkdown } from './render/markdown';
import { renderMarkdown } from './render/source-map';
import { initCodeHighlight, type LoadHighlighter } from './render/highlight';
import { renderOverlay, flashAnnotation, highlightApiSupported } from './annotator/overlay';
import { createAnnotation, readContext, type CreateContext } from './annotator/create';
import { copyAnnotated as copyAnnotatedAction, copyWithPrompt as copyWithPromptAction, downloadAnnotated, downloadWithPrompt } from './export/actions';
import { buildAnnotatedSource } from './export/criticmarkup';
import { DEFAULT_PROMPT } from './export/prompt';
import type { Annotation, AnnotationType } from './types';
import { createToaster } from './ui/toast';
import { createSelectionMenu } from './ui/selection-menu';
import { createCommentsPanel, type CommentsApi } from './ui/comments-panel';
import { createToolbar, type ToolbarApi } from './ui/toolbar';
import { openPromptEditor } from './ui/prompt-editor';

/** 永不完成的加载器：嵌入构建不携带 shiki，代码块保持纯文本回退 */
const neverLoad: LoadHighlighter = () => new Promise(() => {});

/** 多实例时 highlight 注册名的序号来源 */
let instanceSeq = 0;

/** 提交载荷：交给宿主（dsh 插件把批注文档送进会话输入框） */
export interface SubmitPayload {
  fileName: string;
  /** 批注条数 */
  count: number;
  /** 引导 Prompt（发送时应前置） */
  prompt: string;
  /** 带 CriticMarkup 标记的全文 */
  annotatedSource: string;
}

/** 评论栏宽度持久化键（网页版与嵌入版共用一份偏好） */
const PANEL_WIDTH_KEY = 'fx-review:panelWidth';

export interface ReviewerOptions {
  /** 挂载点：编辑器在里面创建 .fxr-root（flex 纵向铺满） */
  container: HTMLElement;
  /** full = 网页壳（品牌区/下载/主题切换）；compact = 嵌入（dsh 侧栏 tab，无工具栏） */
  variant?: 'full' | 'compact';
  /** auto = 跟随系统 + 工具栏切换按钮；host = 跟随宿主页面（dsh 的 body[data-ds-dark-theme]） */
  theme?: 'auto' | 'host';
  /** 初始文档；不给则显示空状态 */
  fileName?: string;
  source?: string;
  /** 初始 Prompt（默认 DEFAULT_PROMPT；full 变体会从 localStorage 恢复） */
  prompt?: string;
  /** 批注持久化 localStorage 前缀；null 关闭持久化 */
  storagePrefix?: string | null;
  /** 最多保留几份文档的批注（LRU 裁剪） */
  maxSavedDocs?: number;
  /** 代码高亮加载器（网页壳传 shiki 懒加载器；缺省 = 纯文本） */
  loadHighlighter?: LoadHighlighter;
  /** 空状态占位元素（网页壳传入打开文件卡片）；缺省显示一句提示 */
  emptyState?: HTMLElement;
  /** highlight 命名空间：同页多实例隔离；'' = 网页壳静态 CSS 名 */
  ns?: string;
  /** 滚动容器绑定回调（宿主用来记录滚动位置） */
  bindScrollport?: (node: HTMLElement | null) => void;
  /** 提交回调：给定时评论栏显示「提交」按钮（嵌入场景把批注送进会话输入框）。
   *  返回 false 表示宿主未能接住（编辑器回落为复制到剪贴板并提示）。 */
  onSubmit?: (payload: SubmitPayload) => boolean;
}

/**
 * 一个可挂载的 CriticMarkup 审阅编辑器：状态、渲染、批注、持久化、快捷键自成一体，
 * destroy() 后不留任何 DOM / 监听 / highlight 注册。网页壳与 dsh 插件共用这一层。
 */
export class Reviewer {
  readonly store = new Store();
  readonly root: HTMLElement;
  readonly preview: HTMLElement;
  readonly previewWrap: HTMLElement;
  readonly variant: 'full' | 'compact';
  readonly ns: string;
  readonly notify: (message: string, duration?: number) => void;

  private readonly container: HTMLElement;
  private readonly md = createMarkdown();
  private readonly persistence: DocPersistence | null;
  private readonly toaster: ReturnType<typeof createToaster>;
  private readonly toolbarApi: ToolbarApi | null;
  private readonly commentsApi: CommentsApi;
  private menuApi!: ReturnType<typeof createSelectionMenu>;
  private readonly emptyState: HTMLElement;
  private readonly disposers: Array<() => void> = [];
  private readonly onSubmit: ((payload: SubmitPayload) => boolean) | undefined;
  /** 窄容器下展开评论抽屉的浮动按钮（compact 无工具栏后的面板入口） */
  private readonly panelFab: HTMLButtonElement | null;
  private readonly fabCount: HTMLElement | null;

  private themeMode: 'auto' | 'host';
  private theme: 'light' | 'dark' = 'light';
  private lastRenderedSource = '';
  private notifiedNoHighlight = false;
  /** 菜单弹出时快照的选区上下文：宿主（输入框焦点管理等）在点击前偷走 DOM 选区时的兜底 */
  private capturedCtx: CreateContext | null = null;

  constructor(opts: ReviewerOptions) {
    this.container = opts.container;
    this.variant = opts.variant ?? 'full';
    this.themeMode = opts.theme ?? (this.variant === 'compact' ? 'host' : 'auto');
    this.ns = opts.ns ?? (this.variant === 'compact' ? `fxr${++instanceSeq}` : '');
    this.onSubmit = opts.onSubmit;

    this.toaster = createToaster(() => (this.root.isConnected ? this.root : this.container));
    this.notify = (message, duration) => this.toaster(message, duration);

    if (opts.storagePrefix !== null) {
      this.persistence = new DocPersistence(this.store, {
        prefix: opts.storagePrefix ?? 'fx-review:',
        maxDocs: opts.maxSavedDocs,
      });
      this.disposers.push(() => this.persistence?.dispose());
    } else {
      this.persistence = null;
    }

    // ---- DOM 骨架（compact 不建工具栏：对齐 dsh 内置预览的观感） ----
    this.root = document.createElement('div');
    this.root.className = `fxr-root${this.variant === 'compact' ? ' fxr-compact' : ''}`;
    try {
      const saved = window.localStorage.getItem(PANEL_WIDTH_KEY);
      if (saved && /^\d{2,4}px$/.test(saved)) this.root.style.setProperty('--fxr-panel-w', saved);
    } catch { /* ignore */ }

    const workspace = document.createElement('div');
    workspace.className = 'fxr-workspace';

    this.previewWrap = document.createElement('section');
    this.previewWrap.className = 'fxr-preview-wrap';

    this.preview = document.createElement('article');
    this.preview.className = 'fxr-preview markdown-body';
    this.emptyState = opts.emptyState ?? defaultEmptyState();
    this.previewWrap.append(this.preview, this.emptyState);

    // 窄容器浮动按钮（CSS 只在容器查询窄档显示）：入口给评论抽屉
    if (this.variant === 'compact') {
      this.panelFab = document.createElement('button');
      this.panelFab.type = 'button';
      this.panelFab.className = 'fxr-panel-fab';
      this.panelFab.title = '评论与批注';
      this.panelFab.innerHTML = '📋 <span class="fxr-panel-fab-count">0</span>';
      this.panelFab.addEventListener('click', () => this.togglePanel());
      this.previewWrap.appendChild(this.panelFab);
      this.fabCount = this.panelFab.querySelector('.fxr-panel-fab-count');
    } else {
      this.panelFab = null;
      this.fabCount = null;
    }

    this.commentsApi = createCommentsPanel(this);
    this.toolbarApi = this.variant === 'full' ? createToolbar(this) : null;
    if (this.toolbarApi) this.root.append(this.toolbarApi.el);
    this.root.append(workspace);
    workspace.append(this.previewWrap, this.commentsApi.el, this.commentsApi.backdrop);
    this.container.appendChild(this.root);
    opts.bindScrollport?.(this.previewWrap);
    this.disposers.push(() => opts.bindScrollport?.(null));

    // highlight 命名空间样式（compact 每实例一份；full 用静态 CSS 名）
    if (this.ns) {
      const style = document.createElement('style');
      style.dataset.fxrHighlightNs = this.ns;
      style.textContent = namespacedHighlightCss(this.ns);
      document.head.appendChild(style);
      this.disposers.push(() => style.remove());
    }

    // ---- 状态流 ----
    this.store.state.prompt = opts.prompt ?? (this.variant === 'full' ? (loadPrompt() ?? DEFAULT_PROMPT) : DEFAULT_PROMPT);
    this.store.subscribe(() => this.renderAll());

    // ---- 代码高亮（可选） ----
    initCodeHighlight(this.md, () => {
      this.lastRenderedSource = '';
      this.renderAll();
    }, opts.loadHighlighter ?? neverLoad);

    // ---- 主题 ----
    this.initTheme();

    // ---- 选区 / 键盘 ----
    this.installSelectionBridge();
    this.installKeys();

    // ---- 初始文档 ----
    if (opts.source != null && opts.source !== '' && opts.fileName) {
      this.setDocument(opts.fileName, opts.source);
    } else {
      this.renderAll();
    }
  }

  // ========== 对外 API ==========

  /** 载入/替换文档；返回恢复的批注条数。同文档重复调用幂等（直接返回现有条数） */
  setDocument(fileName: string, source: string): number {
    if (fileName === this.store.state.fileName && source === this.store.state.source) {
      return this.store.state.annotations.length;
    }
    const saved = this.persistence?.restore(fileName, source) ?? [];
    this.store.loadFile(fileName, source, saved);
    return saved.length;
  }

  setPrompt(prompt: string): void {
    this.store.setPrompt(prompt);
    if (this.variant === 'full') savePrompt(prompt);
  }

  undo(): boolean {
    return this.store.undo();
  }

  redo(): boolean {
    return this.store.redo();
  }

  clearAnnotations(): void {
    if (this.store.state.annotations.length === 0) return;
    this.store.clearAnnotations();
    this.notify('已清除全部批注');
  }

  getAnnotatedSource(withPrompt: boolean): string {
    const body = buildAnnotatedSource(this.store.state.source, this.store.state.annotations);
    return withPrompt ? `${this.store.state.prompt}\n\n${body}` : body;
  }

  annotationCount(): number {
    return this.store.state.annotations.length;
  }

  canSubmit(): boolean {
    return this.onSubmit !== undefined;
  }

  /** 提交批注文档给宿主；宿主未接住时回落为复制到剪贴板 */
  submit(): void {
    if (!this.requireDocument()) return;
    const payload: SubmitPayload = {
      fileName: this.store.state.fileName,
      count: this.store.state.annotations.length,
      prompt: this.store.state.prompt,
      annotatedSource: buildAnnotatedSource(this.store.state.source, this.store.state.annotations),
    };
    if (this.onSubmit?.(payload) === true) return;
    void this.copy(true);
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
    this.root.dataset.theme = theme;
    this.toolbarApi?.setThemeIcon(theme);
  }

  getTheme(): 'light' | 'dark' {
    return this.theme;
  }

  togglePanel(): void {
    this.commentsApi.toggle();
  }

  openPromptEditor(): void {
    openPromptEditor(this);
  }

  annotate(type: AnnotationType): void {
    if (!this.store.state.source) {
      this.notify('请先打开 Markdown 文档');
      return;
    }
    // 实时选区优先；菜单可见期间 DOM 选区被宿主偷走时，回落到菜单弹出时的快照
    const live = readContext();
    const ctx = live.selection !== null || live.caret !== null
      ? live
      : this.capturedCtx ?? live;
    void createAnnotation(type, ctx, { store: this.store, notify: this.notify });
  }

  async copy(withPrompt: boolean): Promise<void> {
    if (!this.requireDocument()) return;
    if (withPrompt) await copyWithPromptAction(this.store, this.notify);
    else await copyAnnotatedAction(this.store, this.notify);
  }

  download(withPrompt: boolean): void {
    if (!this.requireDocument()) return;
    if (withPrompt) downloadWithPrompt(this.store, this.notify);
    else downloadAnnotated(this.store, this.notify);
  }

  flash(a: Annotation): void {
    flashAnnotation(this.preview, a, this.ns);
  }

  /** 评论备注等静默更新后手动触发：只做持久化与角标，绝不重建列表——
   *  重建会换掉正在输入的 textarea，焦点与输入法组合每键即断（0.2.0 回归） */
  onSilentMutation(): void {
    this.persistence?.saveSoon();
    this.setBadgeCount(this.store.state.annotations.length);
  }

  destroy(): void {
    for (const dispose of this.disposers.splice(0)) {
      try { dispose(); } catch { /* ignore */ }
    }
    if (this.ns) {
      for (const name of ['cm-del', 'cm-hl', 'cm-sub-old', 'cm-comment', 'cm-flash']) {
        try { CSS.highlights?.delete(`${this.ns}-${name}`); } catch { /* ignore */ }
      }
    }
    this.root.remove();
  }

  // ========== 内部实现 ==========

  private requireDocument(): boolean {
    if (this.store.state.source) return true;
    this.notify('请先打开 Markdown 文档');
    return false;
  }

  private setBadgeCount(n: number): void {
    this.toolbarApi?.setCount(n);
    if (this.fabCount) this.fabCount.textContent = String(n);
  }

  private renderAll(): void {
    const { source, annotations } = this.store.state;

    if (source !== this.lastRenderedSource) {
      this.lastRenderedSource = source;
      if (source) {
        this.preview.innerHTML = renderMarkdown(this.md, source);
        this.preview.style.display = 'block';
        this.emptyState.style.display = 'none';
      } else {
        this.preview.innerHTML = '';
        this.preview.style.display = 'none';
        this.emptyState.style.display = 'flex';
      }
    }

    if (source) {
      renderOverlay(this.preview, annotations, this.ns);
      if (!this.notifiedNoHighlight && !highlightApiSupported()) {
        this.notifiedNoHighlight = true;
        if (this.variant === 'full') this.notify('当前浏览器不支持 Highlight API，批注将降级显示', 4000);
      }
    }

    this.commentsApi.refresh();
    this.toolbarApi?.setFileName(this.store.state.fileName || (this.variant === 'full' ? '未打开文件' : ''));
    this.setBadgeCount(annotations.length);
    this.toolbarApi?.setUndoRedo(this.store.canUndo, this.store.canRedo);
  }

  private initTheme(): void {
    if (this.themeMode === 'host') {
      // 宿主页面主题（dsh）：body[data-ds-dark-theme] 出现即暗色；无标记时回落系统偏好
      const readHost = (): 'light' | 'dark' => {
        if (document.body?.hasAttribute('data-ds-dark-theme')) return 'dark';
        if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
      };
      this.setTheme(readHost());
      const observer = new MutationObserver(() => this.setTheme(readHost()));
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-ds-dark-theme'] });
      observer.observe(document.body ?? document.documentElement, { attributes: true, attributeFilter: ['data-ds-dark-theme'] });
      this.disposers.push(() => observer.disconnect());
      return;
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    this.setTheme(media.matches ? 'dark' : 'light');
    const onChange = (e: MediaQueryListEvent): void => this.setTheme(e.matches ? 'dark' : 'light');
    media.addEventListener('change', onChange);
    this.disposers.push(() => media.removeEventListener('change', onChange));
  }

  /**
   * document 选区 → 本实例的浮动菜单 / 正文滚动时隐藏。
   * 用 setTimeout(0) 合并而非 rAF：宿主把窗口置于后台/被遮挡时 rAF 停摆
   * （实测 dsh 桌面壳最小化即如此），菜单会彻底不出现。
   */
  private installSelectionBridge(): void {
    this.menuApi = createSelectionMenu(this);
    let timer = 0;
    const onSelectionChange = (): void => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = 0;
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || sel.rangeCount === 0 || !this.store.state.source) {
          this.menuApi.hide();
          this.capturedCtx = null;
          return;
        }
        const range = sel.getRangeAt(0);
        if (!this.preview.contains(range.commonAncestorContainer)) {
          this.menuApi.hide();
          this.capturedCtx = null;
          return;
        }
        const rect = range.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
          this.menuApi.hide();
          this.capturedCtx = null;
          return;
        }
        this.menuApi.show(rect);
        // 菜单可见期间保留选区快照：宿主焦点管理偷走 DOM 选区时按钮仍可用
        this.capturedCtx = readContext();
      }, 0);
    };
    document.addEventListener('selectionchange', onSelectionChange);
    this.disposers.push(() => {
      document.removeEventListener('selectionchange', onSelectionChange);
      if (timer) window.clearTimeout(timer);
    });

    const onScroll = (): void => {
      this.menuApi.hide();
      this.capturedCtx = null;
    };
    this.previewWrap.addEventListener('scroll', onScroll, { passive: true });
    this.disposers.push(() => this.previewWrap.removeEventListener('scroll', onScroll));
  }

  /** 目标是输入框/可编辑区域时不拦截快捷键（含宿主页面的输入框，如 dsh 的会话输入） */
  private isTypingTarget(t: EventTarget | null): boolean {
    return (
      t instanceof HTMLTextAreaElement ||
      t instanceof HTMLInputElement ||
      (t instanceof HTMLElement && t.isContentEditable)
    );
  }

  /** 本实例是否「在焦点上」：事件目标在自己容器里，或正文里持有选区。
   *  嵌入宿主页面时，宿主自身的快捷键与输入不能被抢。 */
  private isActive(target: EventTarget | null): boolean {
    if (target instanceof Node && this.root.contains(target)) return true;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && this.preview.contains(sel.getRangeAt(0).commonAncestorContainer)) {
      return true;
    }
    return false;
  }

  private selectionInPreview(): boolean {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return false;
    return this.preview.contains(sel.getRangeAt(0).commonAncestorContainer);
  }

  /** 选中正文后可用的单键快捷键 */
  private static readonly SINGLE_KEY_ANNOTATIONS: Record<string, AnnotationType> = {
    d: 'deletion',
    s: 'substitution',
    h: 'highlight',
    c: 'comment',
    i: 'insertion',
  };

  private installKeys(): void {
    const onKeyDown = (e: KeyboardEvent): void => {
      if (!this.root.isConnected || this.isTypingTarget(e.target)) return;
      const key = e.key.toLowerCase();

      // ⌘/Ctrl+Shift+C 复制含 Prompt 的批注全文
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && key === 'c') {
        if (!this.isActive(e.target)) return;
        e.preventDefault();
        if (!this.requireDocument()) return;
        void this.copy(true);
        return;
      }
      // ⌘/Ctrl+Z 撤销、⌘/Ctrl+Shift+Z 重做
      if ((e.metaKey || e.ctrlKey) && !e.altKey && key === 'z') {
        if (!this.isActive(e.target)) return;
        e.preventDefault();
        const ok = e.shiftKey ? this.redo() : this.undo();
        if (!ok) this.notify(e.shiftKey ? '没有可重做的操作' : '没有可撤销的操作');
        return;
      }
      // 单键批注：D 删除 / S 替换 / H 高亮 / C 评论 / I 插入（需正文选区或可见菜单）：
      // 宿主偷选区的场景下，菜单可见（capturedCtx 在）即允许触发
      if (!e.metaKey && !e.ctrlKey && !e.altKey && this.store.state.source
        && (this.selectionInPreview() || this.capturedCtx !== null)) {
        const type = Reviewer.SINGLE_KEY_ANNOTATIONS[key];
        if (type) {
          e.preventDefault();
          this.annotate(type);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    this.disposers.push(() => window.removeEventListener('keydown', onKeyDown));
  }
}

function defaultEmptyState(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'fxr-empty';
  el.innerHTML = '<div class="fxr-empty-line">打开 Markdown 文档后开始批注审阅</div>';
  return el;
}

/** 命名空间化的 ::highlight 规则：颜色变量在 .fxr-root 作用域内解析 */
function namespacedHighlightCss(ns: string): string {
  return [
    `::highlight(${ns}-cm-del){color:var(--cm-del);text-decoration:line-through;text-decoration-color:var(--cm-del)}`,
    `::highlight(${ns}-cm-hl){background-color:var(--cm-hl-bg)}`,
    `::highlight(${ns}-cm-sub-old){color:var(--cm-del);text-decoration:line-through;text-decoration-color:var(--cm-del)}`,
    `::highlight(${ns}-cm-comment){background-color:var(--cm-comment-bg);text-decoration:underline wavy var(--cm-comment-line)}`,
    `::highlight(${ns}-cm-flash){background-color:var(--cm-flash)}`,
  ].join('\n');
}

/** 便捷入口：挂载并返回句柄（dsh 插件的 body 组件用） */
export function mountReviewer(opts: ReviewerOptions): Reviewer {
  return new Reviewer(opts);
}
