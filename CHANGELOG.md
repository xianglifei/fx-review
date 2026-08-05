# Changelog

本文件记录 fx-review 所有对外变更。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [0.1.5] - 2026-08-05

### Changed
- 替换 README 截图为新版（`docs/screenshot.png`）。

## [0.1.4] - 2026-08-05

### Added
- 新增英文版 `README.en.md`；中文版（默认 `README.md`）顶部增加英文版链接，英文版顶部回链中文版。

## [0.1.3] - 2026-08-05

### Added
- README 在"灵感与贡献"前增加在线版本截图（`docs/screenshot.png`）。

## [0.1.2] - 2026-08-05

### Changed
- README 新增"灵感与贡献"章节（说明源自 easychen/markmark，核心创意保留、迁移到网页）、完整使用教程、正式域名 `review.feixing.io`。
- 高亮与替换的显示描述同步更新（黄色荧光笔、替换箭头样式）。

### Added
- 新增 `CLAUDE.md`：项目指令，规定每次推送到 GitHub 前必须更新本 CHANGELOG。
- 新增 `CHANGELOG.md` 并补记 0.1.0 / 0.1.1 历史。

## [0.1.1] - 2026-08-05

### Fixed
- **评论输入丢焦点**：评论备注改用 `store.setComment` 静默更新，不再触发评论栏 DOM 重建，输入框不再失焦。
- **替换新文字重复堆积**：插入型显示节点统一用 `.cm-inserted` 类清理。此前替换新文字节点为 `<ins class="cm-sub-new">`，而清理选择器误写成 `span.cm-sub-new`，导致旧节点无法清除、每次重渲染堆积一份。

### Changed
- **替换样式增强**：替换的旧文字现在用红删除线高亮（`cm-sub-old`），并在其后插入“→ 新文字”（绿色），与右侧栏样式一致。
- **高亮配色**：高亮背景由蓝色改为常见的黄色荧光笔效果（light/dark 各一套）。

## [0.1.0] - 2026-08-05

### Added
- 首个可用版本：网页版 Markdown 批注审阅工具，部署于 Cloudflare Pages。
- 五种 CriticMarkup 批注：插入 / 删除 / 替换 / 高亮 / 评论。
- 拖放或按钮打开本地 `.md` 文件，markdown-it 渲染只读预览。
- 顶部工具栏 5 个批注按钮 + 选区旁浮动圆角药丸菜单两条入口。
- 右侧评论栏：列出全部批注，评论备注可内联编辑，点击定位闪烁。
- 四个导出动作：复制批注 / 下载批注 / 复制(含Prompt) / 下载(含Prompt)，支持 ⌘/Ctrl+Shift+C 快捷键。
- 可编辑中文引导 Prompt、清空批注、light/dark 主题。
- 核心机制：自定义 markdown-it 渲染注入 `data-o` 源码偏移映射；CSS Custom Highlight API 显示批注（不修改渲染 DOM），不支持时降级 `<mark>`。
- 逻辑自测脚本 `scripts/test-logic.ts`。
