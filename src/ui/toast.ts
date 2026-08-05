// 轻量提示：右下角短暂浮现
let timer: number | undefined;
let el: HTMLDivElement | undefined;

export function toast(message: string, duration = 2200): void {
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('toast-visible');
  if (timer) window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    el?.classList.remove('toast-visible');
  }, duration);
}
