# fx-review

网页版 Markdown 批注审阅工具。拖入本地 Markdown 文件 → 在渲染后的文字上做 CriticMarkup 批注 → 一键复制或下载带批注的全文，交给 AI 修改。

灵感来自 [easychen/markmark](https://github.com/easychen/markmark)（macOS 原生），本项目把它搬到网页：无需下载安装，设备无关，部署在 Cloudflare Pages 上。

## 定位

**不是 Markdown 编辑器**，而是"阅读 + 文本批注审阅"工具。关注点在文字内容，不在格式——如果 AI 生成的 Markdown 格式有误（标题层级、加粗位置），用评论批注告诉 AI 即可。

## 五种 CriticMarkup 批注

| 类型 | 语法 | 显示 |
|------|------|------|
| 插入 | `{++ 文字 ++}` | 绿色 |
| 删除 | `{-- 文字 --}` | 红色删除线 |
| 替换 | `{~~ 旧 ~> 新 ~~}` | 旧红删除线 + 新绿 |
| 高亮 | `{== 文字 ==}` | 强调色背景 |
| 评论 | `{== 文字 ==}{>> 备注 <<}` | 淡黄波浪线 + 右侧栏 |

## 用法

- **打开文件**：把 `.md` 拖到窗口任意位置，或点空状态下的"打开 Markdown 文件"。
- **批注**：选中正文文字 → 顶部工具栏按钮，或选区旁弹出的浮动圆角菜单。
  - 插入：先在正文点击一个位置（光标），再点"插入"并输入文字。
  - 评论：选中文字后点"评论"，备注在右侧栏编辑。
- **导出**（4 个按钮）：
  - 复制批注 / 下载批注（仅 CriticMarkup 全文）
  - 复制(含Prompt) / 下载(含Prompt)（前置一段引导 Prompt，⌘/Ctrl+Shift+C 快捷复制）
- **清空批注**：清除全部，恢复原文预览。
- **编辑 Prompt**：自定义"含 Prompt"导出时的引导词（会话内有效）。
- **主题**：跟随系统 / 手动切换明暗。

## 工作原理

1. 用 markdown-it 渲染 Markdown，自定义渲染规则给每段渲染文本注入 `data-o="srcStart,srcEnd"`，把渲染 DOM 文本节点与源码字符偏移对齐。
2. 选中文字时，通过 `data-o` 反向解析出源码区间。
3. 显示层用 **CSS Custom Highlight API**（`::highlight`）着色，不修改渲染 DOM，因此反复批注不会让偏移漂移；插入类用 `<ins>` 节点点插入。
4. 导出时按源码偏移降序插入 CriticMarkup 标记，合成完整文本。

> 浏览器支持：CSS Custom Highlight API 需 Chrome/Edge 105+、Safari 17+、Firefox 140+。不支持时自动降级为 `<mark>` 包裹。

## 开发

```bash
npm install
npm run dev      # 本地开发
npm run build    # 类型检查 + 产出 dist/
npm run preview  # 预览构建产物
```

## 部署到 Cloudflare Pages

纯静态，无后端。

- **Git 集成**（推荐）：把仓库连到 Cloudflare Pages，配置：
  - Build command: `npm run build`
  - Build output directory: `dist`
  - push 到 main 自动部署。
- **CLI**：`npm run deploy`（等价于 `npm run build && wrangler pages deploy dist`）。

## 技术栈

- Vite + TypeScript（原生，无框架）
- markdown-it（唯一运行时依赖）
- Cloudflare Pages（静态托管）

## 后续计划（v1 未做）

- Mermaid / PlantUML / KaTeX 渲染、Prism 代码高亮
- 批注持久化（localStorage / 跨设备同步）
- 多文件 / 标签页
- 移动端适配

## License

MIT
