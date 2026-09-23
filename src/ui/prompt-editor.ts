import { DEFAULT_PROMPT } from '../export/prompt';
import type { EditorContext } from './context';

/** 引导 Prompt 编辑弹窗（挂在编辑器 root 内） */
export function openPromptEditor(ed: EditorContext): void {
  const overlay = document.createElement('div');
  overlay.className = 'fxr-modal-overlay';

  const box = document.createElement('div');
  box.className = 'fxr-modal-box';
  box.innerHTML = `
    <h3>编辑引导 Prompt</h3>
    <p class="fxr-modal-hint">复制/下载“含 Prompt”时，会把它前置到批注全文之前。</p>
    <textarea class="fxr-prompt-area" spellcheck="false"></textarea>
    <div class="fxr-modal-actions">
      <button class="fxr-btn fxr-btn-ghost" data-act="reset">恢复默认</button>
      <div class="fxr-modal-actions-right">
        <button class="fxr-btn fxr-btn-ghost" data-act="cancel">取消</button>
        <button class="fxr-btn fxr-btn-primary" data-act="save">保存</button>
      </div>
    </div>`;

  overlay.appendChild(box);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  ed.root.appendChild(overlay);

  const area = box.querySelector('.fxr-prompt-area') as HTMLTextAreaElement;
  area.value = ed.store.state.prompt;

  box.querySelector('[data-act="cancel"]')!.addEventListener('click', () => overlay.remove());
  box.querySelector('[data-act="reset"]')!.addEventListener('click', () => {
    area.value = DEFAULT_PROMPT;
  });
  box.querySelector('[data-act="save"]')!.addEventListener('click', () => {
    ed.setPrompt(area.value.trim() || DEFAULT_PROMPT);
    overlay.remove();
    ed.notify('Prompt 已保存');
  });

  area.focus();
}
