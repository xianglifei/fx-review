import MarkdownIt from 'markdown-it';
import { installSourceMap } from './source-map';

/**
 * 构造一个注入了 fx-review 渲染规则的 markdown-it 实例。
 * 每个编辑器实例独立持有（渲染规则里带闭包状态，如代码高亮器），
 * 网页壳与嵌入场景都从这里拿实例；`md` 仅为兼容旧导入保留的单例。
 */
export function createMarkdown(): MarkdownIt {
  const md = new MarkdownIt({
    html: false, // 转义原始 HTML，安全（我们是只读预览）
    linkify: true,
    breaks: false,
    typographer: false,
  });

  // GFM：表格、删除线
  md.enable(['table', 'strikethrough']);

  // 链接统一新窗口打开
  const defaultLinkOpen =
    md.renderer.rules.link_open ||
    ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const a = tokens[idx];
    const targetIndex = a.attrIndex('target');
    if (targetIndex < 0) a.attrPush(['target', '_blank']);
    else a.attrs![targetIndex][1] = '_blank';
    const relIndex = a.attrIndex('rel');
    if (relIndex < 0) a.attrPush(['rel', 'noopener noreferrer']);
    return defaultLinkOpen(tokens, idx, options, env, self);
  };

  installSourceMap(md);
  return md;
}

export const md: MarkdownIt = createMarkdown();
