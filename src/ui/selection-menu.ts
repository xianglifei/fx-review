import type { AnnotationType } from '../types';
import { ANNOTATION_META } from '../types';
import { store } from '../store';
import { createAnnotation, readContext } from '../annotator/create';

const TYPES: AnnotationType[] = ['deletion', 'substitution', 'highlight', 'comment', 'insertion'];

let menu: HTMLDivElement | null = null;

/** 根据 selection 位置定位并显示浮动菜单 */
export function showSelectionMenu(rect: DOMRect): void {
  if (!store.state.source) return;
  if (!menu) {
    menu = document.createElement('div');
    menu.className = 'sel-menu';
    for (const t of TYPES) {
      const meta = ANNOTATION_META[t];
      const btn = document.createElement('button');
      btn.className = `sel-menu-btn sel-menu-${t}`;
      btn.title = meta.title;
      btn.innerHTML = `<span class="btn-icon">${meta.icon}</span><span class="btn-label">${meta.label}</span>`;
      btn.addEventListener('mousedown', (e) => {
        // 阻止选区丢失
        e.preventDefault();
      });
      btn.addEventListener('click', () => {
        createAnnotation(t, readContext());
      });
      menu.appendChild(btn);
    }
    document.body.appendChild(menu);
  }

  menu.style.display = 'flex';
  // 定位：选区上方居中；空间不足则放下方
  const menuWidth = 260;
  const gap = 8;
  let top = rect.top - gap - 44;
  if (top < window.scrollY + 8) top = rect.bottom + gap;
  let left = rect.left + rect.width / 2 - menuWidth / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
  menu.style.top = `${top + window.scrollY}px`;
  menu.style.left = `${left + window.scrollX}px`;
}

export function hideSelectionMenu(): void {
  if (menu) menu.style.display = 'none';
}
