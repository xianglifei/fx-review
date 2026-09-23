import type MarkdownIt from 'markdown-it';
import type { HighlighterCore } from 'shiki/core';

/**
 * 代码高亮：Shiki 静态渲染 fenced code block，双主题输出
 * （github-light 正常色 + --shiki-dark CSS 变量，深色模式由样式表切换）。
 *
 * 集成要点：
 * - fence 内容不是 inline token，本来就不参与 data-o 偏移映射，高亮不影响批注定位；
 * - 懒加载：渲染遇到第一个 fence 才开始动态 import shiki（独立 chunk），
 *   就绪前用纯文本回退，就绪后回调触发整页重渲染；
 * - 无代码块的文档零成本；
 * - 状态保存在本函数的闭包里（每个 md 实例独立）。
 */

export type LoadHighlighter = () => Promise<HighlighterCore>;

/**
 * 初始化代码高亮。`load` 必须显式传入：网页壳传 shiki 懒加载器
 * （见 render/shiki-loader.ts），嵌入构建（dsh 插件）不携带 shiki，
 * 传一个永不完成的加载器即可让代码块保持纯文本回退。
 */
export function initCodeHighlight(
  md: MarkdownIt,
  onReady: () => void,
  load: LoadHighlighter,
): void {
  let highlighter: HighlighterCore | null = null;
  let loading = false;

  md.renderer.rules.fence = (tokens, idx) => {
    const tok = tokens[idx];
    const lang = ((tok.info || '').trim().split(/\s+/)[0] ?? '').toLowerCase();

    if (highlighter && lang) {
      try {
        return highlighter.codeToHtml(tok.content, {
          lang,
          themes: { light: 'github-light', dark: 'github-dark' },
        });
      } catch {
        /* 未注册语言：回退纯文本 */
      }
    } else if (!loading) {
      // 首次遇到代码块才开始加载
      loading = true;
      load()
        .then((h) => {
          highlighter = h;
          onReady();
        })
        .catch(() => {
          /* 加载失败（离线等）：保持纯文本渲染 */
        });
    }

    const cls = lang ? ` class="language-${lang}"` : '';
    return `<pre><code${cls}>${md.utils.escapeHtml(tok.content)}</code></pre>\n`;
  };
}
