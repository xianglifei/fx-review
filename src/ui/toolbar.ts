import type { AnnotationType } from '../types';
import { ANNOTATION_META } from '../types';
import type { EditorContext } from './context';

const ANNOTATION_TYPES: AnnotationType[] = [
  'insertion',
  'deletion',
  'substitution',
  'highlight',
  'comment',
];

export interface ToolbarApi {
  el: HTMLElement;
  setFileName(name: string): void;
  setCount(n: number): void;
  setUndoRedo(canUndo: boolean, canRedo: boolean): void;
  setThemeIcon(theme: 'light' | 'dark'): void;
}

function button(cls: string, title: string, html: string, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = cls;
  btn.title = title;
  btn.innerHTML = html;
  btn.addEventListener('click', onClick);
  return btn;
}

/** 工具栏（每实例一个）。full：品牌 + 全部导出 + 主题；compact：精简为批注与复制 */
export function createToolbar(ed: EditorContext): ToolbarApi {
  const bar = document.createElement('header');
  bar.className = 'fxr-toolbar';

  let nameEl: HTMLElement | null = null;
  if (ed.variant === 'full') {
    const brand = document.createElement('div');
    brand.className = 'fxr-brand';
    brand.innerHTML = `<span class="fxr-brand-name">fx-review</span><span class="fxr-brand-sub"></span>`;
    nameEl = brand.querySelector('.fxr-brand-sub');
    bar.appendChild(brand);
  }

  // 批注按钮组
  const annoGroup = document.createElement('div');
  annoGroup.className = 'fxr-btn-group';
  for (const t of ANNOTATION_TYPES) {
    const meta = ANNOTATION_META[t];
    annoGroup.appendChild(button(
      `fxr-btn fxr-btn-anno fxr-btn-anno-${t}`,
      `${meta.title}（选中后按 ${meta.key}）`,
      `<span class="fxr-btn-icon">${meta.icon}</span><span class="fxr-btn-label">${meta.label}</span>`,
      () => ed.annotate(t),
    ));
  }
  bar.appendChild(annoGroup);

  // 撤销 / 重做 / 清空
  const historyGroup = document.createElement('div');
  historyGroup.className = 'fxr-btn-group';
  const undoBtn = button('fxr-btn fxr-btn-ghost', '撤销（⌘/Ctrl+Z）', '↩', () => {
    if (!ed.undo()) ed.notify('没有可撤销的操作');
  });
  const redoBtn = button('fxr-btn fxr-btn-ghost', '重做（⌘/Ctrl+Shift+Z）', '↪', () => {
    if (!ed.redo()) ed.notify('没有可重做的操作');
  });
  const clearBtn = button('fxr-btn fxr-btn-ghost', '清除全部批注', '🗑 清空', () => {
    if (ed.store.state.annotations.length === 0) return;
    if (window.confirm('确定清除全部批注？')) ed.clearAnnotations();
  });
  historyGroup.append(undoBtn, redoBtn, clearBtn);
  bar.appendChild(historyGroup);

  // 导出组
  const exportGroup = document.createElement('div');
  exportGroup.className = 'fxr-btn-group';
  exportGroup.appendChild(button(
    'fxr-btn fxr-btn-export',
    '复制带 CriticMarkup 批注的全文',
    '复制批注',
    () => void ed.copy(false),
  ));
  if (ed.variant === 'full') {
    exportGroup.appendChild(button(
      'fxr-btn fxr-btn-export',
      '下载带批注的全文 .md',
      '下载批注',
      () => ed.download(false),
    ));
  }
  exportGroup.appendChild(button(
    'fxr-btn fxr-btn-export',
    '复制引导 Prompt + 批注全文（⌘/Ctrl+Shift+C）',
    ed.variant === 'full' ? '复制(含Prompt)' : '复制含P',
    () => void ed.copy(true),
  ));
  if (ed.variant === 'full') {
    exportGroup.appendChild(button(
      'fxr-btn fxr-btn-export',
      '下载 Prompt + 批注全文 .md',
      '下载(含Prompt)',
      () => ed.download(true),
    ));
  }
  bar.appendChild(exportGroup);

  // 尾组：编辑 Prompt + 主题（full）+ 批注栏开关（窄容器）
  const tail = document.createElement('div');
  tail.className = 'fxr-btn-group fxr-toolbar-tail';
  tail.appendChild(button('fxr-btn fxr-btn-ghost', '编辑「含 Prompt」导出的引导词', 'Prompt', () => {
    ed.openPromptEditor();
  }));

  let themeBtn: HTMLButtonElement | null = null;
  if (ed.variant === 'full') {
    themeBtn = button('fxr-btn fxr-btn-ghost', '切换主题', '🌙', () => {
      ed.setTheme(ed.getTheme() === 'dark' ? 'light' : 'dark');
    });
    tail.appendChild(themeBtn);
  }

  const panelToggle = button(
    'fxr-btn fxr-btn-ghost fxr-panel-toggle',
    '打开评论与批注栏',
    `📋 <span class="fxr-panel-toggle-count">0</span>`,
    () => ed.togglePanel(),
  );
  tail.appendChild(panelToggle);
  const toggleCount = panelToggle.querySelector('.fxr-panel-toggle-count') as HTMLElement;

  bar.appendChild(tail);

  return {
    el: bar,
    setFileName(name: string): void {
      if (nameEl) nameEl.textContent = name || '未打开文件';
      bar.title = name;
    },
    setCount(n: number): void {
      toggleCount.textContent = String(n);
    },
    setUndoRedo(canUndo: boolean, canRedo: boolean): void {
      undoBtn.disabled = !canUndo;
      redoBtn.disabled = !canRedo;
    },
    setThemeIcon(theme: 'light' | 'dark'): void {
      if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    },
  };
}
