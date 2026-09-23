# dsh-fx-review

[dsh](https://github.com/deepseek-ai/deepseek-harness)（DeepSeek Harness）Web 界面的插件：把
[fx-review](https://review.feixing.io)（网页版 CriticMarkup 批注审阅工具）嵌进 dsh 右侧栏的
Markdown 文档预览——模型产出的 `.md` 文件直接在预览里选中文字做批注，一键复制带
CriticMarkup 标记的全文交回模型修改，形成「产出 → 审阅 → 修改」闭环。

## 它做什么

- 注册一个 `documentPreviews` 渲染器（extension 优先级，高于内置 Markdown）：
  右侧栏打开 `.md` / `.markdown` / `.mdown` 文件时默认进入批注模式，
  预览头部下拉随时可切回内置 Markdown 渲染器。
- 五种 CriticMarkup 批注：插入 / 删除 / 替换 / 高亮 / 评论；选中文字弹出浮动菜单，
  或单键 D / S / H / C / I；撤销重做、评论栏编辑与定位、编辑导出 Prompt。
- 文件按 `bytes-complete` 一次性读取全文（批注依赖全文字符偏移）。
- 批注按「文件名 + 内容哈希」存浏览器 localStorage（前缀 `fx-review:embed:`，
  与网页版互不干扰）：同一文件重开自动恢复，内容变化视为新文档。
- 主题跟随 dsh（`body[data-ds-dark-theme]`）。
- 导出：复制批注全文 / 复制 Prompt + 批注全文（粘到会话输入框交给模型）。

## 安装

```bash
# npm（发布后）
dsh plugin add dsh-fx-review

# 本地开发
dsh plugin --profile <name> add link:<本目录绝对路径>
```

重启 dsh 生效（运行中的 web 服务不热加载 bundle）。

## 结构

- `src/client.ts` —— dsh 客户端模块入口（`window.__ModuleLoader__.load` 注册，react 由宿主注入）
- `src/register.ts` —— cordis 客户端插件：渲染器元数据 + `sidebar.right.tab.document` keyed slot body
- `src/body.ts` —— React body：解码 content、解析文件名、挂载编辑器
- `../../src/editor.ts` 等 —— 与网页版共用的编辑器核心（仓库根 `src/`）
- `lib/index.js` —— 服务端半层（no-op）
- 构建：`npm run build:plugin`（仓库根，vite IIFE 单文件产物 `lib/client.js`）

## 已知边界

- dsh 的 slot / `documentPreviews` 扩展面是内部契约，大版本改动时插件可能失效：
  表现为 `.md` 回落内置 Markdown 渲染器，不影响其他功能。
- 批注只在浏览器本地持久化，不写回文件、不进会话记录。
- 代码块不做语法高亮（插件不携带 Shiki，控制体积）；代码块内容本就不参与偏移映射、
  不可批注，与网页版一致。
