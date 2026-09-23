import { describe, it, expect } from 'vitest';
import { buildAnnotatedSource } from '../src/export/criticmarkup';
import type { Annotation } from '../src/types';

let counter = 0;
function anno(
  type: Annotation['type'],
  srcStart: number,
  srcEnd: number,
  extra: Partial<Annotation> = {},
): Annotation {
  counter += 1;
  return {
    id: `t${counter}`,
    type,
    srcStart,
    srcEnd,
    quotedText: '',
    ...extra,
  };
}

describe('buildAnnotatedSource 基础包裹', () => {
  const src = '这是加粗和代码的文字';

  it('删除标记正确包裹', () => {
    const start = src.indexOf('加粗');
    const out = buildAnnotatedSource(src, [anno('deletion', start, start + 2)]);
    expect(out).toBe('这是{-- 加粗 --}和代码的文字');
  });

  it('高亮标记正确包裹', () => {
    const start = src.indexOf('代码');
    const out = buildAnnotatedSource(src, [anno('highlight', start, start + 2)]);
    expect(out).toBe('这是加粗和{== 代码 ==}的文字');
  });

  it('替换标记带新文字', () => {
    const start = src.indexOf('代码');
    const out = buildAnnotatedSource(src, [
      anno('substitution', start, start + 2, { replacement: '程序' }),
    ]);
    expect(out).toBe('这是加粗和{~~ 代码 ~> 程序 ~~}的文字');
  });

  it('插入标记为点插入', () => {
    const at = src.indexOf('和');
    const out = buildAnnotatedSource(src, [
      anno('insertion', at, at, { insertedText: '（新词）' }),
    ]);
    expect(out).toBe('这是加粗{++ （新词） ++}和代码的文字');
  });

  it('评论带备注', () => {
    const start = src.indexOf('加粗');
    const out = buildAnnotatedSource(src, [
      anno('comment', start, start + 2, { comment: '语气太重' }),
    ]);
    expect(out).toBe('这是{== 加粗 ==}{>> 语气太重 <<}和代码的文字');
  });

  it('空评论不导出空备注，退化为纯高亮', () => {
    const start = src.indexOf('加粗');
    const out = buildAnnotatedSource(src, [
      anno('comment', start, start + 2, { comment: '  ' }),
    ]);
    expect(out).toBe('这是{== 加粗 ==}和代码的文字');
    expect(out).not.toContain('{>>');
  });
});

describe('buildAnnotatedSource 同位置标记排序', () => {
  const src = 'abcdef';

  it('相邻批注（前条结束 = 后条开始）不交错嵌套', () => {
    const out = buildAnnotatedSource(src, [
      anno('deletion', 0, 3),
      anno('highlight', 3, 6),
    ]);
    expect(out).toBe('{-- abc --}{== def ==}');
  });

  it('三条相邻批注依次排列', () => {
    const out = buildAnnotatedSource(src, [
      anno('deletion', 0, 2),
      anno('substitution', 2, 4, { replacement: 'XY' }),
      anno('comment', 4, 6, { comment: 'n' }),
    ]);
    expect(out).toBe('{-- ab --}{~~ cd ~> XY ~~}{== ef ==}{>> n <<}');
  });

  it('插入点落在另一批注的结束边界上时紧跟其后', () => {
    const out = buildAnnotatedSource(src, [
      anno('deletion', 0, 3),
      anno('insertion', 3, 3, { insertedText: 'x' }),
    ]);
    expect(out).toBe('{-- abc --}{++ x ++}def');
  });

  it('同一插入点的多条插入按创建顺序排列', () => {
    const out = buildAnnotatedSource(src, [
      anno('insertion', 2, 2, { insertedText: '一' }),
      anno('insertion', 2, 2, { insertedText: '二' }),
    ]);
    expect(out).toBe('ab{++ 一 ++}{++ 二 ++}cdef');
  });

  it('插入点落在批注开始边界上时不破坏其后标记', () => {
    const out = buildAnnotatedSource(src, [
      anno('insertion', 3, 3, { insertedText: 'x' }),
      anno('highlight', 3, 6),
    ]);
    // 插入与高亮开启同点：两个都是“打开”侧，稳定按创建顺序，均不与闭合交错
    expect(out).toBe('abc{++ x ++}{== def ==}');
  });
});

describe('buildAnnotatedSource 用户文本转义', () => {
  const src = 'abcdef';

  it('插入文字含 ++} 时不提前截断插入标记', () => {
    const out = buildAnnotatedSource(src, [
      anno('insertion', 2, 2, { insertedText: '含++}定界符' }),
    ]);
    // 定界符被断开为 "+ +}"，不再与外层 ++} 混淆
    expect(out).toContain('{++ 含+ +}定界符 ++}');
    expect(out).not.toMatch(/\{\+\+ 含\+\+\}/);
  });

  it('替换新文字含 ~~} 与 ~> 时不破坏替换标记', () => {
    const out = buildAnnotatedSource(src, [
      anno('substitution', 0, 2, { replacement: 'a~~}b~>c' }),
    ]);
    // “~~}”→“~ ~}”、“~>”→“~ >”，不再存在完整定界符
    expect(out).toContain('{~~ ab ~> a~ ~}b~ >c ~~}');
  });

  it('评论含 <<} 时不提前闭合备注', () => {
    const out = buildAnnotatedSource(src, [
      anno('comment', 0, 2, { comment: '看<<}这里' }),
    ]);
    expect(out).toContain('{>> 看< <}这里 <<}');
  });

  it('正常文字不受转义影响', () => {
    const out = buildAnnotatedSource(src, [
      anno('insertion', 2, 2, { insertedText: '普通文字 123' }),
    ]);
    expect(out).toContain('{++ 普通文字 123 ++}');
  });
});

describe('buildAnnotatedSource unmapped 降级', () => {
  it('未能定位的批注附加到文末', () => {
    const out = buildAnnotatedSource('abcdef', [
      anno('comment', 0, 2, { comment: 'x', unmapped: true }),
      anno('deletion', 0, 2),
    ]);
    expect(out.startsWith('{-- ab --}cdef')).toBe(true);
    expect(out).toContain('---');
    expect(out).toContain('未能定位到原段落的 comment 批注');
  });
});
