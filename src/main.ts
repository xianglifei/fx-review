import './styles.css';

import { store } from './store';
import { md } from './render/markdown';
import { renderMarkdown } from './render/source-map';
import { renderOverlay, highlightApiSupported } from './annotator/overlay';
import {
  buildToolbar,
  initTheme,
  updateToolbarFilename,
} from './ui/toolbar';
import { buildOpenButton, installDropZone } from './ui/dropzone';
import {
  buildCommentsPanel,
  refreshCommentsPanel,
  setPreviewRef,
} from './ui/comments-panel';
import { showSelectionMenu, hideSelectionMenu } from './ui/selection-menu';
import { copyWithPrompt } from './export/actions';
import { toast } from './ui/toast';

const app = document.getElementById('app')!;

// 布局
const toolbar = buildToolbar();
const workspace = document.createElement('main');
workspace.className = 'workspace';

const previewWrap = document.createElement('section');
previewWrap.className = 'preview-wrap';

const preview = document.createElement('article');
preview.className = 'preview markdown-body';
preview.id = 'preview';

const emptyState = document.createElement('div');
emptyState.className = 'empty-state';
emptyState.innerHTML = `
  <div class="empty-card">
    <div class="empty-icon">📝</div>
    <h2>拖入 Markdown 文件开始审阅</h2>
    <p>把本地 .md 文件拖到本窗口，或点击下方按钮打开。渲染后即可在文字上做 CriticMarkup 批注，再一键交给 AI 修改。</p>
  </div>`;
emptyState.querySelector('.empty-card')!.appendChild(buildOpenButton());

previewWrap.appendChild(emptyState);
previewWrap.appendChild(preview);
workspace.appendChild(previewWrap);

const commentsPanel = buildCommentsPanel();
workspace.appendChild(commentsPanel);

app.appendChild(toolbar);
app.appendChild(workspace);

setPreviewRef(preview);
installDropZone();
initTheme();

// 若浏览器不支持 CSS Custom Highlight API，提示但仍可用（降级 mark 包裹）
if (!highlightApiSupported()) {
  toast('当前浏览器不支持 Highlight API，批注将降级显示', 4000);
}

let lastRenderedSource = '';
function renderAll(): void {
  const { source, annotations } = store.state;

  // 源码变化（打开新文件）时重渲染预览 HTML
  if (source !== lastRenderedSource) {
    lastRenderedSource = source;
    if (source) {
      preview.innerHTML = renderMarkdown(md, source);
      preview.style.display = 'block';
      emptyState.style.display = 'none';
      // 顶部也放一个打开按钮？保持工具栏简洁，文件名即可
    } else {
      preview.innerHTML = '';
      preview.style.display = 'none';
      emptyState.style.display = 'flex';
    }
  }

  if (source) renderOverlay(preview, annotations);
  refreshCommentsPanel();
  updateToolbarFilename();
}

store.subscribe(renderAll);
renderAll();

// 工具栏空状态也提供打开按钮：当无文件时，点击工具栏任意位置无 op；这里在空状态已提供。
// 额外：预览区为空时，previewWrap 点击触发打开？保持简单，不做。

// 选区 → 浮动菜单
let rafId = 0;
document.addEventListener('selectionchange', () => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    const sel = window.getSelection();
    if (
      !sel ||
      sel.isCollapsed ||
      sel.rangeCount === 0 ||
      !store.state.source
    ) {
      hideSelectionMenu();
      return;
    }
    const range = sel.getRangeAt(0);
    // 仅当选区在 preview 内时显示菜单
    if (!preview.contains(range.commonAncestorContainer)) {
      hideSelectionMenu();
      return;
    }
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      hideSelectionMenu();
      return;
    }
    showSelectionMenu(rect);
  });
});

// 滚动时隐藏浮动菜单（避免错位）
previewWrap.addEventListener('scroll', () => hideSelectionMenu());
window.addEventListener('scroll', () => hideSelectionMenu(), { passive: true });

// 防止默认拖放行为已被 installDropZone 处理；额外阻止 preview 内图片拖动默认
preview.addEventListener('dragstart', (e) => e.preventDefault());

// 快捷键：⌘/Ctrl+Shift+C 复制含 Prompt 的批注全文
window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
    e.preventDefault();
    if (!store.state.source) {
      toast('请先打开 Markdown 文件');
      return;
    }
    copyWithPrompt();
  }
});
