import MarkdownIt from 'markdown-it';

type Token = ReturnType<MarkdownIt['parse']>[number];

/**
 * source-map：给每段渲染文本注入 `data-o="srcStart,srcEnd"`，把渲染 DOM 的文本节点
 * 与源 Markdown 的字符偏移对齐。这样"在预览里选文字"才能反向定位到源码位置插入 CriticMarkup。
 *
 * 原理：markdown-it 的 inline 块 token 自带 `.map`（行号范围）→ 切出该 block 源码；
 * 再顺序遍历其 inline children，用 `token.markup` 跳过格式标记、用 `token.content` 容错匹配文本，
 * 算出每个文本 token 在源码里的绝对 [start,end]。
 */

interface SrcRange {
  start: number;
  end: number;
}

const offsetMap = new WeakMap<Token, SrcRange>();

/** 计算每行起始字符偏移，末尾追加一个哨兵等于 src.length */
function lineStarts(src: string): number[] {
  const starts = [0];
  for (let i = 0; i < src.length; i++) {
    if (src[i] === '\n') starts.push(i + 1);
  }
  starts.push(src.length);
  return starts;
}

/**
 * 转义容错顺序匹配：在 hay 中从 from 附近找 needle。
 * markdown-it 的 text token content 已把反斜杠转义解析掉（`\*` → `*`），
 * 因此源码里可能多出反斜杠。这里逐字符匹配，遇到 hay 中的 `\X` 视为等价于 needle 中的 `X`。
 * 返回 {start, end} 为 hay 中的偏移（含被跳过的反斜杠），找不到返回 null。
 */
function tolerantFind(
  hay: string,
  needle: string,
  from: number,
): { start: number; end: number } | null {
  if (needle === '') return { start: from, end: from };
  for (let i = from; i <= hay.length - 1; i++) {
    let j = 0;
    let k = i;
    while (j < needle.length && k < hay.length) {
      if (hay[k] === '\\' && k + 1 < hay.length && hay[k + 1] === needle[j]) {
        k += 2;
        j++;
        continue;
      }
      if (hay[k] === needle[j]) {
        k++;
        j++;
        continue;
      }
      break;
    }
    if (j === needle.length) return { start: i, end: k };
  }
  return null;
}

/** 跳过 link_close 之后的 `](url)` 部分（url 不产生可选文本，但要推进游标） */
function skipLinkTail(hay: string, from: number): number {
  // from 位于 `]` 之后；若紧跟 `(` 则跳到匹配的 `)`
  if (hay[from] !== '(') return from;
  let depth = 1;
  let k = from + 1;
  while (k < hay.length && depth > 0) {
    if (hay[k] === '(') depth++;
    else if (hay[k] === ')') depth--;
    k++;
  }
  return k; // `)` 之后
}

function alignInline(
  blockSrc: string,
  blockAbsStart: number,
  children: Token[],
): void {
  let cur = 0; // 在 blockSrc 中的游标
  for (const tok of children) {
    switch (tok.type) {
      case 'text': {
        const m = tolerantFind(blockSrc, tok.content, cur);
        if (m) {
          offsetMap.set(tok, {
            start: blockAbsStart + m.start,
            end: blockAbsStart + m.end,
          });
          cur = m.end;
        }
        break;
      }
      case 'code_inline': {
        const bt = blockSrc.indexOf('`', cur);
        if (bt < 0) break;
        const m = tolerantFind(blockSrc, tok.content, bt + 1);
        if (m) {
          offsetMap.set(tok, {
            start: blockAbsStart + m.start,
            end: blockAbsStart + m.end,
          });
          const closeBt = blockSrc.indexOf('`', m.end);
          cur = closeBt >= 0 ? closeBt + 1 : m.end;
        } else {
          cur = bt + 1;
        }
        break;
      }
      case 'softbreak':
      case 'hardbreak': {
        const nl = blockSrc.indexOf('\n', cur);
        if (nl >= 0) {
          offsetMap.set(tok, {
            start: blockAbsStart + nl,
            end: blockAbsStart + nl + 1,
          });
          cur = nl + 1;
        }
        break;
      }
      case 'image': {
        // ![alt](url) — alt 是属性不可选；跳过整段
        const ex = blockSrc.indexOf('![', cur);
        if (ex >= 0) {
          const after = skipLinkTail(
            blockSrc,
            blockSrc.indexOf(']', ex + 2) + 1,
          );
          cur = after > cur ? after : cur;
        }
        break;
      }
      default: {
        // open/close 标记：用 markup 推进游标
        const markup = tok.markup || '';
        if (markup) {
          const m = blockSrc.indexOf(markup, cur);
          if (m >= 0) cur = m + markup.length;
        }
        if (tok.type === 'link_close') {
          cur = skipLinkTail(blockSrc, cur);
        }
      }
    }
  }
}

function computeOffsets(tokens: Token[], src: string): void {
  const starts = lineStarts(src);
  for (const tok of tokens) {
    if (tok.type !== 'inline' || !tok.map || !tok.children) continue;
    const [begin, end] = tok.map;
    const absStart = starts[begin] ?? 0;
    const absEnd = starts[end] ?? src.length;
    const blockSrc = src.slice(absStart, absEnd);
    alignInline(blockSrc, absStart, tok.children);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** 把文本包进 data-o span */
function wrap(content: string, tok: Token): string {
  const r = offsetMap.get(tok);
  const escaped = escapeHtml(content);
  if (!r) return escaped;
  return `<span data-o="${r.start},${r.end}">${escaped}</span>`;
}

/** 按 md 实例记忆安装状态（多实例嵌入时各自都要装上偏移规则） */
const installed = new WeakSet<MarkdownIt>();

export function installSourceMap(md: MarkdownIt): void {
  if (installed.has(md)) return;
  installed.add(md);

  const textRule = md.renderer.rules.text;
  md.renderer.rules.text = (tokens, idx) => {
    const tok = tokens[idx];
    return wrap(tok.content, tok);
  };
  void textRule; // 默认 text 规则仅做 escapeHtml，已被 wrap 完全覆盖

  md.renderer.rules.code_inline = (tokens, idx) => {
    const tok = tokens[idx];
    return `<code>${wrap(tok.content, tok)}</code>`;
  };

  void textRule; // 标记未使用原规则
}

export function renderMarkdown(md: MarkdownIt, src: string): string {
  const tokens = md.parse(src, {});
  computeOffsets(tokens, src);
  return md.renderer.render(tokens, md.options, {});
}
