import type { Reviewer } from '../editor';

function readFile(file: File, ed: Reviewer): void {
  if (!/\.md$|\.markdown$|\.mdown$/i.test(file.name) && file.type && !/markdown|text/.test(file.type)) {
    ed.notify('请拖入 Markdown（.md）文件');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const text = typeof reader.result === 'string' ? reader.result : '';
    // 同一文件（内容哈希一致）曾审阅过则恢复上次的批注
    const restored = ed.setDocument(file.name, text);
    ed.notify(
      restored > 0
        ? `已打开 ${file.name}，恢复上次批注 ${restored} 条`
        : `已打开 ${file.name}`,
    );
  };
  reader.onerror = () => ed.notify('读取文件失败');
  reader.readAsText(file);
}

export function buildOpenButton(ed: Reviewer): HTMLElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.md,.markdown,.mdown,text/markdown,text/plain';
  input.style.display = 'none';
  input.addEventListener('change', () => {
    const f = input.files?.[0];
    if (f) readFile(f, ed);
    input.value = '';
  });

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'fxr-btn fxr-btn-primary fxr-open-btn';
  btn.textContent = '打开 Markdown 文件';
  btn.addEventListener('click', () => input.click());

  const wrap = document.createElement('div');
  wrap.className = 'fxr-open-wrap';
  wrap.appendChild(btn);
  wrap.appendChild(input);
  return wrap;
}

/** 整窗拖放支持（网页壳专用） */
export function installDropZone(ed: Reviewer): void {
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
    if (f) readFile(f, ed);
  });
}
