import './styles.css';

import { Reviewer } from './editor';
import { defaultShikiLoader } from './render/shiki-loader';
import { buildOpenButton, installDropZone } from './ui/dropzone';

const app = document.getElementById('app')!;

// 空状态卡片：拖入提示 + 打开按钮（编辑器只负责显隐）
const emptyState = document.createElement('div');
emptyState.className = 'empty-state';
emptyState.style.display = 'none';

const reviewer = new Reviewer({
  container: app,
  variant: 'full',
  theme: 'auto',
  loadHighlighter: defaultShikiLoader,
  emptyState,
});

emptyState.innerHTML = `
  <div class="empty-card">
    <div class="empty-icon">📝</div>
    <h2>拖入 Markdown 文件开始审阅</h2>
    <p>把本地 .md 文件拖到本窗口，或点击下方按钮打开。渲染后即可在文字上做 CriticMarkup 批注，再一键交给 AI 修改。</p>
  </div>`;
emptyState.querySelector('.empty-card')!.appendChild(buildOpenButton(reviewer));

installDropZone(reviewer);

// 生产环境注册 Service Worker（离线可用的静态缓存；导航请求 network-first 防旧缓存卡版本）
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* 注册失败不影响使用 */
    });
  });
}

export { reviewer };
