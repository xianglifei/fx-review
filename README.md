# fx-review

> 🌐 在线使用：[review.feixing.io](https://review.feixing.io) ｜ 📖 [English](./README.en.md)

网页版 Markdown 批注审阅工具。拖入本地 Markdown 文件 → 在渲染后的文字上做 CriticMarkup 批注 → 一键复制或下载带批注的全文，交给 AI 修改。无需下载安装，设备无关，部署在 Cloudflare Pages 上。

![fx-review 在线版本截图](docs/screenshot.png)

## 灵感与贡献

本项目受 [easychen/markmark](https://github.com/easychen/markmark) 启发——一个 macOS 原生的 Markdown 阅读器，用 [CriticMarkup](https://criticmarkup.com) 语法做文本批注，再把带批注的全文交给 AI 修改。

**我的创意与贡献**：保留 markmark 的核心创意（CriticMarkup 批注 + 一键交给 AI 的审阅闭环），但把它从原生 App **迁移到纯网页**：

- **零安装**：打开网页即可用，任何设备、任何系统，不挑 Mac/Windows/Linux。
- **文件不出本地**：Markdown 在浏览器内读取与渲染，不上传任何服务器。
- **自研源码偏移映射**：在渲染后的预览里选文字，能反向定位到源 Markdown 的精确字符位置，从而插入标准 CriticMarkup 标记——这是网页版最难的一环。
- **CSS Custom Highlight API 显示**：不修改渲染 DOM，反复批注不会让定位漂移。

与 markmark 的区别：markmark 是 Mac 原生阅读器（含编辑、PDF 导出、Mermaid 等），本项目聚焦"网页端轻量审阅"这一件事，门槛更低、设备无关。

## 定位

**不是 Markdown 编辑器**，而是"阅读 + 文本批注审阅"工具。关注点在文字内容，不在格式——如果 AI 生成的 Markdown 格式有误（标题层级、加粗位置），用评论批注告诉 AI 即可。

## 五种 CriticMarkup 批注

| 类型 | 语法 | 显示 |
|------|------|------|
| 插入 | `{++ 文字 ++}` | 绿色 |
| 删除 | `{-- 文字 --}` | 红色删除线 |
| 替换 | `{~~ 旧 ~> 新 ~~}` | 旧红删除线 → 新绿 |
| 高亮 | `{== 文字 ==}` | 黄色荧光笔 |
| 评论 | `{== 文字 ==}{>> 备注 <<}` | 淡黄波浪线 + 右侧栏 |

## 怎么用

### 1. 打开文件
把本地 `.md` 文件**拖到窗口任意位置**，或点击页面中央的"打开 Markdown 文件"按钮。文件在浏览器本地读取，不会上传。

### 2. 做批注
在渲染后的正文里**选中一段文字**，会同时出现两种操作入口：选区旁边的**浮动圆角菜单**（最快），以及顶部工具栏的 5 个批注按钮。**选中文字后直接按单键**也可以：`D` 删除 / `S` 替换 / `H` 高亮 / `C` 评论 / `I` 插入。

- **删除 / 高亮 / 评论**：选中文字后直接点对应按钮。
- **替换**：选中文字后点"替换"，输入新文字；正文里显示 ~~旧文字~~ → 新文字。
- **插入**：先在正文里点一下定位光标，再点"插入"，输入要新增的文字（绿色显示）。
- **评论**的备注在**右侧栏**里编辑——可以边看正文边写审阅意见，点击条目的 ↗ 可定位回正文。

> 批注不能重叠（CriticMarkup 语法限制）；想改同一段的不同意见，请用"替换"或在相邻位置分别批注。

### 3. 交给 AI
顶部右侧 4 个导出按钮：

- **复制批注** / **下载批注**：仅带 CriticMarkup 标记的全文。
- **复制(含Prompt)** / **下载(含Prompt)**：前置一段引导 Prompt，告诉 AI 如何理解这些标记。快捷键 `⌘/Ctrl + Shift + C`。

复制后粘贴到任意 AI 对话框即可；下载的 `.md` 文件可直接拖给 AI Agent。AI 会读懂 `{-- --}`（删）、`{++ ++}`（增）、`{~~ ~> ~~}`（换）等标记并输出修改后的完整文档。

### 其他
- **撤销 / 重做**：`⌘/Ctrl + Z` 撤销、`⌘/Ctrl + Shift + Z` 重做批注操作，也可用评论栏头部的按钮。
- **自动保存**：批注保存在浏览器本地（localStorage），刷新或重新打开同一文件自动恢复；内容变化则视为新文档。
- **编辑文字**：插入 / 替换批注的文字填错不用删掉重做，评论栏条目上点 ✎ 直接改。
- **清空批注**：一键清除全部批注，恢复原文预览（可撤销）。
- **编辑 Prompt**：自定义"含 Prompt"导出时的引导词，保存在本地浏览器。
- **主题**：右上角切换明暗，默认跟随系统。

## 工作原理

1. 用 markdown-it 渲染 Markdown，自定义渲染规则给每段渲染文本注入 `data-o="srcStart,srcEnd"`，把渲染 DOM 文本节点与源码字符偏移对齐。
2. 选中文字时，通过 `data-o` 反向解析出源码区间。
3. 显示层用 **CSS Custom Highlight API**（`::highlight`）着色，不修改渲染 DOM，因此反复批注不会让偏移漂移；插入类用 `<ins>` 节点点插入。
4. 代码块用 **Shiki** 静态高亮（遇到第一个代码块才按需加载，GitHub Light/Dark 双主题），不参与偏移映射。
5. 导出时按源码偏移降序插入 CriticMarkup 标记，合成完整文本。
6. Service Worker 缓存静态资源，可离线使用；批注存于浏览器 localStorage。

> 浏览器支持：CSS Custom Highlight API 需 Chrome/Edge 105+、Safari 17+、Firefox 140+。不支持时自动降级为 `<mark>` 包裹。

## dsh 插件（DeepSeek Harness 嵌入版）

仓库内的 `dsh-plugin/` 是一个独立的 dsh 插件包 **dsh-fx-review**：把本工具的编辑器核心（`src/editor.ts` 的 Reviewer，与网页版共用同一份代码和样式）嵌进 [dsh](https://github.com/deepseek-ai/deepseek-harness) Web 界面右侧栏的 Markdown 文档预览。模型产出的 `.md` 文件直接在预览里选中文字做批注，一键复制批注全文（可带引导 Prompt）粘回会话，让模型按 CriticMarkup 标记修改——补上「产出 → 审阅 → 修改」闭环里最短的一段。

- 打开 `.md` / `.markdown` / `.mdown` 默认进入批注模式（extension 优先级高于 dsh 内置渲染器；预览头部下拉可随时切回内置 Markdown）。
- 文件一次性整读，批注偏移不因分页漂移；代码块为纯文本（插件不携带 Shiki，控制体积；代码块本就不参与批注定位）。
- 批注按「文件名 + 内容哈希」存在浏览器 localStorage（前缀 `fx-review:embed:`，与网页版互不干扰），同文件重开自动恢复。
- 主题跟随 dsh 明暗；快捷键、浮动菜单、撤销重做、评论栏抽屉与网页版一致。

安装（需重启 dsh 生效）：

```bash
dsh plugin add dsh-fx-review          # npm（发布后）
dsh plugin --profile <name> add link:<本仓库>/dsh-plugin   # 本地开发
```

构建：仓库根 `npm run build:plugin`（单文件 IIFE 产物 `dsh-plugin/lib/client.js`，embed.css 与 markdown-it 内联，React 由 dsh 宿主注入）。详见 [dsh-plugin/README.md](./dsh-plugin/README.md)。

## 开发

```bash
npm install
npm run dev      # 本地开发
npm test         # 运行测试（vitest）
npm run build    # 类型检查 + 产出 dist/
npm run preview  # 预览构建产物
```

## 部署到 Cloudflare Pages

纯静态，无后端。线上域名：**[review.feixing.io](https://review.feixing.io)**（Pages 项目名 `fx-review`，production branch `main`）。

- **CLI**（当前用法）：`npm run deploy`（等价于 `npm run build && wrangler pages deploy dist`）。
- **Git 集成**（可选自动部署）：在 Cloudflare Pages 控制台连接本 GitHub 仓库，配置 Build command `npm run build`、Build output `dist`，之后 push 到 `main` 自动部署。
- **自定义域名**：在 Pages 项目 → Custom domains 添加 `review.feixing.io`，按提示配置 DNS。

## 技术栈

- Vite + TypeScript（原生，无框架）
- markdown-it（渲染）、Shiki（代码高亮，按需加载）
- Cloudflare Pages（静态托管）

## 后续计划（v1 未做）

- Mermaid / PlantUML / KaTeX 渲染
- 多文件 / 标签页

## License

MIT
