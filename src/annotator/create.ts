import type { Annotation, AnnotationType } from '../types';
import { store } from '../store';
import { resolveCaret, resolveSelection, type SrcPoint } from './selection';
import { toast } from '../ui/toast';

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `a${Date.now().toString(36)}${idCounter}`;
}

/** 弹出单行输入框（用 prompt；后续可换成自定义浮层） */
function askText(message: string, defaultValue = ''): string | null {
  return window.prompt(message, defaultValue);
}

export interface CreateContext {
  /** 当前选区解析结果（非折叠选区）；无则为 null */
  selection: SrcPoint | null;
  /** 当前光标点（折叠选区）；无则为 null */
  caret: number | null;
}

/** 读取当前 Selection，返回上下文 */
export function readContext(): CreateContext {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return { selection: null, caret: null };
  if (sel.isCollapsed) {
    return { selection: null, caret: resolveCaret(sel) };
  }
  return { selection: resolveSelection(sel), caret: null };
}

/** 清除当前选区（批注创建后调用，避免浮动菜单残留） */
export function clearSelection(): void {
  window.getSelection()?.removeAllRanges();
}

function makeAnnotation(
  type: AnnotationType,
  start: number,
  end: number,
  quotedText: string,
  extra: Partial<Annotation> = {},
): Annotation {
  return { id: nextId(), type, srcStart: start, srcEnd: end, quotedText, ...extra };
}

/** 创建批注的主入口；返回是否成功 */
export function createAnnotation(type: AnnotationType, ctx: CreateContext): boolean {
  switch (type) {
    case 'insertion': {
      const point = ctx.caret ?? ctx.selection?.start ?? null;
      if (point == null) {
        toast('请先在正文中点击一个插入位置');
        return false;
      }
      const text = askText('输入要插入的新文字：');
      if (!text) return false;
      store.addAnnotation(
        makeAnnotation(type, point, point, '', { insertedText: text }),
      );
      clearSelection();
      return true;
    }
    case 'deletion':
    case 'highlight': {
      if (!ctx.selection) {
        toast('请先选中要批注的文字');
        return false;
      }
      if (store.overlaps(ctx.selection.start, ctx.selection.end)) {
        toast('该段落已有重叠批注，CriticMarkup 不支持重叠');
        return false;
      }
      store.addAnnotation(
        makeAnnotation(type, ctx.selection.start, ctx.selection.end, ctx.selection.quotedText),
      );
      clearSelection();
      return true;
    }
    case 'substitution': {
      if (!ctx.selection) {
        toast('请先选中要替换的文字');
        return false;
      }
      if (store.overlaps(ctx.selection.start, ctx.selection.end)) {
        toast('该段落已有重叠批注，CriticMarkup 不支持重叠');
        return false;
      }
      const replacement = askText('输入替换后的新文字：', ctx.selection.quotedText);
      if (replacement == null) return false;
      store.addAnnotation(
        makeAnnotation(type, ctx.selection.start, ctx.selection.end, ctx.selection.quotedText, {
          replacement,
        }),
      );
      clearSelection();
      return true;
    }
    case 'comment': {
      if (!ctx.selection) {
        toast('请先选中要评论的文字');
        return false;
      }
      if (store.overlaps(ctx.selection.start, ctx.selection.end)) {
        toast('该段落已有重叠批注，CriticMarkup 不支持重叠');
        return false;
      }
      // 备注先留空，创建后在右侧栏编辑
      store.addAnnotation(
        makeAnnotation(type, ctx.selection.start, ctx.selection.end, ctx.selection.quotedText, {
          comment: '',
        }),
      );
      clearSelection();
      return true;
    }
  }
}
