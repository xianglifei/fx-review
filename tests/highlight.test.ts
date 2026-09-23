import { describe, it, expect, vi } from 'vitest';
import MarkdownIt from 'markdown-it';
import { installSourceMap, renderMarkdown } from '../src/render/source-map';
import { initCodeHighlight } from '../src/render/highlight';
import type { HighlighterCore } from 'shiki/core';

function buildMd(): MarkdownIt {
  const md = new MarkdownIt({ html: false });
  installSourceMap(md);
  return md;
}

describe('代码高亮 fence 规则', () => {
  it('高亮器未就绪时回退为纯文本（转义 + language- class），并触发懒加载', async () => {
    const md = buildMd();
    const onReady = vi.fn();
    const load = vi.fn().mockReturnValue(new Promise<HighlighterCore>(() => {})); // 永不完成
    initCodeHighlight(md, onReady, load);

    const html = renderMarkdown(md, '```js\nconst a = "<b>";\n```');
    expect(html).toContain('<pre><code class="language-js">');
    expect(html).toContain('&lt;b&gt;'); // 已转义
    expect(load).toHaveBeenCalledTimes(1);

    // 无代码块的文档不触发加载
    renderMarkdown(md, '只有正文，没有 fence');
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('高亮器就绪后使用其输出，并触发 onReady 以便上层重渲染', async () => {
    const md = buildMd();
    const onReady = vi.fn();
    const fake = {
      codeToHtml: (code: string, opts: { lang: string }) =>
        `<pre class="shiki"><code data-lang="${opts.lang}">${code}</code></pre>`,
    } as unknown as HighlighterCore;
    let resolve!: (h: HighlighterCore) => void;
    const load = vi.fn().mockReturnValue(new Promise<HighlighterCore>((r) => (resolve = r)));
    initCodeHighlight(md, onReady, load);

    // 第一次：回退 + 触发加载
    expect(renderMarkdown(md, '```ts\nx\n```')).toContain('language-ts');
    expect(onReady).not.toHaveBeenCalled();

    resolve(fake);
    await vi.waitFor(() => expect(onReady).toHaveBeenCalledTimes(1));

    // 第二次：走高亮输出
    const html = renderMarkdown(md, '```ts\nx\n```');
    expect(html).toContain('class="shiki"');
    expect(html).toContain('data-lang="ts"');
  });

  it('未注册语言回退纯文本而不抛错', async () => {
    const md = buildMd();
    const fake = {
      codeToHtml: () => {
        throw new Error('Language `zzz` is not loaded');
      },
    } as unknown as HighlighterCore;
    initCodeHighlight(md, () => {}, () => Promise.resolve(fake));

    const html = renderMarkdown(md, '```zzz\nplain\n```');
    expect(html).toContain('language-zzz');
    expect(html).toContain('plain');
  });
});
