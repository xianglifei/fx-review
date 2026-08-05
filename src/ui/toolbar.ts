import type { AnnotationType } from '../types';
import { ANNOTATION_META } from '../types';
import { store } from '../store';
import { createAnnotation, readContext } from '../annotator/create';
import {
  copyAnnotated,
  downloadAnnotated,
  copyWithPrompt,
  downloadWithPrompt,
} from '../export/actions';
import { toast } from './toast';
import { openPromptEditor } from './prompt-editor';

const ANNOTATION_TYPES: AnnotationType[] = [
  'insertion',
  'deletion',
  'substitution',
  'highlight',
  'comment',
];

export function buildToolbar(): HTMLElement {
  const bar = document.createElement('header');
  bar.className = 'toolbar';

  // 左：品牌 + 文件名
  const brand = document.createElement('div');
  brand.className = 'brand';
  brand.innerHTML = `<span class="brand-name">fx-review</span><span class="brand-sub" id="filename">未打开文件</span>`;
  bar.appendChild(brand);

  // 批注按钮组
  const annoGroup = document.createElement('div');
  annoGroup.className = 'btn-group';
  for (const t of ANNOTATION_TYPES) {
    const meta = ANNOTATION_META[t];
    const btn = document.createElement('button');
    btn.className = `btn btn-anno btn-anno-${t}`;
    btn.title = meta.title;
    btn.innerHTML = `<span class="btn-icon">${meta.icon}</span><span class="btn-label">${meta.label}</span>`;
    btn.addEventListener('click', () => {
      if (!store.state.source) {
        toast('请先拖入或打开一个 Markdown 文件');
        return;
      }
      createAnnotation(t, readContext());
    });
    annoGroup.appendChild(btn);
  }
  bar.appendChild(annoGroup);

  // 清空
  const clearBtn = document.createElement('button');
  clearBtn.className = 'btn btn-ghost';
  clearBtn.title = '清除全部批注';
  clearBtn.textContent = '清空批注';
  clearBtn.addEventListener('click', () => {
    if (store.state.annotations.length === 0) return;
    if (window.confirm('确定清除全部批注？')) {
      store.clearAnnotations();
      toast('已清除全部批注');
    }
  });
  bar.appendChild(clearBtn);

  // 导出按钮组
  const exportGroup = document.createElement('div');
  exportGroup.className = 'btn-group';
  const exports: { label: string; title: string; fn: () => void }[] = [
    { label: '复制批注', title: '复制带 CriticMarkup 批注的全文', fn: () => copyAnnotated() },
    { label: '下载批注', title: '下载带批注的全文 .md', fn: () => downloadAnnotated() },
    { label: '复制(含Prompt)', title: '复制引导 Prompt + 批注全文', fn: () => copyWithPrompt() },
    { label: '下载(含Prompt)', title: '下载 Prompt + 批注全文 .md', fn: () => downloadWithPrompt() },
  ];
  for (const e of exports) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-export';
    btn.title = e.title;
    btn.textContent = e.label;
    btn.addEventListener('click', () => {
      if (!store.state.source) {
        toast('请先拖入或打开一个 Markdown 文件');
        return;
      }
      e.fn();
    });
    exportGroup.appendChild(btn);
  }
  bar.appendChild(exportGroup);

  // 右：编辑 Prompt + 主题
  const tail = document.createElement('div');
  tail.className = 'btn-group';
  const promptBtn = document.createElement('button');
  promptBtn.className = 'btn btn-ghost';
  promptBtn.textContent = '编辑 Prompt';
  promptBtn.addEventListener('click', () => openPromptEditor());
  tail.appendChild(promptBtn);

  const themeBtn = document.createElement('button');
  themeBtn.className = 'btn btn-ghost';
  themeBtn.id = 'theme-btn';
  themeBtn.textContent = '🌙';
  themeBtn.title = '切换主题';
  themeBtn.addEventListener('click', () => toggleTheme());
  tail.appendChild(themeBtn);
  bar.appendChild(tail);

  return bar;
}

export function updateToolbarFilename(): void {
  const el = document.getElementById('filename');
  if (el) el.textContent = store.state.fileName || '未打开文件';
}

function toggleTheme(): void {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
}

export function initTheme(): void {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}
