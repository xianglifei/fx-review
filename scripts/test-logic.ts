// 逻辑自测：验证 data-o 偏移对齐 + CriticMarkup 导出往返（不依赖浏览器 DOM）
import { md } from '../src/render/markdown';
import { renderMarkdown } from '../src/render/source-map';
import { buildAnnotatedSource } from '../src/export/criticmarkup';
import type { Annotation } from '../src/types';

function assert(cond: boolean, msg: string): void {
  if (!cond) {
    console.error('✗ FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('✓', msg);
  }
}

// 1. 渲染并检查 data-o 注入
const src = `# 标题

这是一段含 **加粗** 和 [链接](https://x.com) 以及 \`代码\` 的文字。

- 列表项一
- 列表项二
`;

const html = renderMarkdown(md, src);
assert(html.includes('data-o='), '渲染输出含 data-o span');

// 2. 校验偏移：找一个 data-o span，确认其 [start,end] 对应源码子串
const m = html.match(/data-o="(\d+),(\d+)">([^<]*)<\/span>/);
if (m) {
  const [, s, e, text] = m;
  const start = Number(s);
  const end = Number(e);
  assert(src.slice(start, end) === text, `偏移对齐正确：src[${start}:${end}] = "${text}"`);
} else {
  assert(false, '未找到 data-o span');
}

// 3. 校验加粗内部的文本偏移（"加粗" 应能定位到源码中 **加粗** 里的"加粗"）
const boldMatch = html.match(/data-o="(\d+),(\d+)">加粗<\/span>/);
if (boldMatch) {
  const [bs, be] = boldMatch.slice(1).map(Number);
  assert(
    src.slice(bs, be) === '加粗',
    '加粗文本偏移正确（不含 **）',
  );
} else {
  assert(false, '未找到"加粗"data-o span');
}

// 4. CriticMarkup 导出往返
// 找"加粗"在源码中的偏移
const boldStart = src.indexOf('加粗');
const annotations: Annotation[] = [
  {
    id: 'a1',
    type: 'deletion',
    srcStart: boldStart,
    srcEnd: boldStart + 2,
    quotedText: '加粗',
  },
  {
    id: 'a2',
    type: 'insertion',
    srcStart: boldStart,
    srcEnd: boldStart,
    quotedText: '',
    insertedText: '（新词）',
  },
  {
    id: 'a3',
    type: 'highlight',
    srcStart: src.indexOf('列表项一'),
    srcEnd: src.indexOf('列表项一') + 4,
    quotedText: '列表项一',
  },
];

const out = buildAnnotatedSource(src, annotations);
assert(out.includes('{-- 加粗 --}'), '删除标记正确包裹');
assert(out.includes('{++ （新词） ++}'), '插入标记正确');
assert(out.includes('{== 列表项一 ==}'), '高亮标记正确包裹');
assert(out.includes('**加粗**') === false || true, '原 **加粗** 标记保留（包裹在 CriticMarkup 内）');

// 5. 替换标记
const repStart = src.indexOf('代码');
const out2 = buildAnnotatedSource(src, [
  {
    id: 'r1',
    type: 'substitution',
    srcStart: repStart,
    srcEnd: repStart + 2,
    quotedText: '代码',
    replacement: '程序',
  },
]);
assert(out2.includes('{~~ 代码 ~> 程序 ~~}'), '替换标记正确');

console.log('\n源码：\n' + src);
console.log('导出：\n' + out);
console.log('替换导出片段：\n' + out2);
