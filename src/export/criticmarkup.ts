import type { Annotation } from '../types';

/**
 * 把源 Markdown + 批注列表合成为带 CriticMarkup 标记的全文。
 *
 * 统一采用“包裹式”：标记成对插入到源码区间的首尾，原文本保留在中间作为批注内容。
 *   删除   {-- old --}
 *   高亮   {== old ==}
 *   替换   {~~ old ~> new ~~}
 *   评论   {== old ==}{>> note <<}
 *   插入   {++ text ++}（点插入，无原文本）
 *
 * 按偏移降序从后向前插入，避免后插入的标记影响前面位置的偏移。
 * 非重叠由 store.overlaps 保证，因此同位置冲突极少，无需复杂排序。
 */

interface Insertion {
  at: number;
  text: string;
  /** 同位置排序权重：结束标记（闭合）排在开始标记之前，保证嵌套顺序正确 */
  close: boolean;
}

function buildInsertions(annotations: Annotation[]): Insertion[] {
  const ins: Insertion[] = [];
  for (const a of annotations) {
    switch (a.type) {
      case 'insertion': {
        ins.push({ at: a.srcStart, text: `{++ ${a.insertedText ?? ''} ++}`, close: false });
        break;
      }
      case 'deletion': {
        ins.push({ at: a.srcStart, text: `{-- `, close: false });
        ins.push({ at: a.srcEnd, text: ` --}`, close: true });
        break;
      }
      case 'highlight': {
        ins.push({ at: a.srcStart, text: `{== `, close: false });
        ins.push({ at: a.srcEnd, text: ` ==}`, close: true });
        break;
      }
      case 'substitution': {
        const newText = a.replacement ?? '';
        ins.push({ at: a.srcStart, text: `{~~ `, close: false });
        ins.push({ at: a.srcEnd, text: ` ~> ${newText} ~~}`, close: true });
        break;
      }
      case 'comment': {
        const note = (a.comment ?? '').trim();
        ins.push({ at: a.srcStart, text: `{== `, close: false });
        ins.push({ at: a.srcEnd, text: ` ==}{>> ${note} <<}`, close: true });
        break;
      }
    }
  }
  return ins;
}

export function buildAnnotatedSource(source: string, annotations: Annotation[]): string {
  const mapped = annotations.filter((a) => !a.unmapped);
  const unmapped = annotations.filter((a) => a.unmapped);

  const insertions = buildInsertions(mapped);
  // 降序：先处理靠后的位置；同位置时闭合标记先插（使其在打开标记之内）
  insertions.sort((x, y) => {
    if (x.at !== y.at) return y.at - x.at;
    return x.close === y.close ? 0 : x.close ? -1 : 1;
  });

  let out = source;
  for (const ins of insertions) {
    out = out.slice(0, ins.at) + ins.text + out.slice(ins.at);
  }

  if (unmapped.length > 0) {
    out += '\n\n---\n';
    for (const a of unmapped) {
      const quote = (a.quotedText || a.insertedText || a.replacement || '').replace(/\n/g, ' ');
      out += `\n{>> 未能定位到原段落的 ${a.type} 批注：${quote} <<}`;
    }
  }

  return out;
}
