import type { AnnotationType } from '../types';
import { ANNOTATION_META } from '../types';
import type { EditorContext } from './context';

const TYPES: AnnotationType[] = ['deletion', 'substitution', 'highlight', 'comment', 'insertion'];

export interface SelectionMenuApi {
  el: HTMLElement;
  show(rect: DOMRect): void;
  hide(): void;
}

const MENU_WIDTH = 262;
const MENU_HEIGHT = 40;
const GAP = 8;

/** 选区浮动菜单（每实例一个，挂在 .fxr-root 里按选区视口矩形定位） */
export function createSelectionMenu(ed: EditorContext): SelectionMenuApi {
  const menu = document.createElement('div');
  menu.className = 'fxr-sel-menu';
  for (const t of TYPES) {
    const meta = ANNOTATION_META[t];
    const btn = document.createElement('button');
    btn.className = `fxr-sel-menu-btn fxr-sel-menu-${t}`;
    btn.title = `${meta.title}（快捷键 ${meta.key}）`;
    btn.innerHTML = `<span class="fxr-btn-icon">${meta.icon}</span><span class="fxr-btn-label">${meta.label}</span>`;
    // pointerdown + preventDefault：鼠标和触屏都不清选区，且 click 仍会触发
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
    });
    btn.addEventListener('click', () => {
      ed.annotate(t);
    });
    menu.appendChild(btn);
  }
  ed.root.appendChild(menu);

  return {
    el: menu,
    /** rect 为选区的视口矩形；换算到 root 内的绝对坐标（root 不滚动） */
    show(rect: DOMRect): void {
      if (!ed.store.state.source) return;
      const rootRect = ed.root.getBoundingClientRect();
      menu.style.display = 'flex';

      let top = rect.top - rootRect.top - GAP - MENU_HEIGHT;
      if (top < GAP) top = rect.bottom - rootRect.top + GAP;
      let left = rect.left - rootRect.left + rect.width / 2 - MENU_WIDTH / 2;
      left = Math.max(GAP, Math.min(left, rootRect.width - MENU_WIDTH - GAP));
      menu.style.top = `${Math.max(GAP, top)}px`;
      menu.style.left = `${left}px`;
    },
    hide(): void {
      menu.style.display = 'none';
    },
  };
}
