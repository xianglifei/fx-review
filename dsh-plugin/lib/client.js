var no=Object.defineProperty;var ro=(U,S,Q)=>S in U?no(U,S,{enumerable:!0,configurable:!0,writable:!0,value:Q}):U[S]=Q;var C=(U,S,Q)=>ro(U,typeof S!="symbol"?S+"":S,Q);(function(){"use strict";const U=`/* ============================================================
 * fx-review 组件样式（单一来源）
 * - 网页壳：styles.css 里 @import 本文件
 * - dsh 插件：构建时 ?raw 内联进 lib/client.js，启动注入 <style>
 * 全部类名带 fxr- 前缀并挂在 .fxr-root 下；窄布局用容器查询
 * （侧栏 tab 宽度可变，媒体查询只看视口不可用）。
 * ::highlight 名字分两层：网页壳用静态名（本文件底部），
 * 嵌入实例由 editor 按命名空间动态注入规则。
 * ============================================================ */

.fxr-root {
  --fxr-bg: #fafafa;
  --fxr-bg-elev: #ffffff;
  --fxr-bg-soft: #f0f1f3;
  --fxr-border: #e4e6ea;
  --fxr-text: #1f2328;
  --fxr-text-soft: #57606a;
  --fxr-text-mute: #8b949e;
  --fxr-accent: #2563eb;
  --fxr-accent-soft: #dbeafe;

  --cm-del: #d1240f;
  --cm-ins: #1a7f37;
  --cm-ins-bg: rgba(26, 127, 55, 0.12);
  --cm-hl-bg: rgba(255, 235, 59, 0.45);
  --cm-comment-bg: rgba(234, 179, 8, 0.25);
  --cm-comment-line: #b45309;
  --cm-sub-new: #1a7f37;
  --cm-flash: rgba(250, 204, 21, 0.5);

  /* 别名：按钮/面板等基础件直接用短名 */
  --fxr-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: var(--fxr-bg);
  color: var(--fxr-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  container-type: inline-size;
  container-name: fxr;
}

.fxr-root[data-theme='dark'] {
  --fxr-bg: #0d1117;
  --fxr-bg-elev: #161b22;
  --fxr-bg-soft: #21262d;
  --fxr-border: #30363d;
  --fxr-text: #e6edf3;
  --fxr-text-soft: #9198a1;
  --fxr-text-mute: #6e7681;
  --fxr-accent: #58a6ff;
  --fxr-accent-soft: rgba(56, 139, 253, 0.18);

  --cm-del: #f85149;
  --cm-ins: #3fb950;
  --cm-ins-bg: rgba(63, 185, 80, 0.16);
  --cm-hl-bg: rgba(250, 204, 21, 0.32);
  --cm-comment-bg: rgba(212, 175, 55, 0.22);
  --cm-comment-line: #d29922;
  --cm-sub-new: #3fb950;
  --cm-flash: rgba(210, 153, 34, 0.45);
  --fxr-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.fxr-root *,
.fxr-root *::before,
.fxr-root *::after {
  box-sizing: border-box;
}

/* 宿主挂载点（dsh 插件 body 的最外层 div）：撑满 tab body */
.fxr-host {
  height: 100%;
  min-height: 0;
}
.fxr-host .fxr-root {
  height: 100%;
}

/* ===== 工具栏 ===== */
.fxr-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  background: var(--fxr-bg-elev);
  border-bottom: 1px solid var(--fxr-border);
  flex-wrap: wrap;
  flex-shrink: 0;
}
.fxr-brand {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  margin-right: 4px;
}
.fxr-brand-name {
  font-weight: 700;
  font-size: 14px;
}
.fxr-brand-sub {
  font-size: 11px;
  color: var(--fxr-text-mute);
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fxr-btn-group {
  display: flex;
  gap: 4px;
  align-items: center;
}
.fxr-btn-group + .fxr-btn-group {
  padding-left: 10px;
  border-left: 1px solid var(--fxr-border);
}
.fxr-toolbar-tail {
  margin-left: auto;
}
.fxr-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid var(--fxr-border);
  background: var(--fxr-bg-elev);
  color: var(--fxr-text);
  padding: 6px 11px;
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.12s, border-color 0.12s;
}
.fxr-btn:hover:not(:disabled) {
  background: var(--fxr-bg-soft);
  border-color: var(--fxr-text-mute);
}
.fxr-btn:active:not(:disabled) {
  transform: translateY(1px);
}
.fxr-btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.fxr-btn-primary {
  background: var(--fxr-accent);
  border-color: var(--fxr-accent);
  color: #fff;
}
.fxr-btn-primary:hover:not(:disabled) {
  filter: brightness(1.08);
  background: var(--fxr-accent);
}
.fxr-btn-ghost {
  background: transparent;
  border-color: transparent;
  color: var(--fxr-text-soft);
}
.fxr-btn-ghost:hover:not(:disabled) {
  background: var(--fxr-bg-soft);
}
.fxr-btn-export {
  background: var(--fxr-bg-soft);
}
.fxr-btn-anno {
  font-weight: 600;
}
.fxr-btn-anno-insertion {
  color: var(--cm-ins);
}
.fxr-btn-anno-deletion {
  color: var(--cm-del);
}
.fxr-btn-anno-substitution {
  color: var(--fxr-accent);
}
.fxr-btn-anno-highlight {
  color: var(--cm-comment-line);
}
.fxr-btn-anno-comment {
  color: var(--cm-comment-line);
}

/* ===== 工作区 ===== */
.fxr-workspace {
  flex: 1;
  display: flex;
  min-height: 0;
}
.fxr-preview-wrap {
  flex: 1;
  overflow: auto;
  padding: 32px 40px 120px;
  position: relative;
}
.fxr-preview {
  max-width: 780px;
  margin: 0 auto;
  display: none;
}
.fxr-empty {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fxr-empty-line {
  color: var(--fxr-text-mute);
  font-size: 14px;
}

/* ===== 评论栏 ===== */
.fxr-comments-panel {
  width: 320px;
  flex-shrink: 0;
  border-left: 1px solid var(--fxr-border);
  background: var(--fxr-bg-elev);
  display: flex;
  flex-direction: column;
  min-height: 0;
}
/* 抽屉相关默认隐藏（宽容器并排展示；窄容器经容器查询切换） */
.fxr-panel-toggle {
  display: none;
}
.fxr-comments-close {
  display: none;
}
.fxr-drawer-backdrop {
  display: none;
}
.fxr-comments-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--fxr-border);
  font-weight: 600;
  font-size: 13px;
}
.fxr-comments-tools {
  display: flex;
  align-items: center;
  gap: 2px;
}
.fxr-comments-tool {
  background: transparent;
  border: none;
  color: var(--fxr-text-soft);
  cursor: pointer;
  font-size: 12px;
  font-family: inherit;
  padding: 3px 6px;
  border-radius: 4px;
}
.fxr-comments-tool:hover:not(:disabled) {
  background: var(--fxr-bg-soft);
  color: var(--fxr-text);
}
.fxr-comments-tool:disabled {
  opacity: 0.4;
  cursor: default;
}
.fxr-comments-count {
  background: var(--fxr-bg-soft);
  color: var(--fxr-text-soft);
  border-radius: 999px;
  padding: 1px 9px;
  font-size: 12px;
  font-weight: 600;
}
.fxr-comments-list {
  flex: 1;
  overflow: auto;
  padding: 10px;
}
.fxr-comments-empty {
  color: var(--fxr-text-mute);
  font-size: 13px;
  padding: 16px 8px;
  line-height: 1.6;
}
.fxr-comment-entry {
  background: var(--fxr-bg);
  border: 1px solid var(--fxr-border);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
  border-left: 3px solid var(--fxr-text-mute);
}
.fxr-comment-entry-deletion {
  border-left-color: var(--cm-del);
}
.fxr-comment-entry-insertion {
  border-left-color: var(--cm-ins);
}
.fxr-comment-entry-substitution {
  border-left-color: var(--fxr-accent);
}
.fxr-comment-entry-highlight {
  border-left-color: var(--cm-comment-line);
}
.fxr-comment-entry-comment {
  border-left-color: var(--cm-comment-line);
}
.fxr-comment-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.fxr-comment-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 1px 7px;
  border-radius: 999px;
  background: var(--fxr-bg-soft);
  color: var(--fxr-text-soft);
}
.fxr-comment-locate,
.fxr-comment-edit,
.fxr-comment-del {
  background: transparent;
  border: none;
  color: var(--fxr-text-mute);
  cursor: pointer;
  font-size: 13px;
  padding: 2px 4px;
  border-radius: 4px;
}
.fxr-comment-locate {
  margin-left: auto; /* 把定位/编辑/删除按钮组推到行末 */
}
.fxr-comment-locate:hover,
.fxr-comment-edit:hover,
.fxr-comment-del:hover {
  background: var(--fxr-bg-soft);
  color: var(--fxr-text);
}
.fxr-comment-quote {
  font-size: 13px;
  color: var(--fxr-text);
  background: var(--fxr-bg-soft);
  border-radius: 4px;
  padding: 5px 8px;
  line-height: 1.5;
  margin-bottom: 6px;
  max-height: 96px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
}
.fxr-comment-extra {
  font-size: 13px;
}
.fxr-sub-old {
  color: var(--cm-del);
  text-decoration: line-through;
}
.fxr-sub-arrow {
  color: var(--fxr-text-mute);
}
.fxr-sub-new,
.fxr-ins-text {
  color: var(--cm-ins);
  background: var(--cm-ins-bg);
  padding: 0 4px;
  border-radius: 3px;
}
.fxr-comment-note {
  width: 100%;
  min-height: 48px;
  resize: vertical;
  border: 1px solid var(--fxr-border);
  border-radius: 4px;
  background: var(--fxr-bg-elev);
  color: var(--fxr-text);
  padding: 6px 8px;
  font-size: 13px;
  font-family: inherit;
}
.fxr-comment-note:focus {
  outline: none;
  border-color: var(--fxr-accent);
}

/* ===== 浮动选区菜单 ===== */
.fxr-sel-menu {
  position: absolute;
  display: none;
  gap: 2px;
  background: var(--fxr-bg-elev);
  border: 1px solid var(--fxr-border);
  border-radius: 999px;
  padding: 4px;
  box-shadow: var(--fxr-shadow);
  z-index: 40;
}
.fxr-sel-menu-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: var(--fxr-text);
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
}
.fxr-sel-menu-btn:hover {
  background: var(--fxr-bg-soft);
}
.fxr-sel-menu-deletion {
  color: var(--cm-del);
}
.fxr-sel-menu-insertion {
  color: var(--cm-ins);
}
.fxr-sel-menu-substitution {
  color: var(--fxr-accent);
}
.fxr-sel-menu-highlight {
  color: var(--cm-comment-line);
}
.fxr-sel-menu-comment {
  color: var(--cm-comment-line);
}

/* ===== CriticMarkup 显示（降级 mark 与插入节点） ===== */
.fxr-preview mark.cm-fallback {
  border-radius: 2px;
}
.fxr-preview mark.cm-fallback-deletion {
  color: var(--cm-del);
  text-decoration: line-through;
  background: transparent;
}
.fxr-preview mark.cm-fallback-highlight {
  background: var(--cm-hl-bg);
}
.fxr-preview mark.cm-fallback-substitution {
  color: var(--cm-del);
  text-decoration: line-through;
  background: transparent;
}
.fxr-preview mark.cm-fallback-comment {
  background: var(--cm-comment-bg);
  text-decoration: underline wavy var(--cm-comment-line);
}
/* 插入 / 替换新文字（pre-wrap：多行插入文本按原换行显示） */
.fxr-preview ins.cm-ins {
  color: var(--cm-ins);
  background: var(--cm-ins-bg);
  text-decoration: none;
  font-style: normal;
  padding: 0 3px;
  border-radius: 3px;
  white-space: pre-wrap;
}
.fxr-preview .cm-sub-new .sub-arrow {
  color: var(--fxr-text-mute);
}
.fxr-preview .cm-sub-new .sub-new-text {
  color: var(--cm-ins);
  background: var(--cm-ins-bg);
  padding: 0 3px;
  border-radius: 3px;
  white-space: pre-wrap;
}

/* 网页壳（单实例、ns 为空）的静态 ::highlight 名 */
::highlight(cm-del) {
  color: var(--cm-del);
  text-decoration: line-through;
  text-decoration-color: var(--cm-del);
}
::highlight(cm-hl) {
  background-color: var(--cm-hl-bg);
}
::highlight(cm-sub-old) {
  color: var(--cm-del);
  text-decoration: line-through;
  text-decoration-color: var(--cm-del);
}
::highlight(cm-comment) {
  background-color: var(--cm-comment-bg);
  text-decoration: underline wavy var(--cm-comment-line);
}
::highlight(cm-flash) {
  background-color: var(--cm-flash);
}

/* ===== 模态框（Prompt 编辑） ===== */
.fxr-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}
.fxr-modal-box {
  background: var(--fxr-bg-elev);
  border: 1px solid var(--fxr-border);
  border-radius: 12px;
  padding: 20px;
  width: min(560px, 92%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
.fxr-modal-box h3 {
  margin: 0 0 6px;
  font-size: 16px;
}
.fxr-modal-hint {
  margin: 0 0 12px;
  font-size: 12px;
  color: var(--fxr-text-mute);
}
.fxr-prompt-area {
  width: 100%;
  min-height: 200px;
  resize: vertical;
  border: 1px solid var(--fxr-border);
  border-radius: 6px;
  background: var(--fxr-bg);
  color: var(--fxr-text);
  padding: 10px;
  font-size: 13px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  line-height: 1.5;
}
.fxr-prompt-area:focus {
  outline: none;
  border-color: var(--fxr-accent);
}
.fxr-modal-actions {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.fxr-modal-actions-right {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

/* ===== 输入浮层（挂 body，视口定位） ===== */
.fxr-input-popover {
  position: absolute;
  z-index: 90;
  width: 320px;
  background: var(--fxr-bg-elev, #fff);
  border: 1px solid var(--fxr-border, #e4e6ea);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  color: var(--fxr-text, #1f2328);
}
.fxr-input-popover-title {
  font-size: 13px;
  font-weight: 600;
}
.fxr-input-popover-area {
  width: 100%;
  min-height: 60px;
  resize: vertical;
  border: 1px solid var(--fxr-border, #e4e6ea);
  border-radius: 6px;
  background: var(--fxr-bg, #fafafa);
  color: var(--fxr-text, #1f2328);
  padding: 8px;
  font-size: 13px;
  font-family: inherit;
  line-height: 1.5;
}
.fxr-input-popover-area:focus {
  outline: none;
  border-color: var(--fxr-accent, #2563eb);
}
.fxr-input-popover-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.fxr-input-popover-actions .fxr-btn {
  padding: 4px 12px;
  font-size: 12px;
}

/* ===== Toast ===== */
.fxr-toast {
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: var(--fxr-text);
  color: var(--fxr-bg);
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.2s, transform 0.2s;
  pointer-events: none;
  z-index: 70;
  max-width: 320px;
}
.fxr-toast-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== Markdown 排版 ===== */
.fxr-preview {
  font-size: 15px;
  line-height: 1.75;
  color: var(--fxr-text);
}
.fxr-preview h1,
.fxr-preview h2,
.fxr-preview h3,
.fxr-preview h4,
.fxr-preview h5,
.fxr-preview h6 {
  margin: 1.6em 0 0.6em;
  font-weight: 650;
  line-height: 1.3;
}
.fxr-preview h1 {
  font-size: 1.9em;
  border-bottom: 1px solid var(--fxr-border);
  padding-bottom: 0.3em;
}
.fxr-preview h2 {
  font-size: 1.5em;
  border-bottom: 1px solid var(--fxr-border);
  padding-bottom: 0.3em;
}
.fxr-preview h3 {
  font-size: 1.2em;
}
.fxr-preview p {
  margin: 0.6em 0;
}
.fxr-preview a {
  color: var(--fxr-accent);
  text-decoration: none;
}
.fxr-preview a:hover {
  text-decoration: underline;
}
.fxr-preview ul,
.fxr-preview ol {
  padding-left: 1.6em;
  margin: 0.6em 0;
}
.fxr-preview li {
  margin: 0.2em 0;
}
.fxr-preview blockquote {
  margin: 0.8em 0;
  padding: 0.2em 1em;
  border-left: 4px solid var(--fxr-border);
  color: var(--fxr-text-soft);
}
.fxr-preview code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.88em;
  background: var(--fxr-bg-soft);
  padding: 0.15em 0.4em;
  border-radius: 4px;
}
.fxr-preview pre {
  background: var(--fxr-bg-soft);
  border: 1px solid var(--fxr-border);
  border-radius: 8px;
  padding: 14px 16px;
  overflow: auto;
  margin: 0.8em 0;
}
.fxr-preview pre code {
  background: transparent;
  padding: 0;
  font-size: 0.85em;
  line-height: 1.6;
}
.fxr-preview table {
  border-collapse: collapse;
  margin: 0.8em 0;
  display: block;
  overflow: auto;
}
.fxr-preview th,
.fxr-preview td {
  border: 1px solid var(--fxr-border);
  padding: 6px 12px;
}
.fxr-preview th {
  background: var(--fxr-bg-soft);
  font-weight: 600;
}
.fxr-preview img {
  max-width: 100%;
  border-radius: 8px;
}
.fxr-preview hr {
  border: none;
  border-top: 1px solid var(--fxr-border);
  margin: 1.4em 0;
}

/* 选中文本底色（不覆盖 Highlight API） */
.fxr-preview ::selection {
  background: var(--fxr-accent-soft);
}

/* 代码高亮（Shiki 双主题，仅网页壳加载了 shiki） */
.fxr-preview pre.shiki {
  border: none;
}
.fxr-preview pre.shiki code {
  display: block;
  width: max-content;
}
.fxr-root[data-theme='dark'] .shiki,
.fxr-root[data-theme='dark'] .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
}

/* ===== 窄容器（容器查询）：compact 常态、full 视口收窄时同样生效 ===== */
.fxr-compact .fxr-toolbar {
  gap: 6px;
  padding: 6px 10px;
}
.fxr-compact .fxr-btn {
  padding: 7px 9px;
  font-size: 12px;
}
.fxr-compact .fxr-btn-anno .fxr-btn-label {
  display: none;
}
.fxr-compact .fxr-preview-wrap {
  padding: 16px 16px 80px;
}
.fxr-compact .fxr-preview {
  font-size: 14.5px;
}

@container fxr (max-width: 700px) {
  .fxr-btn-anno .fxr-btn-label {
    display: none;
  }
  .fxr-panel-toggle {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .fxr-panel-toggle-count {
    background: var(--fxr-bg-soft);
    border-radius: 999px;
    padding: 0 6px;
    font-size: 11px;
  }
  .fxr-comments-close {
    display: inline-block;
  }
  .fxr-comments-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(88%, 340px);
    max-width: 340px;
    z-index: 45;
    border-left: 1px solid var(--fxr-border);
    box-shadow: -8px 0 24px rgba(0, 0, 0, 0.18);
    transform: translateX(105%);
    transition: transform 0.22s ease;
  }
  .fxr-comments-panel.open {
    transform: none;
  }
  .fxr-drawer-backdrop {
    display: block;
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 44;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }
  .fxr-drawer-backdrop.show {
    opacity: 1;
    pointer-events: auto;
  }
}
`,S="你是一名文本审阅助手。下面是一份带有 CriticMarkup 批注的 Markdown 文档，请根据批注修改文档，并输出修改后的完整 Markdown：\n- `{++ 文字 ++}` 建议插入的新内容\n- `{-- 文字 --}` 建议删除的内容\n- `{~~ 旧 ~> 新 ~~}` 建议把“旧”替换为“新”\n- `{== 文字 ==}` 需重点关注的部分\n- `{>> 备注 <<}` 审阅意见\n\n请保留未批注部分的原始结构，仅按批注调整，输出完整文档。\n\n文档如下：";class te{constructor(){C(this,"state",{fileName:"",source:"",annotations:[],prompt:S});C(this,"listeners",new Set);C(this,"undoStack",[]);C(this,"redoStack",[])}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){for(const e of this.listeners)e()}snapshot(){this.undoStack.push(this.state.annotations),this.undoStack.length>100&&this.undoStack.shift(),this.redoStack=[]}loadFile(e,t,n=[]){this.state={...this.state,fileName:e,source:t,annotations:[...n]},this.undoStack=[],this.redoStack=[],this.notify()}addAnnotation(e){this.snapshot(),this.state={...this.state,annotations:[...this.state.annotations,e]},this.notify()}updateAnnotation(e,t){this.snapshot(),this.state={...this.state,annotations:this.state.annotations.map(n=>n.id===e?{...n,...t}:n)},this.notify()}setComment(e,t){this.state={...this.state,annotations:this.state.annotations.map(n=>n.id===e?{...n,comment:t}:n)}}removeAnnotation(e){this.snapshot(),this.state={...this.state,annotations:this.state.annotations.filter(t=>t.id!==e)},this.notify()}clearAnnotations(){this.snapshot(),this.state={...this.state,annotations:[]},this.notify()}setPrompt(e){this.state={...this.state,prompt:e},this.notify()}overlaps(e,t){return e===t?!1:this.state.annotations.some(n=>n.srcStart===n.srcEnd?!1:e<n.srcEnd&&t>n.srcStart)}get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}undo(){const e=this.undoStack.pop();return e?(this.redoStack.push(this.state.annotations),this.state={...this.state,annotations:e},this.notify(),!0):!1}redo(){const e=this.redoStack.pop();return e?(this.undoStack.push(this.state.annotations),this.state={...this.state,annotations:e},this.notify(),!0):!1}}const pt=new te,bt="fx-review:doc:",xt="fx-review:docs",ne="fx-review:prompt",mt=20,gt=500,kt=["insertion","deletion","substitution","highlight","comment"];function _t(u){let e=2166136261;for(let t=0;t<u.length;t++)e^=u.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0).toString(36)}function yt(u){if(typeof u!="object"||u===null)return!1;const e=u;return typeof e.id=="string"&&typeof e.type=="string"&&kt.includes(e.type)&&typeof e.srcStart=="number"&&typeof e.srcEnd=="number"}function Ct(u){if(!u)return[];try{const e=localStorage.getItem(u);if(!e)return[];const t=JSON.parse(e);return t.version!==1||!Array.isArray(t.annotations)?[]:t.annotations.filter(yt)}catch{return[]}}class re{constructor(e,t={}){C(this,"store");C(this,"prefix");C(this,"indexKey");C(this,"maxDocs");C(this,"saveTimer",0);C(this,"unsubscribe");this.store=e,this.prefix=t.prefix??bt,this.indexKey=t.indexKey??xt,this.maxDocs=t.maxDocs??mt,this.unsubscribe=t.subscribe===!1?null:e.subscribe(()=>this.save())}docKey(e,t){return`${this.prefix}${e}:${_t(t)}`}restore(e,t){return!e||!t?[]:Ct(this.docKey(e,t))}readIndex(){try{const e=localStorage.getItem(this.indexKey),t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(n=>typeof n=="object"&&n!==null&&typeof n.key=="string"):[]}catch{return[]}}touchIndex(e){const t=this.readIndex().filter(r=>r.key!==e);t.push({key:e,savedAt:Date.now()});const n=t.splice(0,Math.max(0,t.length-this.maxDocs));try{localStorage.setItem(this.indexKey,JSON.stringify(t));for(const r of n)localStorage.removeItem(r.key)}catch{}}removeFromIndex(e){try{localStorage.removeItem(e),localStorage.setItem(this.indexKey,JSON.stringify(this.readIndex().filter(t=>t.key!==e)))}catch{}}save(){const{fileName:e,source:t,annotations:n}=this.store.state;if(!e||!t)return;const r=this.docKey(e,t);try{if(n.length===0){this.removeFromIndex(r);return}const o={version:1,annotations:n,savedAt:Date.now()};localStorage.setItem(r,JSON.stringify(o)),this.touchIndex(r)}catch{}}saveSoon(){this.saveTimer&&window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{this.saveTimer=0,this.save()},gt)}dispose(){this.saveTimer&&window.clearTimeout(this.saveTimer),this.unsubscribe?.()}}new re(pt,{subscribe:!1});function Et(u){try{localStorage.setItem(ne,u)}catch{}}function vt(){try{return localStorage.getItem(ne)}catch{return null}}const oe={};function Dt(u){let e=oe[u];if(e)return e;e=oe[u]=[];for(let t=0;t<128;t++){const n=String.fromCharCode(t);e.push(n)}for(let t=0;t<u.length;t++){const n=u.charCodeAt(t);e[n]="%"+("0"+n.toString(16).toUpperCase()).slice(-2)}return e}function G(u,e){typeof e!="string"&&(e=G.defaultChars);const t=Dt(e);return u.replace(/(%[a-f0-9]{2})+/gi,function(n){let r="";for(let o=0,i=n.length;o<i;o+=3){const c=parseInt(n.slice(o+1,o+3),16);if(c<128){r+=t[c];continue}if((c&224)===192&&o+3<i){const a=parseInt(n.slice(o+4,o+6),16);if((a&192)===128){const s=c<<6&1984|a&63;s<128?r+="��":r+=String.fromCharCode(s),o+=3;continue}}if((c&240)===224&&o+6<i){const a=parseInt(n.slice(o+4,o+6),16),s=parseInt(n.slice(o+7,o+9),16);if((a&192)===128&&(s&192)===128){const f=c<<12&61440|a<<6&4032|s&63;f<2048||f>=55296&&f<=57343?r+="���":r+=String.fromCharCode(f),o+=6;continue}}if((c&248)===240&&o+9<i){const a=parseInt(n.slice(o+4,o+6),16),s=parseInt(n.slice(o+7,o+9),16),f=parseInt(n.slice(o+10,o+12),16);if((a&192)===128&&(s&192)===128&&(f&192)===128){let l=c<<18&1835008|a<<12&258048|s<<6&4032|f&63;l<65536||l>1114111?r+="����":(l-=65536,r+=String.fromCharCode(55296+(l>>10),56320+(l&1023))),o+=9;continue}}r+="�"}return r})}G.defaultChars=";/?:@&=+$,#",G.componentChars="";const ie={};function At(u){let e=ie[u];if(e)return e;e=ie[u]=[];for(let t=0;t<128;t++){const n=String.fromCharCode(t);/^[0-9a-z]$/i.test(n)?e.push(n):e.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<u.length;t++)e[u.charCodeAt(t)]=u[t];return e}function uu(u,e,t){typeof e!="string"&&(t=e,e=uu.defaultChars),typeof t>"u"&&(t=!0);const n=At(e);let r="";for(let o=0,i=u.length;o<i;o++){const c=u.charCodeAt(o);if(t&&c===37&&o+2<i&&/^[0-9a-f]{2}$/i.test(u.slice(o+1,o+3))){r+=u.slice(o,o+3),o+=2;continue}if(c<128){r+=n[c];continue}if(c>=55296&&c<=57343){if(c>=55296&&c<=56319&&o+1<i){const a=u.charCodeAt(o+1);if(a>=56320&&a<=57343){r+=encodeURIComponent(u[o]+u[o+1]),o++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(u[o])}return r}uu.defaultChars=";/?:@&=+$,-_.!~*'()#",uu.componentChars="-_.!~*'()";function Fu(u){let e="";return e+=u.protocol||"",e+=u.slashes?"//":"",e+=u.auth?u.auth+"@":"",u.hostname&&u.hostname.indexOf(":")!==-1?e+="["+u.hostname+"]":e+=u.hostname||"",e+=u.port?":"+u.port:"",e+=u.pathname||"",e+=u.search||"",e+=u.hash||"",e}function lu(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const wt=/^([a-z0-9.+-]+:)/i,Ft=/:[0-9]*$/,St=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Tt=["<",">",'"',"`"," ","\r",`
`,"	"],zt=["{","}","|","\\","^","`"].concat(Tt),Mt=["'"].concat(zt),ce=["%","/","?",";","#"].concat(Mt),ae=["/","?","#"],Nt=255,se=/^[+a-z0-9A-Z_-]{0,63}$/,It=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,le={javascript:!0,"javascript:":!0},fe={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Su(u,e){if(u&&u instanceof lu)return u;const t=new lu;return t.parse(u,e),t}lu.prototype.parse=function(u,e){let t,n,r,o=u;if(o=o.trim(),!e&&u.split("#").length===1){const s=St.exec(o);if(s)return this.pathname=s[1],s[2]&&(this.search=s[2]),this}let i=wt.exec(o);if(i&&(i=i[0],t=i.toLowerCase(),this.protocol=i,o=o.substr(i.length)),(e||i||o.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=o.substr(0,2)==="//",r&&!(i&&le[i])&&(o=o.substr(2),this.slashes=!0)),!le[i]&&(r||i&&!fe[i])){let s=-1;for(let d=0;d<ae.length;d++)n=o.indexOf(ae[d]),n!==-1&&(s===-1||n<s)&&(s=n);let f,l;s===-1?l=o.lastIndexOf("@"):l=o.lastIndexOf("@",s),l!==-1&&(f=o.slice(0,l),o=o.slice(l+1),this.auth=f),s=-1;for(let d=0;d<ce.length;d++)n=o.indexOf(ce[d]),n!==-1&&(s===-1||n<s)&&(s=n);s===-1&&(s=o.length),o[s-1]===":"&&s--;const p=o.slice(0,s);o=o.slice(s),this.parseHost(p),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const d=this.hostname.split(/\./);for(let k=0,x=d.length;k<x;k++){const E=d[k];if(E&&!E.match(se)){let b="";for(let m=0,g=E.length;m<g;m++)E.charCodeAt(m)>127?b+="x":b+=E[m];if(!b.match(se)){const m=d.slice(0,k),g=d.slice(k+1),_=E.match(It);_&&(m.push(_[1]),g.unshift(_[2])),g.length&&(o=g.join(".")+o),this.hostname=m.join(".");break}}}}this.hostname.length>Nt&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const c=o.indexOf("#");c!==-1&&(this.hash=o.substr(c),o=o.slice(0,c));const a=o.indexOf("?");return a!==-1&&(this.search=o.substr(a),o=o.slice(0,a)),o&&(this.pathname=o),fe[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this},lu.prototype.parseHost=function(u){let e=Ft.exec(u);e&&(e=e[0],e!==":"&&(this.port=e.substr(1)),u=u.substr(0,u.length-e.length)),u&&(this.hostname=u)};const Bt=Object.freeze(Object.defineProperty({__proto__:null,decode:G,encode:uu,format:Fu,parse:Su},Symbol.toStringTag,{value:"Module"})),de=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,he=/[\0-\x1F\x7F-\x9F]/,Rt=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Tu=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,pe=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,be=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,Lt=Object.freeze(Object.defineProperty({__proto__:null,Any:de,Cc:he,Cf:Rt,P:Tu,S:pe,Z:be},Symbol.toStringTag,{value:"Module"})),qt=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(u=>u.charCodeAt(0))),Pt=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(u=>u.charCodeAt(0)));var zu;const $t=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),Ot=(zu=String.fromCodePoint)!==null&&zu!==void 0?zu:function(u){let e="";return u>65535&&(u-=65536,e+=String.fromCharCode(u>>>10&1023|55296),u=56320|u&1023),e+=String.fromCharCode(u),e};function Ht(u){var e;return u>=55296&&u<=57343||u>1114111?65533:(e=$t.get(u))!==null&&e!==void 0?e:u}var A;(function(u){u[u.NUM=35]="NUM",u[u.SEMI=59]="SEMI",u[u.EQUALS=61]="EQUALS",u[u.ZERO=48]="ZERO",u[u.NINE=57]="NINE",u[u.LOWER_A=97]="LOWER_A",u[u.LOWER_F=102]="LOWER_F",u[u.LOWER_X=120]="LOWER_X",u[u.LOWER_Z=122]="LOWER_Z",u[u.UPPER_A=65]="UPPER_A",u[u.UPPER_F=70]="UPPER_F",u[u.UPPER_Z=90]="UPPER_Z"})(A||(A={}));const jt=32;var $;(function(u){u[u.VALUE_LENGTH=49152]="VALUE_LENGTH",u[u.BRANCH_LENGTH=16256]="BRANCH_LENGTH",u[u.JUMP_TABLE=127]="JUMP_TABLE"})($||($={}));function Mu(u){return u>=A.ZERO&&u<=A.NINE}function Ut(u){return u>=A.UPPER_A&&u<=A.UPPER_F||u>=A.LOWER_A&&u<=A.LOWER_F}function Zt(u){return u>=A.UPPER_A&&u<=A.UPPER_Z||u>=A.LOWER_A&&u<=A.LOWER_Z||Mu(u)}function Gt(u){return u===A.EQUALS||Zt(u)}var w;(function(u){u[u.EntityStart=0]="EntityStart",u[u.NumericStart=1]="NumericStart",u[u.NumericDecimal=2]="NumericDecimal",u[u.NumericHex=3]="NumericHex",u[u.NamedEntity=4]="NamedEntity"})(w||(w={}));var P;(function(u){u[u.Legacy=0]="Legacy",u[u.Strict=1]="Strict",u[u.Attribute=2]="Attribute"})(P||(P={}));class Wt{constructor(e,t,n){this.decodeTree=e,this.emitCodePoint=t,this.errors=n,this.state=w.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=P.Strict}startEntity(e){this.decodeMode=e,this.state=w.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,t){switch(this.state){case w.EntityStart:return e.charCodeAt(t)===A.NUM?(this.state=w.NumericStart,this.consumed+=1,this.stateNumericStart(e,t+1)):(this.state=w.NamedEntity,this.stateNamedEntity(e,t));case w.NumericStart:return this.stateNumericStart(e,t);case w.NumericDecimal:return this.stateNumericDecimal(e,t);case w.NumericHex:return this.stateNumericHex(e,t);case w.NamedEntity:return this.stateNamedEntity(e,t)}}stateNumericStart(e,t){return t>=e.length?-1:(e.charCodeAt(t)|jt)===A.LOWER_X?(this.state=w.NumericHex,this.consumed+=1,this.stateNumericHex(e,t+1)):(this.state=w.NumericDecimal,this.stateNumericDecimal(e,t))}addToNumericResult(e,t,n,r){if(t!==n){const o=n-t;this.result=this.result*Math.pow(r,o)+parseInt(e.substr(t,o),r),this.consumed+=o}}stateNumericHex(e,t){const n=t;for(;t<e.length;){const r=e.charCodeAt(t);if(Mu(r)||Ut(r))t+=1;else return this.addToNumericResult(e,n,t,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(e,n,t,16),-1}stateNumericDecimal(e,t){const n=t;for(;t<e.length;){const r=e.charCodeAt(t);if(Mu(r))t+=1;else return this.addToNumericResult(e,n,t,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(e,n,t,10),-1}emitNumericEntity(e,t){var n;if(this.consumed<=t)return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===A.SEMI)this.consumed+=1;else if(this.decodeMode===P.Strict)return 0;return this.emitCodePoint(Ht(this.result),this.consumed),this.errors&&(e!==A.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,t){const{decodeTree:n}=this;let r=n[this.treeIndex],o=(r&$.VALUE_LENGTH)>>14;for(;t<e.length;t++,this.excess++){const i=e.charCodeAt(t);if(this.treeIndex=Vt(n,r,this.treeIndex+Math.max(1,o),i),this.treeIndex<0)return this.result===0||this.decodeMode===P.Attribute&&(o===0||Gt(i))?0:this.emitNotTerminatedNamedEntity();if(r=n[this.treeIndex],o=(r&$.VALUE_LENGTH)>>14,o!==0){if(i===A.SEMI)return this.emitNamedEntityData(this.treeIndex,o,this.consumed+this.excess);this.decodeMode!==P.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var e;const{result:t,decodeTree:n}=this,r=(n[t]&$.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,r,this.consumed),(e=this.errors)===null||e===void 0||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,t,n){const{decodeTree:r}=this;return this.emitCodePoint(t===1?r[e]&~$.VALUE_LENGTH:r[e+1],n),t===3&&this.emitCodePoint(r[e+2],n),n}end(){var e;switch(this.state){case w.NamedEntity:return this.result!==0&&(this.decodeMode!==P.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case w.NumericDecimal:return this.emitNumericEntity(0,2);case w.NumericHex:return this.emitNumericEntity(0,3);case w.NumericStart:return(e=this.errors)===null||e===void 0||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case w.EntityStart:return 0}}}function xe(u){let e="";const t=new Wt(u,n=>e+=Ot(n));return function(r,o){let i=0,c=0;for(;(c=r.indexOf("&",c))>=0;){e+=r.slice(i,c),t.startEntity(o);const s=t.write(r,c+1);if(s<0){i=c+t.end();break}i=c+s,c=s===0?i+1:i}const a=e+r.slice(i);return e="",a}}function Vt(u,e,t,n){const r=(e&$.BRANCH_LENGTH)>>7,o=e&$.JUMP_TABLE;if(r===0)return o!==0&&n===o?t:-1;if(o){const a=n-o;return a<0||a>=r?-1:u[t+a]-1}let i=t,c=i+r-1;for(;i<=c;){const a=i+c>>>1,s=u[a];if(s<n)i=a+1;else if(s>n)c=a-1;else return u[a+r]}return-1}const me=xe(qt);xe(Pt);function Kt(u,e=P.Legacy){return me(u,e)}function Yt(u){return me(u,P.Strict)}function Jt(u){return Object.prototype.toString.call(u)}function Nu(u){return Jt(u)==="[object String]"}const Xt=Object.prototype.hasOwnProperty;function Qt(u,e){return Xt.call(u,e)}function fu(u){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(n){u[n]=t[n]})}}),u}function ge(u,e,t){return[].concat(u.slice(0,e),t,u.slice(e+1))}function Iu(u){return!(u>=55296&&u<=57343||u>=64976&&u<=65007||(u&65535)===65535||(u&65535)===65534||u>=0&&u<=8||u===11||u>=14&&u<=31||u>=127&&u<=159||u>1114111)}function eu(u){if(u>65535){u-=65536;const e=55296+(u>>10),t=56320+(u&1023);return String.fromCharCode(e,t)}return String.fromCharCode(u)}const ke=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,un=/&([a-z#][a-z0-9]{1,31});/gi,en=new RegExp(ke.source+"|"+un.source,"gi"),tn=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function nn(u,e){if(e.charCodeAt(0)===35&&tn.test(e)){const n=e[1].toLowerCase()==="x"?parseInt(e.slice(2),16):parseInt(e.slice(1),10);return Iu(n)?eu(n):u}const t=Kt(u);return t!==u?t:u}function rn(u){return u.indexOf("\\")<0?u:u.replace(ke,"$1")}function W(u){return u.indexOf("\\")<0&&u.indexOf("&")<0?u:u.replace(en,function(e,t,n){return t||nn(e,n)})}const on=/[&<>"]/,cn=/[&<>"]/g,an={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function sn(u){return an[u]}function O(u){return on.test(u)?u.replace(cn,sn):u}const ln=/[.?*+^$[\]\\(){}|-]/g;function fn(u){return u.replace(ln,"\\$&")}function v(u){switch(u){case 9:case 32:return!0}return!1}function tu(u){if(u>=8192&&u<=8202)return!0;switch(u){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function _e(u){return Tu.test(u)||pe.test(u)}function nu(u){return _e(eu(u))}function ru(u){switch(u){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function du(u){return u=u.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(u=u.replace(/ẞ/g,"ß")),u.toLowerCase().toUpperCase()}function ye(u){return u===32||u===9||u===10||u===13}function hu(u){let e=0;for(;e<u.length&&ye(u.charCodeAt(e));e++);let t=u.length-1;for(;t>=e&&ye(u.charCodeAt(t));t--);return u.slice(e,t+1)}const dn=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:ge,asciiTrim:hu,assign:fu,escapeHtml:O,escapeRE:fn,fromCodePoint:eu,has:Qt,isMdAsciiPunct:ru,isPunctChar:_e,isPunctCharCode:nu,isSpace:v,isString:Nu,isValidEntityCode:Iu,isWhiteSpace:tu,lib:{mdurl:Bt,ucmicro:Lt},normalizeReference:du,unescapeAll:W,unescapeMd:rn},Symbol.toStringTag,{value:"Module"}));function hn(u,e,t){let n,r,o,i;const c=u.posMax,a=u.pos;for(u.pos=e+1,n=1;u.pos<c;){if(o=u.src.charCodeAt(u.pos),o===93&&(n--,n===0)){r=!0;break}if(i=u.pos,u.md.inline.skipToken(u),o===91){if(i===u.pos-1)n++;else if(t)return u.pos=a,-1}}let s=-1;return r&&(s=u.pos),u.pos=a,s}function pn(u,e,t){let n,r=e;const o={ok:!1,pos:0,str:""};if(u.charCodeAt(r)===60){for(r++;r<t;){if(n=u.charCodeAt(r),n===10||n===60)return o;if(n===62)return o.pos=r+1,o.str=W(u.slice(e+1,r)),o.ok=!0,o;if(n===92&&r+1<t){r+=2;continue}r++}return o}let i=0;for(;r<t&&(n=u.charCodeAt(r),!(n===32||n<32||n===127));){if(n===92&&r+1<t){if(u.charCodeAt(r+1)===32)break;r+=2;continue}if(n===40&&(i++,i>32))return o;if(n===41){if(i===0)break;i--}r++}return e===r||i!==0||(o.str=W(u.slice(e,r)),o.pos=r,o.ok=!0),o}function bn(u,e,t,n){let r,o=e;const i={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(n)i.str=n.str,i.marker=n.marker;else{if(o>=t)return i;let c=u.charCodeAt(o);if(c!==34&&c!==39&&c!==40)return i;e++,o++,c===40&&(c=41),i.marker=c}for(;o<t;){if(r=u.charCodeAt(o),r===i.marker)return i.pos=o+1,i.str+=W(u.slice(e,o)),i.ok=!0,i;if(r===40&&i.marker===41)return i;r===92&&o+1<t&&o++,o++}return i.can_continue=!0,i.str+=W(u.slice(e,o)),i}const xn=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:pn,parseLinkLabel:hn,parseLinkTitle:bn},Symbol.toStringTag,{value:"Module"})),B={};B.code_inline=function(u,e,t,n,r){const o=u[e];return"<code"+r.renderAttrs(o)+">"+O(o.content)+"</code>"},B.code_block=function(u,e,t,n,r){const o=u[e];return"<pre"+r.renderAttrs(o)+"><code>"+O(u[e].content)+`</code></pre>
`},B.fence=function(u,e,t,n,r){const o=u[e],i=o.info?W(o.info).trim():"";let c="",a="";if(i){const f=i.split(/(\s+)/g);c=f[0],a=f.slice(2).join("")}let s;if(t.highlight?s=t.highlight(o.content,c,a)||O(o.content):s=O(o.content),s.indexOf("<pre")===0)return s+`
`;if(i){const f=o.attrIndex("class"),l=o.attrs?o.attrs.slice():[];f<0?l.push(["class",t.langPrefix+c]):(l[f]=l[f].slice(),l[f][1]+=" "+t.langPrefix+c);const p={attrs:l};return`<pre><code${r.renderAttrs(p)}>${s}</code></pre>
`}return`<pre><code${r.renderAttrs(o)}>${s}</code></pre>
`},B.image=function(u,e,t,n,r){const o=u[e];return o.attrs[o.attrIndex("alt")][1]=r.renderInlineAsText(o.children,t,n),r.renderToken(u,e,t)},B.hardbreak=function(u,e,t){return t.xhtmlOut?`<br />
`:`<br>
`},B.softbreak=function(u,e,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`},B.text=function(u,e){return O(u[e].content)},B.html_block=function(u,e){return u[e].content},B.html_inline=function(u,e){return u[e].content};function V(){this.rules=fu({},B)}V.prototype.renderAttrs=function(e){let t,n,r;if(!e.attrs)return"";for(r="",t=0,n=e.attrs.length;t<n;t++)r+=" "+O(e.attrs[t][0])+'="'+O(e.attrs[t][1])+'"';return r},V.prototype.renderToken=function(e,t,n){const r=e[t];let o="";if(r.hidden)return"";r.block&&r.nesting!==-1&&t&&e[t-1].hidden&&(o+=`
`),o+=(r.nesting===-1?"</":"<")+r.tag,o+=this.renderAttrs(r),r.nesting===0&&n.xhtmlOut&&(o+=" /");let i=!1;if(r.block&&(i=!0,r.nesting===1&&t+1<e.length)){const c=e[t+1];(c.type==="inline"||c.hidden||c.nesting===-1&&c.tag===r.tag)&&(i=!1)}return o+=i?`>
`:">",o},V.prototype.renderInline=function(u,e,t){let n="";const r=this.rules;for(let o=0,i=u.length;o<i;o++){const c=u[o].type;typeof r[c]<"u"?n+=r[c](u,o,e,t,this):n+=this.renderToken(u,o,e)}return n},V.prototype.renderInlineAsText=function(u,e,t){let n="";for(let r=0,o=u.length;r<o;r++)switch(u[r].type){case"text":n+=u[r].content;break;case"image":n+=this.renderInlineAsText(u[r].children,e,t);break;case"html_inline":case"html_block":n+=u[r].content;break;case"softbreak":case"hardbreak":n+=`
`;break}return n},V.prototype.render=function(u,e,t){let n="";const r=this.rules;for(let o=0,i=u.length;o<i;o++){const c=u[o].type;c==="inline"?n+=this.renderInline(u[o].children,e,t):typeof r[c]<"u"?n+=r[c](u,o,e,t,this):n+=this.renderToken(u,o,e,t)}return n};function F(){this.__rules__=[],this.__cache__=null}F.prototype.__find__=function(u){for(let e=0;e<this.__rules__.length;e++)if(this.__rules__[e].name===u)return e;return-1},F.prototype.__compile__=function(){const u=this,e=[""];u.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(n){e.indexOf(n)<0&&e.push(n)})}),u.__cache__={},e.forEach(function(t){u.__cache__[t]=[],u.__rules__.forEach(function(n){n.enabled&&(t&&n.alt.indexOf(t)<0||u.__cache__[t].push(n.fn))})})},F.prototype.at=function(u,e,t){const n=this.__find__(u),r=t||{};if(n===-1)throw new Error("Parser rule not found: "+u);this.__rules__[n].fn=e,this.__rules__[n].alt=r.alt||[],this.__cache__=null},F.prototype.before=function(u,e,t,n){const r=this.__find__(u),o=n||{};if(r===-1)throw new Error("Parser rule not found: "+u);this.__rules__.splice(r,0,{name:e,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null},F.prototype.after=function(u,e,t,n){const r=this.__find__(u),o=n||{};if(r===-1)throw new Error("Parser rule not found: "+u);this.__rules__.splice(r+1,0,{name:e,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null},F.prototype.push=function(u,e,t){const n=t||{};this.__rules__.push({name:u,enabled:!0,fn:e,alt:n.alt||[]}),this.__cache__=null},F.prototype.enable=function(u,e){Array.isArray(u)||(u=[u]);const t=[];return u.forEach(function(n){const r=this.__find__(n);if(r<0){if(e)return;throw new Error("Rules manager: invalid rule name "+n)}this.__rules__[r].enabled=!0,t.push(n)},this),this.__cache__=null,t},F.prototype.enableOnly=function(u,e){Array.isArray(u)||(u=[u]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(u,e)},F.prototype.disable=function(u,e){Array.isArray(u)||(u=[u]);const t=[];return u.forEach(function(n){const r=this.__find__(n);if(r<0){if(e)return;throw new Error("Rules manager: invalid rule name "+n)}this.__rules__[r].enabled=!1,t.push(n)},this),this.__cache__=null,t},F.prototype.getRules=function(u){return this.__cache__===null&&this.__compile__(),this.__cache__[u]||[]};function M(u,e,t){this.type=u,this.tag=e,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}M.prototype.attrIndex=function(e){if(!this.attrs)return-1;const t=this.attrs;for(let n=0,r=t.length;n<r;n++)if(t[n][0]===e)return n;return-1},M.prototype.attrPush=function(e){this.attrs?this.attrs.push(e):this.attrs=[e]},M.prototype.attrSet=function(e,t){const n=this.attrIndex(e),r=[e,t];n<0?this.attrPush(r):this.attrs[n]=r},M.prototype.attrGet=function(e){const t=this.attrIndex(e);let n=null;return t>=0&&(n=this.attrs[t][1]),n},M.prototype.attrJoin=function(e,t){const n=this.attrIndex(e);n<0?this.attrPush([e,t]):this.attrs[n][1]=this.attrs[n][1]+" "+t};function Ce(u,e,t){this.src=u,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=e}Ce.prototype.Token=M;const mn=/\r\n?|\n/g,gn=/\0/g;function kn(u){let e;e=u.src.replace(mn,`
`),e=e.replace(gn,"�"),u.src=e}function _n(u){let e;u.inlineMode?(e=new u.Token("inline","",0),e.content=u.src,e.map=[0,1],e.children=[],u.tokens.push(e)):u.md.block.parse(u.src,u.md,u.env,u.tokens)}function yn(u){const e=u.tokens;for(let t=0,n=e.length;t<n;t++){const r=e[t];r.type==="inline"&&u.md.inline.parse(r.content,u.md,u.env,r.children)}}function Cn(u){return/^<a[>\s]/i.test(u)}function En(u){return/^<\/a\s*>/i.test(u)}function vn(u){const e=u.tokens;if(u.md.options.linkify)for(let t=0,n=e.length;t<n;t++){if(e[t].type!=="inline"||!u.md.linkify.pretest(e[t].content))continue;let r=e[t].children,o=0;for(let i=r.length-1;i>=0;i--){const c=r[i];if(c.type==="link_close"){for(i--;r[i].level!==c.level&&r[i].type!=="link_open";)i--;continue}if(c.type==="html_inline"&&(Cn(c.content)&&o>0&&o--,En(c.content)&&o++),!(o>0)&&c.type==="text"&&u.md.linkify.test(c.content)){const a=c.content;let s=u.md.linkify.match(a);const f=[];let l=c.level,p=0;s.length>0&&s[0].index===0&&i>0&&r[i-1].type==="text_special"&&(s=s.slice(1));for(let h=0;h<s.length;h++){const d=s[h].url,k=u.md.normalizeLink(d);if(!u.md.validateLink(k))continue;let x=s[h].text;s[h].schema?s[h].schema==="mailto:"&&!/^mailto:/i.test(x)?x=u.md.normalizeLinkText("mailto:"+x).replace(/^mailto:/,""):x=u.md.normalizeLinkText(x):x=u.md.normalizeLinkText("http://"+x).replace(/^http:\/\//,"");const E=s[h].index;if(E>p){const _=new u.Token("text","",0);_.content=a.slice(p,E),_.level=l,f.push(_)}const b=new u.Token("link_open","a",1);b.attrs=[["href",k]],b.level=l++,b.markup="linkify",b.info="auto",f.push(b);const m=new u.Token("text","",0);m.content=x,m.level=l,f.push(m);const g=new u.Token("link_close","a",-1);g.level=--l,g.markup="linkify",g.info="auto",f.push(g),p=s[h].lastIndex}if(p<a.length){const h=new u.Token("text","",0);h.content=a.slice(p),h.level=l,f.push(h)}e[t].children=r=ge(r,i,f)}}}}const Ee=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,Dn=/\((c|tm|r)\)/i,An=/\((c|tm|r)\)/ig,wn={c:"©",r:"®",tm:"™"};function Fn(u,e){return wn[e.toLowerCase()]}function Sn(u){let e=0;for(let t=u.length-1;t>=0;t--){const n=u[t];n.type==="text"&&!e&&(n.content=n.content.replace(An,Fn)),n.type==="link_open"&&n.info==="auto"&&e--,n.type==="link_close"&&n.info==="auto"&&e++}}function Tn(u){let e=0;for(let t=u.length-1;t>=0;t--){const n=u[t];n.type==="text"&&!e&&Ee.test(n.content)&&(n.content=n.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),n.type==="link_open"&&n.info==="auto"&&e--,n.type==="link_close"&&n.info==="auto"&&e++}}function zn(u){let e;if(u.md.options.typographer)for(e=u.tokens.length-1;e>=0;e--)u.tokens[e].type==="inline"&&(Dn.test(u.tokens[e].content)&&Sn(u.tokens[e].children),Ee.test(u.tokens[e].content)&&Tn(u.tokens[e].children))}const Mn=/['"]/,ve=/['"]/g,De="’";function pu(u,e,t,n){u[e]||(u[e]=[]),u[e].push({pos:t,ch:n})}function Nn(u,e){let t="",n=0;e.sort((r,o)=>r.pos-o.pos);for(let r=0;r<e.length;r++){const o=e[r];t+=u.slice(n,o.pos)+o.ch,n=o.pos+1}return t+u.slice(n)}function In(u,e){let t;const n=[],r={};for(let o=0;o<u.length;o++){const i=u[o],c=u[o].level;for(t=n.length-1;t>=0&&!(n[t].level<=c);t--);if(n.length=t+1,i.type!=="text")continue;const a=i.content;let s=0;const f=a.length;u:for(;s<f;){ve.lastIndex=s;const l=ve.exec(a);if(!l)break;let p=!0,h=!0;s=l.index+1;const d=l[0]==="'";let k=32;if(l.index-1>=0)k=a.charCodeAt(l.index-1);else for(t=o-1;t>=0&&!(u[t].type==="softbreak"||u[t].type==="hardbreak");t--)if(u[t].content){k=u[t].content.charCodeAt(u[t].content.length-1);break}let x=32;if(s<f)x=a.charCodeAt(s);else for(t=o+1;t<u.length&&!(u[t].type==="softbreak"||u[t].type==="hardbreak");t++)if(u[t].content){x=u[t].content.charCodeAt(0);break}const E=ru(k)||nu(k),b=ru(x)||nu(x),m=tu(k),g=tu(x);if(g?p=!1:b&&(m||E||(p=!1)),m?h=!1:E&&(g||b||(h=!1)),x===34&&l[0]==='"'&&k>=48&&k<=57&&(h=p=!1),p&&h&&(p=E,h=b),!p&&!h){d&&pu(r,o,l.index,De);continue}if(h)for(t=n.length-1;t>=0;t--){let _=n[t];if(n[t].level<c)break;if(_.single===d&&n[t].level===c){_=n[t];let y,D;d?(y=e.md.options.quotes[2],D=e.md.options.quotes[3]):(y=e.md.options.quotes[0],D=e.md.options.quotes[1]),pu(r,o,l.index,D),pu(r,_.token,_.pos,y),n.length=t;continue u}}p?n.push({token:o,pos:l.index,single:d,level:c}):h&&d&&pu(r,o,l.index,De)}}Object.keys(r).forEach(function(o){u[o].content=Nn(u[o].content,r[o])})}function Bn(u){if(u.md.options.typographer)for(let e=u.tokens.length-1;e>=0;e--)u.tokens[e].type!=="inline"||!Mn.test(u.tokens[e].content)||In(u.tokens[e].children,u)}function Rn(u){let e,t;const n=u.tokens,r=n.length;for(let o=0;o<r;o++){if(n[o].type!=="inline")continue;const i=n[o].children,c=i.length;for(e=0;e<c;e++)i[e].type==="text_special"&&(i[e].type="text");for(e=t=0;e<c;e++)i[e].type==="text"&&e+1<c&&i[e+1].type==="text"?i[e+1].content=i[e].content+i[e+1].content:(e!==t&&(i[t]=i[e]),t++);e!==t&&(i.length=t)}}const Bu=[["normalize",kn],["block",_n],["inline",yn],["linkify",vn],["replacements",zn],["smartquotes",Bn],["text_join",Rn]];function Ru(){this.ruler=new F;for(let u=0;u<Bu.length;u++)this.ruler.push(Bu[u][0],Bu[u][1])}Ru.prototype.process=function(u){const e=this.ruler.getRules("");for(let t=0,n=e.length;t<n;t++)e[t](u)},Ru.prototype.State=Ce;function R(u,e,t,n){this.src=u,this.md=e,this.env=t,this.tokens=n,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const r=this.src;for(let o=0,i=0,c=0,a=0,s=r.length,f=!1;i<s;i++){const l=r.charCodeAt(i);if(!f)if(v(l)){c++,l===9?a+=4-a%4:a++;continue}else f=!0;(l===10||i===s-1)&&(l!==10&&i++,this.bMarks.push(o),this.eMarks.push(i),this.tShift.push(c),this.sCount.push(a),this.bsCount.push(0),f=!1,c=0,a=0,o=i+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}R.prototype.push=function(u,e,t){const n=new M(u,e,t);return n.block=!0,t<0&&this.level--,n.level=this.level,t>0&&this.level++,this.tokens.push(n),n},R.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]},R.prototype.skipEmptyLines=function(e){for(let t=this.lineMax;e<t&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e},R.prototype.skipSpaces=function(e){for(let t=this.src.length;e<t;e++){const n=this.src.charCodeAt(e);if(!v(n))break}return e},R.prototype.skipSpacesBack=function(e,t){if(e<=t)return e;for(;e>t;)if(!v(this.src.charCodeAt(--e)))return e+1;return e},R.prototype.skipChars=function(e,t){for(let n=this.src.length;e<n&&this.src.charCodeAt(e)===t;e++);return e},R.prototype.skipCharsBack=function(e,t,n){if(e<=n)return e;for(;e>n;)if(t!==this.src.charCodeAt(--e))return e+1;return e},R.prototype.getLines=function(e,t,n,r){if(e>=t)return"";const o=new Array(t-e);for(let i=0,c=e;c<t;c++,i++){let a=0;const s=this.bMarks[c];let f=s,l;for(c+1<t||r?l=this.eMarks[c]+1:l=this.eMarks[c];f<l&&a<n;){const p=this.src.charCodeAt(f);if(v(p))p===9?a+=4-(a+this.bsCount[c])%4:a++;else if(f-s<this.tShift[c])a++;else break;f++}a>n?o[i]=new Array(a-n+1).join(" ")+this.src.slice(f,l):o[i]=this.src.slice(f,l)}return o.join("")},R.prototype.Token=M;const Ln=65536;function Lu(u,e){const t=u.bMarks[e]+u.tShift[e],n=u.eMarks[e];return u.src.slice(t,n)}function Ae(u){const e=[],t=u.length;let n=0,r=u.charCodeAt(n),o=!1,i=0,c="";for(;n<t;)r===124&&(o?(c+=u.substring(i,n-1),i=n):(e.push(c+u.substring(i,n)),c="",i=n+1)),o=r===92,n++,r=u.charCodeAt(n);return e.push(c+u.substring(i)),e}function qn(u,e,t,n){if(e+2>t)return!1;let r=e+1;if(u.sCount[r]<u.blkIndent||u.sCount[r]-u.blkIndent>=4)return!1;let o=u.bMarks[r]+u.tShift[r];if(o>=u.eMarks[r])return!1;const i=u.src.charCodeAt(o++);if(i!==124&&i!==45&&i!==58||o>=u.eMarks[r])return!1;const c=u.src.charCodeAt(o++);if(c!==124&&c!==45&&c!==58&&!v(c)||i===45&&v(c))return!1;for(;o<u.eMarks[r];){const g=u.src.charCodeAt(o);if(g!==124&&g!==45&&g!==58&&!v(g))return!1;o++}let a=Lu(u,e+1),s=a.split("|");const f=[];for(let g=0;g<s.length;g++){const _=s[g].trim();if(!_){if(g===0||g===s.length-1)continue;return!1}if(!/^:?-+:?$/.test(_))return!1;_.charCodeAt(_.length-1)===58?f.push(_.charCodeAt(0)===58?"center":"right"):_.charCodeAt(0)===58?f.push("left"):f.push("")}if(a=Lu(u,e).trim(),a.indexOf("|")===-1||u.sCount[e]-u.blkIndent>=4)return!1;s=Ae(a),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop();const l=s.length;if(l===0||l!==f.length)return!1;if(n)return!0;const p=u.parentType;u.parentType="table";const h=u.md.block.ruler.getRules("blockquote"),d=u.push("table_open","table",1),k=[e,0];d.map=k;const x=u.push("thead_open","thead",1);x.map=[e,e+1];const E=u.push("tr_open","tr",1);E.map=[e,e+1];for(let g=0;g<s.length;g++){const _=u.push("th_open","th",1);f[g]&&(_.attrs=[["style","text-align:"+f[g]]]);const y=u.push("inline","",0);y.content=s[g].trim(),y.children=[],u.push("th_close","th",-1)}u.push("tr_close","tr",-1),u.push("thead_close","thead",-1);let b,m=0;for(r=e+2;r<t&&!(u.sCount[r]<u.blkIndent);r++){let g=!1;for(let y=0,D=h.length;y<D;y++)if(h[y](u,r,t,!0)){g=!0;break}if(g||(a=Lu(u,r).trim(),!a)||u.sCount[r]-u.blkIndent>=4||(s=Ae(a),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop(),m+=l-s.length,m>Ln))break;if(r===e+2){const y=u.push("tbody_open","tbody",1);y.map=b=[e+2,0]}const _=u.push("tr_open","tr",1);_.map=[r,r+1];for(let y=0;y<l;y++){const D=u.push("td_open","td",1);f[y]&&(D.attrs=[["style","text-align:"+f[y]]]);const I=u.push("inline","",0);I.content=s[y]?s[y].trim():"",I.children=[],u.push("td_close","td",-1)}u.push("tr_close","tr",-1)}return b&&(u.push("tbody_close","tbody",-1),b[1]=r),u.push("table_close","table",-1),k[1]=r,u.parentType=p,u.line=r,!0}function Pn(u,e,t){if(u.sCount[e]-u.blkIndent<4)return!1;let n=e+1,r=n;for(;n<t;){if(u.isEmpty(n)){n++;continue}if(u.sCount[n]-u.blkIndent>=4){n++,r=n;continue}break}u.line=r;const o=u.push("code_block","code",0);return o.content=u.getLines(e,r,4+u.blkIndent,!1)+`
`,o.map=[e,u.line],!0}function $n(u,e,t,n){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4||r+3>o)return!1;const i=u.src.charCodeAt(r);if(i!==126&&i!==96)return!1;let c=r;r=u.skipChars(r,i);let a=r-c;if(a<3)return!1;const s=u.src.slice(c,r),f=u.src.slice(r,o);if(i===96&&f.indexOf(String.fromCharCode(i))>=0)return!1;if(n)return!0;let l=e,p=!1;for(;l++,!(l>=t||(r=c=u.bMarks[l]+u.tShift[l],o=u.eMarks[l],r<o&&u.sCount[l]<u.blkIndent));)if(u.src.charCodeAt(r)===i&&!(u.sCount[l]-u.blkIndent>=4)&&(r=u.skipChars(r,i),!(r-c<a)&&(r=u.skipSpaces(r),!(r<o)))){p=!0;break}a=u.sCount[e],u.line=l+(p?1:0);const h=u.push("fence","code",0);return h.info=f,h.content=u.getLines(e+1,l,a,!0),h.markup=s,h.map=[e,u.line],!0}function On(u,e,t,n){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];const i=u.lineMax;if(u.sCount[e]-u.blkIndent>=4||u.src.charCodeAt(r)!==62)return!1;if(n)return!0;const c=[],a=[],s=[],f=[],l=u.md.block.ruler.getRules("blockquote"),p=u.parentType;u.parentType="blockquote";let h=!1,d;for(d=e;d<t;d++){const m=u.sCount[d]<u.blkIndent;if(r=u.bMarks[d]+u.tShift[d],o=u.eMarks[d],r>=o)break;if(u.src.charCodeAt(r++)===62&&!m){let _=u.sCount[d]+1,y,D;u.src.charCodeAt(r)===32?(r++,_++,D=!1,y=!0):u.src.charCodeAt(r)===9?(y=!0,(u.bsCount[d]+_)%4===3?(r++,_++,D=!1):D=!0):y=!1;let I=_;for(c.push(u.bMarks[d]),u.bMarks[d]=r;r<o;){const j=u.src.charCodeAt(r);if(v(j))j===9?I+=4-(I+u.bsCount[d]+(D?1:0))%4:I++;else break;r++}h=r>=o,a.push(u.bsCount[d]),u.bsCount[d]=u.sCount[d]+1+(y?1:0),s.push(u.sCount[d]),u.sCount[d]=I-_,f.push(u.tShift[d]),u.tShift[d]=r-u.bMarks[d];continue}if(h)break;let g=!1;for(let _=0,y=l.length;_<y;_++)if(l[_](u,d,t,!0)){g=!0;break}if(g){u.lineMax=d,u.blkIndent!==0&&(c.push(u.bMarks[d]),a.push(u.bsCount[d]),f.push(u.tShift[d]),s.push(u.sCount[d]),u.sCount[d]-=u.blkIndent);break}c.push(u.bMarks[d]),a.push(u.bsCount[d]),f.push(u.tShift[d]),s.push(u.sCount[d]),u.sCount[d]=-1}const k=u.blkIndent;u.blkIndent=0;const x=u.push("blockquote_open","blockquote",1);x.markup=">";const E=[e,0];x.map=E,u.md.block.tokenize(u,e,d);const b=u.push("blockquote_close","blockquote",-1);b.markup=">",u.lineMax=i,u.parentType=p,E[1]=u.line;for(let m=0;m<f.length;m++)u.bMarks[m+e]=c[m],u.tShift[m+e]=f[m],u.sCount[m+e]=s[m],u.bsCount[m+e]=a[m];return u.blkIndent=k,!0}function Hn(u,e,t,n){const r=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4)return!1;let o=u.bMarks[e]+u.tShift[e];const i=u.src.charCodeAt(o++);if(i!==42&&i!==45&&i!==95)return!1;let c=1;for(;o<r;){const s=u.src.charCodeAt(o++);if(s!==i&&!v(s))return!1;s===i&&c++}if(c<3)return!1;if(n)return!0;u.line=e+1;const a=u.push("hr","hr",0);return a.map=[e,u.line],a.markup=Array(c+1).join(String.fromCharCode(i)),!0}function we(u,e){const t=u.eMarks[e];let n=u.bMarks[e]+u.tShift[e];const r=u.src.charCodeAt(n++);if(r!==42&&r!==45&&r!==43)return-1;if(n<t){const o=u.src.charCodeAt(n);if(!v(o))return-1}return n}function Fe(u,e){const t=u.bMarks[e]+u.tShift[e],n=u.eMarks[e];let r=t;if(r+1>=n)return-1;let o=u.src.charCodeAt(r++);if(o<48||o>57)return-1;for(;;){if(r>=n)return-1;if(o=u.src.charCodeAt(r++),o>=48&&o<=57){if(r-t>=10)return-1;continue}if(o===41||o===46)break;return-1}return r<n&&(o=u.src.charCodeAt(r),!v(o))?-1:r}function jn(u,e){const t=u.level+2;for(let n=e+2,r=u.tokens.length-2;n<r;n++)u.tokens[n].level===t&&u.tokens[n].type==="paragraph_open"&&(u.tokens[n+2].hidden=!0,u.tokens[n].hidden=!0,n+=2)}function Un(u,e,t,n){let r,o,i,c,a=e,s=!0;if(u.sCount[a]-u.blkIndent>=4||u.listIndent>=0&&u.sCount[a]-u.listIndent>=4&&u.sCount[a]<u.blkIndent)return!1;let f=!1;n&&u.parentType==="paragraph"&&u.sCount[a]>=u.blkIndent&&(f=!0);let l,p,h;if((h=Fe(u,a))>=0){if(l=!0,i=u.bMarks[a]+u.tShift[a],p=Number(u.src.slice(i,h-1)),f&&p!==1)return!1}else if((h=we(u,a))>=0)l=!1;else return!1;if(f&&u.skipSpaces(h)>=u.eMarks[a])return!1;if(n)return!0;const d=u.src.charCodeAt(h-1),k=u.tokens.length;l?(c=u.push("ordered_list_open","ol",1),p!==1&&(c.attrs=[["start",p]])):c=u.push("bullet_list_open","ul",1);const x=[a,0];c.map=x,c.markup=String.fromCharCode(d);let E=!1;const b=u.md.block.ruler.getRules("list"),m=u.parentType;for(u.parentType="list";a<t;){o=h,r=u.eMarks[a];const g=u.sCount[a]+h-(u.bMarks[a]+u.tShift[a]);let _=g;for(;o<r;){const X=u.src.charCodeAt(o);if(X===9)_+=4-(_+u.bsCount[a])%4;else if(X===32)_++;else break;o++}const y=o;let D;y>=r?D=1:D=_-g,D>4&&(D=1);const I=g+D;c=u.push("list_item_open","li",1),c.markup=String.fromCharCode(d);const j=[a,0];c.map=j,l&&(c.info=u.src.slice(i,h-1));const su=u.tight,ee=u.tShift[a],uo=u.sCount[a],eo=u.listIndent;if(u.listIndent=u.blkIndent,u.blkIndent=I,u.tight=!0,u.tShift[a]=y-u.bMarks[a],u.sCount[a]=_,y>=r&&u.isEmpty(a+1)?u.line=Math.min(u.line+2,t):u.md.block.tokenize(u,a,t,!0),(!u.tight||E)&&(s=!1),E=u.line-a>1&&u.isEmpty(u.line-1),u.blkIndent=u.listIndent,u.listIndent=eo,u.tShift[a]=ee,u.sCount[a]=uo,u.tight=su,c=u.push("list_item_close","li",-1),c.markup=String.fromCharCode(d),a=u.line,j[1]=a,a>=t||u.sCount[a]<u.blkIndent||u.sCount[a]-u.blkIndent>=4)break;let ht=!1;for(let X=0,to=b.length;X<to;X++)if(b[X](u,a,t,!0)){ht=!0;break}if(ht)break;if(l){if(h=Fe(u,a),h<0)break;i=u.bMarks[a]+u.tShift[a]}else if(h=we(u,a),h<0)break;if(d!==u.src.charCodeAt(h-1))break}return l?c=u.push("ordered_list_close","ol",-1):c=u.push("bullet_list_close","ul",-1),c.markup=String.fromCharCode(d),x[1]=a,u.line=a,u.parentType=m,s&&jn(u,k),!0}function Zn(u,e,t,n){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e],i=e+1;if(u.sCount[e]-u.blkIndent>=4||u.src.charCodeAt(r)!==91)return!1;function c(b){const m=u.lineMax;if(b>=m||u.isEmpty(b))return null;let g=!1;if(u.sCount[b]-u.blkIndent>3&&(g=!0),u.sCount[b]<0&&(g=!0),!g){const D=u.md.block.ruler.getRules("reference"),I=u.parentType;u.parentType="reference";let j=!1;for(let su=0,ee=D.length;su<ee;su++)if(D[su](u,b,m,!0)){j=!0;break}if(u.parentType=I,j)return null}const _=u.bMarks[b]+u.tShift[b],y=u.eMarks[b];return u.src.slice(_,y+1)}let a=u.src.slice(r,o+1);o=a.length;let s=-1;for(r=1;r<o;r++){const b=a.charCodeAt(r);if(b===91)return!1;if(b===93){s=r;break}else if(b===10){const m=c(i);m!==null&&(a+=m,o=a.length,i++)}else if(b===92&&(r++,r<o&&a.charCodeAt(r)===10)){const m=c(i);m!==null&&(a+=m,o=a.length,i++)}}if(s<0||a.charCodeAt(s+1)!==58)return!1;for(r=s+2;r<o;r++){const b=a.charCodeAt(r);if(b===10){const m=c(i);m!==null&&(a+=m,o=a.length,i++)}else if(!v(b))break}const f=u.md.helpers.parseLinkDestination(a,r,o);if(!f.ok)return!1;const l=u.md.normalizeLink(f.str);if(!u.md.validateLink(l))return!1;r=f.pos;const p=r,h=i,d=r;for(;r<o;r++){const b=a.charCodeAt(r);if(b===10){const m=c(i);m!==null&&(a+=m,o=a.length,i++)}else if(!v(b))break}let k=u.md.helpers.parseLinkTitle(a,r,o);for(;k.can_continue;){const b=c(i);if(b===null)break;a+=b,r=o,o=a.length,i++,k=u.md.helpers.parseLinkTitle(a,r,o,k)}let x;for(r<o&&d!==r&&k.ok?(x=k.str,r=k.pos):(x="",r=p,i=h);r<o;){const b=a.charCodeAt(r);if(!v(b))break;r++}if(r<o&&a.charCodeAt(r)!==10&&x)for(x="",r=p,i=h;r<o;){const b=a.charCodeAt(r);if(!v(b))break;r++}if(r<o&&a.charCodeAt(r)!==10)return!1;const E=du(a.slice(1,s));return E?(n||(typeof u.env.references>"u"&&(u.env.references={}),typeof u.env.references[E]>"u"&&(u.env.references[E]={title:x,href:l}),u.line=i),!0):!1}const Gn=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Wn="[a-zA-Z_:][a-zA-Z0-9:._-]*",Vn="(?:"+"[^\"'=<>`\\x00-\\x20]+"+"|"+"'[^']*'"+"|"+'"[^"]*"'+")",Se="<[A-Za-z][A-Za-z0-9\\-]*"+("(?:\\s+"+Wn+"(?:\\s*=\\s*"+Vn+")?)")+"*\\s*\\/?>",Te="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Kn="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Yn="<[?][\\s\\S]*?[?]>",Jn="<![A-Za-z][^>]*>",Xn="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Qn=new RegExp("^(?:"+Se+"|"+Te+"|"+Kn+"|"+Yn+"|"+Jn+"|"+Xn+")"),u0=new RegExp("^(?:"+Se+"|"+Te+")"),Z=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Gn.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(u0.source+"\\s*$"),/^$/,!1]];function e0(u,e,t,n){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4||!u.md.options.html||u.src.charCodeAt(r)!==60)return!1;let i=u.src.slice(r,o),c=0;for(;c<Z.length&&!Z[c][0].test(i);c++);if(c===Z.length)return!1;if(n)return Z[c][2];let a=e+1;const s=Z[c][1].test("");if(!Z[c][1].test(i)){for(;a<t&&!(u.sCount[a]<u.blkIndent&&(s||!u.isEmpty(a)));a++)if(r=u.bMarks[a]+u.tShift[a],o=u.eMarks[a],i=u.src.slice(r,o),Z[c][1].test(i)){i.length!==0&&a++;break}}u.line=a;const f=u.push("html_block","",0);return f.map=[e,a],f.content=u.getLines(e,a,u.blkIndent,!0),!0}function t0(u,e,t,n){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4)return!1;let i=u.src.charCodeAt(r);if(i!==35||r>=o)return!1;let c=1;for(i=u.src.charCodeAt(++r);i===35&&r<o&&c<=6;)c++,i=u.src.charCodeAt(++r);if(c>6||r<o&&!v(i))return!1;if(n)return!0;o=u.skipSpacesBack(o,r);const a=u.skipCharsBack(o,35,r);a>r&&v(u.src.charCodeAt(a-1))&&(o=a),u.line=e+1;const s=u.push("heading_open","h"+String(c),1);s.markup="########".slice(0,c),s.map=[e,u.line];const f=u.push("inline","",0);f.content=hu(u.src.slice(r,o)),f.map=[e,u.line],f.children=[];const l=u.push("heading_close","h"+String(c),-1);return l.markup="########".slice(0,c),!0}function n0(u,e,t){const n=u.md.block.ruler.getRules("paragraph");if(u.sCount[e]-u.blkIndent>=4)return!1;const r=u.parentType;u.parentType="paragraph";let o=0,i,c=e+1;for(;c<t&&!u.isEmpty(c);c++){if(u.sCount[c]-u.blkIndent>3)continue;if(u.sCount[c]>=u.blkIndent){let h=u.bMarks[c]+u.tShift[c];const d=u.eMarks[c];if(h<d&&(i=u.src.charCodeAt(h),(i===45||i===61)&&(h=u.skipChars(h,i),h=u.skipSpaces(h),h>=d))){o=i===61?1:2;break}}if(u.sCount[c]<0)continue;let p=!1;for(let h=0,d=n.length;h<d;h++)if(n[h](u,c,t,!0)){p=!0;break}if(p)break}if(!o)return u.parentType=r,!1;const a=hu(u.getLines(e,c,u.blkIndent,!1));u.line=c+1;const s=u.push("heading_open","h"+String(o),1);s.markup=String.fromCharCode(i),s.map=[e,u.line];const f=u.push("inline","",0);f.content=a,f.map=[e,u.line-1],f.children=[];const l=u.push("heading_close","h"+String(o),-1);return l.markup=String.fromCharCode(i),u.parentType=r,!0}function r0(u,e,t){const n=u.md.block.ruler.getRules("paragraph"),r=u.parentType;let o=e+1;for(u.parentType="paragraph";o<t&&!u.isEmpty(o);o++){if(u.sCount[o]-u.blkIndent>3||u.sCount[o]<0)continue;let s=!1;for(let f=0,l=n.length;f<l;f++)if(n[f](u,o,t,!0)){s=!0;break}if(s)break}const i=hu(u.getLines(e,o,u.blkIndent,!1));u.line=o;const c=u.push("paragraph_open","p",1);c.map=[e,u.line];const a=u.push("inline","",0);return a.content=i,a.map=[e,u.line],a.children=[],u.push("paragraph_close","p",-1),u.parentType=r,!0}const bu=[["table",qn,["paragraph","reference"]],["code",Pn],["fence",$n,["paragraph","reference","blockquote","list"]],["blockquote",On,["paragraph","reference","blockquote","list"]],["hr",Hn,["paragraph","reference","blockquote","list"]],["list",Un,["paragraph","reference","blockquote"]],["reference",Zn],["html_block",e0,["paragraph","reference","blockquote"]],["heading",t0,["paragraph","reference","blockquote"]],["lheading",n0],["paragraph",r0]];function xu(){this.ruler=new F;for(let u=0;u<bu.length;u++)this.ruler.push(bu[u][0],bu[u][1],{alt:(bu[u][2]||[]).slice()})}xu.prototype.tokenize=function(u,e,t){const n=this.ruler.getRules(""),r=n.length,o=u.md.options.maxNesting;let i=e,c=!1;for(;i<t&&(u.line=i=u.skipEmptyLines(i),!(i>=t||u.sCount[i]<u.blkIndent));){if(u.level>=o){u.line=t;break}const a=u.line;let s=!1;for(let f=0;f<r;f++)if(s=n[f](u,i,t,!1),s){if(a>=u.line)throw new Error("block rule didn't increment state.line");break}if(!s)throw new Error("none of the block rules matched");u.tight=!c,u.isEmpty(u.line-1)&&(c=!0),i=u.line,i<t&&u.isEmpty(i)&&(c=!0,i++,u.line=i)}},xu.prototype.parse=function(u,e,t,n){if(!u)return;const r=new this.State(u,e,t,n);this.tokenize(r,r.line,r.lineMax)},xu.prototype.State=R;function ou(u,e,t,n){this.src=u,this.env=t,this.md=e,this.tokens=n,this.tokens_meta=Array(n.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}ou.prototype.pushPending=function(){const u=new M("text","",0);return u.content=this.pending,u.level=this.pendingLevel,this.tokens.push(u),this.pending="",u},ou.prototype.push=function(u,e,t){this.pending&&this.pushPending();const n=new M(u,e,t);let r=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),n.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(n),this.tokens_meta.push(r),n},ou.prototype.scanDelims=function(u,e){const t=this.posMax,n=this.src.charCodeAt(u);let r;if(u===0)r=32;else if(u===1)r=this.src.charCodeAt(0),(r&63488)===55296&&(r=65533);else if(r=this.src.charCodeAt(u-1),(r&64512)===56320){const x=this.src.charCodeAt(u-2);r=(x&64512)===55296?65536+(x-55296<<10)+(r-56320):65533}else(r&64512)===55296&&(r=65533);let o=u;for(;o<t&&this.src.charCodeAt(o)===n;)o++;const i=o-u;let c=o<t?this.src.charCodeAt(o):32;if((c&64512)===55296){const x=this.src.charCodeAt(o+1);c=(x&64512)===56320?65536+(c-55296<<10)+(x-56320):65533}else(c&64512)===56320&&(c=65533);const a=ru(r)||nu(r),s=ru(c)||nu(c),f=tu(r),l=tu(c),p=!l&&(!s||f||a),h=!f&&(!a||l||s);return{can_open:p&&(e||!h||a),can_close:h&&(e||!p||s),length:i}},ou.prototype.Token=M;function o0(u){switch(u){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function i0(u,e){let t=u.pos;for(;t<u.posMax&&!o0(u.src.charCodeAt(t));)t++;return t===u.pos?!1:(e||(u.pending+=u.src.slice(u.pos,t)),u.pos=t,!0)}const c0=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function a0(u,e){if(!u.md.options.linkify||u.linkLevel>0)return!1;const t=u.pos,n=u.posMax;if(t+3>n||u.src.charCodeAt(t)!==58||u.src.charCodeAt(t+1)!==47||u.src.charCodeAt(t+2)!==47)return!1;const r=u.pending.match(c0);if(!r)return!1;const o=r[1],i=u.md.linkify.matchAtStart(u.src.slice(t-o.length));if(!i)return!1;let c=i.url;if(c.length<=o.length)return!1;let a=c.length;for(;a>0&&c.charCodeAt(a-1)===42;)a--;a!==c.length&&(c=c.slice(0,a));const s=u.md.normalizeLink(c);if(!u.md.validateLink(s))return!1;if(!e){u.pending=u.pending.slice(0,-o.length);const f=u.push("link_open","a",1);f.attrs=[["href",s]],f.markup="linkify",f.info="auto";const l=u.push("text","",0);l.content=u.md.normalizeLinkText(c);const p=u.push("link_close","a",-1);p.markup="linkify",p.info="auto"}return u.pos+=c.length-o.length,!0}function s0(u,e){let t=u.pos;if(u.src.charCodeAt(t)!==10)return!1;const n=u.pending.length-1,r=u.posMax;if(!e)if(n>=0&&u.pending.charCodeAt(n)===32)if(n>=1&&u.pending.charCodeAt(n-1)===32){let o=n-1;for(;o>=1&&u.pending.charCodeAt(o-1)===32;)o--;u.pending=u.pending.slice(0,o),u.push("hardbreak","br",0)}else u.pending=u.pending.slice(0,-1),u.push("softbreak","br",0);else u.push("softbreak","br",0);for(t++;t<r&&v(u.src.charCodeAt(t));)t++;return u.pos=t,!0}const qu=[];for(let u=0;u<256;u++)qu.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(u){qu[u.charCodeAt(0)]=1});function l0(u,e){let t=u.pos;const n=u.posMax;if(u.src.charCodeAt(t)!==92||(t++,t>=n))return!1;let r=u.src.charCodeAt(t);if(r===10){for(e||u.push("hardbreak","br",0),t++;t<n&&(r=u.src.charCodeAt(t),!!v(r));)t++;return u.pos=t,!0}if(r===32){if(!e){const c=u.push("text_special","",0);c.content="\\",c.markup="\\",c.info="escape"}return u.pos=t,!0}let o=u.src[t];if(r>=55296&&r<=56319&&t+1<n){const c=u.src.charCodeAt(t+1);c>=56320&&c<=57343&&(o+=u.src[t+1],t++)}const i="\\"+o;if(!e){const c=u.push("text_special","",0);r<256&&qu[r]!==0?c.content=o:c.content=i,c.markup=i,c.info="escape"}return u.pos=t+1,!0}function f0(u,e){let t=u.pos;if(u.src.charCodeAt(t)!==96)return!1;const r=t;t++;const o=u.posMax;for(;t<o&&u.src.charCodeAt(t)===96;)t++;const i=u.src.slice(r,t),c=i.length;if(u.backticksScanned&&(u.backticks[c]||0)<=r)return e||(u.pending+=i),u.pos+=c,!0;let a=t,s;for(;(s=u.src.indexOf("`",a))!==-1;){for(a=s+1;a<o&&u.src.charCodeAt(a)===96;)a++;const f=a-s;if(f===c){if(!e){const l=u.push("code_inline","code",0);l.markup=i,l.content=u.src.slice(t,s).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return u.pos=a,!0}u.backticks[f]=s}return u.backticksScanned=!0,e||(u.pending+=i),u.pos+=c,!0}function d0(u,e){const t=u.pos,n=u.src.charCodeAt(t);if(e||n!==126)return!1;const r=u.scanDelims(u.pos,!0);let o=r.length;const i=String.fromCharCode(n);if(o<2)return!1;let c;o%2&&(c=u.push("text","",0),c.content=i,o--);for(let a=0;a<o;a+=2)c=u.push("text","",0),c.content=i+i,u.delimiters.push({marker:n,length:0,token:u.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return u.pos+=r.length,!0}function ze(u,e){let t;const n=[],r=e.length;for(let o=0;o<r;o++){const i=e[o];if(i.marker!==126||i.end===-1)continue;const c=e[i.end];t=u.tokens[i.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=u.tokens[c.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",u.tokens[c.token-1].type==="text"&&u.tokens[c.token-1].content==="~"&&n.push(c.token-1)}for(;n.length;){const o=n.pop();let i=o+1;for(;i<u.tokens.length&&u.tokens[i].type==="s_close";)i++;i--,o!==i&&(t=u.tokens[i],u.tokens[i]=u.tokens[o],u.tokens[o]=t)}}function h0(u){const e=u.tokens_meta,t=u.tokens_meta.length;ze(u,u.delimiters);for(let n=0;n<t;n++)e[n]&&e[n].delimiters&&ze(u,e[n].delimiters)}const Me={tokenize:d0,postProcess:h0};function p0(u,e){const t=u.pos,n=u.src.charCodeAt(t);if(e||n!==95&&n!==42)return!1;const r=u.scanDelims(u.pos,n===42);for(let o=0;o<r.length;o++){const i=u.push("text","",0);i.content=String.fromCharCode(n),u.delimiters.push({marker:n,length:r.length,token:u.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return u.pos+=r.length,!0}function Ne(u,e){const t=e.length;for(let n=t-1;n>=0;n--){const r=e[n];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;const o=e[r.end],i=n>0&&e[n-1].end===r.end+1&&e[n-1].marker===r.marker&&e[n-1].token===r.token-1&&e[r.end+1].token===o.token+1,c=String.fromCharCode(r.marker),a=u.tokens[r.token];a.type=i?"strong_open":"em_open",a.tag=i?"strong":"em",a.nesting=1,a.markup=i?c+c:c,a.content="";const s=u.tokens[o.token];s.type=i?"strong_close":"em_close",s.tag=i?"strong":"em",s.nesting=-1,s.markup=i?c+c:c,s.content="",i&&(u.tokens[e[n-1].token].content="",u.tokens[e[r.end+1].token].content="",n--)}}function b0(u){const e=u.tokens_meta,t=u.tokens_meta.length;Ne(u,u.delimiters);for(let n=0;n<t;n++)e[n]&&e[n].delimiters&&Ne(u,e[n].delimiters)}const Ie={tokenize:p0,postProcess:b0};function x0(u,e){let t,n,r,o,i="",c="",a=u.pos,s=!0;if(u.src.charCodeAt(u.pos)!==91)return!1;const f=u.pos,l=u.posMax,p=u.pos+1,h=u.md.helpers.parseLinkLabel(u,u.pos,!0);if(h<0)return!1;let d=h+1;if(d<l&&u.src.charCodeAt(d)===40){for(s=!1,d++;d<l&&(t=u.src.charCodeAt(d),!(!v(t)&&t!==10));d++);if(d>=l)return!1;if(a=d,r=u.md.helpers.parseLinkDestination(u.src,d,u.posMax),r.ok){for(i=u.md.normalizeLink(r.str),u.md.validateLink(i)?d=r.pos:i="",a=d;d<l&&(t=u.src.charCodeAt(d),!(!v(t)&&t!==10));d++);if(r=u.md.helpers.parseLinkTitle(u.src,d,u.posMax),d<l&&a!==d&&r.ok)for(c=r.str,d=r.pos;d<l&&(t=u.src.charCodeAt(d),!(!v(t)&&t!==10));d++);}(d>=l||u.src.charCodeAt(d)!==41)&&(s=!0),d++}if(s){if(typeof u.env.references>"u")return!1;if(d<l&&u.src.charCodeAt(d)===91?(a=d+1,d=u.md.helpers.parseLinkLabel(u,d),d>=0?n=u.src.slice(a,d++):d=h+1):d=h+1,n||(n=u.src.slice(p,h)),o=u.env.references[du(n)],!o)return u.pos=f,!1;i=o.href,c=o.title}if(!e){u.pos=p,u.posMax=h;const k=u.push("link_open","a",1),x=[["href",i]];k.attrs=x,c&&x.push(["title",c]),u.linkLevel++,u.md.inline.tokenize(u),u.linkLevel--,u.push("link_close","a",-1)}return u.pos=d,u.posMax=l,!0}function m0(u,e){let t,n,r,o,i,c,a,s,f="";const l=u.pos,p=u.posMax;if(u.src.charCodeAt(u.pos)!==33||u.src.charCodeAt(u.pos+1)!==91)return!1;const h=u.pos+2,d=u.md.helpers.parseLinkLabel(u,u.pos+1,!1);if(d<0)return!1;if(o=d+1,o<p&&u.src.charCodeAt(o)===40){for(o++;o<p&&(t=u.src.charCodeAt(o),!(!v(t)&&t!==10));o++);if(o>=p)return!1;for(s=o,c=u.md.helpers.parseLinkDestination(u.src,o,u.posMax),c.ok&&(f=u.md.normalizeLink(c.str),u.md.validateLink(f)?o=c.pos:f=""),s=o;o<p&&(t=u.src.charCodeAt(o),!(!v(t)&&t!==10));o++);if(c=u.md.helpers.parseLinkTitle(u.src,o,u.posMax),o<p&&s!==o&&c.ok)for(a=c.str,o=c.pos;o<p&&(t=u.src.charCodeAt(o),!(!v(t)&&t!==10));o++);else a="";if(o>=p||u.src.charCodeAt(o)!==41)return u.pos=l,!1;o++}else{if(typeof u.env.references>"u")return!1;if(o<p&&u.src.charCodeAt(o)===91?(s=o+1,o=u.md.helpers.parseLinkLabel(u,o),o>=0?r=u.src.slice(s,o++):o=d+1):o=d+1,r||(r=u.src.slice(h,d)),i=u.env.references[du(r)],!i)return u.pos=l,!1;f=i.href,a=i.title}if(!e){n=u.src.slice(h,d);const k=[];u.md.inline.parse(n,u.md,u.env,k);const x=u.push("image","img",0),E=[["src",f],["alt",""]];x.attrs=E,x.children=k,x.content=n,a&&E.push(["title",a])}return u.pos=o,u.posMax=p,!0}const g0=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,k0=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function _0(u,e){let t=u.pos;if(u.src.charCodeAt(t)!==60)return!1;const n=u.pos,r=u.posMax;for(;;){if(++t>=r)return!1;const i=u.src.charCodeAt(t);if(i===60)return!1;if(i===62)break}const o=u.src.slice(n+1,t);if(k0.test(o)){const i=u.md.normalizeLink(o);if(!u.md.validateLink(i))return!1;if(!e){const c=u.push("link_open","a",1);c.attrs=[["href",i]],c.markup="autolink",c.info="auto";const a=u.push("text","",0);a.content=u.md.normalizeLinkText(o);const s=u.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return u.pos+=o.length+2,!0}if(g0.test(o)){const i=u.md.normalizeLink("mailto:"+o);if(!u.md.validateLink(i))return!1;if(!e){const c=u.push("link_open","a",1);c.attrs=[["href",i]],c.markup="autolink",c.info="auto";const a=u.push("text","",0);a.content=u.md.normalizeLinkText(o);const s=u.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return u.pos+=o.length+2,!0}return!1}function y0(u){return/^<a[>\s]/i.test(u)}function C0(u){return/^<\/a\s*>/i.test(u)}function E0(u){const e=u|32;return e>=97&&e<=122}function v0(u,e){if(!u.md.options.html)return!1;const t=u.posMax,n=u.pos;if(u.src.charCodeAt(n)!==60||n+2>=t)return!1;const r=u.src.charCodeAt(n+1);if(r!==33&&r!==63&&r!==47&&!E0(r))return!1;const o=u.src.slice(n).match(Qn);if(!o)return!1;if(!e){const i=u.push("html_inline","",0);i.content=o[0],y0(i.content)&&u.linkLevel++,C0(i.content)&&u.linkLevel--}return u.pos+=o[0].length,!0}const D0=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,A0=/^&([a-z][a-z0-9]{1,31});/i;function w0(u,e){const t=u.pos,n=u.posMax;if(u.src.charCodeAt(t)!==38||t+1>=n)return!1;if(u.src.charCodeAt(t+1)===35){const o=u.src.slice(t).match(D0);if(o){if(!e){const i=o[1][0].toLowerCase()==="x"?parseInt(o[1].slice(1),16):parseInt(o[1],10),c=u.push("text_special","",0);c.content=Iu(i)?eu(i):eu(65533),c.markup=o[0],c.info="entity"}return u.pos+=o[0].length,!0}}else{const o=u.src.slice(t).match(A0);if(o){const i=Yt(o[0]);if(i!==o[0]){if(!e){const c=u.push("text_special","",0);c.content=i,c.markup=o[0],c.info="entity"}return u.pos+=o[0].length,!0}}}return!1}function Be(u){const e={},t=u.length;if(!t)return;let n=0,r=-2;const o=[];for(let i=0;i<t;i++){const c=u[i];if(o.push(0),(u[n].marker!==c.marker||r!==c.token-1)&&(n=i),r=c.token,c.length=c.length||0,!c.close)continue;e.hasOwnProperty(c.marker)||(e[c.marker]=[-1,-1,-1,-1,-1,-1]);const a=e[c.marker][(c.open?3:0)+c.length%3];let s=n-o[n]-1,f=s;for(;s>a;s-=o[s]+1){const l=u[s];if(l.marker===c.marker&&l.open&&l.end<0){let p=!1;if((l.close||c.open)&&(l.length+c.length)%3===0&&(l.length%3!==0||c.length%3!==0)&&(p=!0),!p){const h=s>0&&!u[s-1].open?o[s-1]+1:0;o[i]=i-s+h,o[s]=h,c.open=!1,l.end=i,l.close=!1,f=-1,r=-2;break}}}f!==-1&&(e[c.marker][(c.open?3:0)+(c.length||0)%3]=f)}}function F0(u){const e=u.tokens_meta,t=u.tokens_meta.length;Be(u.delimiters);for(let n=0;n<t;n++)e[n]&&e[n].delimiters&&Be(e[n].delimiters)}function S0(u){let e,t,n=0;const r=u.tokens,o=u.tokens.length;for(e=t=0;e<o;e++)r[e].nesting<0&&n--,r[e].level=n,r[e].nesting>0&&n++,r[e].type==="text"&&e+1<o&&r[e+1].type==="text"?r[e+1].content=r[e].content+r[e+1].content:(e!==t&&(r[t]=r[e]),t++);e!==t&&(r.length=t)}const Pu=[["text",i0],["linkify",a0],["newline",s0],["escape",l0],["backticks",f0],["strikethrough",Me.tokenize],["emphasis",Ie.tokenize],["link",x0],["image",m0],["autolink",_0],["html_inline",v0],["entity",w0]],$u=[["balance_pairs",F0],["strikethrough",Me.postProcess],["emphasis",Ie.postProcess],["fragments_join",S0]];function iu(){this.ruler=new F;for(let u=0;u<Pu.length;u++)this.ruler.push(Pu[u][0],Pu[u][1]);this.ruler2=new F;for(let u=0;u<$u.length;u++)this.ruler2.push($u[u][0],$u[u][1])}iu.prototype.skipToken=function(u){const e=u.pos,t=this.ruler.getRules(""),n=t.length,r=u.md.options.maxNesting,o=u.cache;if(typeof o[e]<"u"){u.pos=o[e];return}let i=!1;if(u.level<r){for(let c=0;c<n;c++)if(u.level++,i=t[c](u,!0),u.level--,i){if(e>=u.pos)throw new Error("inline rule didn't increment state.pos");break}}else u.pos=u.posMax;i||u.pos++,o[e]=u.pos},iu.prototype.tokenize=function(u){const e=this.ruler.getRules(""),t=e.length,n=u.posMax,r=u.md.options.maxNesting;for(;u.pos<n;){const o=u.pos;let i=!1;if(u.level<r){for(let c=0;c<t;c++)if(i=e[c](u,!1),i){if(o>=u.pos)throw new Error("inline rule didn't increment state.pos");break}}if(i){if(u.pos>=n)break;continue}u.pending+=u.src[u.pos++]}u.pending&&u.pushPending()},iu.prototype.parse=function(u,e,t,n){const r=new this.State(u,e,t,n);this.tokenize(r);const o=this.ruler2.getRules(""),i=o.length;for(let c=0;c<i;c++)o[c](r)},iu.prototype.State=ou;function T0(u){const e={};u=u||{},e.src_Any=de.source,e.src_Cc=he.source,e.src_Z=be.source,e.src_P=Tu.source,e.src_ZPCc=[e.src_Z,e.src_P,e.src_Cc].join("|"),e.src_ZCc=[e.src_Z,e.src_Cc].join("|");const t="[><｜]";return e.src_pseudo_letter=`(?:(?!${t}|${e.src_ZPCc})${e.src_Any})`,e.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",e.src_auth=`(?:(?:(?!${e.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`,e.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",e.src_host_terminator=`(?=$|${t}|${e.src_ZPCc})(?!${u["---"]?"-(?!--)|":"-|"}_|:\\d|\\.-|\\.(?!$|${e.src_ZPCc}))`,e.src_path=`(?:[/?#](?:(?!${e.src_ZCc}|${t}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${e.src_ZCc}|\\]).)*\\]|\\((?:(?!${e.src_ZCc}|[)]).)*\\)|\\{(?:(?!${e.src_ZCc}|[}]).)*\\}|\\"(?:(?!${e.src_ZCc}|["]).)+\\"|\\'(?:(?!${e.src_ZCc}|[']).)+\\'|\\'(?=${e.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${e.src_ZCc}|[.]|$)|`+(u["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+`,(?!${e.src_ZCc}|$)|;(?!${e.src_ZCc}|$)|\\!+(?!${e.src_ZCc}|[!]|$)|\\?(?!${e.src_ZCc}|[?]|$))+|\\/)?`,e.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]{0,63}',e.src_xn="xn--[a-z0-9\\-]{1,59}",e.src_domain_root="(?:"+e.src_xn+`|${e.src_pseudo_letter}{1,63})`,e.src_domain="(?:"+e.src_xn+`|(?:${e.src_pseudo_letter})|(?:${e.src_pseudo_letter}(?:-|${e.src_pseudo_letter}){0,61}${e.src_pseudo_letter}))`,e.src_host=`(?:(?:(?:(?:${e.src_domain})\\.)*${e.src_domain}))`,e.tpl_host_fuzzy="(?:"+e.src_ip4+`|(?:(?:(?:${e.src_domain})\\.)+(?:%TLDS%)))`,e.tpl_host_no_ip_fuzzy=`(?:(?:(?:${e.src_domain})\\.)+(?:%TLDS%))`,e.src_host_strict=e.src_host+e.src_host_terminator,e.tpl_host_fuzzy_strict=e.tpl_host_fuzzy+e.src_host_terminator,e.src_host_port_strict=e.src_host+e.src_port+e.src_host_terminator,e.tpl_host_port_fuzzy_strict=e.tpl_host_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_port_no_ip_fuzzy_strict=e.tpl_host_no_ip_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_fuzzy_test=`localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${e.src_ZPCc}|>|$))`,e.tpl_email_fuzzy=`(^|${t}|"|\\(|${e.src_ZCc})(${e.src_email_name}@${e.tpl_host_fuzzy_strict})`,e.tpl_link_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${e.src_ZPCc}))((?![$+<=>^\`|｜])${e.tpl_host_port_fuzzy_strict}${e.src_path})`,e.tpl_link_no_ip_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${e.src_ZPCc}))((?![$+<=>^\`|｜])${e.tpl_host_port_no_ip_fuzzy_strict}${e.src_path})`,e}function Ou(u){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(n){u[n]=t[n]})}),u}function mu(u){return Object.prototype.toString.call(u)}function z0(u){return mu(u)==="[object String]"}function M0(u){return mu(u)==="[object Object]"}function N0(u){return mu(u)==="[object RegExp]"}function Re(u){return mu(u)==="[object Function]"}function I0(u){return u.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const Le={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function B0(u){return Object.keys(u||{}).reduce(function(e,t){return e||Le.hasOwnProperty(t)},!1)}const R0={"http:":{validate:function(u,e,t){const n=u.slice(e);return t.re.http||(t.re.http=new RegExp(`^\\/\\/${t.re.src_auth}${t.re.src_host_port_strict}${t.re.src_path}`,"i")),t.re.http.test(n)?n.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(u,e,t){const n=u.slice(e);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+`(?:localhost|(?:(?:${t.re.src_domain})\\.)+${t.re.src_domain_root})`+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(n)?e>=3&&u[e-3]===":"||e>=3&&u[e-3]==="/"?0:n.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(u,e,t){const n=u.slice(e);return t.re.mailto||(t.re.mailto=new RegExp(`^${t.re.src_email_name}@${t.re.src_host_strict}`,"i")),t.re.mailto.test(n)?n.match(t.re.mailto)[0].length:0}}},L0="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",q0="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function P0(u){return function(e,t){const n=e.slice(t);return u.test(n)?n.match(u)[0].length:0}}function qe(){return function(u,e){e.normalize(u)}}function gu(u){const e=u.re=T0(u.__opts__),t=u.__tlds__.slice();u.onCompile(),u.__tlds_replaced__||t.push(L0),t.push(e.src_xn),e.src_tlds=t.join("|");function n(c){return c.replace("%TLDS%",e.src_tlds)}e.email_fuzzy=RegExp(n(e.tpl_email_fuzzy),"i"),e.email_fuzzy_global=RegExp(n(e.tpl_email_fuzzy),"ig"),e.link_fuzzy=RegExp(n(e.tpl_link_fuzzy),"i"),e.link_fuzzy_global=RegExp(n(e.tpl_link_fuzzy),"ig"),e.link_no_ip_fuzzy=RegExp(n(e.tpl_link_no_ip_fuzzy),"i"),e.link_no_ip_fuzzy_global=RegExp(n(e.tpl_link_no_ip_fuzzy),"ig"),e.host_fuzzy_test=RegExp(n(e.tpl_host_fuzzy_test),"i");const r=[];u.__compiled__={};function o(c,a){throw new Error(`(LinkifyIt) Invalid schema "${c}": ${a}`)}Object.keys(u.__schemas__).forEach(function(c){const a=u.__schemas__[c];if(a===null)return;const s={validate:null,link:null};if(u.__compiled__[c]=s,M0(a)){N0(a.validate)?s.validate=P0(a.validate):Re(a.validate)?s.validate=a.validate:o(c,a),Re(a.normalize)?s.normalize=a.normalize:a.normalize?o(c,a):s.normalize=qe();return}if(z0(a)){r.push(c);return}o(c,a)}),r.forEach(function(c){u.__compiled__[u.__schemas__[c]]&&(u.__compiled__[c].validate=u.__compiled__[u.__schemas__[c]].validate,u.__compiled__[c].normalize=u.__compiled__[u.__schemas__[c]].normalize)}),u.__compiled__[""]={validate:null,normalize:qe()};const i=Object.keys(u.__compiled__).filter(function(c){return c.length>0&&u.__compiled__[c]}).map(I0).join("|");u.re.schema_test=RegExp(`(^|(?!_)(?:[><｜]|${e.src_ZPCc}))(${i})`,"i"),u.re.schema_search=RegExp(`(^|(?!_)(?:[><｜]|${e.src_ZPCc}))(${i})`,"ig"),u.re.schema_at_start=RegExp(`^${u.re.schema_search.source}`,"i"),u.re.pretest=RegExp(`(${u.re.schema_test.source})|(${u.re.host_fuzzy_test.source})|@`,"i")}function Pe(u,e,t,n){const r=u.slice(t,n);this.schema=e.toLowerCase(),this.index=t,this.lastIndex=n,this.raw=r,this.text=r,this.url=r}function T(u,e){if(!(this instanceof T))return new T(u,e);e||B0(u)&&(e=u,u={}),this.__opts__=Ou({},Le,e),this.__schemas__=Ou({},R0,u),this.__compiled__={},this.__tlds__=q0,this.__tlds_replaced__=!1,this.re={},gu(this)}T.prototype.add=function(e,t){return this.__schemas__[e]=t,gu(this),this},T.prototype.set=function(e){return this.__opts__=Ou(this.__opts__,e),this},T.prototype.test=function(e){if(!e.length)return!1;let t,n;if(this.re.schema_test.test(e)){for(n=this.re.schema_search,n.lastIndex=0;(t=n.exec(e))!==null;)if(this.testSchemaAt(e,t[2],n.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&e.search(this.re.host_fuzzy_test)>=0&&e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&e.indexOf("@")>=0&&e.match(this.re.email_fuzzy)!==null)},T.prototype.pretest=function(e){return this.re.pretest.test(e)},T.prototype.testSchemaAt=function(e,t,n){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(e,n,this):0},T.prototype.match=function(e){const t=[],n=[],r=[],o=[];let i,c,a;function s(p,h){return p?h?p.index!==h.index?p.index<h.index?p:h:p.lastIndex>=h.lastIndex?p:h:p:h}if(!e.length)return null;if(this.re.schema_test.test(e))for(a=this.re.schema_search,a.lastIndex=0;(i=a.exec(e))!==null;)c=this.testSchemaAt(e,i[2],a.lastIndex),c&&n.push({schema:i[2],index:i.index+i[1].length,lastIndex:i.index+i[0].length+c});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(a=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,a.lastIndex=0;(i=a.exec(e))!==null;)r.push({schema:"",index:i.index+i[1].length,lastIndex:i.index+i[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(a=this.re.email_fuzzy_global,a.lastIndex=0;(i=a.exec(e))!==null;)o.push({schema:"mailto:",index:i.index+i[1].length,lastIndex:i.index+i[0].length});const f=[0,0,0];let l=0;for(;;){const p=[n[f[0]],o[f[1]],r[f[2]]],h=s(s(p[0],p[1]),p[2]);if(!h)break;if(h===p[0]?f[0]++:h===p[1]?f[1]++:f[2]++,h.index<l)continue;const d=new Pe(e,h.schema,h.index,h.lastIndex);this.__compiled__[d.schema].normalize(d,this),t.push(d),l=h.lastIndex}return t.length?t:null},T.prototype.matchAtStart=function(e){if(!e.length)return null;const t=this.re.schema_at_start.exec(e);if(!t)return null;const n=this.testSchemaAt(e,t[2],t[0].length);if(!n)return null;const r=new Pe(e,t[2],t.index+t[1].length,t.index+t[0].length+n);return this.__compiled__[r.schema].normalize(r,this),r},T.prototype.tlds=function(e,t){return e=Array.isArray(e)?e:[e],t?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(n,r,o){return n!==o[r-1]}).reverse(),gu(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,gu(this),this)},T.prototype.normalize=function(e){e.schema||(e.url=`http://${e.url}`),e.schema==="mailto:"&&!/^mailto:/i.test(e.url)&&(e.url=`mailto:${e.url}`)},T.prototype.onCompile=function(){};const K=2147483647,L=36,Hu=1,cu=26,$0=38,O0=700,$e=72,Oe=128,He="-",H0=/^xn--/,j0=/[^\0-\x7F]/,U0=/[\x2E\u3002\uFF0E\uFF61]/g,Z0={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},ju=L-Hu,q=Math.floor,Uu=String.fromCharCode;function H(u){throw new RangeError(Z0[u])}function G0(u,e){const t=[];let n=u.length;for(;n--;)t[n]=e(u[n]);return t}function je(u,e){const t=u.split("@");let n="";t.length>1&&(n=t[0]+"@",u=t[1]),u=u.replace(U0,".");const r=u.split("."),o=G0(r,e).join(".");return n+o}function Ue(u){const e=[];let t=0;const n=u.length;for(;t<n;){const r=u.charCodeAt(t++);if(r>=55296&&r<=56319&&t<n){const o=u.charCodeAt(t++);(o&64512)==56320?e.push(((r&1023)<<10)+(o&1023)+65536):(e.push(r),t--)}else e.push(r)}return e}const W0=u=>String.fromCodePoint(...u),V0=function(u){return u>=48&&u<58?26+(u-48):u>=65&&u<91?u-65:u>=97&&u<123?u-97:L},Ze=function(u,e){return u+22+75*(u<26)-((e!=0)<<5)},Ge=function(u,e,t){let n=0;for(u=t?q(u/O0):u>>1,u+=q(u/e);u>ju*cu>>1;n+=L)u=q(u/ju);return q(n+(ju+1)*u/(u+$0))},We=function(u){const e=[],t=u.length;let n=0,r=Oe,o=$e,i=u.lastIndexOf(He);i<0&&(i=0);for(let c=0;c<i;++c)u.charCodeAt(c)>=128&&H("not-basic"),e.push(u.charCodeAt(c));for(let c=i>0?i+1:0;c<t;){const a=n;for(let f=1,l=L;;l+=L){c>=t&&H("invalid-input");const p=V0(u.charCodeAt(c++));p>=L&&H("invalid-input"),p>q((K-n)/f)&&H("overflow"),n+=p*f;const h=l<=o?Hu:l>=o+cu?cu:l-o;if(p<h)break;const d=L-h;f>q(K/d)&&H("overflow"),f*=d}const s=e.length+1;o=Ge(n-a,s,a==0),q(n/s)>K-r&&H("overflow"),r+=q(n/s),n%=s,e.splice(n++,0,r)}return String.fromCodePoint(...e)},Ve=function(u){const e=[];u=Ue(u);const t=u.length;let n=Oe,r=0,o=$e;for(const a of u)a<128&&e.push(Uu(a));const i=e.length;let c=i;for(i&&e.push(He);c<t;){let a=K;for(const f of u)f>=n&&f<a&&(a=f);const s=c+1;a-n>q((K-r)/s)&&H("overflow"),r+=(a-n)*s,n=a;for(const f of u)if(f<n&&++r>K&&H("overflow"),f===n){let l=r;for(let p=L;;p+=L){const h=p<=o?Hu:p>=o+cu?cu:p-o;if(l<h)break;const d=l-h,k=L-h;e.push(Uu(Ze(h+d%k,0))),l=q(d/k)}e.push(Uu(Ze(l,0))),o=Ge(r,s,c===i),r=0,++c}++r,++n}return e.join("")},Ke={version:"2.3.1",ucs2:{decode:Ue,encode:W0},decode:We,encode:Ve,toASCII:function(u){return je(u,function(e){return j0.test(e)?"xn--"+Ve(e):e})},toUnicode:function(u){return je(u,function(e){return H0.test(e)?We(e.slice(4).toLowerCase()):e})}},K0={default:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},zero:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},commonmark:{options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}}},Y0=/^(vbscript|javascript|file|data):/,J0=/^data:image\/(gif|png|jpeg|webp);/;function X0(u){const e=u.trim().toLowerCase();return Y0.test(e)?J0.test(e):!0}const Ye=["http:","https:","mailto:"];function Q0(u){const e=Su(u,!0);if(e.hostname&&(!e.protocol||Ye.indexOf(e.protocol)>=0))try{e.hostname=Ke.toASCII(e.hostname)}catch{}return uu(Fu(e))}function ur(u){const e=Su(u,!0);if(e.hostname&&(!e.protocol||Ye.indexOf(e.protocol)>=0))try{e.hostname=Ke.toUnicode(e.hostname)}catch{}return G(Fu(e),G.defaultChars+"%")}function z(u,e){if(!(this instanceof z))return new z(u,e);e||Nu(u)||(e=u||{},u="default"),this.inline=new iu,this.block=new xu,this.core=new Ru,this.renderer=new V,this.linkify=new T,this.validateLink=X0,this.normalizeLink=Q0,this.normalizeLinkText=ur,this.utils=dn,this.helpers=fu({},xn),this.options={},this.configure(u),e&&this.set(e)}z.prototype.set=function(u){return fu(this.options,u),this},z.prototype.configure=function(u){const e=this;if(Nu(u)){const t=u;if(u=K0[t],!u)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!u)throw new Error("Wrong `markdown-it` preset, can't be empty");return u.options&&e.set(u.options),u.components&&Object.keys(u.components).forEach(function(t){u.components[t].rules&&e[t].ruler.enableOnly(u.components[t].rules),u.components[t].rules2&&e[t].ruler2.enableOnly(u.components[t].rules2)}),this},z.prototype.enable=function(u,e){let t=[];Array.isArray(u)||(u=[u]),["core","block","inline"].forEach(function(r){t=t.concat(this[r].ruler.enable(u,!0))},this),t=t.concat(this.inline.ruler2.enable(u,!0));const n=u.filter(function(r){return t.indexOf(r)<0});if(n.length&&!e)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+n);return this},z.prototype.disable=function(u,e){let t=[];Array.isArray(u)||(u=[u]),["core","block","inline"].forEach(function(r){t=t.concat(this[r].ruler.disable(u,!0))},this),t=t.concat(this.inline.ruler2.disable(u,!0));const n=u.filter(function(r){return t.indexOf(r)<0});if(n.length&&!e)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+n);return this},z.prototype.use=function(u){const e=[this].concat(Array.prototype.slice.call(arguments,1));return u.apply(u,e),this},z.prototype.parse=function(u,e){if(typeof u!="string")throw new Error("Input data should be a String");const t=new this.core.State(u,this,e);return this.core.process(t),t.tokens},z.prototype.render=function(u,e){return e=e||{},this.renderer.render(this.parse(u,e),this.options,e)},z.prototype.parseInline=function(u,e){const t=new this.core.State(u,this,e);return t.inlineMode=!0,this.core.process(t),t.tokens},z.prototype.renderInline=function(u,e){return e=e||{},this.renderer.render(this.parseInline(u,e),this.options,e)};const ku=new WeakMap;function er(u){const e=[0];for(let t=0;t<u.length;t++)u[t]===`
`&&e.push(t+1);return e.push(u.length),e}function Je(u,e,t){if(e==="")return{start:t,end:t};for(let n=t;n<=u.length-1;n++){let r=0,o=n;for(;r<e.length&&o<u.length;){if(u[o]==="\\"&&o+1<u.length&&u[o+1]===e[r]){o+=2,r++;continue}if(u[o]===e[r]){o++,r++;continue}break}if(r===e.length)return{start:n,end:o}}return null}function Xe(u,e){if(u[e]!=="(")return e;let t=1,n=e+1;for(;n<u.length&&t>0;)u[n]==="("?t++:u[n]===")"&&t--,n++;return n}function tr(u,e,t){let n=0;for(const r of t)switch(r.type){case"text":{const o=Je(u,r.content,n);o&&(ku.set(r,{start:e+o.start,end:e+o.end}),n=o.end);break}case"code_inline":{const o=u.indexOf("`",n);if(o<0)break;const i=Je(u,r.content,o+1);if(i){ku.set(r,{start:e+i.start,end:e+i.end});const c=u.indexOf("`",i.end);n=c>=0?c+1:i.end}else n=o+1;break}case"softbreak":case"hardbreak":{const o=u.indexOf(`
`,n);o>=0&&(ku.set(r,{start:e+o,end:e+o+1}),n=o+1);break}case"image":{const o=u.indexOf("![",n);if(o>=0){const i=Xe(u,u.indexOf("]",o+2)+1);n=i>n?i:n}break}default:{const o=r.markup||"";if(o){const i=u.indexOf(o,n);i>=0&&(n=i+o.length)}r.type==="link_close"&&(n=Xe(u,n))}}}function nr(u,e){const t=er(e);for(const n of u){if(n.type!=="inline"||!n.map||!n.children)continue;const[r,o]=n.map,i=t[r]??0,c=t[o]??e.length,a=e.slice(i,c);tr(a,i,n.children)}}function rr(u){return u.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Qe(u,e){const t=ku.get(e),n=rr(u);return t?`<span data-o="${t.start},${t.end}">${n}</span>`:n}const ut=new WeakSet;function or(u){ut.has(u)||(ut.add(u),u.renderer.rules.text,u.renderer.rules.text=(e,t)=>{const n=e[t];return Qe(n.content,n)},u.renderer.rules.code_inline=(e,t)=>{const n=e[t];return`<code>${Qe(n.content,n)}</code>`})}function ir(u,e){const t=u.parse(e,{});return nr(t,e),u.renderer.render(t,u.options,{})}function et(){const u=new z({html:!1,linkify:!0,breaks:!1,typographer:!1});u.enable(["table","strikethrough"]);const e=u.renderer.rules.link_open||((t,n,r,o,i)=>i.renderToken(t,n,r));return u.renderer.rules.link_open=(t,n,r,o,i)=>{const c=t[n],a=c.attrIndex("target");return a<0?c.attrPush(["target","_blank"]):c.attrs[a][1]="_blank",c.attrIndex("rel")<0&&c.attrPush(["rel","noopener noreferrer"]),e(t,n,r,o,i)},or(u),u}et();function cr(u,e,t){let n=null,r=!1;u.renderer.rules.fence=(o,i)=>{const c=o[i],a=((c.info||"").trim().split(/\s+/)[0]??"").toLowerCase();if(n&&a)try{return n.codeToHtml(c.content,{lang:a,themes:{light:"github-light",dark:"github-dark"}})}catch{}else r||(r=!0,t().then(f=>{n=f,e()}).catch(()=>{}));return`<pre><code${a?` class="language-${a}"`:""}>${u.utils.escapeHtml(c.content)}</code></pre>
`}}function ar(u){if(!u)return null;const e=u.getAttribute("data-o");if(!e)return null;const[t,n]=e.split(",").map(Number);return Number.isNaN(t)||Number.isNaN(n)?null:[t,n]}function sr(u,e){let t=0;for(const r of Array.from(u.childNodes))if(r.nodeType===Node.TEXT_NODE){const o=r;if(e<=t+o.length)return{node:o,offset:Math.max(0,e-t)};t+=o.length}const n=Array.from(u.childNodes).filter(r=>r.nodeType===Node.TEXT_NODE).pop();return n?{node:n,offset:n.length}:null}function lr(u){const e=[];for(const t of Array.from(u.querySelectorAll("span[data-o]:not(.cm-inserted)"))){const n=ar(t);n&&e.push({el:t,s:n[0],e:n[1]})}return e}function _u(u,e,t="any"){const n=lr(u);let r;if(t==="start"?r=n.find(i=>i.s===e):t==="end"&&(r=n.find(i=>i.e===e)),r??(r=n.find(i=>i.s<=e&&e<=i.e)),!r){const i=n.filter(c=>c.e<=e).pop();i&&(r=i)}return r?sr(r.el,e-r.s):null}function Zu(u,e,t){const n=_u(u,e,"start"),r=_u(u,t,"end");if(!n||!r)return null;const o=new Range;try{o.setStart(n.node,n.offset),o.setEnd(r.node,r.offset)}catch{return null}return o}const tt={deletion:"cm-del",highlight:"cm-hl",comment:"cm-comment",substitution:"cm-sub-old"};let au=!1;try{au=typeof Highlight<"u"&&!!CSS.highlights}catch{au=!1}function Gu(u,e){return e?`${e}-${u}`:u}function fr(u,e,t=""){if(u.querySelectorAll(".cm-inserted").forEach(n=>n.remove()),u.querySelectorAll("mark.cm-fallback").forEach(n=>{n.replaceWith(...Array.from(n.childNodes))}),u.normalize(),au){for(const r of Object.values(tt))CSS.highlights.delete(Gu(r,t));const n={};for(const r of e){if(r.type==="insertion")continue;const o=tt[r.type];if(!o)continue;const i=Zu(u,r.srcStart,r.srcEnd);i&&(n[o]??(n[o]=[])).push(i)}for(const[r,o]of Object.entries(n)){const i=new Highlight(...o);CSS.highlights.set(Gu(r,t),i)}}else{const n=[];for(const r of e){if(r.type==="insertion")continue;const o=Zu(u,r.srcStart,r.srcEnd);o&&n.push({range:o,a:r})}for(const{range:r,a:o}of n){const i=document.createElement("mark");i.className=`cm-fallback cm-fallback-${o.type}`;try{r.surroundContents(i)}catch{dr(r,i)}}}for(const n of e)n.type==="substitution"&&nt(u,n.srcEnd,"span","cm-sub-new cm-inserted",n.replacement??"",!0);for(let n=e.length-1;n>=0;n--){const r=e[n];r.type==="insertion"&&nt(u,r.srcStart,"ins","cm-ins cm-inserted",r.insertedText??"")}}function dr(u,e){const t=[],n=document.createTreeWalker(u.commonAncestorContainer,NodeFilter.SHOW_TEXT);let r=n.currentNode;for(;r;)u.intersectsNode(r)&&t.push(r),r=n.nextNode();for(const o of t){const i=e.cloneNode(!1);o.parentNode?.insertBefore(i,o),i.appendChild(o)}}function nt(u,e,t,n,r,o=!1){if(!r&&!o)return;const i=_u(u,e);if(!i)return;const c=document.createElement(t);if(c.className=n,c.setAttribute("data-o",`${e},${e}`),o){const s=document.createElement("span");s.className="sub-arrow",s.textContent=" → ";const f=document.createElement("span");f.className="sub-new-text",f.textContent=r,c.appendChild(s),c.appendChild(f)}else c.textContent=r;const a=new Range;try{a.setStart(i.node,i.offset),a.insertNode(c)}catch{}}function hr(){return au}function pr(u,e,t=""){if(e.type==="insertion"){const r=_u(u,e.srcStart);if(r){const o=new Range;o.setStart(r.node,r.offset),o.collapse(!0),rt(u,o,t)}return}const n=Zu(u,e.srcStart,e.srcEnd);n&&rt(u,n,t)}function br(u){for(let e=u.parentElement;e;e=e.parentElement)if(e.scrollHeight>e.clientHeight){const t=getComputedStyle(e).overflowY;if(t==="auto"||t==="scroll")return e}return null}function rt(u,e,t){const n=e.getBoundingClientRect(),r=br(u);if(r){const o=r.getBoundingClientRect().top,i=r.scrollTop+(n.top-o)-r.clientHeight/2;r.scrollTo({top:Math.max(0,i),behavior:"smooth"})}else window.scrollTo({top:Math.max(0,n.top+window.scrollY-window.innerHeight/2),behavior:"smooth"});if(au){const o=new Highlight(e),i=Gu("cm-flash",t);CSS.highlights.set(i,o),window.setTimeout(()=>CSS.highlights.delete(i),1200)}}function xr(u){if(!u)return null;const e=u.getAttribute("data-o");if(!e)return null;const[t,n]=e.split(",").map(Number);return Number.isNaN(t)||Number.isNaN(n)?null:[t,n]}function mr(u,e,t){let n=0;for(const r of Array.from(t.childNodes)){if(r===u)return n+e;r.nodeType===Node.TEXT_NODE&&(n+=r.length)}return n+e}function Wu(u,e){if(u.nodeType===Node.TEXT_NODE){e.push(u);return}for(const t of Array.from(u.childNodes))Wu(t,e)}function Vu(u,e){let t=null,n=0;if(u.nodeType===Node.TEXT_NODE)t=u,n=e;else{const i=[];for(let c=e;c<u.childNodes.length&&(Wu(u.childNodes[c],i),!(i.length>0));c++);if(i[0])t=i[0],n=0;else for(let c=Math.min(e,u.childNodes.length)-1;c>=0;c--){const a=[];if(Wu(u.childNodes[c],a),a.length>0){t=a[a.length-1],n=t.length;break}}}if(!t||!t.parentElement)return null;const r=t.parentElement.closest("[data-o]"),o=xr(r);return o?o[0]===o[1]?o[0]:o[0]+mr(t,n,r):null}function gr(u){if(u.isCollapsed||u.rangeCount===0)return null;const e=u.getRangeAt(0),t=Vu(e.startContainer,e.startOffset),n=Vu(e.endContainer,e.endOffset);return t==null||n==null?null:t>n?{start:n,end:t,quotedText:u.toString()}:{start:t,end:n,quotedText:u.toString()}}function kr(u){if(u.rangeCount===0)return null;const e=u.getRangeAt(0);return Vu(e.startContainer,e.startOffset)}let Y=null;function _r(u){const e=Y;Y=null,e&&e(u)}function Ku(u){return _r(null),new Promise(e=>{const t=document.createElement("div");t.className="fxr-input-popover";const n=document.createElement("div");n.className="fxr-input-popover-title",n.textContent=u.title;const r=document.createElement("textarea");r.className="fxr-input-popover-area",r.value=u.value??"",r.rows=2;const o=document.createElement("div");o.className="fxr-input-popover-actions";const i=document.createElement("button");i.type="button",i.className="fxr-btn fxr-btn-ghost",i.textContent="取消";const c=document.createElement("button");c.type="button",c.className="fxr-btn fxr-btn-primary",c.textContent="确认",o.append(i,c);const a=l=>{Y=null,document.removeEventListener("mousedown",f,!0),t.remove(),e(l)};Y=a;const s=()=>{const l=r.value;!l.trim()&&!u.allowEmpty||a(l)};r.addEventListener("keydown",l=>{l.key==="Enter"&&!l.shiftKey&&!l.isComposing?(l.preventDefault(),s()):l.key==="Escape"&&(l.preventDefault(),a(null))}),c.addEventListener("click",s),i.addEventListener("click",()=>a(null));const f=l=>{t.contains(l.target)||a(null)};window.setTimeout(()=>{Y===a&&document.addEventListener("mousedown",f,!0)},0),t.append(n,r,o),document.body.appendChild(t),yr(t,u.anchor),window.setTimeout(()=>{Y===a&&(r.focus(),u.value&&r.select())},0)})}const Yu=320;function yr(u,e){let t,n;e&&(e.width>0||e.height>0||e.top>0)?(t=e.left+e.width/2-Yu/2,n=e.bottom+8):(t=window.innerWidth/2-Yu/2,n=window.innerHeight/3),t=Math.max(8,Math.min(t,window.innerWidth-Yu-8));const r=u.offsetHeight;e&&n+r>window.innerHeight-8&&(n=Math.max(8,e.top-r-8)),u.style.left=`${t+window.scrollX}px`,u.style.top=`${n+window.scrollY}px`}let ot=0;function Cr(){return ot+=1,`a${Date.now().toString(36)}${ot}`}function Er(){const u=window.getSelection();if(!u||u.rangeCount===0)return{selection:null,caret:null,anchorRect:null};const e=u.getRangeAt(0).getBoundingClientRect();return u.isCollapsed?{selection:null,caret:kr(u),anchorRect:e}:{selection:gr(u),caret:null,anchorRect:e}}function yu(){window.getSelection()?.removeAllRanges()}function Cu(u,e,t,n,r={}){return{id:Cr(),type:u,srcStart:e,srcEnd:t,quotedText:n,...r}}function Ju(u,e){return u.selection?u.selection.start===u.selection.end?(e.notify("选区未能定位到源码位置，请在正文原文上重新选择"),null):e.store.overlaps(u.selection.start,u.selection.end)?(e.notify("该段落已有重叠批注，CriticMarkup 不支持重叠"),null):u.selection:(e.notify("请先选中要批注的文字"),null)}async function vr(u,e,t){const{store:n,notify:r}=t;switch(u){case"insertion":{const o=e.caret??e.selection?.start??null;if(o==null)return r("请先在正文中点击一个插入位置"),!1;const i=await Ku({title:"输入要插入的新文字",anchor:e.anchorRect});return i==null?!1:(n.addAnnotation(Cu(u,o,o,"",{insertedText:i})),yu(),!0)}case"deletion":case"highlight":{const o=Ju(e,t);return o?(n.addAnnotation(Cu(u,o.start,o.end,o.quotedText)),yu(),!0):!1}case"substitution":{const o=Ju(e,t);if(!o)return!1;const i=await Ku({title:"输入替换后的新文字",value:o.quotedText,anchor:e.anchorRect,allowEmpty:!0});return i==null?!1:(n.addAnnotation(Cu(u,o.start,o.end,o.quotedText,{replacement:i})),yu(),!0)}case"comment":{const o=Ju(e,t);return o?(n.addAnnotation(Cu(u,o.start,o.end,o.quotedText,{comment:""})),yu(),!0):!1}}}const Dr=["{++","++}","{--","--}","{==","==}","{~~","~~}","{>>","<<}","~>"];function Eu(u){let e=u;for(const t of Dr)e=e.split(t).join(t[0]+" "+t.slice(1));return e}const vu=0,Ar=1,Du=2;function wr(u){const e=[];let t=0;const n=(r,o,i)=>{e.push({at:r,text:o,rank:i,seq:t++})};for(const r of u)switch(r.type){case"insertion":{n(r.srcStart,`{++ ${Eu(r.insertedText??"")} ++}`,Ar);break}case"deletion":{n(r.srcStart,"{-- ",Du),n(r.srcEnd," --}",vu);break}case"highlight":{n(r.srcStart,"{== ",Du),n(r.srcEnd," ==}",vu);break}case"substitution":{n(r.srcStart,"{~~ ",Du),n(r.srcEnd,` ~> ${Eu(r.replacement??"")} ~~}`,vu);break}case"comment":{const o=Eu((r.comment??"").trim());n(r.srcStart,"{== ",Du),n(r.srcEnd,o?` ==}{>> ${o} <<}`:" ==}",vu);break}}return e}function it(u,e){const t=e.filter(i=>!i.unmapped),n=e.filter(i=>i.unmapped),r=wr(t);r.sort((i,c)=>i.at!==c.at?c.at-i.at:i.rank!==c.rank?c.rank-i.rank:c.seq-i.seq);let o=u;for(const i of r)o=o.slice(0,i.at)+i.text+o.slice(i.at);if(n.length>0){o+=`

---
`;for(const i of n){const c=Eu((i.quotedText||i.insertedText||i.replacement||"").replace(/\n/g," "));o+=`
{>> 未能定位到原段落的 ${i.type} 批注：${c} <<}`}}return o}function Au(u){return it(u.state.source,u.state.annotations)}function ct(u){return(u.state.fileName||"document.md").replace(/\.(md|markdown|mdown)$/i,"")}async function at(u){try{return await navigator.clipboard.writeText(u),!0}catch{const e=document.createElement("textarea");e.value=u,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();let t=!1;try{t=document.execCommand("copy")}catch{t=!1}return e.remove(),t}}function st(u,e){const t=new Blob([e],{type:"text/markdown;charset=utf-8"}),n=URL.createObjectURL(t),r=document.createElement("a");r.href=n,r.download=u,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(n)}async function Fr(u,e){const t=Au(u);await at(t)?e("已复制批注全文"):e("复制失败，请手动复制")}function Sr(u,e){st(`${ct(u)}-annotated.md`,Au(u)),e("已下载批注全文")}async function Tr(u,e){const t=`${u.state.prompt}

${Au(u)}`;await at(t)?e("已复制 Prompt + 批注全文"):e("复制失败，请手动复制")}function zr(u,e){st(`${ct(u)}-for-ai.md`,`${u.state.prompt}

${Au(u)}`),e("已下载 Prompt + 批注全文")}function Mr(u){let e,t;const n=(r,o=2200)=>{(!t||!t.isConnected)&&(t=document.createElement("div"),t.className="fxr-toast",u().appendChild(t)),t.textContent=r,t.classList.add("fxr-toast-visible"),e&&window.clearTimeout(e),e=window.setTimeout(()=>{t?.classList.remove("fxr-toast-visible")},o)};return n.dispose=()=>{e&&window.clearTimeout(e),t?.remove(),t=void 0},n}const lt={insertion:{label:"插入",icon:"➕",title:"插入新文字",key:"I"},deletion:{label:"删除",icon:"✂️",title:"标记为删除",key:"D"},substitution:{label:"替换",icon:"🔁",title:"替换为新文字",key:"S"},highlight:{label:"高亮",icon:"🔆",title:"高亮关注",key:"H"},comment:{label:"评论",icon:"💬",title:"添加评论",key:"C"}},Nr=["deletion","substitution","highlight","comment","insertion"],ft=262,Ir=40,J=8;function Br(u){const e=document.createElement("div");e.className="fxr-sel-menu";for(const t of Nr){const n=lt[t],r=document.createElement("button");r.className=`fxr-sel-menu-btn fxr-sel-menu-${t}`,r.title=`${n.title}（快捷键 ${n.key}）`,r.innerHTML=`<span class="fxr-btn-icon">${n.icon}</span><span class="fxr-btn-label">${n.label}</span>`,r.addEventListener("pointerdown",o=>{o.preventDefault()}),r.addEventListener("click",()=>{u.annotate(t)}),e.appendChild(r)}return u.root.appendChild(e),{el:e,show(t){if(!u.store.state.source)return;const n=u.root.getBoundingClientRect();e.style.display="flex";let r=t.top-n.top-J-Ir;r<J&&(r=t.bottom-n.top+J);let o=t.left-n.left+t.width/2-ft/2;o=Math.max(J,Math.min(o,n.width-ft-J)),e.style.top=`${Math.max(J,r)}px`,e.style.left=`${o}px`},hide(){e.style.display="none"}}}function Rr(u){switch(u.type){case"insertion":return"插入";case"deletion":return"删除";case"substitution":return"替换";case"highlight":return"高亮";case"comment":return"评论"}}function Lr(u){const e=document.createElement("aside");e.className="fxr-comments-panel";const t=document.createElement("div");t.className="fxr-drawer-backdrop",e.innerHTML=`
    <div class="fxr-comments-head">
      <span>评论与批注</span>
      <span class="fxr-comments-tools">
        <button class="fxr-comments-tool" data-act="undo" title="撤销（⌘/Ctrl+Z）">↩ 撤销</button>
        <button class="fxr-comments-tool" data-act="redo" title="重做（⌘/Ctrl+Shift+Z）">↪ 重做</button>
        <button class="fxr-comments-tool fxr-comments-close" data-act="close" title="收起批注栏">✕</button>
        <span class="fxr-comments-count">0</span>
      </span>
    </div>
    <div class="fxr-comments-list"></div>`;const n=e.querySelector(".fxr-comments-list"),r=e.querySelector(".fxr-comments-count"),o=e.querySelector('[data-act="undo"]'),i=e.querySelector('[data-act="redo"]'),c=()=>{t.classList.remove("show"),e.classList.remove("open")},a=()=>{t.classList.add("show"),e.classList.add("open")};o.addEventListener("click",()=>u.undo()),i.addEventListener("click",()=>u.redo()),e.querySelector('[data-act="close"]').addEventListener("click",c),t.addEventListener("click",c);function s(l){const p=document.createElement("div");p.className=`fxr-comment-entry fxr-comment-entry-${l.type}`;const h=Rr(l),d=l.quotedText||(l.type==="insertion"?l.insertedText:"")||"",k=l.type==="insertion"||l.type==="substitution";p.innerHTML=`
      <div class="fxr-comment-meta">
        <span class="fxr-comment-tag fxr-comment-tag-${l.type}">${h}</span>
        <button class="fxr-comment-locate" title="定位到正文">↗</button>
        ${k?'<button class="fxr-comment-edit" title="编辑文字">✎</button>':""}
        <button class="fxr-comment-del" title="删除该批注">✕</button>
      </div>
      <div class="fxr-comment-quote"></div>
      <div class="fxr-comment-extra"></div>`,p.querySelector(".fxr-comment-quote").textContent=d;const x=p.querySelector(".fxr-comment-extra");if(l.type==="substitution")x.innerHTML='<span class="fxr-sub-old"></span><span class="fxr-sub-arrow"> → </span><span class="fxr-sub-new"></span>',x.querySelector(".fxr-sub-old").textContent=l.quotedText,x.querySelector(".fxr-sub-new").textContent=l.replacement??"";else if(l.type==="insertion")x.innerHTML='<span class="fxr-ins-text"></span>',x.querySelector(".fxr-ins-text").textContent=l.insertedText??"";else if(l.type==="comment"){const b=document.createElement("textarea");b.className="fxr-comment-note",b.placeholder="输入审阅意见…",b.value=l.comment??"",b.addEventListener("input",()=>{u.store.setComment(l.id,b.value),u.onSilentMutation()}),x.appendChild(b)}p.querySelector(".fxr-comment-locate").addEventListener("click",()=>{u.flash(l)});const E=p.querySelector(".fxr-comment-edit");return E&&E.addEventListener("click",async()=>{const b=l.type==="insertion",m=await Ku({title:b?"修改插入文字":"修改替换后的新文字",value:(b?l.insertedText:l.replacement)??"",anchor:p.getBoundingClientRect(),allowEmpty:l.type==="substitution"});m!=null&&u.store.updateAnnotation(l.id,b?{insertedText:m}:{replacement:m})}),p.querySelector(".fxr-comment-del").addEventListener("click",()=>{u.store.removeAnnotation(l.id)}),p}function f(){const l=u.store.state.annotations;if(r.textContent=String(l.length),o.disabled=!u.store.canUndo,i.disabled=!u.store.canRedo,n.innerHTML="",l.length===0){n.innerHTML='<div class="fxr-comments-empty">尚无批注。选中正文文字后点击批注按钮，或在选区旁的浮动菜单操作。</div>';return}const p=[...l].sort((h,d)=>h.srcStart-d.srcStart);for(const h of p)n.appendChild(s(h))}return{el:e,backdrop:t,refresh:f,open:a,close:c,toggle(){e.classList.contains("open")?c():a()}}}const qr=["insertion","deletion","substitution","highlight","comment"];function N(u,e,t,n){const r=document.createElement("button");return r.type="button",r.className=u,r.title=e,r.innerHTML=t,r.addEventListener("click",n),r}function Pr(u){const e=document.createElement("header");e.className="fxr-toolbar";let t=null;if(u.variant==="full"){const h=document.createElement("div");h.className="fxr-brand",h.innerHTML='<span class="fxr-brand-name">fx-review</span><span class="fxr-brand-sub"></span>',t=h.querySelector(".fxr-brand-sub"),e.appendChild(h)}const n=document.createElement("div");n.className="fxr-btn-group";for(const h of qr){const d=lt[h];n.appendChild(N(`fxr-btn fxr-btn-anno fxr-btn-anno-${h}`,`${d.title}（选中后按 ${d.key}）`,`<span class="fxr-btn-icon">${d.icon}</span><span class="fxr-btn-label">${d.label}</span>`,()=>u.annotate(h)))}e.appendChild(n);const r=document.createElement("div");r.className="fxr-btn-group";const o=N("fxr-btn fxr-btn-ghost","撤销（⌘/Ctrl+Z）","↩",()=>{u.undo()||u.notify("没有可撤销的操作")}),i=N("fxr-btn fxr-btn-ghost","重做（⌘/Ctrl+Shift+Z）","↪",()=>{u.redo()||u.notify("没有可重做的操作")}),c=N("fxr-btn fxr-btn-ghost","清除全部批注","🗑 清空",()=>{u.store.state.annotations.length!==0&&window.confirm("确定清除全部批注？")&&u.clearAnnotations()});r.append(o,i,c),e.appendChild(r);const a=document.createElement("div");a.className="fxr-btn-group",a.appendChild(N("fxr-btn fxr-btn-export","复制带 CriticMarkup 批注的全文","复制批注",()=>void u.copy(!1))),u.variant==="full"&&a.appendChild(N("fxr-btn fxr-btn-export","下载带批注的全文 .md","下载批注",()=>u.download(!1))),a.appendChild(N("fxr-btn fxr-btn-export","复制引导 Prompt + 批注全文（⌘/Ctrl+Shift+C）",u.variant==="full"?"复制(含Prompt)":"复制含P",()=>void u.copy(!0))),u.variant==="full"&&a.appendChild(N("fxr-btn fxr-btn-export","下载 Prompt + 批注全文 .md","下载(含Prompt)",()=>u.download(!0))),e.appendChild(a);const s=document.createElement("div");s.className="fxr-btn-group fxr-toolbar-tail",s.appendChild(N("fxr-btn fxr-btn-ghost","编辑「含 Prompt」导出的引导词","Prompt",()=>{u.openPromptEditor()}));let f=null;u.variant==="full"&&(f=N("fxr-btn fxr-btn-ghost","切换主题","🌙",()=>{u.setTheme(u.getTheme()==="dark"?"light":"dark")}),s.appendChild(f));const l=N("fxr-btn fxr-btn-ghost fxr-panel-toggle","打开评论与批注栏",'📋 <span class="fxr-panel-toggle-count">0</span>',()=>u.togglePanel());s.appendChild(l);const p=l.querySelector(".fxr-panel-toggle-count");return e.appendChild(s),{el:e,setFileName(h){t&&(t.textContent=h||"未打开文件"),e.title=h},setCount(h){p.textContent=String(h)},setUndoRedo(h,d){o.disabled=!h,i.disabled=!d},setThemeIcon(h){f&&(f.textContent=h==="dark"?"☀️":"🌙")}}}function $r(u){const e=document.createElement("div");e.className="fxr-modal-overlay";const t=document.createElement("div");t.className="fxr-modal-box",t.innerHTML=`
    <h3>编辑引导 Prompt</h3>
    <p class="fxr-modal-hint">复制/下载“含 Prompt”时，会把它前置到批注全文之前。</p>
    <textarea class="fxr-prompt-area" spellcheck="false"></textarea>
    <div class="fxr-modal-actions">
      <button class="fxr-btn fxr-btn-ghost" data-act="reset">恢复默认</button>
      <div class="fxr-modal-actions-right">
        <button class="fxr-btn fxr-btn-ghost" data-act="cancel">取消</button>
        <button class="fxr-btn fxr-btn-primary" data-act="save">保存</button>
      </div>
    </div>`,e.appendChild(t),e.addEventListener("click",r=>{r.target===e&&e.remove()}),u.root.appendChild(e);const n=t.querySelector(".fxr-prompt-area");n.value=u.store.state.prompt,t.querySelector('[data-act="cancel"]').addEventListener("click",()=>e.remove()),t.querySelector('[data-act="reset"]').addEventListener("click",()=>{n.value=S}),t.querySelector('[data-act="save"]').addEventListener("click",()=>{u.setPrompt(n.value.trim()||S),e.remove(),u.notify("Prompt 已保存")}),n.focus()}const Or=()=>new Promise(()=>{});let Hr=0;const wu=class wu{constructor(e){C(this,"store",new te);C(this,"root");C(this,"preview");C(this,"previewWrap");C(this,"variant");C(this,"ns");C(this,"notify");C(this,"container");C(this,"md",et());C(this,"persistence");C(this,"toaster");C(this,"toolbarApi");C(this,"commentsApi");C(this,"menuApi");C(this,"emptyState");C(this,"disposers",[]);C(this,"themeMode");C(this,"theme","light");C(this,"lastRenderedSource","");C(this,"notifiedNoHighlight",!1);this.container=e.container,this.variant=e.variant??"full",this.themeMode=e.theme??(this.variant==="compact"?"host":"auto"),this.ns=e.ns??(this.variant==="compact"?`fxr${++Hr}`:""),this.toaster=Mr(()=>this.root.isConnected?this.root:this.container),this.notify=(n,r)=>this.toaster(n,r),this.root=document.createElement("div"),this.root.className=`fxr-root${this.variant==="compact"?" fxr-compact":""}`,e.storagePrefix!==null?(this.persistence=new re(this.store,{prefix:e.storagePrefix??"fx-review:",maxDocs:e.maxSavedDocs}),this.disposers.push(()=>this.persistence?.dispose())):this.persistence=null,this.root=document.createElement("div"),this.root.className=`fxr-root${this.variant==="compact"?" fxr-compact":""}`;const t=document.createElement("div");if(t.className="fxr-workspace",this.previewWrap=document.createElement("section"),this.previewWrap.className="fxr-preview-wrap",this.preview=document.createElement("article"),this.preview.className="fxr-preview markdown-body",this.emptyState=e.emptyState??jr(),this.previewWrap.append(this.preview,this.emptyState),this.commentsApi=Lr(this),this.toolbarApi=Pr(this),this.root.append(this.toolbarApi.el,t),t.append(this.previewWrap,this.commentsApi.el,this.commentsApi.backdrop),this.container.appendChild(this.root),e.bindScrollport?.(this.previewWrap),this.disposers.push(()=>e.bindScrollport?.(null)),this.ns){const n=document.createElement("style");n.dataset.fxrHighlightNs=this.ns,n.textContent=Ur(this.ns),document.head.appendChild(n),this.disposers.push(()=>n.remove())}this.store.state.prompt=e.prompt??(this.variant==="full"?vt()??S:S),this.store.subscribe(()=>this.renderAll()),cr(this.md,()=>{this.lastRenderedSource="",this.renderAll()},e.loadHighlighter??Or),this.initTheme(),this.installSelectionBridge(),this.installKeys(),e.source!=null&&e.source!==""&&e.fileName?this.setDocument(e.fileName,e.source):this.renderAll()}setDocument(e,t){if(e===this.store.state.fileName&&t===this.store.state.source)return this.store.state.annotations.length;const n=this.persistence?.restore(e,t)??[];return this.store.loadFile(e,t,n),n.length}setPrompt(e){this.store.setPrompt(e),this.variant==="full"&&Et(e)}undo(){return this.store.undo()}redo(){return this.store.redo()}clearAnnotations(){this.store.state.annotations.length!==0&&(this.store.clearAnnotations(),this.notify("已清除全部批注"))}getAnnotatedSource(e){const t=it(this.store.state.source,this.store.state.annotations);return e?`${this.store.state.prompt}

${t}`:t}annotationCount(){return this.store.state.annotations.length}setTheme(e){this.theme=e,this.root.dataset.theme=e,this.toolbarApi.setThemeIcon(e)}getTheme(){return this.theme}togglePanel(){this.commentsApi.toggle()}openPromptEditor(){$r(this)}annotate(e){if(!this.store.state.source){this.notify("请先打开 Markdown 文档");return}vr(e,Er(),{store:this.store,notify:this.notify})}async copy(e){this.requireDocument()&&(e?await Tr(this.store,this.notify):await Fr(this.store,this.notify))}download(e){this.requireDocument()&&(e?zr(this.store,this.notify):Sr(this.store,this.notify))}flash(e){pr(this.preview,e,this.ns)}onSilentMutation(){this.persistence?.saveSoon(),this.commentsApi.refresh(),this.toolbarApi.setCount(this.store.state.annotations.length)}destroy(){for(const e of this.disposers.splice(0))try{e()}catch{}if(this.ns)for(const e of["cm-del","cm-hl","cm-sub-old","cm-comment","cm-flash"])try{CSS.highlights?.delete(`${this.ns}-${e}`)}catch{}this.root.remove()}requireDocument(){return this.store.state.source?!0:(this.notify("请先打开 Markdown 文档"),!1)}renderAll(){const{source:e,annotations:t}=this.store.state;e!==this.lastRenderedSource&&(this.lastRenderedSource=e,e?(this.preview.innerHTML=ir(this.md,e),this.preview.style.display="block",this.emptyState.style.display="none"):(this.preview.innerHTML="",this.preview.style.display="none",this.emptyState.style.display="flex")),e&&(fr(this.preview,t,this.ns),!this.notifiedNoHighlight&&!hr()&&(this.notifiedNoHighlight=!0,this.variant==="full"&&this.notify("当前浏览器不支持 Highlight API，批注将降级显示",4e3))),this.commentsApi.refresh(),this.toolbarApi.setFileName(this.store.state.fileName||(this.variant==="full"?"未打开文件":"")),this.toolbarApi.setCount(t.length),this.toolbarApi.setUndoRedo(this.store.canUndo,this.store.canRedo)}initTheme(){if(this.themeMode==="host"){const n=()=>document.body?.hasAttribute("data-ds-dark-theme")||window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light";this.setTheme(n());const r=new MutationObserver(()=>this.setTheme(n()));r.observe(document.documentElement,{attributes:!0,attributeFilter:["data-ds-dark-theme"]}),r.observe(document.body??document.documentElement,{attributes:!0,attributeFilter:["data-ds-dark-theme"]}),this.disposers.push(()=>r.disconnect());return}const e=window.matchMedia("(prefers-color-scheme: dark)");this.setTheme(e.matches?"dark":"light");const t=n=>this.setTheme(n.matches?"dark":"light");e.addEventListener("change",t),this.disposers.push(()=>e.removeEventListener("change",t))}installSelectionBridge(){this.menuApi=Br(this);let e=0;const t=()=>{e&&cancelAnimationFrame(e),e=requestAnimationFrame(()=>{e=0;const r=window.getSelection();if(!r||r.isCollapsed||r.rangeCount===0||!this.store.state.source){this.menuApi.hide();return}const o=r.getRangeAt(0);if(!this.preview.contains(o.commonAncestorContainer)){this.menuApi.hide();return}const i=o.getBoundingClientRect();if(i.width===0&&i.height===0){this.menuApi.hide();return}this.menuApi.show(i)})};document.addEventListener("selectionchange",t),this.disposers.push(()=>{document.removeEventListener("selectionchange",t),e&&cancelAnimationFrame(e)});const n=()=>this.menuApi.hide();this.previewWrap.addEventListener("scroll",n,{passive:!0}),this.disposers.push(()=>this.previewWrap.removeEventListener("scroll",n))}isTypingTarget(e){return e instanceof HTMLTextAreaElement||e instanceof HTMLInputElement||e instanceof HTMLElement&&e.isContentEditable}isActive(e){if(e instanceof Node&&this.root.contains(e))return!0;const t=window.getSelection();return!!(t&&t.rangeCount>0&&this.preview.contains(t.getRangeAt(0).commonAncestorContainer))}selectionInPreview(){const e=window.getSelection();return!e||e.isCollapsed||e.rangeCount===0?!1:this.preview.contains(e.getRangeAt(0).commonAncestorContainer)}installKeys(){const e=t=>{if(!this.root.isConnected||this.isTypingTarget(t.target))return;const n=t.key.toLowerCase();if((t.metaKey||t.ctrlKey)&&t.shiftKey&&n==="c"){if(!this.isActive(t.target)||(t.preventDefault(),!this.requireDocument()))return;this.copy(!0);return}if((t.metaKey||t.ctrlKey)&&!t.altKey&&n==="z"){if(!this.isActive(t.target))return;t.preventDefault(),(t.shiftKey?this.redo():this.undo())||this.notify(t.shiftKey?"没有可重做的操作":"没有可撤销的操作");return}if(!t.metaKey&&!t.ctrlKey&&!t.altKey&&this.store.state.source&&this.selectionInPreview()){const r=wu.SINGLE_KEY_ANNOTATIONS[n];r&&(t.preventDefault(),this.annotate(r))}};window.addEventListener("keydown",e),this.disposers.push(()=>window.removeEventListener("keydown",e))}};C(wu,"SINGLE_KEY_ANNOTATIONS",{d:"deletion",s:"substitution",h:"highlight",c:"comment",i:"insertion"});let Xu=wu;function jr(){const u=document.createElement("div");return u.className="fxr-empty",u.innerHTML='<div class="fxr-empty-line">打开 Markdown 文档后开始批注审阅</div>',u}function Ur(u){return[`::highlight(${u}-cm-del){color:var(--cm-del);text-decoration:line-through;text-decoration-color:var(--cm-del)}`,`::highlight(${u}-cm-hl){background-color:var(--cm-hl-bg)}`,`::highlight(${u}-cm-sub-old){color:var(--cm-del);text-decoration:line-through;text-decoration-color:var(--cm-del)}`,`::highlight(${u}-cm-comment){background-color:var(--cm-comment-bg);text-decoration:underline wavy var(--cm-comment-line)}`,`::highlight(${u}-cm-flash){background-color:var(--cm-flash)}`].join(`
`)}function Zr(u){return new Xu(u)}const Gr="fx-review:embed:";function Wr(u){if(!u)return null;if(u.kind==="bytes"&&u.data)try{return new TextDecoder("utf-8",{fatal:!0}).decode(u.data)}catch{return null}return u.kind==="text"&&typeof u.text=="string"?u.text:null}function Vr(u){if(!u)return"document.md";try{const t=u.split(/[?#]/)[0].replace(/^dsh-resource:\/\/file\//,"").split("/").filter(Boolean).pop();return t&&decodeURIComponent(t)||"document.md"}catch{return"document.md"}}function Kr(u,e){return function(n){const r=u.useRef(null),o=u.useRef(null);return u.useEffect(()=>{const i=r.current;if(!i)return;const c=e({container:i,variant:"compact",theme:"host",storagePrefix:Gr,maxSavedDocs:50,bindScrollport:a=>n.scrollportRef?.(a)});return o.current=c,()=>{c.destroy(),o.current=null}},[]),u.useEffect(()=>{const i=Wr(n.content);if(i==null){n.content&&o.current?.notify("文件内容不是 UTF-8 文本，无法批注");return}o.current?.setDocument(Vr(n.resourceAddress),i)},[n.content,n.resourceAddress]),u.createElement("div",{ref:r,className:"fxr-host"})}}const dt="dsh-fx-review/criticmarkup",Qu="dshFxReview",Yr={"viewer.label":"fx-review 批注"},Jr={"viewer.label":"fx-review"};function Xr(u){if(document.querySelector("style[data-fxr-embed-css]"))return;const e=document.createElement("style");e.dataset.fxrEmbedCss="",e.textContent=u,document.head.appendChild(e)}function Qr(u){const e=Kr(u.react,u.mountReviewer),t=["slots","locale","documentPreviews"];function n(r){const o=r.locale.bind(Qu);r.effect(()=>r.locale.register(Qu,{zh:Yr,en:Jr}),"dsh-fx-review: dictionaries"),Xr(u.embedCss),r.effect(()=>r.documentPreviews.register({id:dt,extensions:["md","markdown","mdown"],priority:"extension",title:()=>o("viewer.label"),loading:"bytes-complete",wrap:!1}),"dsh-fx-review: renderer metadata"),r.effect(()=>r.slots.inject("sidebar.right.tab.document",()=>r.slots.register({name:"sidebar.right.tab.document",key:dt,locale:Qu},e)),"dsh-fx-review: renderer body")}return{inject:t,apply:n}}const ue={exports:{}};window.__ModuleLoader__.load({id:"dsh-fx-review",factory:u=>{const e=u("react"),t=Qr({react:e,mountReviewer:Zr,embedCss:U});return ue.exports.inject=t.inject,ue.exports.apply=t.apply,ue.exports}})})();
