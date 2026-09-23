/**
 * 轻量文本输入浮层：替代 window.prompt 用于插入/替换文字输入。
 * Enter 确认（Shift+Enter 换行）、Esc 或点击浮层外部取消；
 * 输入法组合中的 Enter 不触发确认（e.isComposing）。
 *
 * 挂 document.body、按视口矩形定位；同页同时只存在一个（后开顶前开）。
 */

interface PopoverOptions {
  title: string;
  value?: string;
  /** 定位锚点（选区/光标/评论栏条目的矩形）；为空时居中屏幕 */
  anchor: DOMRect | null;
  /** 允许确认空文本（替换为空 = 删除语义）；默认空文本视为取消 */
  allowEmpty?: boolean;
}

let activeFinish: ((result: string | null) => void) | null = null;

function finishActive(result: string | null): void {
  const fn = activeFinish;
  activeFinish = null;
  if (fn) fn(result);
}

export function askTextPopover(opts: PopoverOptions): Promise<string | null> {
  finishActive(null); // 关闭已打开的浮层

  return new Promise((resolve) => {
    const pop = document.createElement('div');
    pop.className = 'fxr-input-popover';

    const title = document.createElement('div');
    title.className = 'fxr-input-popover-title';
    title.textContent = opts.title;

    const ta = document.createElement('textarea');
    ta.className = 'fxr-input-popover-area';
    ta.value = opts.value ?? '';
    ta.rows = 2;

    const actions = document.createElement('div');
    actions.className = 'fxr-input-popover-actions';
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'fxr-btn fxr-btn-ghost';
    cancelBtn.textContent = '取消';
    const okBtn = document.createElement('button');
    okBtn.type = 'button';
    okBtn.className = 'fxr-btn fxr-btn-primary';
    okBtn.textContent = '确认';
    actions.append(cancelBtn, okBtn);

    const finish = (result: string | null): void => {
      activeFinish = null;
      document.removeEventListener('mousedown', onOutside, true);
      pop.remove();
      resolve(result);
    };
    activeFinish = finish;

    const confirm = (): void => {
      const text = ta.value;
      if (!text.trim() && !opts.allowEmpty) return;
      finish(text);
    };

    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        confirm();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        finish(null);
      }
    });
    okBtn.addEventListener('click', confirm);
    cancelBtn.addEventListener('click', () => finish(null));

    const onOutside = (e: MouseEvent): void => {
      if (!pop.contains(e.target as Node)) finish(null);
    };
    // 延迟到当前点击事件结束后再挂监听，避免“打开浮层的同一次点击”立即把它关掉
    window.setTimeout(() => {
      if (activeFinish === finish) document.addEventListener('mousedown', onOutside, true);
    }, 0);

    pop.append(title, ta, actions);
    document.body.appendChild(pop);
    positionPopover(pop, opts.anchor);
    window.setTimeout(() => {
      if (activeFinish !== finish) return;
      ta.focus();
      if (opts.value) ta.select();
    }, 0);
  });
}

const POPOVER_WIDTH = 320;

function positionPopover(pop: HTMLElement, anchor: DOMRect | null): void {
  let left: number;
  let top: number;
  if (anchor && (anchor.width > 0 || anchor.height > 0 || anchor.top > 0)) {
    left = anchor.left + anchor.width / 2 - POPOVER_WIDTH / 2;
    top = anchor.bottom + 8;
  } else {
    left = window.innerWidth / 2 - POPOVER_WIDTH / 2;
    top = window.innerHeight / 3;
  }
  left = Math.max(8, Math.min(left, window.innerWidth - POPOVER_WIDTH - 8));
  // 下方空间不足时改放锚点上方
  const h = pop.offsetHeight;
  if (anchor && top + h > window.innerHeight - 8) {
    top = Math.max(8, anchor.top - h - 8);
  }
  pop.style.left = `${left + window.scrollX}px`;
  pop.style.top = `${top + window.scrollY}px`;
}
