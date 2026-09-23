# Changelog

本文件记录 fx-review 所有对外变更。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [Unreleased]

### Added

- **表格内容可批注（网页版与 dsh 插件同时受益）**：此前偏移映射只覆盖带行号 map 的块级 token，而 markdown-it 的表格单元格 inline token 不带 map——表格里的文字从未真正可批注（选区端点落不进任何 data-o span，五种操作全部报「请先选中要批注的文字」）。现在 source-map 感知表格行（`tr_open` 的行号 map + 行源码按未转义竖线切格），对每个单元格做与段落同一套的 inline 对齐；支持单元格内加粗/行内代码/转义竖线 `\|`。代码块（fence）仍不参与批注（内容非 inline token，维持既有说明）。

## [Unreleased]

### Fixed

- **dsh 插件评论条目占高异常（大片空白）**：dsh 文档预览容器自带 `white-space: pre-wrap`（为纯文本预览设计），插件组件继承后 innerHTML 模板里的缩进换行被渲染成大段空白，每条批注被撑高数倍。修复：`.fxr-root` 显式恢复 `white-space: normal`（需要 pre-wrap 的引用块等自行声明）。
- **评论框无法用输入法输入（每键丢焦点）**：评论备注输入触发的静默更新误走了整列表重绘，正在输入的 textarea 被销毁重建，焦点与输入法组合每键即断。修复：静默更新只做持久化与角标；结构性重绘时保留正在输入的条目节点并显式恢复焦点。

## [Unreleased]

### Added

- **dsh 插件 dsh-fx-review（`dsh-plugin/`）**：把 fx-review 嵌进 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（dsh）Web 界面的右侧栏 Markdown 预览——模型产出的 `.md` 文件直接在预览里选中文字做 CriticMarkup 批注，一键复制（可带引导 Prompt）交回模型修改，形成「产出 → 审阅 → 修改」闭环。extension 优先级接管 `.md`/`.markdown`/`.mdown` 渲染（dsh 预览头部下拉可随时切回内置 Markdown）；文件一次性整读（批注偏移不因分页漂移）；批注按「文件名 + 内容哈希」存 localStorage（前缀 `fx-review:embed:`，与网页版互不干扰）；主题跟随 dsh 明暗；不携带 Shiki（代码块纯文本，控制体积）。安装 `dsh plugin add dsh-fx-review`（或本地 `link:`），构建 `npm run build:plugin`。

### Changed

- **编辑器核心实例化（重构，网页版行为不变）**：新增 `src/editor.ts` 可挂载的 `Reviewer`——状态、渲染、批注、持久化、快捷键、主题自成一体，`destroy()` 后不留任何 DOM/监听/highlight 注册；store、持久化、批注创建、导出动作等去模块单例化（UI 层改为工厂注入依赖），网页壳 `main.ts` 改为薄壳（拖放/空状态/Service Worker 之外全部交给 Reviewer）。
- 组件样式集中到 `src/embed.css`（全部类名加 `fxr-` 前缀、窄布局由媒体查询改为容器查询，适配可变宽的嵌入容器），`styles.css` 只留页面级规则并 `@import`——网页版与 dsh 插件共用同一份样式源。
- CSS Custom Highlight 注册名支持按实例命名空间（同页多实例互不覆盖，dsh 多预览 tab 共存需要）；Shiki 加载器拆到 `render/shiki-loader.ts`，插件构建不再（也无法）引入 Shiki。

## [Unreleased]

### Added

- **dsh 插件「提交」闭环（dsh-fx-review 0.2.0）**：评论栏头部新增「提交」按钮——把引导 Prompt + 带 CriticMarkup 标记的全文作为载荷挂到会话输入框上方（对齐 fi 选区引用的 chip 交互：可展开预览、可移除），用户可在输入框补充要求后正常发送，发送时经 `ConversationController.sendSession` 实例包裹把载荷附加到消息尾部（外层四反引号围栏防嵌套），发送失败载荷随草稿回滚；chip 自动对齐输入卡片左缘并跟随拖宽。dsh 内部契约失效时「提交」自动回落为复制到剪贴板。
- dsh 插件：评论栏宽度可拖拽（左缘手柄，240–640px，双击恢复默认，偏好持久化 localStorage）。
- dsh 插件：窄容器下评论抽屉的浮动入口按钮（📋 · 条数），替代原工具栏上的开关。

### Fixed

- **浮动菜单按钮失灵**（dsh 内实测五键仅删除可用/时灵时不灵）：两处根因——菜单显示链路依赖 `requestAnimationFrame`，宿主窗口被遮挡/后台时 rAF 停摆、菜单不出现或状态滞后；菜单弹出后宿主的焦点管理（输入框等）可能偷走 DOM 选区，点击时读到空选区报「请先选中文字」。修复：选区监听改 `setTimeout(0)` 合并；菜单弹出时快照选区上下文，点击时实时选区为空则回落快照。单键快捷键同样放宽（菜单可见即可触发）。

### Changed

- **dsh 插件去掉顶部工具栏**：预览对齐 dsh 内置 Markdown 渲染器的观感（只留 dsh 自身的 tab 头与渲染器下拉）；批注操作入口收敛为选区浮动菜单 + 评论栏头部图标组（撤销 ↩ / 重做 ↪ / 清空 🗑），网页版工具栏不变。
- 评论栏头部重排：标题 + 计数、图标组、提交按钮、关闭按钮。

## [0.4.0] - 2026-09-22

### Added

- **移动端适配**：≤860px 窄屏下评论栏改为滑出式抽屉（工具栏新增"📋 批注"开关，带条数徽标，含半透明遮罩与 ✕ 关闭）；批注按钮只留图标、间距收窄；`100dvh` 修正移动端地址栏收展时的视口高度。
- **代码高亮（Shiki）**：fenced code block 静态渲染，GitHub Light/Dark 双主题（暗色经 CSS 变量切换）。遇到第一个代码块才懒加载（独立 chunk，无代码文档零成本）；细粒度导入 17 种常用语言 + JS 正则引擎（无 WASM）；未注册语言回退纯文本。代码块不参与 data-o 偏移映射，批注定位不受影响。
- **单键快捷键**：选中正文后按 `D` 删除 / `S` 替换 / `H` 高亮 / `C` 评论 / `I` 插入（与浮动菜单、工具栏等效；焦点在输入框内不触发）。
- **PWA 与分享元信息**：favicon / maskable 图标（SVG）、manifest、Service Worker（静态资源离线缓存；导航请求 network-first 防旧缓存卡版本）、og / Twitter 卡片（含 1200×630 分享图）、apple-touch-icon；theme-color 随明暗主题同步。
- 浮动菜单按钮由 `mousedown` 改为 `pointerdown` 阻止选区丢失（鼠标与触屏统一，click 不受影响）。

### Changed

- 运行时新增依赖 `shiki`（仅懒加载 chunk，主包 gzip 58KB 基本不变）。

## [0.3.0] - 2026-09-22

### Added

- **撤销 / 重做**：`⌘/Ctrl+Z` 撤销、`⌘/Ctrl+Shift+Z` 重做批注操作（新增 / 删除 / 清空 / 编辑文字），评论栏头部新增撤销 / 重做按钮（无可操作时置灰）；焦点在输入框内时保留原生文本撤销。评论备注输入不产生撤销点，避免打断输入。
- **批注持久化**：批注自动保存到 localStorage（`src/persistence.ts`，按「文件名 + 内容哈希」为键），刷新或重新打开同一文件自动恢复并 toast 提示条数；内容变化视为新文档不恢复；清空批注后存储同步删除，刷新不再恢复；最多保留最近 20 份文档，超限自动清理最旧数据。
- **插入 / 替换文字可编辑**：评论栏对应条目新增 ✎ 按钮，直接修改已填的插入文字或替换新文字（可撤销）。
- 自定义引导 Prompt 本地保存，跨会话保留（原为仅会话内有效）。

### Changed

- **插入 / 替换输入改用自定义浮层**（`src/ui/input-popover.ts`）：替换 `window.prompt`，支持多行文本（Shift+Enter 换行）、Enter 确认、Esc / 点击浮层外部取消、输入法组合中的 Enter 不误触确认；浮层定位在选区 / 光标旁，空间不足时翻转到上方。替换输入预填原文字并全选。多行插入文字在正文中按原换行显示（`white-space: pre-wrap`）。
- 测试依赖 jsdom 固定为 25.x（vitest 2.x 的兼容版本；Node 26 上 vitest/jsdom 的全局 localStorage 需在测试内桥接，见 `tests/persistence.test.ts` 注释）。

### Fixed

- 文档存储索引在短时间内多次保存时（时间戳相同）可能裁剪掉最新文档的问题，改为按插入顺序维护索引。

## [0.2.0] - 2026-09-22

### Fixed

- **相邻批注导出交错**：两条批注首尾相接时（前一条结束 = 后一条开始），同一偏移上的标记插入顺序未定义好，导出会交错嵌套（如 `{-- abc{==  --}def ==}`，三条相邻时完全乱掉）。重写同位置排序：按"区间打开 → 插入 → 闭合"的处理顺序 + 同级逆创建序，最终文本呈"闭合 | 插入(创建序) | 打开"，输出干净的 `{-- abc --}{== def ==}`。
- **同一插入点的多条插入反序**：导出与正文显示均为逆创建序，现统一为创建顺序（显示侧由逆序插入实现）。
- **插入点落在批注边界时嵌套进他人标记**：如插入点恰在删除区间末尾时导出为 `{-- abc{++ x ++} --}`，现输出 `{-- abc --}{++ x ++}`。
- **评论栏定位不滚动**：flash 定位原来调用 `window.scrollTo`，但页面滚动容器是 `.preview-wrap`（body 为 `overflow: hidden`），定位只闪高亮不滚动；现查找最近可滚动祖先再滚动。
- **降级模式标记堆积**：不支持 Highlight API 时 `<mark>` 降级节点重绘时不清理、逐层堆积并使选区偏移漂移。现在重绘前先展开还原，且改为"先解析全部区间再统一包裹"，避免同一次重绘内前一条 mark 破坏后一条的偏移解析；共享边界偏移按 start/end 方向归属正确的 span，降级 Range 不再跨 span。
- **段落边界选区解析失败**：选区边界落在元素节点且对应子节点是元素（如段落以加粗/行内代码开头、三击选整段）时直接返回 null，误报"请先选中要批注的文字"。现向子树内寻找首个/末个文本节点锚定，并修正了元素边界把子节点索引误当文本内偏移的问题。

### Changed

- 批注用户文本（插入文字 / 替换新文字 / 评论备注）含 CriticMarkup 定界符（`++}`、`~~}`、`<<}`、`~>` 等）时，导出自动在首字符后加空格断开，避免破坏标记结构；空评论不再导出 `{>>  <<}` 空备注（退化为纯高亮标记）。
- 选区解析为零宽区间时（如选中的是替换"新文字"显示文本）不再创建空批注，改为提示在正文原文上重选。

### Added

- 测试体系迁移到 vitest（`npm test`），新增 `tests/`：source-map 偏移对齐（链接 / 图片 / 行内代码 / 软换行 / 反斜杠转义）、CriticMarkup 导出排序与转义、降级渲染清理、选区边界解析（jsdom）共 31 个用例；`tsconfig` 纳入 tests 目录随 build 类型检查。
- GitHub Actions CI（`.github/workflows/ci.yml`）：push / PR 时运行 `npm test` + `npm run build`。

### Removed

- 旧的 `scripts/test-logic.ts` 手动自测脚本（已由 `tests/` 取代）。

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
