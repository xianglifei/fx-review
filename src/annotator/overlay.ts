import type { Annotation } from '../types';

/**
 * 显示层：用 CSS Custom Highlight API（::highlight）显示区间类批注，不修改渲染 DOM，
 * 因此 data-o 映射始终保持干净，反复批注不会漂移。
 * 插入/替换的新文字用 <ins> 节点点插入（不包裹既有文本）。
 */

interface DomPoint {
  node: Text;
  offset: number;
}

function parseDataO(el: Element | null): [number, number] | null {
  if (!el) return null;
  const v = el.getAttribute('data-o');
  if (!v) return null;
  const [s, e] = v.split(',').map(Number);
  if (Number.isNaN(s) || Number.isNaN(e)) return null;
  return [s, e];
}

/** 在 data-o span 内，按原始文本字符偏移找到对应的 DOM 文本节点与节点内偏移 */
function findDomPoint(span: Element, charOffset: number): DomPoint | null {
  let acc = 0;
  for (const child of Array.from(span.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const t = child as Text;
      if (charOffset <= acc + t.length) {
        return { node: t, offset: Math.max(0, charOffset - acc) };
      }
      acc += t.length;
    }
    // 元素节点（<ins> 等）跳过
  }
  // 末尾：取最后一个文本节点
  const last = Array.from(span.childNodes).filter(
    (c) => c.nodeType === Node.TEXT_NODE,
  ).pop() as Text | undefined;
  if (last) return { node: last, offset: last.length };
  return null;
}

/** 收集 preview 容器内所有 data-o 元素（按文档顺序）及其源码区间 */
function collectSpans(preview: HTMLElement): { el: Element; s: number; e: number }[] {
  const out: { el: Element; s: number; e: number }[] = [];
  // 仅取文本 span，排除 <ins> 和替换新文字节点（.cm-inserted）
  for (const el of Array.from(preview.querySelectorAll('span[data-o]:not(.cm-inserted)'))) {
    const r = parseDataO(el);
    if (r) out.push({ el, s: r[0], e: r[1] });
  }
  return out;
}

/** 源码偏移 → 该偏移所在的 data-o span 与其中的 DOM 点 */
function sourceToDomPoint(
  preview: HTMLElement,
  offset: number,
): DomPoint | null {
  const spans = collectSpans(preview);
  // 优先找严格包含 offset 的 span
  let hit = spans.find((sp) => sp.s <= offset && offset <= sp.e);
  if (!hit) {
    // 否则取 offset 之前最近的 span 末尾
    const before = spans.filter((sp) => sp.e <= offset).pop();
    if (before) hit = before;
  }
  if (!hit) return null;
  const point = findDomPoint(hit.el, offset - hit.s);
  return point;
}

/** 源码区间 → DOM Range */
function sourceToRange(
  preview: HTMLElement,
  start: number,
  end: number,
): Range | null {
  const sp = sourceToDomPoint(preview, start);
  const ep = sourceToDomPoint(preview, end);
  if (!sp || !ep) return null;
  const r = new Range();
  try {
    r.setStart(sp.node, sp.offset);
    r.setEnd(ep.node, ep.offset);
  } catch {
    return null;
  }
  return r;
}

const RANGE_GROUPS: Record<string, string> = {
  deletion: 'cm-del',
  highlight: 'cm-hl',
  comment: 'cm-comment',
  substitution: 'cm-sub-old',
};

let supportsHighlight = false;
try {
  supportsHighlight = typeof Highlight !== 'undefined' && !!CSS.highlights;
} catch {
  supportsHighlight = false;
}

/** 重绘全部批注的显示 */
export function renderOverlay(preview: HTMLElement, annotations: Annotation[]): void {
  // 清理旧的插入型显示节点（插入/替换新文字），统一用 .cm-inserted 标记，确保全部移除
  preview.querySelectorAll('.cm-inserted').forEach((n) => n.remove());
  preview.normalize();

  if (supportsHighlight) {
    CSS.highlights.clear();
    const buckets: Record<string, Range[]> = {};
    for (const a of annotations) {
      if (a.type === 'insertion') continue; // 插入无区间
      const name = RANGE_GROUPS[a.type];
      if (!name) continue;
      const r = sourceToRange(preview, a.srcStart, a.srcEnd);
      if (!r) continue;
      (buckets[name] ??= []).push(r);
    }
    for (const [name, ranges] of Object.entries(buckets)) {
      const h = new Highlight(...ranges);
      CSS.highlights.set(name, h);
    }
  } else {
    // 不支持 Highlight API 的浏览器：降级为 <mark> 包裹
    for (const a of annotations) {
      if (a.type === 'insertion') continue;
      const r = sourceToRange(preview, a.srcStart, a.srcEnd);
      if (!r) continue;
      const mark = document.createElement('mark');
      mark.className = `cm-fallback cm-fallback-${a.type}`;
      try {
        r.surroundContents(mark);
      } catch {
        surroundAcross(r, mark);
      }
    }
  }

  // 插入型显示节点
  for (const a of annotations) {
    if (a.type === 'insertion') {
      insertDisplayNode(preview, a.srcStart, 'ins', 'cm-ins cm-inserted', a.insertedText ?? '');
    } else if (a.type === 'substitution') {
      // 旧文字已由 cm-sub-old 高亮（红删除线）；在其后插入" → 新文字"
      insertDisplayNode(preview, a.srcEnd, 'span', 'cm-sub-new cm-inserted', a.replacement ?? '', true);
    }
  }
}

function surroundAcross(range: Range, mark: Element): void {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_TEXT,
  );
  let n: Node | null = walker.currentNode;
  while (n) {
    if (range.intersectsNode(n)) nodes.push(n as Text);
    n = walker.nextNode();
  }
  for (const t of nodes) {
    const span = mark.cloneNode(false) as Element;
    t.parentNode?.insertBefore(span, t);
    span.appendChild(t);
  }
}

/**
 * 在源码偏移处插入一个显示节点。
 * withArrow=true 时构造"→ 新文字"结构（替换用），否则直接放纯文本。
 */
function insertDisplayNode(
  preview: HTMLElement,
  offset: number,
  tag: string,
  cls: string,
  text: string,
  withArrow = false,
): void {
  if (!text && !withArrow) return;
  const point = sourceToDomPoint(preview, offset);
  if (!point) return;
  const el = document.createElement(tag);
  el.className = cls;
  el.setAttribute('data-o', `${offset},${offset}`); // 零宽点，便于选区解析跳过
  if (withArrow) {
    const arrow = document.createElement('span');
    arrow.className = 'sub-arrow';
    arrow.textContent = ' → ';
    const newText = document.createElement('span');
    newText.className = 'sub-new-text';
    newText.textContent = text;
    el.appendChild(arrow);
    el.appendChild(newText);
  } else {
    el.textContent = text;
  }
  const range = new Range();
  try {
    range.setStart(point.node, point.offset);
    range.insertNode(el);
  } catch {
    /* ignore */
  }
}

export function highlightApiSupported(): boolean {
  return supportsHighlight;
}

/** 滚动定位到某条批注并短暂闪烁（评论栏点击用） */
export function flashAnnotation(preview: HTMLElement, a: Annotation): void {
  if (a.type === 'insertion') {
    // 定位到插入点
    const point = sourceToDomPoint(preview, a.srcStart);
    if (point) {
      const range = new Range();
      range.setStart(point.node, point.offset);
      range.collapse(true);
      flashRange(range);
    }
    return;
  }
  const r = sourceToRange(preview, a.srcStart, a.srcEnd);
  if (r) flashRange(r);
}

function flashRange(range: Range): void {
  const rect = range.getBoundingClientRect();
  const top = rect.top + window.scrollY - window.innerHeight / 2;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  // 临时绘制一个闪烁高亮（不支持 Highlight API 时仅滚动定位）
  if (supportsHighlight) {
    const h = new Highlight(range);
    const name = 'cm-flash';
    CSS.highlights.set(name, h);
    window.setTimeout(() => CSS.highlights.delete(name), 1200);
  }
}
