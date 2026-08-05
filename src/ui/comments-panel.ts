import type { Annotation } from '../types';
import { store } from '../store';
import { flashAnnotation } from '../annotator/overlay';

let panel: HTMLElement | null = null;
let previewEl: HTMLElement | null = null;

export function buildCommentsPanel(): HTMLElement {
  panel = document.createElement('aside');
  panel.className = 'comments-panel';
  panel.innerHTML = `
    <div class="comments-head">
      <span>评论与批注</span>
      <span class="comments-count" id="comments-count">0</span>
    </div>
    <div class="comments-list" id="comments-list"></div>`;
  return panel;
}

export function setPreviewRef(el: HTMLElement): void {
  previewEl = el;
}

export function refreshCommentsPanel(): void {
  if (!panel) return;
  const list = panel.querySelector('#comments-list') as HTMLElement;
  const count = panel.querySelector('#comments-count') as HTMLElement;
  const annotations = store.state.annotations;
  count.textContent = String(annotations.length);
  list.innerHTML = '';

  if (annotations.length === 0) {
    list.innerHTML = `<div class="comments-empty">尚无批注。选中正文文字后点击批注按钮，或在选区旁的浮动菜单操作。</div>`;
    return;
  }

  // 按源码顺序排列
  const sorted = [...annotations].sort((a, b) => a.srcStart - b.srcStart);
  for (const a of sorted) {
    list.appendChild(renderEntry(a));
  }
}

function renderEntry(a: Annotation): HTMLElement {
  const entry = document.createElement('div');
  entry.className = `comment-entry comment-entry-${a.type}`;
  entry.dataset.id = a.id;

  const typeLabel = labelFor(a);
  const quote = a.quotedText || (a.type === 'insertion' ? a.insertedText : '') || '';

  entry.innerHTML = `
    <div class="comment-meta">
      <span class="comment-tag comment-tag-${a.type}">${typeLabel}</span>
      <button class="comment-locate" title="定位到正文">↗</button>
      <button class="comment-del" title="删除该批注">✕</button>
    </div>
    <div class="comment-quote"></div>
    <div class="comment-extra"></div>`;

  entry.querySelector('.comment-quote')!.textContent = quote;

  const extra = entry.querySelector('.comment-extra') as HTMLElement;

  if (a.type === 'substitution') {
    extra.innerHTML = `<span class="sub-old"></span><span class="sub-arrow"> → </span><span class="sub-new"></span>`;
    (extra.querySelector('.sub-old') as HTMLElement).textContent = a.quotedText;
    (extra.querySelector('.sub-new') as HTMLElement).textContent = a.replacement ?? '';
  } else if (a.type === 'insertion') {
    extra.innerHTML = `<span class="ins-text"></span>`;
    (extra.querySelector('.ins-text') as HTMLElement).textContent = a.insertedText ?? '';
  } else if (a.type === 'comment') {
    const ta = document.createElement('textarea');
    ta.className = 'comment-note';
    ta.placeholder = '输入审阅意见…';
    ta.value = a.comment ?? '';
    ta.addEventListener('input', () => {
      store.updateAnnotation(a.id, { comment: ta.value });
    });
    extra.appendChild(ta);
  }

  entry.querySelector('.comment-locate')!.addEventListener('click', () => {
    if (previewEl) flashAnnotation(previewEl, a);
  });
  entry.querySelector('.comment-del')!.addEventListener('click', () => {
    store.removeAnnotation(a.id);
  });

  return entry;
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
