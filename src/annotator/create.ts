import type { Annotation, AnnotationType } from '../types';
import type { Store } from '../store';
import { resolveCaret, resolveSelection, type SrcPoint } from './selection';
import { askTextPopover } from '../ui/input-popover';

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `a${Date.now().toString(36)}${idCounter}`;
}

export interface CreateContext {
  /** 当前选区解析结果（非折叠选区）；无则为 null */
  selection: SrcPoint | null;
  /** 当前光标点（折叠选区）；无则为 null */
  caret: number | null;
  /** 选区/光标的屏幕矩形，输入浮层的定位锚点 */
  anchorRect: DOMRect | null;
}

/** 创建批注所需的外部依赖：状态仓库 + 提示通道（每个编辑器实例各一份） */
export interface AnnotatorDeps {
  store: Store;
  notify: (message: string, duration?: number) => void;
}

/** 读取当前 Selection，返回上下文（须在点击按钮时立即调用，选区信息随焦点变化） */
export function readContext(): CreateContext {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) {
    return { selection: null, caret: null, anchorRect: null };
  }
  const anchorRect = sel.getRangeAt(0).getBoundingClientRect();
  if (sel.isCollapsed) {
    return { selection: null, caret: resolveCaret(sel), anchorRect };
  }
  return { selection: resolveSelection(sel), caret: null, anchorRect };
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

/** 校验并返回可用的选区区间；不合法时给出提示并返回 null */
function requireRange(ctx: CreateContext, deps: AnnotatorDeps): SrcPoint | null {
  if (!ctx.selection) {
    deps.notify('请先选中要批注的文字');
    return null;
  }
  if (ctx.selection.start === ctx.selection.end) {
    // 选区落在插入/替换的“新文字”等无源码对应的显示文本上时会解析为零宽区间
    deps.notify('选区未能定位到源码位置，请在正文原文上重新选择');
    return null;
  }
  if (deps.store.overlaps(ctx.selection.start, ctx.selection.end)) {
    deps.notify('该段落已有重叠批注，CriticMarkup 不支持重叠');
    return null;
  }
  return ctx.selection;
}

/** 创建批注的主入口；返回是否成功。插入/替换需浮层输入，为异步 */
export async function createAnnotation(
  type: AnnotationType,
  ctx: CreateContext,
  deps: AnnotatorDeps,
): Promise<boolean> {
  const { store, notify } = deps;
  switch (type) {
    case 'insertion': {
      const point = ctx.caret ?? ctx.selection?.start ?? null;
      if (point == null) {
        notify('请先在正文中点击一个插入位置');
        return false;
      }
      const text = await askTextPopover({
        title: '输入要插入的新文字',
        anchor: ctx.anchorRect,
      });
      if (text == null) return false;
      store.addAnnotation(
        makeAnnotation(type, point, point, '', { insertedText: text }),
      );
      clearSelection();
      return true;
    }
    case 'deletion':
    case 'highlight': {
      const sel = requireRange(ctx, deps);
      if (!sel) return false;
      store.addAnnotation(
        makeAnnotation(type, sel.start, sel.end, sel.quotedText),
      );
      clearSelection();
      return true;
    }
    case 'substitution': {
      const sel = requireRange(ctx, deps);
      if (!sel) return false;
      const replacement = await askTextPopover({
        title: '输入替换后的新文字',
        value: sel.quotedText,
        anchor: ctx.anchorRect,
        allowEmpty: true, // 替换为空 = 删除语义
      });
      if (replacement == null) return false;
      store.addAnnotation(
        makeAnnotation(type, sel.start, sel.end, sel.quotedText, {
          replacement,
        }),
      );
      clearSelection();
      return true;
    }
    case 'comment': {
      const sel = requireRange(ctx, deps);
      if (!sel) return false;
      // 备注先留空，创建后在右侧栏编辑
      store.addAnnotation(
        makeAnnotation(type, sel.start, sel.end, sel.quotedText, {
          comment: '',
        }),
      );
      clearSelection();
      return true;
    }
  }
}
