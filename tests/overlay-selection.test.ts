// @vitest-environment jsdom
// DOM 侧逻辑测试：降级 <mark> 清理、插入显示顺序、选区边界解析。
// jsdom 不支持 CSS Custom Highlight API，renderOverlay 会走降级路径，正好覆盖降级分支。
import { describe, it, expect } from 'vitest';
import { renderOverlay } from '../src/annotator/overlay';
import { resolveSelection } from '../src/annotator/selection';
import type { Annotation, AnnotationType } from '../src/types';

let counter = 0;
function anno(
  type: AnnotationType,
  srcStart: number,
  srcEnd: number,
  extra: Partial<Annotation> = {},
): Annotation {
  counter += 1;
  return { id: `d${counter}`, type, srcStart, srcEnd, quotedText: '', ...extra };
}

function buildPreview(): HTMLElement {
  const preview = document.createElement('article');
  // 两个相邻 token：abc(0-3) def(3-6)，abc 外再包一层 <strong> 模拟行内格式
  preview.innerHTML =
    '<p><strong><span data-o="0,3">abc</span></strong><span data-o="3,6">def</span></p>';
  document.body.appendChild(preview);
  return preview;
}

describe('renderOverlay 降级路径（jsdom 无 Highlight API）', () => {
  it('批注在降级模式下渲染为 mark，且重复重绘不堆积', () => {
    const preview = buildPreview();
    const annos = [anno('deletion', 0, 3), anno('highlight', 3, 6)];

    renderOverlay(preview, annos);
    const first = preview.querySelectorAll('mark.cm-fallback').length;
    expect(first).toBe(2);

    renderOverlay(preview, annos);
    expect(preview.querySelectorAll('mark.cm-fallback').length).toBe(2);

    // 清空批注后 mark 全部还原为纯文本
    renderOverlay(preview, []);
    expect(preview.querySelectorAll('mark.cm-fallback').length).toBe(0);
    expect(preview.querySelector('p')!.textContent).toBe('abcdef');
    preview.remove();
  });

  it('mark 还原后文本节点回到 data-o span 直接子级，偏移结构可继续解析', () => {
    const preview = buildPreview();
    renderOverlay(preview, [anno('deletion', 0, 3)]);
    renderOverlay(preview, []);
    const span = preview.querySelector('span[data-o="0,3"]')!;
    // 还原后 span 的直接子节点应只有文本节点（mark 已展开移除）
    expect(Array.from(span.childNodes).every((n) => n.nodeType === Node.TEXT_NODE)).toBe(true);
    preview.remove();
  });

  it('替换批注在旧文字后插入“→ 新文字”显示节点', () => {
    const preview = buildPreview();
    renderOverlay(preview, [anno('substitution', 0, 3, { replacement: 'XYZ' })]);
    const sub = preview.querySelector('.cm-sub-new')!;
    expect(sub.getAttribute('data-o')).toBe('3,3');
    expect(sub.textContent).toContain('XYZ');
    preview.remove();
  });

  it('同一插入点的多条插入按创建顺序显示（与导出顺序一致）', () => {
    const preview = buildPreview();
    renderOverlay(preview, [
      anno('insertion', 3, 3, { insertedText: '一' }),
      anno('insertion', 3, 3, { insertedText: '二' }),
    ]);
    const ins = Array.from(preview.querySelectorAll('ins.cm-ins'));
    expect(ins.map((n) => n.textContent)).toEqual(['一', '二']);
    preview.remove();
  });

  it('重绘时旧的插入显示节点被清理，不随重绘堆积', () => {
    const preview = buildPreview();
    const annos = [anno('insertion', 3, 3, { insertedText: 'X' })];
    renderOverlay(preview, annos);
    renderOverlay(preview, annos);
    expect(preview.querySelectorAll('ins.cm-ins').length).toBe(1);
    preview.remove();
  });
});

describe('resolveSelection 边界解析', () => {
  it('选区起点落在元素边界（段首为加粗）时能解析到源码偏移', () => {
    const preview = buildPreview();
    const p = preview.querySelector('p')!;
    const secondSpan = preview.querySelector('span[data-o="3,6"]')!;
    const textNode = secondSpan.firstChild as Text;

    // 起点为 (p, 0)：元素节点 + 子节点索引，且首子节点是 <strong>（旧逻辑在此返回 null）
    const range = document.createRange();
    range.setStart(p, 0);
    range.setEnd(textNode, 2);

    const sel = window.getSelection();
    expect(sel).toBeTruthy();
    sel!.removeAllRanges();
    sel!.addRange(range);

    const resolved = resolveSelection(sel!);
    expect(resolved).not.toBeNull();
    expect(resolved!.start).toBe(0); // abc 段首
    expect(resolved!.end).toBe(5); // def 内偏移 2 → 3+2
    preview.remove();
  });

  it('选区终点落在元素末尾边界时锚定到前一个文本节点末尾', () => {
    const preview = buildPreview();
    const p = preview.querySelector('p')!;
    const firstText = preview.querySelector('span[data-o="0,3"]')!.firstChild as Text;

    // 起点在 abc 文本内，终点为 (p, childNodes.length)：元素末尾边界
    const range = document.createRange();
    range.setStart(firstText, 1);
    range.setEnd(p, p.childNodes.length);

    const sel = window.getSelection();
    sel!.removeAllRanges();
    sel!.addRange(range);

    const resolved = resolveSelection(sel!);
    expect(resolved).not.toBeNull();
    expect(resolved!.start).toBe(1);
    expect(resolved!.end).toBe(6); // def 末尾
    preview.remove();
  });
});
