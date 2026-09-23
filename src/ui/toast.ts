// 轻量提示：编辑器容器右下角短暂浮现（绝对定位于 .fxr-root 内，
// 嵌入宿主页面时不污染宿主的 fixed 层）
export interface Toaster {
  (message: string, duration?: number): void;
  dispose(): void;
}

export function createToaster(getRoot: () => HTMLElement): Toaster {
  let timer: number | undefined;
  let el: HTMLDivElement | undefined;

  const toast = (message: string, duration = 2200): void => {
    if (!el || !el.isConnected) {
      el = document.createElement('div');
      el.className = 'fxr-toast';
      getRoot().appendChild(el);
    }
    el.textContent = message;
    el.classList.add('fxr-toast-visible');
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      el?.classList.remove('fxr-toast-visible');
    }, duration);
  };

  toast.dispose = (): void => {
    if (timer) window.clearTimeout(timer);
    el?.remove();
    el = undefined;
  };

  return toast;
}
