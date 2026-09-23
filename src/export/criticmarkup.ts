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
 * 按偏移降序从后向前插入；同一偏移上插入多个文本时，后处理者排在左侧，
 * 因此处理顺序必须是目标布局的逆序：
 *   区间打开标记 → 插入标记 → 闭合标记（同级内按创建逆序处理），
 * 最终文本呈 “闭合 | 插入(创建序) | 打开”，相邻批注不会交错嵌套。
 * 非重叠由 store.overlaps 保证。
 */

/** CriticMarkup 全部定界符：用户文本中出现时在首字符后加空格断开，避免破坏标记结构 */
const CM_DELIMS = [
  '{++', '++}', '{--', '--}', '{==', '==}',
  '{~~', '~~}', '{>>', '<<}', '~>',
];

function escapeCm(text: string): string {
  let out = text;
  for (const d of CM_DELIMS) {
    out = out.split(d).join(d[0] + ' ' + d.slice(1));
  }
  return out;
}

/** 同一偏移上的布局层级（数值越大越靠右、越先处理） */
const RANK_CLOSE = 0;
const RANK_INSERT = 1;
const RANK_OPEN = 2;

interface Insertion {
  at: number;
  text: string;
  rank: number;
  /** 创建序号：同级内逆序处理，使最终布局与创建顺序一致 */
  seq: number;
}

function buildInsertions(annotations: Annotation[]): Insertion[] {
  const ins: Insertion[] = [];
  let seq = 0;
  const push = (at: number, text: string, rank: number): void => {
    ins.push({ at, text, rank, seq: seq++ });
  };
  for (const a of annotations) {
    switch (a.type) {
      case 'insertion': {
        push(a.srcStart, `{++ ${escapeCm(a.insertedText ?? '')} ++}`, RANK_INSERT);
        break;
      }
      case 'deletion': {
        push(a.srcStart, `{-- `, RANK_OPEN);
        push(a.srcEnd, ` --}`, RANK_CLOSE);
        break;
      }
      case 'highlight': {
        push(a.srcStart, `{== `, RANK_OPEN);
        push(a.srcEnd, ` ==}`, RANK_CLOSE);
        break;
      }
      case 'substitution': {
        push(a.srcStart, `{~~ `, RANK_OPEN);
        push(a.srcEnd, ` ~> ${escapeCm(a.replacement ?? '')} ~~}`, RANK_CLOSE);
        break;
      }
      case 'comment': {
        const note = escapeCm((a.comment ?? '').trim());
        push(a.srcStart, `{== `, RANK_OPEN);
        push(a.srcEnd, note ? ` ==}{>> ${note} <<}` : ' ==}', RANK_CLOSE);
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
  insertions.sort((x, y) => {
    if (x.at !== y.at) return y.at - x.at; // 靠后的位置先处理
    if (x.rank !== y.rank) return y.rank - x.rank; // 打开 > 插入 > 闭合
    return y.seq - x.seq; // 同级逆创建序处理 → 布局为创建序
  });

  let out = source;
  for (const ins of insertions) {
    out = out.slice(0, ins.at) + ins.text + out.slice(ins.at);
  }

  if (unmapped.length > 0) {
    out += '\n\n---\n';
    for (const a of unmapped) {
      const quote = escapeCm(
        (a.quotedText || a.insertedText || a.replacement || '').replace(/\n/g, ' '),
      );
      out += `\n{>> 未能定位到原段落的 ${a.type} 批注：${quote} <<}`;
    }
  }

  return out;
}
