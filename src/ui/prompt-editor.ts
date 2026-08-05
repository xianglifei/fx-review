import { store } from '../store';
import { DEFAULT_PROMPT } from '../export/prompt';
import { toast } from './toast';

export function openPromptEditor(): void {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const box = document.createElement('div');
  box.className = 'modal-box';
  box.innerHTML = `
    <h3>编辑引导 Prompt</h3>
    <p class="modal-hint">复制/下载“含 Prompt”时，会把它前置到批注全文之前。会话内有效。</p>
    <textarea id="prompt-area" spellcheck="false"></textarea>
    <div class="modal-actions">
      <button id="prompt-reset" class="btn btn-ghost">恢复默认</button>
      <div class="modal-actions-right">
        <button id="prompt-cancel" class="btn btn-ghost">取消</button>
        <button id="prompt-save" class="btn btn-primary">保存</button>
      </div>
    </div>`;

  overlay.appendChild(box);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);

  const area = box.querySelector('#prompt-area') as HTMLTextAreaElement;
  area.value = store.state.prompt;

  box.querySelector('#prompt-cancel')!.addEventListener('click', () => overlay.remove());
  box.querySelector('#prompt-reset')!.addEventListener('click', () => {
    area.value = DEFAULT_PROMPT;
  });
  box.querySelector('#prompt-save')!.addEventListener('click', () => {
    store.setPrompt(area.value.trim() || DEFAULT_PROMPT);
    overlay.remove();
    toast('Prompt 已保存');
  });

  area.focus();
}
