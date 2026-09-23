import type { Annotation } from '../types';
import { askTextPopover } from './input-popover';
import type { EditorContext } from './context';

export interface CommentsApi {
  /** 面板本体（workspace 的 flex 子项 / 窄容器时的抽屉） */
  el: HTMLElement;
  /** 窄容器抽屉的遮罩（挂在 root 上） */
  backdrop: HTMLElement;
  refresh(): void;
  open(): void;
  close(): void;
  toggle(): void;
}

function labelFor(a: Annotation): string {
  switch (a.type) {
    case 'insertion':
      return '插入';
    case 'deletion':
      return '删除';
    case 'substitution':
      return '替换';
    case 'highlight':
      return '高亮';
    case 'comment':
      return '评论';
  }
}

/** 评论与批注栏（每实例一个）：头部图标组（撤销/重做/清空）+ 提交按钮 + 宽度拖拽 */
export function createCommentsPanel(ed: EditorContext): CommentsApi {
  const panel = document.createElement('aside');
  panel.className = 'fxr-comments-panel';

  const backdrop = document.createElement('div');
  backdrop.className = 'fxr-drawer-backdrop';

  panel.innerHTML = `
    <div class="fxr-comments-head">
      <span class="fxr-comments-title">评论与批注</span>
      <span class="fxr-comments-tools">
        <button class="fxr-comments-tool" data-act="undo" title="撤销（⌘/Ctrl+Z）">↩</button>
        <button class="fxr-comments-tool" data-act="redo" title="重做（⌘/Ctrl+Shift+Z）">↪</button>
        <button class="fxr-comments-tool" data-act="clear" title="清除全部批注">🗑</button>
        <span class="fxr-comments-count">0</span>
      </span>
      <span class="fxr-comments-tools fxr-comments-tail">
        ${ed.canSubmit() ? '<button class="fxr-submit-btn" data-act="submit" title="把批注全文放到会话输入框上方，发送时附带">提交</button>' : ''}
        <button class="fxr-comments-tool fxr-comments-close" data-act="close" title="收起批注栏">✕</button>
      </span>
    </div>
    <div class="fxr-comments-list"></div>`;

  const list = panel.querySelector('.fxr-comments-list') as HTMLElement;
  const count = panel.querySelector('.fxr-comments-count') as HTMLElement;
  const undoBtn = panel.querySelector('[data-act="undo"]') as HTMLButtonElement;
  const redoBtn = panel.querySelector('[data-act="redo"]') as HTMLButtonElement;
  const clearBtn = panel.querySelector('[data-act="clear"]') as HTMLButtonElement;

  const close = (): void => {
    backdrop.classList.remove('show');
    panel.classList.remove('open');
  };
  const open = (): void => {
    backdrop.classList.add('show');
    panel.classList.add('open');
  };

  undoBtn.addEventListener('click', () => {
    if (!ed.undo()) ed.notify('没有可撤销的操作');
  });
  redoBtn.addEventListener('click', () => {
    if (!ed.redo()) ed.notify('没有可重做的操作');
  });
  clearBtn.addEventListener('click', () => {
    if (ed.store.state.annotations.length === 0) return;
    if (window.confirm('确定清除全部批注？')) ed.clearAnnotations();
  });
  panel.querySelector('[data-act="submit"]')?.addEventListener('click', () => ed.submit());
  panel.querySelector('[data-act="close"]')!.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  installResizer(ed, panel);

  function renderEntry(a: Annotation): HTMLElement {
    const entry = document.createElement('div');
    entry.className = `fxr-comment-entry fxr-comment-entry-${a.type}`;
    entry.dataset.id = a.id;

    const typeLabel = labelFor(a);
    const quote = a.quotedText || (a.type === 'insertion' ? a.insertedText : '') || '';
    const editable = a.type === 'insertion' || a.type === 'substitution';

    entry.innerHTML = `
      <div class="fxr-comment-meta">
        <span class="fxr-comment-tag fxr-comment-tag-${a.type}">${typeLabel}</span>
        <button class="fxr-comment-locate" title="定位到正文">↗</button>
        ${editable ? '<button class="fxr-comment-edit" title="编辑文字">✎</button>' : ''}
        <button class="fxr-comment-del" title="删除该批注">✕</button>
      </div>
      <div class="fxr-comment-quote"></div>
      <div class="fxr-comment-extra"></div>`;

    entry.querySelector('.fxr-comment-quote')!.textContent = quote;

    const extra = entry.querySelector('.fxr-comment-extra') as HTMLElement;

    if (a.type === 'substitution') {
      extra.innerHTML = `<span class="fxr-sub-old"></span><span class="fxr-sub-arrow"> → </span><span class="fxr-sub-new"></span>`;
      (extra.querySelector('.fxr-sub-old') as HTMLElement).textContent = a.quotedText;
      (extra.querySelector('.fxr-sub-new') as HTMLElement).textContent = a.replacement ?? '';
    } else if (a.type === 'insertion') {
      extra.innerHTML = `<span class="fxr-ins-text"></span>`;
      (extra.querySelector('.fxr-ins-text') as HTMLElement).textContent = a.insertedText ?? '';
    } else if (a.type === 'comment') {
      const ta = document.createElement('textarea');
      ta.className = 'fxr-comment-note';
      ta.placeholder = '输入审阅意见…';
      ta.value = a.comment ?? '';
      ta.addEventListener('input', () => {
        ed.store.setComment(a.id, ta.value);
        // setComment 静默不触发订阅，持久化与计数需显式触发（防抖）
        ed.onSilentMutation();
      });
      extra.appendChild(ta);
    }

    entry.querySelector('.fxr-comment-locate')!.addEventListener('click', () => {
      ed.flash(a);
    });

    const editBtn = entry.querySelector('.fxr-comment-edit');
    if (editBtn) {
      editBtn.addEventListener('click', async () => {
        const isIns = a.type === 'insertion';
        const text = await askTextPopover({
          title: isIns ? '修改插入文字' : '修改替换后的新文字',
          value: (isIns ? a.insertedText : a.replacement) ?? '',
          anchor: entry.getBoundingClientRect(),
          allowEmpty: a.type === 'substitution',
        });
        if (text == null) return;
        ed.store.updateAnnotation(a.id, isIns ? { insertedText: text } : { replacement: text });
      });
    }

    entry.querySelector('.fxr-comment-del')!.addEventListener('click', () => {
      ed.store.removeAnnotation(a.id);
    });

    return entry;
  }

  function refresh(): void {
    const annotations = ed.store.state.annotations;
    count.textContent = String(annotations.length);
    undoBtn.disabled = !ed.store.canUndo;
    redoBtn.disabled = !ed.store.canRedo;

    // 焦点保持：正在输入的条目（评论框 textarea 等）不重建——appendChild 移动
    // 保留节点，输入法组合与光标不丢；其余条目照常重绘
    const active = document.activeElement;
    const activeEntry = active instanceof Element
      ? active.closest<HTMLElement>('.fxr-comment-entry')
      : null;
    const keepId = activeEntry?.dataset.id ?? null;

    if (annotations.length === 0) {
      list.innerHTML = `<div class="fxr-comments-empty">尚无批注。选中正文文字后点击批注按钮，或在选区旁的浮动菜单操作。</div>`;
      return;
    }

    // 按源码顺序排列
    const sorted = [...annotations].sort((a, b) => a.srcStart - b.srcStart);
    const keepable = keepId !== null && sorted.some((a) => a.id === keepId);
    for (const child of [...list.children]) {
      if (!(keepable && child === activeEntry)) child.remove();
    }
    for (const a of sorted) {
      if (keepable && a.id === keepId && activeEntry !== null) list.appendChild(activeEntry);
      else list.appendChild(renderEntry(a));
    }
    // appendChild 移动节点会掉焦点（Chromium）：显式恢复
    if (keepable && active instanceof HTMLElement && active.isConnected) {
      active.focus({ preventScroll: true });
    }
  }

  return {
    el: panel,
    backdrop,
    refresh,
    open,
    close,
    toggle(): void {
      if (panel.classList.contains('open')) close();
      else open();
    },
  };
}

/** 宽容器下拖拽面板左缘调宽（窄容器抽屉模式经 CSS 隐藏手柄）。宽度偏好持久化。 */
function installResizer(ed: EditorContext, panel: HTMLElement): void {
  const handle = document.createElement('div');
  handle.className = 'fxr-resizer';
  handle.title = '拖动调整批注栏宽度';
  panel.appendChild(handle);

  let dragging = false;
  const MIN = 240;
  const MAX = 640;

  const apply = (width: number): void => {
    ed.root.style.setProperty('--fxr-panel-w', `${Math.round(width)}px`);
  };

  const onPointerDown = (e: PointerEvent): void => {
    if (e.button !== 0) return;
    dragging = true;
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const onPointerMove = (e: PointerEvent): void => {
    if (!dragging) return;
    const ws = panel.parentElement;
    if (!ws) return;
    const wsRect = ws.getBoundingClientRect();
    const width = Math.min(MAX, Math.max(MIN, wsRect.right - e.clientX - 1));
    apply(width);
  };
  const onPointerUp = (): void => {
    if (!dragging) return;
    dragging = false;
    try {
      const value = ed.root.style.getPropertyValue('--fxr-panel-w');
      if (value) window.localStorage.setItem('fx-review:panelWidth', value);
    } catch { /* ignore */ }
  };

  handle.addEventListener('pointerdown', onPointerDown);
  handle.addEventListener('pointermove', onPointerMove);
  handle.addEventListener('pointerup', onPointerUp);
  handle.addEventListener('pointercancel', onPointerUp);
  // 双击手柄恢复默认宽
  handle.addEventListener('dblclick', () => {
    ed.root.style.removeProperty('--fxr-panel-w');
    try { window.localStorage.removeItem('fx-review:panelWidth'); } catch { /* ignore */ }
  });
}
