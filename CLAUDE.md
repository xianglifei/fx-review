# fx-review 项目指令

本文件为项目级指令，在本仓库目录下生效，优先级高于全局指令。

## Changelog 要求（强制）

**每次推送到 GitHub（`git push`）之前，必须在 `CHANGELOG.md` 中追加一条本次变更记录。**

- 不论变更大小，只要有 commit 会推到远端，就要写 changelog。
- 格式：遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 风格，最新版本在最上方。
- 每条记录包含：版本号或日期、变更类型（Added / Changed / Fixed / Removed 等）、简明 bullet 说明。
- changelog 与代码改动放在同一次提交里一起 push，不要单独拆一个 changelog 提交。
- 若一次 push 含多个 commit，按最终对外效果合并成一条 changelog 即可。

### 例外
- 纯文档/typo/格式微调、不改变行为且不影响使用方的改动，可省略（但宁写勿漏）。
- 仅本地实验、不 push 的提交无需写。

## 项目背景

fx-review 是受 [easychen/markmark](https://github.com/easychen/markmark) 启发的网页版 Markdown 批注审阅工具。保留 markmark 的核心创意（CriticMarkup 批注 + 一键交给 AI 修改），但迁移到纯网页、部署在 Cloudflare Pages，设备无关、无需安装。

技术栈：Vite + 原生 TypeScript，唯一运行时依赖 `markdown-it`。核心机制见 README“工作原理”与 `src/render/source-map.ts`。

## 测试

- `npm test`（vitest）：`tests/` 下分三组——source-map 偏移对齐、CriticMarkup 导出（`src/export/criticmarkup.ts` 的同位置标记排序是核心不变量，改动时必须保持相邻批注不交错）、DOM 侧降级渲染与选区解析（jsdom 环境）。
- CI（GitHub Actions `.github/workflows/ci.yml`）在 push / PR 时跑 `npm test` + `npm run build`。

## 部署

- 线上域名：`review.feixing.io`（Cloudflare Pages，项目名 `fx-review`，production branch `main`）
- 部署命令：`npm run deploy`（= `npm run build && wrangler pages deploy dist`）
- ⚠️ Pages 项目用 wrangler 直接上传创建，**未连接 GitHub 自动部署**；`git push` 不会触发 Cloudflare 重建，需手动 `npm run deploy`，或在 Cloudflare 控制台连接 GitHub 仓库启用自动部署。
