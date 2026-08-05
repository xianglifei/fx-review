import { store } from '../store';
import { toast } from './toast';

function readFile(file: File): void {
  if (!/\.md$|\.markdown$|\.mdown$/i.test(file.name) && file.type && !/markdown|text/.test(file.type)) {
    toast('请拖入 Markdown（.md）文件');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const text = typeof reader.result === 'string' ? reader.result : '';
    store.loadFile(file.name, text);
    toast(`已打开 ${file.name}`);
  };
  reader.onerror = () => toast('读取文件失败');
  reader.readAsText(file);
}

export function buildOpenButton(): HTMLElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.md,.markdown,.mdown,text/markdown,text/plain';
  input.style.display = 'none';
  input.addEventListener('change', () => {
    const f = input.files?.[0];
    if (f) readFile(f);
    input.value = '';
  });

  const btn = document.createElement('button');
  btn.className = 'btn btn-primary open-btn';
  btn.textContent = '打开 Markdown 文件';
  btn.addEventListener('click', () => input.click());

  const wrap = document.createElement('div');
  wrap.className = 'open-wrap';
  wrap.appendChild(btn);
  wrap.appendChild(input);
  return wrap;
}

/** 整窗拖放支持 */
export function installDropZone(): void {
  window.addEventListener('dragover', (e) => {
    e.preventDefault();
    document.body.classList.add('dragging');
  });
  window.addEventListener('dragleave', (e) => {
    if (e.relatedTarget === null) document.body.classList.remove('dragging');
  });
  window.addEventListener('drop', (e) => {
    e.preventDefault();
    document.body.classList.remove('dragging');
    const f = e.dataTransfer?.files?.[0];
    if (f) readFile(f);
  });
}
