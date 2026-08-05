/**
 * 选区解析：把 DOM 选区反向映射到源 Markdown 的字符偏移。
 * 依赖渲染时注入的 `data-o="srcStart,srcEnd"` span（见 render/source-map.ts）。
 */

export interface SrcPoint {
  start: number;
  end: number;
  quotedText: string;
}

function parseDataO(el: Element | null): [number, number] | null {
  if (!el) return null;
  const v = el.getAttribute('data-o');
  if (!v) return null;
  const [s, e] = v.split(',').map(Number);
  if (Number.isNaN(s) || Number.isNaN(e)) return null;
  return [s, e];
}

/**
 * 计算一个文本节点在其所属 data-o span 的“原始文本”中的字符偏移。
 * 注意：data-o span 内可能被 <ins> 插入节点拆成多个文本节点，
 * 这里只累加“直接子文本节点”的长度（跳过元素子节点，不把 <ins> 的文字算进去），
 * 这样得到的偏移始终对应原始 token 文本，与源码偏移一致。
 */
function charOffsetInSpan(textNode: Text, offsetInNode: number, span: Element): number {
  let acc = 0;
  for (const child of Array.from(span.childNodes)) {
    if (child === textNode) return acc + offsetInNode;
    if (child.nodeType === Node.TEXT_NODE) acc += (child as Text).length;
    // 元素节点（如 <ins>）跳过，不计入原始文本
  }
  return acc + offsetInNode; // 兜底
}

/** 解析选区边界（文本节点 + 偏移）→ 源码绝对偏移 */
function resolvePoint(node: Node, offset: number): number | null {
  let textNode: Text | null = null;
  if (node.nodeType === Node.TEXT_NODE) {
    textNode = node as Text;
  } else {
    // 边界落在元素上：取该偏移处的子文本节点
    const child = node.childNodes[Math.min(offset, node.childNodes.length - 1)];
    if (child && child.nodeType === Node.TEXT_NODE) textNode = child as Text;
  }
  if (!textNode || !textNode.parentElement) return null;

  const span = textNode.parentElement.closest('[data-o]');
  const range = parseDataO(span);
  if (!range) return null;

  const charOffset = charOffsetInSpan(textNode, offset, span!);
  // 插入点型 data-o（如 <ins>，start===end）直接返回点偏移
  if (range[0] === range[1]) return range[0];
  return range[0] + charOffset;
}

/** 把当前 Selection 解析为源码区间；选区为空或无法定位返回 null */
export function resolveSelection(sel: Selection): SrcPoint | null {
  if (sel.isCollapsed || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  const start = resolvePoint(range.startContainer, range.startOffset);
  const end = resolvePoint(range.endContainer, range.endOffset);
  if (start == null || end == null) return null;
  if (start > end) return { start: end, end: start, quotedText: sel.toString() };
  return { start, end, quotedText: sel.toString() };
}

/** 解析光标位置（折叠选区）→ 源码点偏移，用于插入 */
export function resolveCaret(sel: Selection): number | null {
  if (sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  return resolvePoint(range.startContainer, range.startOffset);
}
