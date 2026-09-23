import { describe, it, expect } from 'vitest';
import { md } from '../src/render/markdown';
import { renderMarkdown } from '../src/render/source-map';

interface Span {
  start: number;
  end: number;
  text: string;
}

/** 渲染并提取全部 data-o span（文档顺序） */
function spans(src: string): Span[] {
  const html = renderMarkdown(md, src);
  const out: Span[] = [];
  const re = /data-o="(\d+),(\d+)">([^<]*)<\/span>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    out.push({ start: Number(m[1]), end: Number(m[2]), text: m[3] });
  }
  return out;
}

function spanOf(src: string, text: string): Span {
  const hit = spans(src).find((s) => s.text === text);
  expect(hit, `应存在 text 为 "${text}" 的 data-o span`).toBeTruthy();
  return hit!;
}

describe('source-map 基础对齐', () => {
  const src = `# 标题\n\n这是含 **加粗** 的文字。\n`;

  it('渲染输出含 data-o span', () => {
    const html = renderMarkdown(md, src);
    expect(html).toContain('data-o=');
  });

  it('普通文本偏移与源码子串一致', () => {
    const sp = spanOf(src, '这是含 ');
    expect(src.slice(sp.start, sp.end)).toBe('这是含 ');
  });

  it('加粗内部文本偏移不含 ** 标记', () => {
    const sp = spanOf(src, '加粗');
    expect(src.slice(sp.start, sp.end)).toBe('加粗');
  });
});

describe('source-map 行内元素对齐', () => {
  it('链接文字偏移指向链接 label，且链接后文本不漂移', () => {
    const src = '前文 [链接文字](https://x.com) 后文';
    const label = spanOf(src, '链接文字');
    expect(src.slice(label.start, label.end)).toBe('链接文字');

    const after = spanOf(src, ' 后文');
    expect(src.slice(after.start, after.end)).toBe(' 后文');
  });

  it('图片不产生可选文本，其后文本偏移不漂移', () => {
    const src = '开头 ![alt 描述](pic.png) 结尾文字';
    const after = spanOf(src, ' 结尾文字');
    expect(src.slice(after.start, after.end)).toBe(' 结尾文字');
  });

  it('行内代码偏移指向反引号内部', () => {
    const src = '代码 `cmd --flag` 示例';
    const code = spanOf(src, 'cmd --flag');
    expect(src.slice(code.start, code.end)).toBe('cmd --flag');
    const after = spanOf(src, ' 示例');
    expect(src.slice(after.start, after.end)).toBe(' 示例');
  });

  it('软换行段落中第二行文本用绝对偏移对齐', () => {
    const src = '第一行文字\n第二行文字';
    const second = spanOf(src, '第二行文字');
    expect(src.slice(second.start, second.end)).toBe('第二行文字');
    expect(second.start).toBeGreaterThan(src.indexOf('\n'));
  });
});

describe('source-map 转义容错', () => {
  it('反斜杠转义文本的区间覆盖转义源码，且后续 token 不漂移', () => {
    const src = '段落一 \\*不是斜体\\* 结尾\n\n段落二正常';
    // 文本 token 内容已把反斜杠解析掉（“*不是斜体*”），区间应覆盖源码中的转义形式
    const esc = spanOf(src, '段落一 *不是斜体* 结尾');
    // 区间从段首开始，覆盖到转义序列结束（含被跳过的反斜杠）
    expect(src.slice(esc.start, esc.end)).toBe('段落一 \\*不是斜体\\* 结尾');

    const p2 = spanOf(src, '段落二正常');
    expect(src.slice(p2.start, p2.end)).toBe('段落二正常');
  });
});

describe('source-map 表格对齐', () => {
  const src = '| 日期 | 天气 |\n|---|---|\n| 9月23日 | **多云** 有阵雨 |\n| 9月24日 | 晬 \\| 晬 |\n\n表格后的段落。\n';

  it('表头与正文单元格文本都有 data-o 且偏移指向源码', () => {
    expect(src.slice(...spanOf(src, '日期').start !== undefined ? [spanOf(src, '日期').start, spanOf(src, '日期').end] : [0, 0])).toBe('日期');
    const cell = spanOf(src, '9月23日');
    expect(src.slice(cell.start, cell.end)).toBe('9月23日');
  });

  it('单元格内加粗文本偏移不含 ** 标记，且同格后续文本不漂移', () => {
    const bold = spanOf(src, '多云');
    expect(src.slice(bold.start, bold.end)).toBe('多云');
    const after = spanOf(src, ' 有阵雨');
    expect(src.slice(after.start, after.end)).toBe(' 有阵雨');
  });

  it('转义竖线单元格（\\|）按字面内容对齐（渲染后 \| 显示为 |）', () => {
    const cell2 = spanOf(src, '晬 | 晬');
    expect(src.slice(cell2.start, cell2.end)).toBe('晬 \\| 晬');
  });

  it('表格后段落的偏移不受表格影响', () => {
    const tail = spanOf(src, '表格后的段落。');
    expect(src.slice(tail.start, tail.end)).toBe('表格后的段落。');
  });
});
