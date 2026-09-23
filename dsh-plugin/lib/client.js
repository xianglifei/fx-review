var lo=Object.defineProperty;var fo=(U,T,Q)=>T in U?lo(U,T,{enumerable:!0,configurable:!0,writable:!0,value:Q}):U[T]=Q;var C=(U,T,Q)=>fo(U,typeof T!="symbol"?T+"":T,Q);(function(){"use strict";const U=`/* ============================================================
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
  /* 宿主（dsh 文档预览 body）是 pre-wrap：会把我们 innerHTML 模板的缩进换行
     渲染成大段空白，显式恢复 normal（quote/note 等需要 pre-wrap 的自行声明） */
  white-space: normal;
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
  width: var(--fxr-panel-w, 320px);
  flex-shrink: 0;
  border-left: 1px solid var(--fxr-border);
  background: var(--fxr-bg-elev);
  display: flex;
  flex-direction: column;
  min-height: 0;
}
/* 宽度拖拽手柄（宽容器侧栏模式；窄容器抽屉模式隐藏） */
.fxr-resizer {
  position: absolute;
  left: -4px;
  top: 0;
  bottom: 0;
  width: 9px;
  cursor: col-resize;
  z-index: 5;
  touch-action: none;
}
.fxr-resizer::after {
  content: '';
  position: absolute;
  left: 3px;
  top: 50%;
  height: 28px;
  margin-top: -14px;
  width: 3px;
  border-radius: 2px;
  background: var(--fxr-border);
  opacity: 0;
  transition: opacity 0.12s;
}
.fxr-resizer:hover::after,
.fxr-resizer:active::after {
  opacity: 1;
  background: var(--fxr-text-mute);
}
.fxr-comments-panel {
  position: relative;
}
/* 窄容器浮动按钮（compact 无工具栏后的评论抽屉入口） */
.fxr-panel-fab {
  display: none;
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 30;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--fxr-border);
  background: var(--fxr-bg-elev);
  color: var(--fxr-text-soft);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  box-shadow: var(--fxr-shadow);
}
.fxr-panel-fab:hover {
  background: var(--fxr-bg-soft);
}
.fxr-panel-fab-count {
  background: var(--fxr-bg-soft);
  border-radius: 999px;
  padding: 0 6px;
  font-size: 11px;
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
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--fxr-border);
  font-weight: 600;
  font-size: 13px;
}
.fxr-comments-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fxr-comments-tools {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}
.fxr-comments-tail {
  margin-left: auto;
}
.fxr-submit-btn {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--fxr-accent);
  background: var(--fxr-accent);
  color: #fff;
  border-radius: 6px;
  padding: 3px 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
}
.fxr-submit-btn:hover {
  filter: brightness(1.08);
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

/* ===== 提交 chip（挂 conversation dock，宿主页面层、不在 .fxr-root 内） ===== */
.fxr-dock {
  padding-top: 4px;
}
.fxr-dock .fxr-dock-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--fxr-border, #e4e6ea);
  background: var(--fxr-bg-elev, #fff);
  color: var(--fxr-text, #1f2328);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12.5px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.fxr-dock .fxr-dock-chip:hover {
  background: var(--fxr-bg-soft, #f0f1f3);
}
.fxr-dock-chevron {
  color: var(--fxr-text-mute, #8b949e);
  font-size: 10px;
}
.fxr-dock-box {
  margin-top: 6px;
  border: 1px solid var(--fxr-border, #e4e6ea);
  border-radius: 10px;
  background: var(--fxr-bg-elev, #fff);
  padding: 10px;
  max-width: 560px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
}
.fxr-dock-preview {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--fxr-text, #1f2328);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 160px;
  overflow: auto;
  background: var(--fxr-bg-soft, #f0f1f3);
  border-radius: 6px;
  padding: 8px;
}
.fxr-dock-hint {
  font-size: 12px;
  color: var(--fxr-text-mute, #8b949e);
  margin: 8px 0 6px;
}
.fxr-dock .fxr-dock-remove {
  border: none;
  background: transparent;
  color: var(--fxr-text-soft, #57606a);
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}
.fxr-dock .fxr-dock-remove:hover {
  background: var(--fxr-bg-soft, #f0f1f3);
  color: var(--fxr-text, #1f2328);
}
/* dsh 暗色主题（body[data-ds-dark-theme]）：chip 在宿主页面层，吃不到 .fxr-root 变量 */
body[data-ds-dark-theme] .fxr-dock-chip {
  border-color: #30363d;
  background: #161b22;
  color: #e6edf3;
}
body[data-ds-dark-theme] .fxr-dock-chip:hover {
  background: #21262d;
}
body[data-ds-dark-theme] .fxr-dock-chevron {
  color: #6e7681;
}
body[data-ds-dark-theme] .fxr-dock-box {
  border-color: #30363d;
  background: #161b22;
}
body[data-ds-dark-theme] .fxr-dock-preview {
  background: #21262d;
  color: #e6edf3;
}
body[data-ds-dark-theme] .fxr-dock-hint {
  color: #6e7681;
}
body[data-ds-dark-theme] .fxr-dock-remove {
  color: #9198a1;
}
body[data-ds-dark-theme] .fxr-dock-remove:hover {
  background: #21262d;
  color: #e6edf3;
}

/* ===== 输入浮层（挂 body，视口定位） =====
 * body 层组件两条硬规则：①box-sizing 必须 border-box（网页版的 * 重置到不了
 * 这里，content-box 会让 width:100% 的文本框溢出容器）；②按钮样式要带容器
 * 前缀提到两类特异性——dsh 暗色主题的按钮重置是 [data-ds-dark-theme]…button
 * （1类+1元素），单类选择器会被它压掉（确认按钮白字透明底的隐形事故）。 */
.fxr-input-popover {
  position: absolute;
  z-index: 90;
  box-sizing: border-box;
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
  box-sizing: border-box;
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
.fxr-input-popover .fxr-btn {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid var(--fxr-border, #e4e6ea);
  background: var(--fxr-bg-elev, #fff);
  color: var(--fxr-text, #1f2328);
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
}
.fxr-input-popover .fxr-btn:hover {
  background: var(--fxr-bg-soft, #f0f1f3);
}
.fxr-input-popover .fxr-btn-primary {
  background: var(--fxr-accent, #2563eb);
  border-color: var(--fxr-accent, #2563eb);
  color: #fff;
}
.fxr-input-popover .fxr-btn-primary:hover {
  filter: brightness(1.08);
  background: var(--fxr-accent, #2563eb);
}
.fxr-input-popover .fxr-btn-ghost {
  background: transparent;
  border-color: transparent;
  color: var(--fxr-text-soft, #57606a);
}
.fxr-input-popover .fxr-btn-ghost:hover {
  background: var(--fxr-bg-soft, #f0f1f3);
}
/* dsh 暗色主题 */
[data-ds-dark-theme] .fxr-input-popover {
  border-color: #30363d;
  background: #161b22;
  color: #e6edf3;
}
[data-ds-dark-theme] .fxr-input-popover-area {
  background: #0d1117;
  border-color: #30363d;
  color: #e6edf3;
}
[data-ds-dark-theme] .fxr-input-popover .fxr-btn {
  border-color: #30363d;
  background: #161b22;
  color: #e6edf3;
}
[data-ds-dark-theme] .fxr-input-popover .fxr-btn:hover {
  background: #21262d;
}
[data-ds-dark-theme] .fxr-input-popover .fxr-btn-primary {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}
[data-ds-dark-theme] .fxr-input-popover .fxr-btn-ghost {
  background: transparent;
  border-color: transparent;
  color: #9198a1;
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
  .fxr-resizer {
    display: none;
  }
  .fxr-panel-fab {
    display: inline-flex;
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
`,T="你是一名文本审阅助手。下面是一份带有 CriticMarkup 批注的 Markdown 文档，请根据批注修改文档，并输出修改后的完整 Markdown：\n- `{++ 文字 ++}` 建议插入的新内容\n- `{-- 文字 --}` 建议删除的内容\n- `{~~ 旧 ~> 新 ~~}` 建议把“旧”替换为“新”\n- `{== 文字 ==}` 需重点关注的部分\n- `{>> 备注 <<}` 审阅意见\n\n请保留未批注部分的原始结构，仅按批注调整，输出完整文档。\n\n文档如下：";class te{constructor(){C(this,"state",{fileName:"",source:"",annotations:[],prompt:T});C(this,"listeners",new Set);C(this,"undoStack",[]);C(this,"redoStack",[])}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){for(const e of this.listeners)e()}snapshot(){this.undoStack.push(this.state.annotations),this.undoStack.length>100&&this.undoStack.shift(),this.redoStack=[]}loadFile(e,n,t=[]){this.state={...this.state,fileName:e,source:n,annotations:[...t]},this.undoStack=[],this.redoStack=[],this.notify()}addAnnotation(e){this.snapshot(),this.state={...this.state,annotations:[...this.state.annotations,e]},this.notify()}updateAnnotation(e,n){this.snapshot(),this.state={...this.state,annotations:this.state.annotations.map(t=>t.id===e?{...t,...n}:t)},this.notify()}setComment(e,n){this.state={...this.state,annotations:this.state.annotations.map(t=>t.id===e?{...t,comment:n}:t)}}removeAnnotation(e){this.snapshot(),this.state={...this.state,annotations:this.state.annotations.filter(n=>n.id!==e)},this.notify()}clearAnnotations(){this.snapshot(),this.state={...this.state,annotations:[]},this.notify()}setPrompt(e){this.state={...this.state,prompt:e},this.notify()}overlaps(e,n){return e===n?!1:this.state.annotations.some(t=>t.srcStart===t.srcEnd?!1:e<t.srcEnd&&n>t.srcStart)}get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}undo(){const e=this.undoStack.pop();return e?(this.redoStack.push(this.state.annotations),this.state={...this.state,annotations:e},this.notify(),!0):!1}redo(){const e=this.redoStack.pop();return e?(this.undoStack.push(this.state.annotations),this.state={...this.state,annotations:e},this.notify(),!0):!1}}const gn=new te,kn="fx-review:doc:",_n="fx-review:docs",re="fx-review:prompt",yn=20,vn=500,Cn=["insertion","deletion","substitution","highlight","comment"];function En(u){let e=2166136261;for(let n=0;n<u.length;n++)e^=u.charCodeAt(n),e=Math.imul(e,16777619);return(e>>>0).toString(36)}function wn(u){if(typeof u!="object"||u===null)return!1;const e=u;return typeof e.id=="string"&&typeof e.type=="string"&&Cn.includes(e.type)&&typeof e.srcStart=="number"&&typeof e.srcEnd=="number"}function Dn(u){if(!u)return[];try{const e=localStorage.getItem(u);if(!e)return[];const n=JSON.parse(e);return n.version!==1||!Array.isArray(n.annotations)?[]:n.annotations.filter(wn)}catch{return[]}}class oe{constructor(e,n={}){C(this,"store");C(this,"prefix");C(this,"indexKey");C(this,"maxDocs");C(this,"saveTimer",0);C(this,"unsubscribe");this.store=e,this.prefix=n.prefix??kn,this.indexKey=n.indexKey??_n,this.maxDocs=n.maxDocs??yn,this.unsubscribe=n.subscribe===!1?null:e.subscribe(()=>this.save())}docKey(e,n){return`${this.prefix}${e}:${En(n)}`}restore(e,n){return!e||!n?[]:Dn(this.docKey(e,n))}readIndex(){try{const e=localStorage.getItem(this.indexKey),n=e?JSON.parse(e):[];return Array.isArray(n)?n.filter(t=>typeof t=="object"&&t!==null&&typeof t.key=="string"):[]}catch{return[]}}touchIndex(e){const n=this.readIndex().filter(r=>r.key!==e);n.push({key:e,savedAt:Date.now()});const t=n.splice(0,Math.max(0,n.length-this.maxDocs));try{localStorage.setItem(this.indexKey,JSON.stringify(n));for(const r of t)localStorage.removeItem(r.key)}catch{}}removeFromIndex(e){try{localStorage.removeItem(e),localStorage.setItem(this.indexKey,JSON.stringify(this.readIndex().filter(n=>n.key!==e)))}catch{}}save(){const{fileName:e,source:n,annotations:t}=this.store.state;if(!e||!n)return;const r=this.docKey(e,n);try{if(t.length===0){this.removeFromIndex(r);return}const o={version:1,annotations:t,savedAt:Date.now()};localStorage.setItem(r,JSON.stringify(o)),this.touchIndex(r)}catch{}}saveSoon(){this.saveTimer&&window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{this.saveTimer=0,this.save()},vn)}dispose(){this.saveTimer&&window.clearTimeout(this.saveTimer),this.unsubscribe?.()}}new oe(gn,{subscribe:!1});function An(u){try{localStorage.setItem(re,u)}catch{}}function Fn(){try{return localStorage.getItem(re)}catch{return null}}const ie={};function Sn(u){let e=ie[u];if(e)return e;e=ie[u]=[];for(let n=0;n<128;n++){const t=String.fromCharCode(n);e.push(t)}for(let n=0;n<u.length;n++){const t=u.charCodeAt(n);e[t]="%"+("0"+t.toString(16).toUpperCase()).slice(-2)}return e}function W(u,e){typeof e!="string"&&(e=W.defaultChars);const n=Sn(e);return u.replace(/(%[a-f0-9]{2})+/gi,function(t){let r="";for(let o=0,i=t.length;o<i;o+=3){const c=parseInt(t.slice(o+1,o+3),16);if(c<128){r+=n[c];continue}if((c&224)===192&&o+3<i){const a=parseInt(t.slice(o+4,o+6),16);if((a&192)===128){const s=c<<6&1984|a&63;s<128?r+="��":r+=String.fromCharCode(s),o+=3;continue}}if((c&240)===224&&o+6<i){const a=parseInt(t.slice(o+4,o+6),16),s=parseInt(t.slice(o+7,o+9),16);if((a&192)===128&&(s&192)===128){const l=c<<12&61440|a<<6&4032|s&63;l<2048||l>=55296&&l<=57343?r+="���":r+=String.fromCharCode(l),o+=6;continue}}if((c&248)===240&&o+9<i){const a=parseInt(t.slice(o+4,o+6),16),s=parseInt(t.slice(o+7,o+9),16),l=parseInt(t.slice(o+10,o+12),16);if((a&192)===128&&(s&192)===128&&(l&192)===128){let p=c<<18&1835008|a<<12&258048|s<<6&4032|l&63;p<65536||p>1114111?r+="����":(p-=65536,r+=String.fromCharCode(55296+(p>>10),56320+(p&1023))),o+=9;continue}}r+="�"}return r})}W.defaultChars=";/?:@&=+$,#",W.componentChars="";const ce={};function Tn(u){let e=ce[u];if(e)return e;e=ce[u]=[];for(let n=0;n<128;n++){const t=String.fromCharCode(n);/^[0-9a-z]$/i.test(t)?e.push(t):e.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<u.length;n++)e[u.charCodeAt(n)]=u[n];return e}function uu(u,e,n){typeof e!="string"&&(n=e,e=uu.defaultChars),typeof n>"u"&&(n=!0);const t=Tn(e);let r="";for(let o=0,i=u.length;o<i;o++){const c=u.charCodeAt(o);if(n&&c===37&&o+2<i&&/^[0-9a-f]{2}$/i.test(u.slice(o+1,o+3))){r+=u.slice(o,o+3),o+=2;continue}if(c<128){r+=t[c];continue}if(c>=55296&&c<=57343){if(c>=55296&&c<=56319&&o+1<i){const a=u.charCodeAt(o+1);if(a>=56320&&a<=57343){r+=encodeURIComponent(u[o]+u[o+1]),o++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(u[o])}return r}uu.defaultChars=";/?:@&=+$,-_.!~*'()#",uu.componentChars="-_.!~*'()";function Su(u){let e="";return e+=u.protocol||"",e+=u.slashes?"//":"",e+=u.auth?u.auth+"@":"",u.hostname&&u.hostname.indexOf(":")!==-1?e+="["+u.hostname+"]":e+=u.hostname||"",e+=u.port?":"+u.port:"",e+=u.pathname||"",e+=u.search||"",e+=u.hash||"",e}function lu(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const zn=/^([a-z0-9.+-]+:)/i,Nn=/:[0-9]*$/,Mn=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,In=["<",">",'"',"`"," ","\r",`
`,"	"],Rn=["{","}","|","\\","^","`"].concat(In),Bn=["'"].concat(Rn),ae=["%","/","?",";","#"].concat(Bn),se=["/","?","#"],Ln=255,le=/^[+a-z0-9A-Z_-]{0,63}$/,qn=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,fe={javascript:!0,"javascript:":!0},de={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Tu(u,e){if(u&&u instanceof lu)return u;const n=new lu;return n.parse(u,e),n}lu.prototype.parse=function(u,e){let n,t,r,o=u;if(o=o.trim(),!e&&u.split("#").length===1){const s=Mn.exec(o);if(s)return this.pathname=s[1],s[2]&&(this.search=s[2]),this}let i=zn.exec(o);if(i&&(i=i[0],n=i.toLowerCase(),this.protocol=i,o=o.substr(i.length)),(e||i||o.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=o.substr(0,2)==="//",r&&!(i&&fe[i])&&(o=o.substr(2),this.slashes=!0)),!fe[i]&&(r||i&&!de[i])){let s=-1;for(let d=0;d<se.length;d++)t=o.indexOf(se[d]),t!==-1&&(s===-1||t<s)&&(s=t);let l,p;s===-1?p=o.lastIndexOf("@"):p=o.lastIndexOf("@",s),p!==-1&&(l=o.slice(0,p),o=o.slice(p+1),this.auth=l),s=-1;for(let d=0;d<ae.length;d++)t=o.indexOf(ae[d]),t!==-1&&(s===-1||t<s)&&(s=t);s===-1&&(s=o.length),o[s-1]===":"&&s--;const h=o.slice(0,s);o=o.slice(s),this.parseHost(h),this.hostname=this.hostname||"";const f=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!f){const d=this.hostname.split(/\./);for(let g=0,m=d.length;g<m;g++){const _=d[g];if(_&&!_.match(le)){let x="";for(let b=0,k=_.length;b<k;b++)_.charCodeAt(b)>127?x+="x":x+=_[b];if(!x.match(le)){const b=d.slice(0,g),k=d.slice(g+1),y=_.match(qn);y&&(b.push(y[1]),k.unshift(y[2])),k.length&&(o=k.join(".")+o),this.hostname=b.join(".");break}}}}this.hostname.length>Ln&&(this.hostname=""),f&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const c=o.indexOf("#");c!==-1&&(this.hash=o.substr(c),o=o.slice(0,c));const a=o.indexOf("?");return a!==-1&&(this.search=o.substr(a),o=o.slice(0,a)),o&&(this.pathname=o),de[n]&&this.hostname&&!this.pathname&&(this.pathname=""),this},lu.prototype.parseHost=function(u){let e=Nn.exec(u);e&&(e=e[0],e!==":"&&(this.port=e.substr(1)),u=u.substr(0,u.length-e.length)),u&&(this.hostname=u)};const Pn=Object.freeze(Object.defineProperty({__proto__:null,decode:W,encode:uu,format:Su,parse:Tu},Symbol.toStringTag,{value:"Module"})),he=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,pe=/[\0-\x1F\x7F-\x9F]/,$n=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,zu=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,be=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,xe=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,On=Object.freeze(Object.defineProperty({__proto__:null,Any:he,Cc:pe,Cf:$n,P:zu,S:be,Z:xe},Symbol.toStringTag,{value:"Module"})),Hn=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(u=>u.charCodeAt(0))),jn=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(u=>u.charCodeAt(0)));var Nu;const Un=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),Zn=(Nu=String.fromCodePoint)!==null&&Nu!==void 0?Nu:function(u){let e="";return u>65535&&(u-=65536,e+=String.fromCharCode(u>>>10&1023|55296),u=56320|u&1023),e+=String.fromCharCode(u),e};function Wn(u){var e;return u>=55296&&u<=57343||u>1114111?65533:(e=Un.get(u))!==null&&e!==void 0?e:u}var A;(function(u){u[u.NUM=35]="NUM",u[u.SEMI=59]="SEMI",u[u.EQUALS=61]="EQUALS",u[u.ZERO=48]="ZERO",u[u.NINE=57]="NINE",u[u.LOWER_A=97]="LOWER_A",u[u.LOWER_F=102]="LOWER_F",u[u.LOWER_X=120]="LOWER_X",u[u.LOWER_Z=122]="LOWER_Z",u[u.UPPER_A=65]="UPPER_A",u[u.UPPER_F=70]="UPPER_F",u[u.UPPER_Z=90]="UPPER_Z"})(A||(A={}));const Gn=32;var O;(function(u){u[u.VALUE_LENGTH=49152]="VALUE_LENGTH",u[u.BRANCH_LENGTH=16256]="BRANCH_LENGTH",u[u.JUMP_TABLE=127]="JUMP_TABLE"})(O||(O={}));function Mu(u){return u>=A.ZERO&&u<=A.NINE}function Vn(u){return u>=A.UPPER_A&&u<=A.UPPER_F||u>=A.LOWER_A&&u<=A.LOWER_F}function Kn(u){return u>=A.UPPER_A&&u<=A.UPPER_Z||u>=A.LOWER_A&&u<=A.LOWER_Z||Mu(u)}function Yn(u){return u===A.EQUALS||Kn(u)}var F;(function(u){u[u.EntityStart=0]="EntityStart",u[u.NumericStart=1]="NumericStart",u[u.NumericDecimal=2]="NumericDecimal",u[u.NumericHex=3]="NumericHex",u[u.NamedEntity=4]="NamedEntity"})(F||(F={}));var $;(function(u){u[u.Legacy=0]="Legacy",u[u.Strict=1]="Strict",u[u.Attribute=2]="Attribute"})($||($={}));class Xn{constructor(e,n,t){this.decodeTree=e,this.emitCodePoint=n,this.errors=t,this.state=F.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=$.Strict}startEntity(e){this.decodeMode=e,this.state=F.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,n){switch(this.state){case F.EntityStart:return e.charCodeAt(n)===A.NUM?(this.state=F.NumericStart,this.consumed+=1,this.stateNumericStart(e,n+1)):(this.state=F.NamedEntity,this.stateNamedEntity(e,n));case F.NumericStart:return this.stateNumericStart(e,n);case F.NumericDecimal:return this.stateNumericDecimal(e,n);case F.NumericHex:return this.stateNumericHex(e,n);case F.NamedEntity:return this.stateNamedEntity(e,n)}}stateNumericStart(e,n){return n>=e.length?-1:(e.charCodeAt(n)|Gn)===A.LOWER_X?(this.state=F.NumericHex,this.consumed+=1,this.stateNumericHex(e,n+1)):(this.state=F.NumericDecimal,this.stateNumericDecimal(e,n))}addToNumericResult(e,n,t,r){if(n!==t){const o=t-n;this.result=this.result*Math.pow(r,o)+parseInt(e.substr(n,o),r),this.consumed+=o}}stateNumericHex(e,n){const t=n;for(;n<e.length;){const r=e.charCodeAt(n);if(Mu(r)||Vn(r))n+=1;else return this.addToNumericResult(e,t,n,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(e,t,n,16),-1}stateNumericDecimal(e,n){const t=n;for(;n<e.length;){const r=e.charCodeAt(n);if(Mu(r))n+=1;else return this.addToNumericResult(e,t,n,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(e,t,n,10),-1}emitNumericEntity(e,n){var t;if(this.consumed<=n)return(t=this.errors)===null||t===void 0||t.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===A.SEMI)this.consumed+=1;else if(this.decodeMode===$.Strict)return 0;return this.emitCodePoint(Wn(this.result),this.consumed),this.errors&&(e!==A.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,n){const{decodeTree:t}=this;let r=t[this.treeIndex],o=(r&O.VALUE_LENGTH)>>14;for(;n<e.length;n++,this.excess++){const i=e.charCodeAt(n);if(this.treeIndex=Jn(t,r,this.treeIndex+Math.max(1,o),i),this.treeIndex<0)return this.result===0||this.decodeMode===$.Attribute&&(o===0||Yn(i))?0:this.emitNotTerminatedNamedEntity();if(r=t[this.treeIndex],o=(r&O.VALUE_LENGTH)>>14,o!==0){if(i===A.SEMI)return this.emitNamedEntityData(this.treeIndex,o,this.consumed+this.excess);this.decodeMode!==$.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var e;const{result:n,decodeTree:t}=this,r=(t[n]&O.VALUE_LENGTH)>>14;return this.emitNamedEntityData(n,r,this.consumed),(e=this.errors)===null||e===void 0||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,n,t){const{decodeTree:r}=this;return this.emitCodePoint(n===1?r[e]&~O.VALUE_LENGTH:r[e+1],t),n===3&&this.emitCodePoint(r[e+2],t),t}end(){var e;switch(this.state){case F.NamedEntity:return this.result!==0&&(this.decodeMode!==$.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case F.NumericDecimal:return this.emitNumericEntity(0,2);case F.NumericHex:return this.emitNumericEntity(0,3);case F.NumericStart:return(e=this.errors)===null||e===void 0||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case F.EntityStart:return 0}}}function me(u){let e="";const n=new Xn(u,t=>e+=Zn(t));return function(r,o){let i=0,c=0;for(;(c=r.indexOf("&",c))>=0;){e+=r.slice(i,c),n.startEntity(o);const s=n.write(r,c+1);if(s<0){i=c+n.end();break}i=c+s,c=s===0?i+1:i}const a=e+r.slice(i);return e="",a}}function Jn(u,e,n,t){const r=(e&O.BRANCH_LENGTH)>>7,o=e&O.JUMP_TABLE;if(r===0)return o!==0&&t===o?n:-1;if(o){const a=t-o;return a<0||a>=r?-1:u[n+a]-1}let i=n,c=i+r-1;for(;i<=c;){const a=i+c>>>1,s=u[a];if(s<t)i=a+1;else if(s>t)c=a-1;else return u[a+r]}return-1}const ge=me(Hn);me(jn);function Qn(u,e=$.Legacy){return ge(u,e)}function ut(u){return ge(u,$.Strict)}function et(u){return Object.prototype.toString.call(u)}function Iu(u){return et(u)==="[object String]"}const nt=Object.prototype.hasOwnProperty;function tt(u,e){return nt.call(u,e)}function fu(u){return Array.prototype.slice.call(arguments,1).forEach(function(n){if(n){if(typeof n!="object")throw new TypeError(n+"must be object");Object.keys(n).forEach(function(t){u[t]=n[t]})}}),u}function ke(u,e,n){return[].concat(u.slice(0,e),n,u.slice(e+1))}function Ru(u){return!(u>=55296&&u<=57343||u>=64976&&u<=65007||(u&65535)===65535||(u&65535)===65534||u>=0&&u<=8||u===11||u>=14&&u<=31||u>=127&&u<=159||u>1114111)}function eu(u){if(u>65535){u-=65536;const e=55296+(u>>10),n=56320+(u&1023);return String.fromCharCode(e,n)}return String.fromCharCode(u)}const _e=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,rt=/&([a-z#][a-z0-9]{1,31});/gi,ot=new RegExp(_e.source+"|"+rt.source,"gi"),it=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function ct(u,e){if(e.charCodeAt(0)===35&&it.test(e)){const t=e[1].toLowerCase()==="x"?parseInt(e.slice(2),16):parseInt(e.slice(1),10);return Ru(t)?eu(t):u}const n=Qn(u);return n!==u?n:u}function at(u){return u.indexOf("\\")<0?u:u.replace(_e,"$1")}function G(u){return u.indexOf("\\")<0&&u.indexOf("&")<0?u:u.replace(ot,function(e,n,t){return n||ct(e,t)})}const st=/[&<>"]/,lt=/[&<>"]/g,ft={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function dt(u){return ft[u]}function H(u){return st.test(u)?u.replace(lt,dt):u}const ht=/[.?*+^$[\]\\(){}|-]/g;function pt(u){return u.replace(ht,"\\$&")}function w(u){switch(u){case 9:case 32:return!0}return!1}function nu(u){if(u>=8192&&u<=8202)return!0;switch(u){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function ye(u){return zu.test(u)||be.test(u)}function tu(u){return ye(eu(u))}function ru(u){switch(u){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function du(u){return u=u.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(u=u.replace(/ẞ/g,"ß")),u.toLowerCase().toUpperCase()}function ve(u){return u===32||u===9||u===10||u===13}function hu(u){let e=0;for(;e<u.length&&ve(u.charCodeAt(e));e++);let n=u.length-1;for(;n>=e&&ve(u.charCodeAt(n));n--);return u.slice(e,n+1)}const bt=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:ke,asciiTrim:hu,assign:fu,escapeHtml:H,escapeRE:pt,fromCodePoint:eu,has:tt,isMdAsciiPunct:ru,isPunctChar:ye,isPunctCharCode:tu,isSpace:w,isString:Iu,isValidEntityCode:Ru,isWhiteSpace:nu,lib:{mdurl:Pn,ucmicro:On},normalizeReference:du,unescapeAll:G,unescapeMd:at},Symbol.toStringTag,{value:"Module"}));function xt(u,e,n){let t,r,o,i;const c=u.posMax,a=u.pos;for(u.pos=e+1,t=1;u.pos<c;){if(o=u.src.charCodeAt(u.pos),o===93&&(t--,t===0)){r=!0;break}if(i=u.pos,u.md.inline.skipToken(u),o===91){if(i===u.pos-1)t++;else if(n)return u.pos=a,-1}}let s=-1;return r&&(s=u.pos),u.pos=a,s}function mt(u,e,n){let t,r=e;const o={ok:!1,pos:0,str:""};if(u.charCodeAt(r)===60){for(r++;r<n;){if(t=u.charCodeAt(r),t===10||t===60)return o;if(t===62)return o.pos=r+1,o.str=G(u.slice(e+1,r)),o.ok=!0,o;if(t===92&&r+1<n){r+=2;continue}r++}return o}let i=0;for(;r<n&&(t=u.charCodeAt(r),!(t===32||t<32||t===127));){if(t===92&&r+1<n){if(u.charCodeAt(r+1)===32)break;r+=2;continue}if(t===40&&(i++,i>32))return o;if(t===41){if(i===0)break;i--}r++}return e===r||i!==0||(o.str=G(u.slice(e,r)),o.pos=r,o.ok=!0),o}function gt(u,e,n,t){let r,o=e;const i={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(t)i.str=t.str,i.marker=t.marker;else{if(o>=n)return i;let c=u.charCodeAt(o);if(c!==34&&c!==39&&c!==40)return i;e++,o++,c===40&&(c=41),i.marker=c}for(;o<n;){if(r=u.charCodeAt(o),r===i.marker)return i.pos=o+1,i.str+=G(u.slice(e,o)),i.ok=!0,i;if(r===40&&i.marker===41)return i;r===92&&o+1<n&&o++,o++}return i.can_continue=!0,i.str+=G(u.slice(e,o)),i}const kt=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:mt,parseLinkLabel:xt,parseLinkTitle:gt},Symbol.toStringTag,{value:"Module"})),R={};R.code_inline=function(u,e,n,t,r){const o=u[e];return"<code"+r.renderAttrs(o)+">"+H(o.content)+"</code>"},R.code_block=function(u,e,n,t,r){const o=u[e];return"<pre"+r.renderAttrs(o)+"><code>"+H(u[e].content)+`</code></pre>
`},R.fence=function(u,e,n,t,r){const o=u[e],i=o.info?G(o.info).trim():"";let c="",a="";if(i){const l=i.split(/(\s+)/g);c=l[0],a=l.slice(2).join("")}let s;if(n.highlight?s=n.highlight(o.content,c,a)||H(o.content):s=H(o.content),s.indexOf("<pre")===0)return s+`
`;if(i){const l=o.attrIndex("class"),p=o.attrs?o.attrs.slice():[];l<0?p.push(["class",n.langPrefix+c]):(p[l]=p[l].slice(),p[l][1]+=" "+n.langPrefix+c);const h={attrs:p};return`<pre><code${r.renderAttrs(h)}>${s}</code></pre>
`}return`<pre><code${r.renderAttrs(o)}>${s}</code></pre>
`},R.image=function(u,e,n,t,r){const o=u[e];return o.attrs[o.attrIndex("alt")][1]=r.renderInlineAsText(o.children,n,t),r.renderToken(u,e,n)},R.hardbreak=function(u,e,n){return n.xhtmlOut?`<br />
`:`<br>
`},R.softbreak=function(u,e,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`},R.text=function(u,e){return H(u[e].content)},R.html_block=function(u,e){return u[e].content},R.html_inline=function(u,e){return u[e].content};function V(){this.rules=fu({},R)}V.prototype.renderAttrs=function(e){let n,t,r;if(!e.attrs)return"";for(r="",n=0,t=e.attrs.length;n<t;n++)r+=" "+H(e.attrs[n][0])+'="'+H(e.attrs[n][1])+'"';return r},V.prototype.renderToken=function(e,n,t){const r=e[n];let o="";if(r.hidden)return"";r.block&&r.nesting!==-1&&n&&e[n-1].hidden&&(o+=`
`),o+=(r.nesting===-1?"</":"<")+r.tag,o+=this.renderAttrs(r),r.nesting===0&&t.xhtmlOut&&(o+=" /");let i=!1;if(r.block&&(i=!0,r.nesting===1&&n+1<e.length)){const c=e[n+1];(c.type==="inline"||c.hidden||c.nesting===-1&&c.tag===r.tag)&&(i=!1)}return o+=i?`>
`:">",o},V.prototype.renderInline=function(u,e,n){let t="";const r=this.rules;for(let o=0,i=u.length;o<i;o++){const c=u[o].type;typeof r[c]<"u"?t+=r[c](u,o,e,n,this):t+=this.renderToken(u,o,e)}return t},V.prototype.renderInlineAsText=function(u,e,n){let t="";for(let r=0,o=u.length;r<o;r++)switch(u[r].type){case"text":t+=u[r].content;break;case"image":t+=this.renderInlineAsText(u[r].children,e,n);break;case"html_inline":case"html_block":t+=u[r].content;break;case"softbreak":case"hardbreak":t+=`
`;break}return t},V.prototype.render=function(u,e,n){let t="";const r=this.rules;for(let o=0,i=u.length;o<i;o++){const c=u[o].type;c==="inline"?t+=this.renderInline(u[o].children,e,n):typeof r[c]<"u"?t+=r[c](u,o,e,n,this):t+=this.renderToken(u,o,e,n)}return t};function S(){this.__rules__=[],this.__cache__=null}S.prototype.__find__=function(u){for(let e=0;e<this.__rules__.length;e++)if(this.__rules__[e].name===u)return e;return-1},S.prototype.__compile__=function(){const u=this,e=[""];u.__rules__.forEach(function(n){n.enabled&&n.alt.forEach(function(t){e.indexOf(t)<0&&e.push(t)})}),u.__cache__={},e.forEach(function(n){u.__cache__[n]=[],u.__rules__.forEach(function(t){t.enabled&&(n&&t.alt.indexOf(n)<0||u.__cache__[n].push(t.fn))})})},S.prototype.at=function(u,e,n){const t=this.__find__(u),r=n||{};if(t===-1)throw new Error("Parser rule not found: "+u);this.__rules__[t].fn=e,this.__rules__[t].alt=r.alt||[],this.__cache__=null},S.prototype.before=function(u,e,n,t){const r=this.__find__(u),o=t||{};if(r===-1)throw new Error("Parser rule not found: "+u);this.__rules__.splice(r,0,{name:e,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null},S.prototype.after=function(u,e,n,t){const r=this.__find__(u),o=t||{};if(r===-1)throw new Error("Parser rule not found: "+u);this.__rules__.splice(r+1,0,{name:e,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null},S.prototype.push=function(u,e,n){const t=n||{};this.__rules__.push({name:u,enabled:!0,fn:e,alt:t.alt||[]}),this.__cache__=null},S.prototype.enable=function(u,e){Array.isArray(u)||(u=[u]);const n=[];return u.forEach(function(t){const r=this.__find__(t);if(r<0){if(e)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!0,n.push(t)},this),this.__cache__=null,n},S.prototype.enableOnly=function(u,e){Array.isArray(u)||(u=[u]),this.__rules__.forEach(function(n){n.enabled=!1}),this.enable(u,e)},S.prototype.disable=function(u,e){Array.isArray(u)||(u=[u]);const n=[];return u.forEach(function(t){const r=this.__find__(t);if(r<0){if(e)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!1,n.push(t)},this),this.__cache__=null,n},S.prototype.getRules=function(u){return this.__cache__===null&&this.__compile__(),this.__cache__[u]||[]};function M(u,e,n){this.type=u,this.tag=e,this.attrs=null,this.map=null,this.nesting=n,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}M.prototype.attrIndex=function(e){if(!this.attrs)return-1;const n=this.attrs;for(let t=0,r=n.length;t<r;t++)if(n[t][0]===e)return t;return-1},M.prototype.attrPush=function(e){this.attrs?this.attrs.push(e):this.attrs=[e]},M.prototype.attrSet=function(e,n){const t=this.attrIndex(e),r=[e,n];t<0?this.attrPush(r):this.attrs[t]=r},M.prototype.attrGet=function(e){const n=this.attrIndex(e);let t=null;return n>=0&&(t=this.attrs[n][1]),t},M.prototype.attrJoin=function(e,n){const t=this.attrIndex(e);t<0?this.attrPush([e,n]):this.attrs[t][1]=this.attrs[t][1]+" "+n};function Ce(u,e,n){this.src=u,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=e}Ce.prototype.Token=M;const _t=/\r\n?|\n/g,yt=/\0/g;function vt(u){let e;e=u.src.replace(_t,`
`),e=e.replace(yt,"�"),u.src=e}function Ct(u){let e;u.inlineMode?(e=new u.Token("inline","",0),e.content=u.src,e.map=[0,1],e.children=[],u.tokens.push(e)):u.md.block.parse(u.src,u.md,u.env,u.tokens)}function Et(u){const e=u.tokens;for(let n=0,t=e.length;n<t;n++){const r=e[n];r.type==="inline"&&u.md.inline.parse(r.content,u.md,u.env,r.children)}}function wt(u){return/^<a[>\s]/i.test(u)}function Dt(u){return/^<\/a\s*>/i.test(u)}function At(u){const e=u.tokens;if(u.md.options.linkify)for(let n=0,t=e.length;n<t;n++){if(e[n].type!=="inline"||!u.md.linkify.pretest(e[n].content))continue;let r=e[n].children,o=0;for(let i=r.length-1;i>=0;i--){const c=r[i];if(c.type==="link_close"){for(i--;r[i].level!==c.level&&r[i].type!=="link_open";)i--;continue}if(c.type==="html_inline"&&(wt(c.content)&&o>0&&o--,Dt(c.content)&&o++),!(o>0)&&c.type==="text"&&u.md.linkify.test(c.content)){const a=c.content;let s=u.md.linkify.match(a);const l=[];let p=c.level,h=0;s.length>0&&s[0].index===0&&i>0&&r[i-1].type==="text_special"&&(s=s.slice(1));for(let f=0;f<s.length;f++){const d=s[f].url,g=u.md.normalizeLink(d);if(!u.md.validateLink(g))continue;let m=s[f].text;s[f].schema?s[f].schema==="mailto:"&&!/^mailto:/i.test(m)?m=u.md.normalizeLinkText("mailto:"+m).replace(/^mailto:/,""):m=u.md.normalizeLinkText(m):m=u.md.normalizeLinkText("http://"+m).replace(/^http:\/\//,"");const _=s[f].index;if(_>h){const y=new u.Token("text","",0);y.content=a.slice(h,_),y.level=p,l.push(y)}const x=new u.Token("link_open","a",1);x.attrs=[["href",g]],x.level=p++,x.markup="linkify",x.info="auto",l.push(x);const b=new u.Token("text","",0);b.content=m,b.level=p,l.push(b);const k=new u.Token("link_close","a",-1);k.level=--p,k.markup="linkify",k.info="auto",l.push(k),h=s[f].lastIndex}if(h<a.length){const f=new u.Token("text","",0);f.content=a.slice(h),f.level=p,l.push(f)}e[n].children=r=ke(r,i,l)}}}}const Ee=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,Ft=/\((c|tm|r)\)/i,St=/\((c|tm|r)\)/ig,Tt={c:"©",r:"®",tm:"™"};function zt(u,e){return Tt[e.toLowerCase()]}function Nt(u){let e=0;for(let n=u.length-1;n>=0;n--){const t=u[n];t.type==="text"&&!e&&(t.content=t.content.replace(St,zt)),t.type==="link_open"&&t.info==="auto"&&e--,t.type==="link_close"&&t.info==="auto"&&e++}}function Mt(u){let e=0;for(let n=u.length-1;n>=0;n--){const t=u[n];t.type==="text"&&!e&&Ee.test(t.content)&&(t.content=t.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),t.type==="link_open"&&t.info==="auto"&&e--,t.type==="link_close"&&t.info==="auto"&&e++}}function It(u){let e;if(u.md.options.typographer)for(e=u.tokens.length-1;e>=0;e--)u.tokens[e].type==="inline"&&(Ft.test(u.tokens[e].content)&&Nt(u.tokens[e].children),Ee.test(u.tokens[e].content)&&Mt(u.tokens[e].children))}const Rt=/['"]/,we=/['"]/g,De="’";function pu(u,e,n,t){u[e]||(u[e]=[]),u[e].push({pos:n,ch:t})}function Bt(u,e){let n="",t=0;e.sort((r,o)=>r.pos-o.pos);for(let r=0;r<e.length;r++){const o=e[r];n+=u.slice(t,o.pos)+o.ch,t=o.pos+1}return n+u.slice(t)}function Lt(u,e){let n;const t=[],r={};for(let o=0;o<u.length;o++){const i=u[o],c=u[o].level;for(n=t.length-1;n>=0&&!(t[n].level<=c);n--);if(t.length=n+1,i.type!=="text")continue;const a=i.content;let s=0;const l=a.length;u:for(;s<l;){we.lastIndex=s;const p=we.exec(a);if(!p)break;let h=!0,f=!0;s=p.index+1;const d=p[0]==="'";let g=32;if(p.index-1>=0)g=a.charCodeAt(p.index-1);else for(n=o-1;n>=0&&!(u[n].type==="softbreak"||u[n].type==="hardbreak");n--)if(u[n].content){g=u[n].content.charCodeAt(u[n].content.length-1);break}let m=32;if(s<l)m=a.charCodeAt(s);else for(n=o+1;n<u.length&&!(u[n].type==="softbreak"||u[n].type==="hardbreak");n++)if(u[n].content){m=u[n].content.charCodeAt(0);break}const _=ru(g)||tu(g),x=ru(m)||tu(m),b=nu(g),k=nu(m);if(k?h=!1:x&&(b||_||(h=!1)),b?f=!1:_&&(k||x||(f=!1)),m===34&&p[0]==='"'&&g>=48&&g<=57&&(f=h=!1),h&&f&&(h=_,f=x),!h&&!f){d&&pu(r,o,p.index,De);continue}if(f)for(n=t.length-1;n>=0;n--){let y=t[n];if(t[n].level<c)break;if(y.single===d&&t[n].level===c){y=t[n];let v,E;d?(v=e.md.options.quotes[2],E=e.md.options.quotes[3]):(v=e.md.options.quotes[0],E=e.md.options.quotes[1]),pu(r,o,p.index,E),pu(r,y.token,y.pos,v),t.length=n;continue u}}h?t.push({token:o,pos:p.index,single:d,level:c}):f&&d&&pu(r,o,p.index,De)}}Object.keys(r).forEach(function(o){u[o].content=Bt(u[o].content,r[o])})}function qt(u){if(u.md.options.typographer)for(let e=u.tokens.length-1;e>=0;e--)u.tokens[e].type!=="inline"||!Rt.test(u.tokens[e].content)||Lt(u.tokens[e].children,u)}function Pt(u){let e,n;const t=u.tokens,r=t.length;for(let o=0;o<r;o++){if(t[o].type!=="inline")continue;const i=t[o].children,c=i.length;for(e=0;e<c;e++)i[e].type==="text_special"&&(i[e].type="text");for(e=n=0;e<c;e++)i[e].type==="text"&&e+1<c&&i[e+1].type==="text"?i[e+1].content=i[e].content+i[e+1].content:(e!==n&&(i[n]=i[e]),n++);e!==n&&(i.length=n)}}const Bu=[["normalize",vt],["block",Ct],["inline",Et],["linkify",At],["replacements",It],["smartquotes",qt],["text_join",Pt]];function Lu(){this.ruler=new S;for(let u=0;u<Bu.length;u++)this.ruler.push(Bu[u][0],Bu[u][1])}Lu.prototype.process=function(u){const e=this.ruler.getRules("");for(let n=0,t=e.length;n<t;n++)e[n](u)},Lu.prototype.State=Ce;function B(u,e,n,t){this.src=u,this.md=e,this.env=n,this.tokens=t,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const r=this.src;for(let o=0,i=0,c=0,a=0,s=r.length,l=!1;i<s;i++){const p=r.charCodeAt(i);if(!l)if(w(p)){c++,p===9?a+=4-a%4:a++;continue}else l=!0;(p===10||i===s-1)&&(p!==10&&i++,this.bMarks.push(o),this.eMarks.push(i),this.tShift.push(c),this.sCount.push(a),this.bsCount.push(0),l=!1,c=0,a=0,o=i+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}B.prototype.push=function(u,e,n){const t=new M(u,e,n);return t.block=!0,n<0&&this.level--,t.level=this.level,n>0&&this.level++,this.tokens.push(t),t},B.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]},B.prototype.skipEmptyLines=function(e){for(let n=this.lineMax;e<n&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e},B.prototype.skipSpaces=function(e){for(let n=this.src.length;e<n;e++){const t=this.src.charCodeAt(e);if(!w(t))break}return e},B.prototype.skipSpacesBack=function(e,n){if(e<=n)return e;for(;e>n;)if(!w(this.src.charCodeAt(--e)))return e+1;return e},B.prototype.skipChars=function(e,n){for(let t=this.src.length;e<t&&this.src.charCodeAt(e)===n;e++);return e},B.prototype.skipCharsBack=function(e,n,t){if(e<=t)return e;for(;e>t;)if(n!==this.src.charCodeAt(--e))return e+1;return e},B.prototype.getLines=function(e,n,t,r){if(e>=n)return"";const o=new Array(n-e);for(let i=0,c=e;c<n;c++,i++){let a=0;const s=this.bMarks[c];let l=s,p;for(c+1<n||r?p=this.eMarks[c]+1:p=this.eMarks[c];l<p&&a<t;){const h=this.src.charCodeAt(l);if(w(h))h===9?a+=4-(a+this.bsCount[c])%4:a++;else if(l-s<this.tShift[c])a++;else break;l++}a>t?o[i]=new Array(a-t+1).join(" ")+this.src.slice(l,p):o[i]=this.src.slice(l,p)}return o.join("")},B.prototype.Token=M;const $t=65536;function qu(u,e){const n=u.bMarks[e]+u.tShift[e],t=u.eMarks[e];return u.src.slice(n,t)}function Ae(u){const e=[],n=u.length;let t=0,r=u.charCodeAt(t),o=!1,i=0,c="";for(;t<n;)r===124&&(o?(c+=u.substring(i,t-1),i=t):(e.push(c+u.substring(i,t)),c="",i=t+1)),o=r===92,t++,r=u.charCodeAt(t);return e.push(c+u.substring(i)),e}function Ot(u,e,n,t){if(e+2>n)return!1;let r=e+1;if(u.sCount[r]<u.blkIndent||u.sCount[r]-u.blkIndent>=4)return!1;let o=u.bMarks[r]+u.tShift[r];if(o>=u.eMarks[r])return!1;const i=u.src.charCodeAt(o++);if(i!==124&&i!==45&&i!==58||o>=u.eMarks[r])return!1;const c=u.src.charCodeAt(o++);if(c!==124&&c!==45&&c!==58&&!w(c)||i===45&&w(c))return!1;for(;o<u.eMarks[r];){const k=u.src.charCodeAt(o);if(k!==124&&k!==45&&k!==58&&!w(k))return!1;o++}let a=qu(u,e+1),s=a.split("|");const l=[];for(let k=0;k<s.length;k++){const y=s[k].trim();if(!y){if(k===0||k===s.length-1)continue;return!1}if(!/^:?-+:?$/.test(y))return!1;y.charCodeAt(y.length-1)===58?l.push(y.charCodeAt(0)===58?"center":"right"):y.charCodeAt(0)===58?l.push("left"):l.push("")}if(a=qu(u,e).trim(),a.indexOf("|")===-1||u.sCount[e]-u.blkIndent>=4)return!1;s=Ae(a),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop();const p=s.length;if(p===0||p!==l.length)return!1;if(t)return!0;const h=u.parentType;u.parentType="table";const f=u.md.block.ruler.getRules("blockquote"),d=u.push("table_open","table",1),g=[e,0];d.map=g;const m=u.push("thead_open","thead",1);m.map=[e,e+1];const _=u.push("tr_open","tr",1);_.map=[e,e+1];for(let k=0;k<s.length;k++){const y=u.push("th_open","th",1);l[k]&&(y.attrs=[["style","text-align:"+l[k]]]);const v=u.push("inline","",0);v.content=s[k].trim(),v.children=[],u.push("th_close","th",-1)}u.push("tr_close","tr",-1),u.push("thead_close","thead",-1);let x,b=0;for(r=e+2;r<n&&!(u.sCount[r]<u.blkIndent);r++){let k=!1;for(let v=0,E=f.length;v<E;v++)if(f[v](u,r,n,!0)){k=!0;break}if(k||(a=qu(u,r).trim(),!a)||u.sCount[r]-u.blkIndent>=4||(s=Ae(a),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop(),b+=p-s.length,b>$t))break;if(r===e+2){const v=u.push("tbody_open","tbody",1);v.map=x=[e+2,0]}const y=u.push("tr_open","tr",1);y.map=[r,r+1];for(let v=0;v<p;v++){const E=u.push("td_open","td",1);l[v]&&(E.attrs=[["style","text-align:"+l[v]]]);const D=u.push("inline","",0);D.content=s[v]?s[v].trim():"",D.children=[],u.push("td_close","td",-1)}u.push("tr_close","tr",-1)}return x&&(u.push("tbody_close","tbody",-1),x[1]=r),u.push("table_close","table",-1),g[1]=r,u.parentType=h,u.line=r,!0}function Ht(u,e,n){if(u.sCount[e]-u.blkIndent<4)return!1;let t=e+1,r=t;for(;t<n;){if(u.isEmpty(t)){t++;continue}if(u.sCount[t]-u.blkIndent>=4){t++,r=t;continue}break}u.line=r;const o=u.push("code_block","code",0);return o.content=u.getLines(e,r,4+u.blkIndent,!1)+`
`,o.map=[e,u.line],!0}function jt(u,e,n,t){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4||r+3>o)return!1;const i=u.src.charCodeAt(r);if(i!==126&&i!==96)return!1;let c=r;r=u.skipChars(r,i);let a=r-c;if(a<3)return!1;const s=u.src.slice(c,r),l=u.src.slice(r,o);if(i===96&&l.indexOf(String.fromCharCode(i))>=0)return!1;if(t)return!0;let p=e,h=!1;for(;p++,!(p>=n||(r=c=u.bMarks[p]+u.tShift[p],o=u.eMarks[p],r<o&&u.sCount[p]<u.blkIndent));)if(u.src.charCodeAt(r)===i&&!(u.sCount[p]-u.blkIndent>=4)&&(r=u.skipChars(r,i),!(r-c<a)&&(r=u.skipSpaces(r),!(r<o)))){h=!0;break}a=u.sCount[e],u.line=p+(h?1:0);const f=u.push("fence","code",0);return f.info=l,f.content=u.getLines(e+1,p,a,!0),f.markup=s,f.map=[e,u.line],!0}function Ut(u,e,n,t){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];const i=u.lineMax;if(u.sCount[e]-u.blkIndent>=4||u.src.charCodeAt(r)!==62)return!1;if(t)return!0;const c=[],a=[],s=[],l=[],p=u.md.block.ruler.getRules("blockquote"),h=u.parentType;u.parentType="blockquote";let f=!1,d;for(d=e;d<n;d++){const b=u.sCount[d]<u.blkIndent;if(r=u.bMarks[d]+u.tShift[d],o=u.eMarks[d],r>=o)break;if(u.src.charCodeAt(r++)===62&&!b){let y=u.sCount[d]+1,v,E;u.src.charCodeAt(r)===32?(r++,y++,E=!1,v=!0):u.src.charCodeAt(r)===9?(v=!0,(u.bsCount[d]+y)%4===3?(r++,y++,E=!1):E=!0):v=!1;let D=y;for(c.push(u.bMarks[d]),u.bMarks[d]=r;r<o;){const P=u.src.charCodeAt(r);if(w(P))P===9?D+=4-(D+u.bsCount[d]+(E?1:0))%4:D++;else break;r++}f=r>=o,a.push(u.bsCount[d]),u.bsCount[d]=u.sCount[d]+1+(v?1:0),s.push(u.sCount[d]),u.sCount[d]=D-y,l.push(u.tShift[d]),u.tShift[d]=r-u.bMarks[d];continue}if(f)break;let k=!1;for(let y=0,v=p.length;y<v;y++)if(p[y](u,d,n,!0)){k=!0;break}if(k){u.lineMax=d,u.blkIndent!==0&&(c.push(u.bMarks[d]),a.push(u.bsCount[d]),l.push(u.tShift[d]),s.push(u.sCount[d]),u.sCount[d]-=u.blkIndent);break}c.push(u.bMarks[d]),a.push(u.bsCount[d]),l.push(u.tShift[d]),s.push(u.sCount[d]),u.sCount[d]=-1}const g=u.blkIndent;u.blkIndent=0;const m=u.push("blockquote_open","blockquote",1);m.markup=">";const _=[e,0];m.map=_,u.md.block.tokenize(u,e,d);const x=u.push("blockquote_close","blockquote",-1);x.markup=">",u.lineMax=i,u.parentType=h,_[1]=u.line;for(let b=0;b<l.length;b++)u.bMarks[b+e]=c[b],u.tShift[b+e]=l[b],u.sCount[b+e]=s[b],u.bsCount[b+e]=a[b];return u.blkIndent=g,!0}function Zt(u,e,n,t){const r=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4)return!1;let o=u.bMarks[e]+u.tShift[e];const i=u.src.charCodeAt(o++);if(i!==42&&i!==45&&i!==95)return!1;let c=1;for(;o<r;){const s=u.src.charCodeAt(o++);if(s!==i&&!w(s))return!1;s===i&&c++}if(c<3)return!1;if(t)return!0;u.line=e+1;const a=u.push("hr","hr",0);return a.map=[e,u.line],a.markup=Array(c+1).join(String.fromCharCode(i)),!0}function Fe(u,e){const n=u.eMarks[e];let t=u.bMarks[e]+u.tShift[e];const r=u.src.charCodeAt(t++);if(r!==42&&r!==45&&r!==43)return-1;if(t<n){const o=u.src.charCodeAt(t);if(!w(o))return-1}return t}function Se(u,e){const n=u.bMarks[e]+u.tShift[e],t=u.eMarks[e];let r=n;if(r+1>=t)return-1;let o=u.src.charCodeAt(r++);if(o<48||o>57)return-1;for(;;){if(r>=t)return-1;if(o=u.src.charCodeAt(r++),o>=48&&o<=57){if(r-n>=10)return-1;continue}if(o===41||o===46)break;return-1}return r<t&&(o=u.src.charCodeAt(r),!w(o))?-1:r}function Wt(u,e){const n=u.level+2;for(let t=e+2,r=u.tokens.length-2;t<r;t++)u.tokens[t].level===n&&u.tokens[t].type==="paragraph_open"&&(u.tokens[t+2].hidden=!0,u.tokens[t].hidden=!0,t+=2)}function Gt(u,e,n,t){let r,o,i,c,a=e,s=!0;if(u.sCount[a]-u.blkIndent>=4||u.listIndent>=0&&u.sCount[a]-u.listIndent>=4&&u.sCount[a]<u.blkIndent)return!1;let l=!1;t&&u.parentType==="paragraph"&&u.sCount[a]>=u.blkIndent&&(l=!0);let p,h,f;if((f=Se(u,a))>=0){if(p=!0,i=u.bMarks[a]+u.tShift[a],h=Number(u.src.slice(i,f-1)),l&&h!==1)return!1}else if((f=Fe(u,a))>=0)p=!1;else return!1;if(l&&u.skipSpaces(f)>=u.eMarks[a])return!1;if(t)return!0;const d=u.src.charCodeAt(f-1),g=u.tokens.length;p?(c=u.push("ordered_list_open","ol",1),h!==1&&(c.attrs=[["start",h]])):c=u.push("bullet_list_open","ul",1);const m=[a,0];c.map=m,c.markup=String.fromCharCode(d);let _=!1;const x=u.md.block.ruler.getRules("list"),b=u.parentType;for(u.parentType="list";a<n;){o=f,r=u.eMarks[a];const k=u.sCount[a]+f-(u.bMarks[a]+u.tShift[a]);let y=k;for(;o<r;){const J=u.src.charCodeAt(o);if(J===9)y+=4-(y+u.bsCount[a])%4;else if(J===32)y++;else break;o++}const v=o;let E;v>=r?E=1:E=y-k,E>4&&(E=1);const D=k+E;c=u.push("list_item_open","li",1),c.markup=String.fromCharCode(d);const P=[a,0];c.map=P,p&&(c.info=u.src.slice(i,f-1));const su=u.tight,ne=u.tShift[a],co=u.sCount[a],ao=u.listIndent;if(u.listIndent=u.blkIndent,u.blkIndent=D,u.tight=!0,u.tShift[a]=v-u.bMarks[a],u.sCount[a]=y,v>=r&&u.isEmpty(a+1)?u.line=Math.min(u.line+2,n):u.md.block.tokenize(u,a,n,!0),(!u.tight||_)&&(s=!1),_=u.line-a>1&&u.isEmpty(u.line-1),u.blkIndent=u.listIndent,u.listIndent=ao,u.tShift[a]=ne,u.sCount[a]=co,u.tight=su,c=u.push("list_item_close","li",-1),c.markup=String.fromCharCode(d),a=u.line,P[1]=a,a>=n||u.sCount[a]<u.blkIndent||u.sCount[a]-u.blkIndent>=4)break;let mn=!1;for(let J=0,so=x.length;J<so;J++)if(x[J](u,a,n,!0)){mn=!0;break}if(mn)break;if(p){if(f=Se(u,a),f<0)break;i=u.bMarks[a]+u.tShift[a]}else if(f=Fe(u,a),f<0)break;if(d!==u.src.charCodeAt(f-1))break}return p?c=u.push("ordered_list_close","ol",-1):c=u.push("bullet_list_close","ul",-1),c.markup=String.fromCharCode(d),m[1]=a,u.line=a,u.parentType=b,s&&Wt(u,g),!0}function Vt(u,e,n,t){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e],i=e+1;if(u.sCount[e]-u.blkIndent>=4||u.src.charCodeAt(r)!==91)return!1;function c(x){const b=u.lineMax;if(x>=b||u.isEmpty(x))return null;let k=!1;if(u.sCount[x]-u.blkIndent>3&&(k=!0),u.sCount[x]<0&&(k=!0),!k){const E=u.md.block.ruler.getRules("reference"),D=u.parentType;u.parentType="reference";let P=!1;for(let su=0,ne=E.length;su<ne;su++)if(E[su](u,x,b,!0)){P=!0;break}if(u.parentType=D,P)return null}const y=u.bMarks[x]+u.tShift[x],v=u.eMarks[x];return u.src.slice(y,v+1)}let a=u.src.slice(r,o+1);o=a.length;let s=-1;for(r=1;r<o;r++){const x=a.charCodeAt(r);if(x===91)return!1;if(x===93){s=r;break}else if(x===10){const b=c(i);b!==null&&(a+=b,o=a.length,i++)}else if(x===92&&(r++,r<o&&a.charCodeAt(r)===10)){const b=c(i);b!==null&&(a+=b,o=a.length,i++)}}if(s<0||a.charCodeAt(s+1)!==58)return!1;for(r=s+2;r<o;r++){const x=a.charCodeAt(r);if(x===10){const b=c(i);b!==null&&(a+=b,o=a.length,i++)}else if(!w(x))break}const l=u.md.helpers.parseLinkDestination(a,r,o);if(!l.ok)return!1;const p=u.md.normalizeLink(l.str);if(!u.md.validateLink(p))return!1;r=l.pos;const h=r,f=i,d=r;for(;r<o;r++){const x=a.charCodeAt(r);if(x===10){const b=c(i);b!==null&&(a+=b,o=a.length,i++)}else if(!w(x))break}let g=u.md.helpers.parseLinkTitle(a,r,o);for(;g.can_continue;){const x=c(i);if(x===null)break;a+=x,r=o,o=a.length,i++,g=u.md.helpers.parseLinkTitle(a,r,o,g)}let m;for(r<o&&d!==r&&g.ok?(m=g.str,r=g.pos):(m="",r=h,i=f);r<o;){const x=a.charCodeAt(r);if(!w(x))break;r++}if(r<o&&a.charCodeAt(r)!==10&&m)for(m="",r=h,i=f;r<o;){const x=a.charCodeAt(r);if(!w(x))break;r++}if(r<o&&a.charCodeAt(r)!==10)return!1;const _=du(a.slice(1,s));return _?(t||(typeof u.env.references>"u"&&(u.env.references={}),typeof u.env.references[_]>"u"&&(u.env.references[_]={title:m,href:p}),u.line=i),!0):!1}const Kt=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Yt="[a-zA-Z_:][a-zA-Z0-9:._-]*",Xt="(?:"+"[^\"'=<>`\\x00-\\x20]+"+"|"+"'[^']*'"+"|"+'"[^"]*"'+")",Te="<[A-Za-z][A-Za-z0-9\\-]*"+("(?:\\s+"+Yt+"(?:\\s*=\\s*"+Xt+")?)")+"*\\s*\\/?>",ze="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Jt="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Qt="<[?][\\s\\S]*?[?]>",ur="<![A-Za-z][^>]*>",er="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",nr=new RegExp("^(?:"+Te+"|"+ze+"|"+Jt+"|"+Qt+"|"+ur+"|"+er+")"),tr=new RegExp("^(?:"+Te+"|"+ze+")"),Z=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Kt.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(tr.source+"\\s*$"),/^$/,!1]];function rr(u,e,n,t){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4||!u.md.options.html||u.src.charCodeAt(r)!==60)return!1;let i=u.src.slice(r,o),c=0;for(;c<Z.length&&!Z[c][0].test(i);c++);if(c===Z.length)return!1;if(t)return Z[c][2];let a=e+1;const s=Z[c][1].test("");if(!Z[c][1].test(i)){for(;a<n&&!(u.sCount[a]<u.blkIndent&&(s||!u.isEmpty(a)));a++)if(r=u.bMarks[a]+u.tShift[a],o=u.eMarks[a],i=u.src.slice(r,o),Z[c][1].test(i)){i.length!==0&&a++;break}}u.line=a;const l=u.push("html_block","",0);return l.map=[e,a],l.content=u.getLines(e,a,u.blkIndent,!0),!0}function or(u,e,n,t){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4)return!1;let i=u.src.charCodeAt(r);if(i!==35||r>=o)return!1;let c=1;for(i=u.src.charCodeAt(++r);i===35&&r<o&&c<=6;)c++,i=u.src.charCodeAt(++r);if(c>6||r<o&&!w(i))return!1;if(t)return!0;o=u.skipSpacesBack(o,r);const a=u.skipCharsBack(o,35,r);a>r&&w(u.src.charCodeAt(a-1))&&(o=a),u.line=e+1;const s=u.push("heading_open","h"+String(c),1);s.markup="########".slice(0,c),s.map=[e,u.line];const l=u.push("inline","",0);l.content=hu(u.src.slice(r,o)),l.map=[e,u.line],l.children=[];const p=u.push("heading_close","h"+String(c),-1);return p.markup="########".slice(0,c),!0}function ir(u,e,n){const t=u.md.block.ruler.getRules("paragraph");if(u.sCount[e]-u.blkIndent>=4)return!1;const r=u.parentType;u.parentType="paragraph";let o=0,i,c=e+1;for(;c<n&&!u.isEmpty(c);c++){if(u.sCount[c]-u.blkIndent>3)continue;if(u.sCount[c]>=u.blkIndent){let f=u.bMarks[c]+u.tShift[c];const d=u.eMarks[c];if(f<d&&(i=u.src.charCodeAt(f),(i===45||i===61)&&(f=u.skipChars(f,i),f=u.skipSpaces(f),f>=d))){o=i===61?1:2;break}}if(u.sCount[c]<0)continue;let h=!1;for(let f=0,d=t.length;f<d;f++)if(t[f](u,c,n,!0)){h=!0;break}if(h)break}if(!o)return u.parentType=r,!1;const a=hu(u.getLines(e,c,u.blkIndent,!1));u.line=c+1;const s=u.push("heading_open","h"+String(o),1);s.markup=String.fromCharCode(i),s.map=[e,u.line];const l=u.push("inline","",0);l.content=a,l.map=[e,u.line-1],l.children=[];const p=u.push("heading_close","h"+String(o),-1);return p.markup=String.fromCharCode(i),u.parentType=r,!0}function cr(u,e,n){const t=u.md.block.ruler.getRules("paragraph"),r=u.parentType;let o=e+1;for(u.parentType="paragraph";o<n&&!u.isEmpty(o);o++){if(u.sCount[o]-u.blkIndent>3||u.sCount[o]<0)continue;let s=!1;for(let l=0,p=t.length;l<p;l++)if(t[l](u,o,n,!0)){s=!0;break}if(s)break}const i=hu(u.getLines(e,o,u.blkIndent,!1));u.line=o;const c=u.push("paragraph_open","p",1);c.map=[e,u.line];const a=u.push("inline","",0);return a.content=i,a.map=[e,u.line],a.children=[],u.push("paragraph_close","p",-1),u.parentType=r,!0}const bu=[["table",Ot,["paragraph","reference"]],["code",Ht],["fence",jt,["paragraph","reference","blockquote","list"]],["blockquote",Ut,["paragraph","reference","blockquote","list"]],["hr",Zt,["paragraph","reference","blockquote","list"]],["list",Gt,["paragraph","reference","blockquote"]],["reference",Vt],["html_block",rr,["paragraph","reference","blockquote"]],["heading",or,["paragraph","reference","blockquote"]],["lheading",ir],["paragraph",cr]];function xu(){this.ruler=new S;for(let u=0;u<bu.length;u++)this.ruler.push(bu[u][0],bu[u][1],{alt:(bu[u][2]||[]).slice()})}xu.prototype.tokenize=function(u,e,n){const t=this.ruler.getRules(""),r=t.length,o=u.md.options.maxNesting;let i=e,c=!1;for(;i<n&&(u.line=i=u.skipEmptyLines(i),!(i>=n||u.sCount[i]<u.blkIndent));){if(u.level>=o){u.line=n;break}const a=u.line;let s=!1;for(let l=0;l<r;l++)if(s=t[l](u,i,n,!1),s){if(a>=u.line)throw new Error("block rule didn't increment state.line");break}if(!s)throw new Error("none of the block rules matched");u.tight=!c,u.isEmpty(u.line-1)&&(c=!0),i=u.line,i<n&&u.isEmpty(i)&&(c=!0,i++,u.line=i)}},xu.prototype.parse=function(u,e,n,t){if(!u)return;const r=new this.State(u,e,n,t);this.tokenize(r,r.line,r.lineMax)},xu.prototype.State=B;function ou(u,e,n,t){this.src=u,this.env=n,this.md=e,this.tokens=t,this.tokens_meta=Array(t.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}ou.prototype.pushPending=function(){const u=new M("text","",0);return u.content=this.pending,u.level=this.pendingLevel,this.tokens.push(u),this.pending="",u},ou.prototype.push=function(u,e,n){this.pending&&this.pushPending();const t=new M(u,e,n);let r=null;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),t.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(t),this.tokens_meta.push(r),t},ou.prototype.scanDelims=function(u,e){const n=this.posMax,t=this.src.charCodeAt(u);let r;if(u===0)r=32;else if(u===1)r=this.src.charCodeAt(0),(r&63488)===55296&&(r=65533);else if(r=this.src.charCodeAt(u-1),(r&64512)===56320){const m=this.src.charCodeAt(u-2);r=(m&64512)===55296?65536+(m-55296<<10)+(r-56320):65533}else(r&64512)===55296&&(r=65533);let o=u;for(;o<n&&this.src.charCodeAt(o)===t;)o++;const i=o-u;let c=o<n?this.src.charCodeAt(o):32;if((c&64512)===55296){const m=this.src.charCodeAt(o+1);c=(m&64512)===56320?65536+(c-55296<<10)+(m-56320):65533}else(c&64512)===56320&&(c=65533);const a=ru(r)||tu(r),s=ru(c)||tu(c),l=nu(r),p=nu(c),h=!p&&(!s||l||a),f=!l&&(!a||p||s);return{can_open:h&&(e||!f||a),can_close:f&&(e||!h||s),length:i}},ou.prototype.Token=M;function ar(u){switch(u){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function sr(u,e){let n=u.pos;for(;n<u.posMax&&!ar(u.src.charCodeAt(n));)n++;return n===u.pos?!1:(e||(u.pending+=u.src.slice(u.pos,n)),u.pos=n,!0)}const lr=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function fr(u,e){if(!u.md.options.linkify||u.linkLevel>0)return!1;const n=u.pos,t=u.posMax;if(n+3>t||u.src.charCodeAt(n)!==58||u.src.charCodeAt(n+1)!==47||u.src.charCodeAt(n+2)!==47)return!1;const r=u.pending.match(lr);if(!r)return!1;const o=r[1],i=u.md.linkify.matchAtStart(u.src.slice(n-o.length));if(!i)return!1;let c=i.url;if(c.length<=o.length)return!1;let a=c.length;for(;a>0&&c.charCodeAt(a-1)===42;)a--;a!==c.length&&(c=c.slice(0,a));const s=u.md.normalizeLink(c);if(!u.md.validateLink(s))return!1;if(!e){u.pending=u.pending.slice(0,-o.length);const l=u.push("link_open","a",1);l.attrs=[["href",s]],l.markup="linkify",l.info="auto";const p=u.push("text","",0);p.content=u.md.normalizeLinkText(c);const h=u.push("link_close","a",-1);h.markup="linkify",h.info="auto"}return u.pos+=c.length-o.length,!0}function dr(u,e){let n=u.pos;if(u.src.charCodeAt(n)!==10)return!1;const t=u.pending.length-1,r=u.posMax;if(!e)if(t>=0&&u.pending.charCodeAt(t)===32)if(t>=1&&u.pending.charCodeAt(t-1)===32){let o=t-1;for(;o>=1&&u.pending.charCodeAt(o-1)===32;)o--;u.pending=u.pending.slice(0,o),u.push("hardbreak","br",0)}else u.pending=u.pending.slice(0,-1),u.push("softbreak","br",0);else u.push("softbreak","br",0);for(n++;n<r&&w(u.src.charCodeAt(n));)n++;return u.pos=n,!0}const Pu=[];for(let u=0;u<256;u++)Pu.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(u){Pu[u.charCodeAt(0)]=1});function hr(u,e){let n=u.pos;const t=u.posMax;if(u.src.charCodeAt(n)!==92||(n++,n>=t))return!1;let r=u.src.charCodeAt(n);if(r===10){for(e||u.push("hardbreak","br",0),n++;n<t&&(r=u.src.charCodeAt(n),!!w(r));)n++;return u.pos=n,!0}if(r===32){if(!e){const c=u.push("text_special","",0);c.content="\\",c.markup="\\",c.info="escape"}return u.pos=n,!0}let o=u.src[n];if(r>=55296&&r<=56319&&n+1<t){const c=u.src.charCodeAt(n+1);c>=56320&&c<=57343&&(o+=u.src[n+1],n++)}const i="\\"+o;if(!e){const c=u.push("text_special","",0);r<256&&Pu[r]!==0?c.content=o:c.content=i,c.markup=i,c.info="escape"}return u.pos=n+1,!0}function pr(u,e){let n=u.pos;if(u.src.charCodeAt(n)!==96)return!1;const r=n;n++;const o=u.posMax;for(;n<o&&u.src.charCodeAt(n)===96;)n++;const i=u.src.slice(r,n),c=i.length;if(u.backticksScanned&&(u.backticks[c]||0)<=r)return e||(u.pending+=i),u.pos+=c,!0;let a=n,s;for(;(s=u.src.indexOf("`",a))!==-1;){for(a=s+1;a<o&&u.src.charCodeAt(a)===96;)a++;const l=a-s;if(l===c){if(!e){const p=u.push("code_inline","code",0);p.markup=i,p.content=u.src.slice(n,s).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return u.pos=a,!0}u.backticks[l]=s}return u.backticksScanned=!0,e||(u.pending+=i),u.pos+=c,!0}function br(u,e){const n=u.pos,t=u.src.charCodeAt(n);if(e||t!==126)return!1;const r=u.scanDelims(u.pos,!0);let o=r.length;const i=String.fromCharCode(t);if(o<2)return!1;let c;o%2&&(c=u.push("text","",0),c.content=i,o--);for(let a=0;a<o;a+=2)c=u.push("text","",0),c.content=i+i,u.delimiters.push({marker:t,length:0,token:u.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return u.pos+=r.length,!0}function Ne(u,e){let n;const t=[],r=e.length;for(let o=0;o<r;o++){const i=e[o];if(i.marker!==126||i.end===-1)continue;const c=e[i.end];n=u.tokens[i.token],n.type="s_open",n.tag="s",n.nesting=1,n.markup="~~",n.content="",n=u.tokens[c.token],n.type="s_close",n.tag="s",n.nesting=-1,n.markup="~~",n.content="",u.tokens[c.token-1].type==="text"&&u.tokens[c.token-1].content==="~"&&t.push(c.token-1)}for(;t.length;){const o=t.pop();let i=o+1;for(;i<u.tokens.length&&u.tokens[i].type==="s_close";)i++;i--,o!==i&&(n=u.tokens[i],u.tokens[i]=u.tokens[o],u.tokens[o]=n)}}function xr(u){const e=u.tokens_meta,n=u.tokens_meta.length;Ne(u,u.delimiters);for(let t=0;t<n;t++)e[t]&&e[t].delimiters&&Ne(u,e[t].delimiters)}const Me={tokenize:br,postProcess:xr};function mr(u,e){const n=u.pos,t=u.src.charCodeAt(n);if(e||t!==95&&t!==42)return!1;const r=u.scanDelims(u.pos,t===42);for(let o=0;o<r.length;o++){const i=u.push("text","",0);i.content=String.fromCharCode(t),u.delimiters.push({marker:t,length:r.length,token:u.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return u.pos+=r.length,!0}function Ie(u,e){const n=e.length;for(let t=n-1;t>=0;t--){const r=e[t];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;const o=e[r.end],i=t>0&&e[t-1].end===r.end+1&&e[t-1].marker===r.marker&&e[t-1].token===r.token-1&&e[r.end+1].token===o.token+1,c=String.fromCharCode(r.marker),a=u.tokens[r.token];a.type=i?"strong_open":"em_open",a.tag=i?"strong":"em",a.nesting=1,a.markup=i?c+c:c,a.content="";const s=u.tokens[o.token];s.type=i?"strong_close":"em_close",s.tag=i?"strong":"em",s.nesting=-1,s.markup=i?c+c:c,s.content="",i&&(u.tokens[e[t-1].token].content="",u.tokens[e[r.end+1].token].content="",t--)}}function gr(u){const e=u.tokens_meta,n=u.tokens_meta.length;Ie(u,u.delimiters);for(let t=0;t<n;t++)e[t]&&e[t].delimiters&&Ie(u,e[t].delimiters)}const Re={tokenize:mr,postProcess:gr};function kr(u,e){let n,t,r,o,i="",c="",a=u.pos,s=!0;if(u.src.charCodeAt(u.pos)!==91)return!1;const l=u.pos,p=u.posMax,h=u.pos+1,f=u.md.helpers.parseLinkLabel(u,u.pos,!0);if(f<0)return!1;let d=f+1;if(d<p&&u.src.charCodeAt(d)===40){for(s=!1,d++;d<p&&(n=u.src.charCodeAt(d),!(!w(n)&&n!==10));d++);if(d>=p)return!1;if(a=d,r=u.md.helpers.parseLinkDestination(u.src,d,u.posMax),r.ok){for(i=u.md.normalizeLink(r.str),u.md.validateLink(i)?d=r.pos:i="",a=d;d<p&&(n=u.src.charCodeAt(d),!(!w(n)&&n!==10));d++);if(r=u.md.helpers.parseLinkTitle(u.src,d,u.posMax),d<p&&a!==d&&r.ok)for(c=r.str,d=r.pos;d<p&&(n=u.src.charCodeAt(d),!(!w(n)&&n!==10));d++);}(d>=p||u.src.charCodeAt(d)!==41)&&(s=!0),d++}if(s){if(typeof u.env.references>"u")return!1;if(d<p&&u.src.charCodeAt(d)===91?(a=d+1,d=u.md.helpers.parseLinkLabel(u,d),d>=0?t=u.src.slice(a,d++):d=f+1):d=f+1,t||(t=u.src.slice(h,f)),o=u.env.references[du(t)],!o)return u.pos=l,!1;i=o.href,c=o.title}if(!e){u.pos=h,u.posMax=f;const g=u.push("link_open","a",1),m=[["href",i]];g.attrs=m,c&&m.push(["title",c]),u.linkLevel++,u.md.inline.tokenize(u),u.linkLevel--,u.push("link_close","a",-1)}return u.pos=d,u.posMax=p,!0}function _r(u,e){let n,t,r,o,i,c,a,s,l="";const p=u.pos,h=u.posMax;if(u.src.charCodeAt(u.pos)!==33||u.src.charCodeAt(u.pos+1)!==91)return!1;const f=u.pos+2,d=u.md.helpers.parseLinkLabel(u,u.pos+1,!1);if(d<0)return!1;if(o=d+1,o<h&&u.src.charCodeAt(o)===40){for(o++;o<h&&(n=u.src.charCodeAt(o),!(!w(n)&&n!==10));o++);if(o>=h)return!1;for(s=o,c=u.md.helpers.parseLinkDestination(u.src,o,u.posMax),c.ok&&(l=u.md.normalizeLink(c.str),u.md.validateLink(l)?o=c.pos:l=""),s=o;o<h&&(n=u.src.charCodeAt(o),!(!w(n)&&n!==10));o++);if(c=u.md.helpers.parseLinkTitle(u.src,o,u.posMax),o<h&&s!==o&&c.ok)for(a=c.str,o=c.pos;o<h&&(n=u.src.charCodeAt(o),!(!w(n)&&n!==10));o++);else a="";if(o>=h||u.src.charCodeAt(o)!==41)return u.pos=p,!1;o++}else{if(typeof u.env.references>"u")return!1;if(o<h&&u.src.charCodeAt(o)===91?(s=o+1,o=u.md.helpers.parseLinkLabel(u,o),o>=0?r=u.src.slice(s,o++):o=d+1):o=d+1,r||(r=u.src.slice(f,d)),i=u.env.references[du(r)],!i)return u.pos=p,!1;l=i.href,a=i.title}if(!e){t=u.src.slice(f,d);const g=[];u.md.inline.parse(t,u.md,u.env,g);const m=u.push("image","img",0),_=[["src",l],["alt",""]];m.attrs=_,m.children=g,m.content=t,a&&_.push(["title",a])}return u.pos=o,u.posMax=h,!0}const yr=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,vr=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Cr(u,e){let n=u.pos;if(u.src.charCodeAt(n)!==60)return!1;const t=u.pos,r=u.posMax;for(;;){if(++n>=r)return!1;const i=u.src.charCodeAt(n);if(i===60)return!1;if(i===62)break}const o=u.src.slice(t+1,n);if(vr.test(o)){const i=u.md.normalizeLink(o);if(!u.md.validateLink(i))return!1;if(!e){const c=u.push("link_open","a",1);c.attrs=[["href",i]],c.markup="autolink",c.info="auto";const a=u.push("text","",0);a.content=u.md.normalizeLinkText(o);const s=u.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return u.pos+=o.length+2,!0}if(yr.test(o)){const i=u.md.normalizeLink("mailto:"+o);if(!u.md.validateLink(i))return!1;if(!e){const c=u.push("link_open","a",1);c.attrs=[["href",i]],c.markup="autolink",c.info="auto";const a=u.push("text","",0);a.content=u.md.normalizeLinkText(o);const s=u.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return u.pos+=o.length+2,!0}return!1}function Er(u){return/^<a[>\s]/i.test(u)}function wr(u){return/^<\/a\s*>/i.test(u)}function Dr(u){const e=u|32;return e>=97&&e<=122}function Ar(u,e){if(!u.md.options.html)return!1;const n=u.posMax,t=u.pos;if(u.src.charCodeAt(t)!==60||t+2>=n)return!1;const r=u.src.charCodeAt(t+1);if(r!==33&&r!==63&&r!==47&&!Dr(r))return!1;const o=u.src.slice(t).match(nr);if(!o)return!1;if(!e){const i=u.push("html_inline","",0);i.content=o[0],Er(i.content)&&u.linkLevel++,wr(i.content)&&u.linkLevel--}return u.pos+=o[0].length,!0}const Fr=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Sr=/^&([a-z][a-z0-9]{1,31});/i;function Tr(u,e){const n=u.pos,t=u.posMax;if(u.src.charCodeAt(n)!==38||n+1>=t)return!1;if(u.src.charCodeAt(n+1)===35){const o=u.src.slice(n).match(Fr);if(o){if(!e){const i=o[1][0].toLowerCase()==="x"?parseInt(o[1].slice(1),16):parseInt(o[1],10),c=u.push("text_special","",0);c.content=Ru(i)?eu(i):eu(65533),c.markup=o[0],c.info="entity"}return u.pos+=o[0].length,!0}}else{const o=u.src.slice(n).match(Sr);if(o){const i=ut(o[0]);if(i!==o[0]){if(!e){const c=u.push("text_special","",0);c.content=i,c.markup=o[0],c.info="entity"}return u.pos+=o[0].length,!0}}}return!1}function Be(u){const e={},n=u.length;if(!n)return;let t=0,r=-2;const o=[];for(let i=0;i<n;i++){const c=u[i];if(o.push(0),(u[t].marker!==c.marker||r!==c.token-1)&&(t=i),r=c.token,c.length=c.length||0,!c.close)continue;e.hasOwnProperty(c.marker)||(e[c.marker]=[-1,-1,-1,-1,-1,-1]);const a=e[c.marker][(c.open?3:0)+c.length%3];let s=t-o[t]-1,l=s;for(;s>a;s-=o[s]+1){const p=u[s];if(p.marker===c.marker&&p.open&&p.end<0){let h=!1;if((p.close||c.open)&&(p.length+c.length)%3===0&&(p.length%3!==0||c.length%3!==0)&&(h=!0),!h){const f=s>0&&!u[s-1].open?o[s-1]+1:0;o[i]=i-s+f,o[s]=f,c.open=!1,p.end=i,p.close=!1,l=-1,r=-2;break}}}l!==-1&&(e[c.marker][(c.open?3:0)+(c.length||0)%3]=l)}}function zr(u){const e=u.tokens_meta,n=u.tokens_meta.length;Be(u.delimiters);for(let t=0;t<n;t++)e[t]&&e[t].delimiters&&Be(e[t].delimiters)}function Nr(u){let e,n,t=0;const r=u.tokens,o=u.tokens.length;for(e=n=0;e<o;e++)r[e].nesting<0&&t--,r[e].level=t,r[e].nesting>0&&t++,r[e].type==="text"&&e+1<o&&r[e+1].type==="text"?r[e+1].content=r[e].content+r[e+1].content:(e!==n&&(r[n]=r[e]),n++);e!==n&&(r.length=n)}const $u=[["text",sr],["linkify",fr],["newline",dr],["escape",hr],["backticks",pr],["strikethrough",Me.tokenize],["emphasis",Re.tokenize],["link",kr],["image",_r],["autolink",Cr],["html_inline",Ar],["entity",Tr]],Ou=[["balance_pairs",zr],["strikethrough",Me.postProcess],["emphasis",Re.postProcess],["fragments_join",Nr]];function iu(){this.ruler=new S;for(let u=0;u<$u.length;u++)this.ruler.push($u[u][0],$u[u][1]);this.ruler2=new S;for(let u=0;u<Ou.length;u++)this.ruler2.push(Ou[u][0],Ou[u][1])}iu.prototype.skipToken=function(u){const e=u.pos,n=this.ruler.getRules(""),t=n.length,r=u.md.options.maxNesting,o=u.cache;if(typeof o[e]<"u"){u.pos=o[e];return}let i=!1;if(u.level<r){for(let c=0;c<t;c++)if(u.level++,i=n[c](u,!0),u.level--,i){if(e>=u.pos)throw new Error("inline rule didn't increment state.pos");break}}else u.pos=u.posMax;i||u.pos++,o[e]=u.pos},iu.prototype.tokenize=function(u){const e=this.ruler.getRules(""),n=e.length,t=u.posMax,r=u.md.options.maxNesting;for(;u.pos<t;){const o=u.pos;let i=!1;if(u.level<r){for(let c=0;c<n;c++)if(i=e[c](u,!1),i){if(o>=u.pos)throw new Error("inline rule didn't increment state.pos");break}}if(i){if(u.pos>=t)break;continue}u.pending+=u.src[u.pos++]}u.pending&&u.pushPending()},iu.prototype.parse=function(u,e,n,t){const r=new this.State(u,e,n,t);this.tokenize(r);const o=this.ruler2.getRules(""),i=o.length;for(let c=0;c<i;c++)o[c](r)},iu.prototype.State=ou;function Mr(u){const e={};u=u||{},e.src_Any=he.source,e.src_Cc=pe.source,e.src_Z=xe.source,e.src_P=zu.source,e.src_ZPCc=[e.src_Z,e.src_P,e.src_Cc].join("|"),e.src_ZCc=[e.src_Z,e.src_Cc].join("|");const n="[><｜]";return e.src_pseudo_letter=`(?:(?!${n}|${e.src_ZPCc})${e.src_Any})`,e.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",e.src_auth=`(?:(?:(?!${e.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`,e.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",e.src_host_terminator=`(?=$|${n}|${e.src_ZPCc})(?!${u["---"]?"-(?!--)|":"-|"}_|:\\d|\\.-|\\.(?!$|${e.src_ZPCc}))`,e.src_path=`(?:[/?#](?:(?!${e.src_ZCc}|${n}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${e.src_ZCc}|\\]).)*\\]|\\((?:(?!${e.src_ZCc}|[)]).)*\\)|\\{(?:(?!${e.src_ZCc}|[}]).)*\\}|\\"(?:(?!${e.src_ZCc}|["]).)+\\"|\\'(?:(?!${e.src_ZCc}|[']).)+\\'|\\'(?=${e.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${e.src_ZCc}|[.]|$)|`+(u["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+`,(?!${e.src_ZCc}|$)|;(?!${e.src_ZCc}|$)|\\!+(?!${e.src_ZCc}|[!]|$)|\\?(?!${e.src_ZCc}|[?]|$))+|\\/)?`,e.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]{0,63}',e.src_xn="xn--[a-z0-9\\-]{1,59}",e.src_domain_root="(?:"+e.src_xn+`|${e.src_pseudo_letter}{1,63})`,e.src_domain="(?:"+e.src_xn+`|(?:${e.src_pseudo_letter})|(?:${e.src_pseudo_letter}(?:-|${e.src_pseudo_letter}){0,61}${e.src_pseudo_letter}))`,e.src_host=`(?:(?:(?:(?:${e.src_domain})\\.)*${e.src_domain}))`,e.tpl_host_fuzzy="(?:"+e.src_ip4+`|(?:(?:(?:${e.src_domain})\\.)+(?:%TLDS%)))`,e.tpl_host_no_ip_fuzzy=`(?:(?:(?:${e.src_domain})\\.)+(?:%TLDS%))`,e.src_host_strict=e.src_host+e.src_host_terminator,e.tpl_host_fuzzy_strict=e.tpl_host_fuzzy+e.src_host_terminator,e.src_host_port_strict=e.src_host+e.src_port+e.src_host_terminator,e.tpl_host_port_fuzzy_strict=e.tpl_host_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_port_no_ip_fuzzy_strict=e.tpl_host_no_ip_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_fuzzy_test=`localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${e.src_ZPCc}|>|$))`,e.tpl_email_fuzzy=`(^|${n}|"|\\(|${e.src_ZCc})(${e.src_email_name}@${e.tpl_host_fuzzy_strict})`,e.tpl_link_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${e.src_ZPCc}))((?![$+<=>^\`|｜])${e.tpl_host_port_fuzzy_strict}${e.src_path})`,e.tpl_link_no_ip_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${e.src_ZPCc}))((?![$+<=>^\`|｜])${e.tpl_host_port_no_ip_fuzzy_strict}${e.src_path})`,e}function Hu(u){return Array.prototype.slice.call(arguments,1).forEach(function(n){n&&Object.keys(n).forEach(function(t){u[t]=n[t]})}),u}function mu(u){return Object.prototype.toString.call(u)}function Ir(u){return mu(u)==="[object String]"}function Rr(u){return mu(u)==="[object Object]"}function Br(u){return mu(u)==="[object RegExp]"}function Le(u){return mu(u)==="[object Function]"}function Lr(u){return u.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const qe={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function qr(u){return Object.keys(u||{}).reduce(function(e,n){return e||qe.hasOwnProperty(n)},!1)}const Pr={"http:":{validate:function(u,e,n){const t=u.slice(e);return n.re.http||(n.re.http=new RegExp(`^\\/\\/${n.re.src_auth}${n.re.src_host_port_strict}${n.re.src_path}`,"i")),n.re.http.test(t)?t.match(n.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(u,e,n){const t=u.slice(e);return n.re.no_http||(n.re.no_http=new RegExp("^"+n.re.src_auth+`(?:localhost|(?:(?:${n.re.src_domain})\\.)+${n.re.src_domain_root})`+n.re.src_port+n.re.src_host_terminator+n.re.src_path,"i")),n.re.no_http.test(t)?e>=3&&u[e-3]===":"||e>=3&&u[e-3]==="/"?0:t.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(u,e,n){const t=u.slice(e);return n.re.mailto||(n.re.mailto=new RegExp(`^${n.re.src_email_name}@${n.re.src_host_strict}`,"i")),n.re.mailto.test(t)?t.match(n.re.mailto)[0].length:0}}},$r="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Or="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function Hr(u){return function(e,n){const t=e.slice(n);return u.test(t)?t.match(u)[0].length:0}}function Pe(){return function(u,e){e.normalize(u)}}function gu(u){const e=u.re=Mr(u.__opts__),n=u.__tlds__.slice();u.onCompile(),u.__tlds_replaced__||n.push($r),n.push(e.src_xn),e.src_tlds=n.join("|");function t(c){return c.replace("%TLDS%",e.src_tlds)}e.email_fuzzy=RegExp(t(e.tpl_email_fuzzy),"i"),e.email_fuzzy_global=RegExp(t(e.tpl_email_fuzzy),"ig"),e.link_fuzzy=RegExp(t(e.tpl_link_fuzzy),"i"),e.link_fuzzy_global=RegExp(t(e.tpl_link_fuzzy),"ig"),e.link_no_ip_fuzzy=RegExp(t(e.tpl_link_no_ip_fuzzy),"i"),e.link_no_ip_fuzzy_global=RegExp(t(e.tpl_link_no_ip_fuzzy),"ig"),e.host_fuzzy_test=RegExp(t(e.tpl_host_fuzzy_test),"i");const r=[];u.__compiled__={};function o(c,a){throw new Error(`(LinkifyIt) Invalid schema "${c}": ${a}`)}Object.keys(u.__schemas__).forEach(function(c){const a=u.__schemas__[c];if(a===null)return;const s={validate:null,link:null};if(u.__compiled__[c]=s,Rr(a)){Br(a.validate)?s.validate=Hr(a.validate):Le(a.validate)?s.validate=a.validate:o(c,a),Le(a.normalize)?s.normalize=a.normalize:a.normalize?o(c,a):s.normalize=Pe();return}if(Ir(a)){r.push(c);return}o(c,a)}),r.forEach(function(c){u.__compiled__[u.__schemas__[c]]&&(u.__compiled__[c].validate=u.__compiled__[u.__schemas__[c]].validate,u.__compiled__[c].normalize=u.__compiled__[u.__schemas__[c]].normalize)}),u.__compiled__[""]={validate:null,normalize:Pe()};const i=Object.keys(u.__compiled__).filter(function(c){return c.length>0&&u.__compiled__[c]}).map(Lr).join("|");u.re.schema_test=RegExp(`(^|(?!_)(?:[><｜]|${e.src_ZPCc}))(${i})`,"i"),u.re.schema_search=RegExp(`(^|(?!_)(?:[><｜]|${e.src_ZPCc}))(${i})`,"ig"),u.re.schema_at_start=RegExp(`^${u.re.schema_search.source}`,"i"),u.re.pretest=RegExp(`(${u.re.schema_test.source})|(${u.re.host_fuzzy_test.source})|@`,"i")}function $e(u,e,n,t){const r=u.slice(n,t);this.schema=e.toLowerCase(),this.index=n,this.lastIndex=t,this.raw=r,this.text=r,this.url=r}function z(u,e){if(!(this instanceof z))return new z(u,e);e||qr(u)&&(e=u,u={}),this.__opts__=Hu({},qe,e),this.__schemas__=Hu({},Pr,u),this.__compiled__={},this.__tlds__=Or,this.__tlds_replaced__=!1,this.re={},gu(this)}z.prototype.add=function(e,n){return this.__schemas__[e]=n,gu(this),this},z.prototype.set=function(e){return this.__opts__=Hu(this.__opts__,e),this},z.prototype.test=function(e){if(!e.length)return!1;let n,t;if(this.re.schema_test.test(e)){for(t=this.re.schema_search,t.lastIndex=0;(n=t.exec(e))!==null;)if(this.testSchemaAt(e,n[2],t.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&e.search(this.re.host_fuzzy_test)>=0&&e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&e.indexOf("@")>=0&&e.match(this.re.email_fuzzy)!==null)},z.prototype.pretest=function(e){return this.re.pretest.test(e)},z.prototype.testSchemaAt=function(e,n,t){return this.__compiled__[n.toLowerCase()]?this.__compiled__[n.toLowerCase()].validate(e,t,this):0},z.prototype.match=function(e){const n=[],t=[],r=[],o=[];let i,c,a;function s(h,f){return h?f?h.index!==f.index?h.index<f.index?h:f:h.lastIndex>=f.lastIndex?h:f:h:f}if(!e.length)return null;if(this.re.schema_test.test(e))for(a=this.re.schema_search,a.lastIndex=0;(i=a.exec(e))!==null;)c=this.testSchemaAt(e,i[2],a.lastIndex),c&&t.push({schema:i[2],index:i.index+i[1].length,lastIndex:i.index+i[0].length+c});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(a=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,a.lastIndex=0;(i=a.exec(e))!==null;)r.push({schema:"",index:i.index+i[1].length,lastIndex:i.index+i[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(a=this.re.email_fuzzy_global,a.lastIndex=0;(i=a.exec(e))!==null;)o.push({schema:"mailto:",index:i.index+i[1].length,lastIndex:i.index+i[0].length});const l=[0,0,0];let p=0;for(;;){const h=[t[l[0]],o[l[1]],r[l[2]]],f=s(s(h[0],h[1]),h[2]);if(!f)break;if(f===h[0]?l[0]++:f===h[1]?l[1]++:l[2]++,f.index<p)continue;const d=new $e(e,f.schema,f.index,f.lastIndex);this.__compiled__[d.schema].normalize(d,this),n.push(d),p=f.lastIndex}return n.length?n:null},z.prototype.matchAtStart=function(e){if(!e.length)return null;const n=this.re.schema_at_start.exec(e);if(!n)return null;const t=this.testSchemaAt(e,n[2],n[0].length);if(!t)return null;const r=new $e(e,n[2],n.index+n[1].length,n.index+n[0].length+t);return this.__compiled__[r.schema].normalize(r,this),r},z.prototype.tlds=function(e,n){return e=Array.isArray(e)?e:[e],n?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(t,r,o){return t!==o[r-1]}).reverse(),gu(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,gu(this),this)},z.prototype.normalize=function(e){e.schema||(e.url=`http://${e.url}`),e.schema==="mailto:"&&!/^mailto:/i.test(e.url)&&(e.url=`mailto:${e.url}`)},z.prototype.onCompile=function(){};const K=2147483647,L=36,ju=1,cu=26,jr=38,Ur=700,Oe=72,He=128,je="-",Zr=/^xn--/,Wr=/[^\0-\x7F]/,Gr=/[\x2E\u3002\uFF0E\uFF61]/g,Vr={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Uu=L-ju,q=Math.floor,Zu=String.fromCharCode;function j(u){throw new RangeError(Vr[u])}function Kr(u,e){const n=[];let t=u.length;for(;t--;)n[t]=e(u[t]);return n}function Ue(u,e){const n=u.split("@");let t="";n.length>1&&(t=n[0]+"@",u=n[1]),u=u.replace(Gr,".");const r=u.split("."),o=Kr(r,e).join(".");return t+o}function Ze(u){const e=[];let n=0;const t=u.length;for(;n<t;){const r=u.charCodeAt(n++);if(r>=55296&&r<=56319&&n<t){const o=u.charCodeAt(n++);(o&64512)==56320?e.push(((r&1023)<<10)+(o&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}const Yr=u=>String.fromCodePoint(...u),Xr=function(u){return u>=48&&u<58?26+(u-48):u>=65&&u<91?u-65:u>=97&&u<123?u-97:L},We=function(u,e){return u+22+75*(u<26)-((e!=0)<<5)},Ge=function(u,e,n){let t=0;for(u=n?q(u/Ur):u>>1,u+=q(u/e);u>Uu*cu>>1;t+=L)u=q(u/Uu);return q(t+(Uu+1)*u/(u+jr))},Ve=function(u){const e=[],n=u.length;let t=0,r=He,o=Oe,i=u.lastIndexOf(je);i<0&&(i=0);for(let c=0;c<i;++c)u.charCodeAt(c)>=128&&j("not-basic"),e.push(u.charCodeAt(c));for(let c=i>0?i+1:0;c<n;){const a=t;for(let l=1,p=L;;p+=L){c>=n&&j("invalid-input");const h=Xr(u.charCodeAt(c++));h>=L&&j("invalid-input"),h>q((K-t)/l)&&j("overflow"),t+=h*l;const f=p<=o?ju:p>=o+cu?cu:p-o;if(h<f)break;const d=L-f;l>q(K/d)&&j("overflow"),l*=d}const s=e.length+1;o=Ge(t-a,s,a==0),q(t/s)>K-r&&j("overflow"),r+=q(t/s),t%=s,e.splice(t++,0,r)}return String.fromCodePoint(...e)},Ke=function(u){const e=[];u=Ze(u);const n=u.length;let t=He,r=0,o=Oe;for(const a of u)a<128&&e.push(Zu(a));const i=e.length;let c=i;for(i&&e.push(je);c<n;){let a=K;for(const l of u)l>=t&&l<a&&(a=l);const s=c+1;a-t>q((K-r)/s)&&j("overflow"),r+=(a-t)*s,t=a;for(const l of u)if(l<t&&++r>K&&j("overflow"),l===t){let p=r;for(let h=L;;h+=L){const f=h<=o?ju:h>=o+cu?cu:h-o;if(p<f)break;const d=p-f,g=L-f;e.push(Zu(We(f+d%g,0))),p=q(d/g)}e.push(Zu(We(p,0))),o=Ge(r,s,c===i),r=0,++c}++r,++t}return e.join("")},Ye={version:"2.3.1",ucs2:{decode:Ze,encode:Yr},decode:Ve,encode:Ke,toASCII:function(u){return Ue(u,function(e){return Wr.test(e)?"xn--"+Ke(e):e})},toUnicode:function(u){return Ue(u,function(e){return Zr.test(e)?Ve(e.slice(4).toLowerCase()):e})}},Jr={default:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},zero:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},commonmark:{options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}}},Qr=/^(vbscript|javascript|file|data):/,u0=/^data:image\/(gif|png|jpeg|webp);/;function e0(u){const e=u.trim().toLowerCase();return Qr.test(e)?u0.test(e):!0}const Xe=["http:","https:","mailto:"];function n0(u){const e=Tu(u,!0);if(e.hostname&&(!e.protocol||Xe.indexOf(e.protocol)>=0))try{e.hostname=Ye.toASCII(e.hostname)}catch{}return uu(Su(e))}function t0(u){const e=Tu(u,!0);if(e.hostname&&(!e.protocol||Xe.indexOf(e.protocol)>=0))try{e.hostname=Ye.toUnicode(e.hostname)}catch{}return W(Su(e),W.defaultChars+"%")}function N(u,e){if(!(this instanceof N))return new N(u,e);e||Iu(u)||(e=u||{},u="default"),this.inline=new iu,this.block=new xu,this.core=new Lu,this.renderer=new V,this.linkify=new z,this.validateLink=e0,this.normalizeLink=n0,this.normalizeLinkText=t0,this.utils=bt,this.helpers=fu({},kt),this.options={},this.configure(u),e&&this.set(e)}N.prototype.set=function(u){return fu(this.options,u),this},N.prototype.configure=function(u){const e=this;if(Iu(u)){const n=u;if(u=Jr[n],!u)throw new Error('Wrong `markdown-it` preset "'+n+'", check name')}if(!u)throw new Error("Wrong `markdown-it` preset, can't be empty");return u.options&&e.set(u.options),u.components&&Object.keys(u.components).forEach(function(n){u.components[n].rules&&e[n].ruler.enableOnly(u.components[n].rules),u.components[n].rules2&&e[n].ruler2.enableOnly(u.components[n].rules2)}),this},N.prototype.enable=function(u,e){let n=[];Array.isArray(u)||(u=[u]),["core","block","inline"].forEach(function(r){n=n.concat(this[r].ruler.enable(u,!0))},this),n=n.concat(this.inline.ruler2.enable(u,!0));const t=u.filter(function(r){return n.indexOf(r)<0});if(t.length&&!e)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+t);return this},N.prototype.disable=function(u,e){let n=[];Array.isArray(u)||(u=[u]),["core","block","inline"].forEach(function(r){n=n.concat(this[r].ruler.disable(u,!0))},this),n=n.concat(this.inline.ruler2.disable(u,!0));const t=u.filter(function(r){return n.indexOf(r)<0});if(t.length&&!e)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+t);return this},N.prototype.use=function(u){const e=[this].concat(Array.prototype.slice.call(arguments,1));return u.apply(u,e),this},N.prototype.parse=function(u,e){if(typeof u!="string")throw new Error("Input data should be a String");const n=new this.core.State(u,this,e);return this.core.process(n),n.tokens},N.prototype.render=function(u,e){return e=e||{},this.renderer.render(this.parse(u,e),this.options,e)},N.prototype.parseInline=function(u,e){const n=new this.core.State(u,this,e);return n.inlineMode=!0,this.core.process(n),n.tokens},N.prototype.renderInline=function(u,e){return e=e||{},this.renderer.render(this.parseInline(u,e),this.options,e)};const ku=new WeakMap;function r0(u){const e=[0];for(let n=0;n<u.length;n++)u[n]===`
`&&e.push(n+1);return e.push(u.length),e}function Je(u,e,n){if(e==="")return{start:n,end:n};for(let t=n;t<=u.length-1;t++){let r=0,o=t;for(;r<e.length&&o<u.length;){if(u[o]==="\\"&&o+1<u.length&&u[o+1]===e[r]){o+=2,r++;continue}if(u[o]===e[r]){o++,r++;continue}break}if(r===e.length)return{start:t,end:o}}return null}function Qe(u,e){if(u[e]!=="(")return e;let n=1,t=e+1;for(;t<u.length&&n>0;)u[t]==="("?n++:u[t]===")"&&n--,t++;return t}function un(u,e,n){let t=0;for(const r of n)switch(r.type){case"text":{const o=Je(u,r.content,t);o&&(ku.set(r,{start:e+o.start,end:e+o.end}),t=o.end);break}case"code_inline":{const o=u.indexOf("`",t);if(o<0)break;const i=Je(u,r.content,o+1);if(i){ku.set(r,{start:e+i.start,end:e+i.end});const c=u.indexOf("`",i.end);t=c>=0?c+1:i.end}else t=o+1;break}case"softbreak":case"hardbreak":{const o=u.indexOf(`
`,t);o>=0&&(ku.set(r,{start:e+o,end:e+o+1}),t=o+1);break}case"image":{const o=u.indexOf("![",t);if(o>=0){const i=Qe(u,u.indexOf("]",o+2)+1);t=i>t?i:t}break}default:{const o=r.markup||"";if(o){const i=u.indexOf(o,t);i>=0&&(t=i+o.length)}r.type==="link_close"&&(t=Qe(u,t))}}}function o0(u){const e=[];let n=-1;for(let t=0;t<u.length;t++){const r=u[t];if(r==="\\"&&t+1<u.length){t++;continue}r==="|"&&(n>=0&&e.push({start:n,end:t}),n=t+1)}return n>=0&&n<=u.length&&e.push({start:n,end:u.length}),e}function i0(u,e){const n=r0(e);let t=null,r=0;for(const o of u){if(o.type==="tr_open"&&o.map){t=[o.map[0],o.map[1]],r=0;continue}if(o.type==="tr_close"||o.type==="table_close"){t=null,r=0;continue}if(!(o.type!=="inline"||!o.children)){if(o.map){const[i,c]=o.map,a=n[i]??0,s=n[c]??e.length,l=e.slice(a,s);un(l,a,o.children);continue}if(t!==null){const[i,c]=t,a=n[i]??0,s=n[c]??e.length,l=e.slice(a,s),h=o0(l)[r];r+=1,h&&un(l.slice(h.start,h.end),a+h.start,o.children)}}}}function c0(u){return u.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function en(u,e){const n=ku.get(e),t=c0(u);return n?`<span data-o="${n.start},${n.end}">${t}</span>`:t}const nn=new WeakSet;function a0(u){nn.has(u)||(nn.add(u),u.renderer.rules.text,u.renderer.rules.text=(e,n)=>{const t=e[n];return en(t.content,t)},u.renderer.rules.code_inline=(e,n)=>{const t=e[n];return`<code>${en(t.content,t)}</code>`})}function s0(u,e){const n=u.parse(e,{});return i0(n,e),u.renderer.render(n,u.options,{})}function tn(){const u=new N({html:!1,linkify:!0,breaks:!1,typographer:!1});u.enable(["table","strikethrough"]);const e=u.renderer.rules.link_open||((n,t,r,o,i)=>i.renderToken(n,t,r));return u.renderer.rules.link_open=(n,t,r,o,i)=>{const c=n[t],a=c.attrIndex("target");return a<0?c.attrPush(["target","_blank"]):c.attrs[a][1]="_blank",c.attrIndex("rel")<0&&c.attrPush(["rel","noopener noreferrer"]),e(n,t,r,o,i)},a0(u),u}tn();function l0(u,e,n){let t=null,r=!1;u.renderer.rules.fence=(o,i)=>{const c=o[i],a=((c.info||"").trim().split(/\s+/)[0]??"").toLowerCase();if(t&&a)try{return t.codeToHtml(c.content,{lang:a,themes:{light:"github-light",dark:"github-dark"}})}catch{}else r||(r=!0,n().then(l=>{t=l,e()}).catch(()=>{}));return`<pre><code${a?` class="language-${a}"`:""}>${u.utils.escapeHtml(c.content)}</code></pre>
`}}function f0(u){if(!u)return null;const e=u.getAttribute("data-o");if(!e)return null;const[n,t]=e.split(",").map(Number);return Number.isNaN(n)||Number.isNaN(t)?null:[n,t]}function d0(u,e){let n=0;for(const r of Array.from(u.childNodes))if(r.nodeType===Node.TEXT_NODE){const o=r;if(e<=n+o.length)return{node:o,offset:Math.max(0,e-n)};n+=o.length}const t=Array.from(u.childNodes).filter(r=>r.nodeType===Node.TEXT_NODE).pop();return t?{node:t,offset:t.length}:null}function h0(u){const e=[];for(const n of Array.from(u.querySelectorAll("span[data-o]:not(.cm-inserted)"))){const t=f0(n);t&&e.push({el:n,s:t[0],e:t[1]})}return e}function _u(u,e,n="any"){const t=h0(u);let r;if(n==="start"?r=t.find(i=>i.s===e):n==="end"&&(r=t.find(i=>i.e===e)),r??(r=t.find(i=>i.s<=e&&e<=i.e)),!r){const i=t.filter(c=>c.e<=e).pop();i&&(r=i)}return r?d0(r.el,e-r.s):null}function Wu(u,e,n){const t=_u(u,e,"start"),r=_u(u,n,"end");if(!t||!r)return null;const o=new Range;try{o.setStart(t.node,t.offset),o.setEnd(r.node,r.offset)}catch{return null}return o}const rn={deletion:"cm-del",highlight:"cm-hl",comment:"cm-comment",substitution:"cm-sub-old"};let au=!1;try{au=typeof Highlight<"u"&&!!CSS.highlights}catch{au=!1}function Gu(u,e){return e?`${e}-${u}`:u}function p0(u,e,n=""){if(u.querySelectorAll(".cm-inserted").forEach(t=>t.remove()),u.querySelectorAll("mark.cm-fallback").forEach(t=>{t.replaceWith(...Array.from(t.childNodes))}),u.normalize(),au){for(const r of Object.values(rn))CSS.highlights.delete(Gu(r,n));const t={};for(const r of e){if(r.type==="insertion")continue;const o=rn[r.type];if(!o)continue;const i=Wu(u,r.srcStart,r.srcEnd);i&&(t[o]??(t[o]=[])).push(i)}for(const[r,o]of Object.entries(t)){const i=new Highlight(...o);CSS.highlights.set(Gu(r,n),i)}}else{const t=[];for(const r of e){if(r.type==="insertion")continue;const o=Wu(u,r.srcStart,r.srcEnd);o&&t.push({range:o,a:r})}for(const{range:r,a:o}of t){const i=document.createElement("mark");i.className=`cm-fallback cm-fallback-${o.type}`;try{r.surroundContents(i)}catch{b0(r,i)}}}for(const t of e)t.type==="substitution"&&on(u,t.srcEnd,"span","cm-sub-new cm-inserted",t.replacement??"",!0);for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="insertion"&&on(u,r.srcStart,"ins","cm-ins cm-inserted",r.insertedText??"")}}function b0(u,e){const n=[],t=document.createTreeWalker(u.commonAncestorContainer,NodeFilter.SHOW_TEXT);let r=t.currentNode;for(;r;)u.intersectsNode(r)&&n.push(r),r=t.nextNode();for(const o of n){const i=e.cloneNode(!1);o.parentNode?.insertBefore(i,o),i.appendChild(o)}}function on(u,e,n,t,r,o=!1){if(!r&&!o)return;const i=_u(u,e);if(!i)return;const c=document.createElement(n);if(c.className=t,c.setAttribute("data-o",`${e},${e}`),o){const s=document.createElement("span");s.className="sub-arrow",s.textContent=" → ";const l=document.createElement("span");l.className="sub-new-text",l.textContent=r,c.appendChild(s),c.appendChild(l)}else c.textContent=r;const a=new Range;try{a.setStart(i.node,i.offset),a.insertNode(c)}catch{}}function x0(){return au}function m0(u,e,n=""){if(e.type==="insertion"){const r=_u(u,e.srcStart);if(r){const o=new Range;o.setStart(r.node,r.offset),o.collapse(!0),cn(u,o,n)}return}const t=Wu(u,e.srcStart,e.srcEnd);t&&cn(u,t,n)}function g0(u){for(let e=u.parentElement;e;e=e.parentElement)if(e.scrollHeight>e.clientHeight){const n=getComputedStyle(e).overflowY;if(n==="auto"||n==="scroll")return e}return null}function cn(u,e,n){const t=e.getBoundingClientRect(),r=g0(u);if(r){const o=r.getBoundingClientRect().top,i=r.scrollTop+(t.top-o)-r.clientHeight/2;r.scrollTo({top:Math.max(0,i),behavior:"smooth"})}else window.scrollTo({top:Math.max(0,t.top+window.scrollY-window.innerHeight/2),behavior:"smooth"});if(au){const o=new Highlight(e),i=Gu("cm-flash",n);CSS.highlights.set(i,o),window.setTimeout(()=>CSS.highlights.delete(i),1200)}}function k0(u){if(!u)return null;const e=u.getAttribute("data-o");if(!e)return null;const[n,t]=e.split(",").map(Number);return Number.isNaN(n)||Number.isNaN(t)?null:[n,t]}function _0(u,e,n){let t=0;for(const r of Array.from(n.childNodes)){if(r===u)return t+e;r.nodeType===Node.TEXT_NODE&&(t+=r.length)}return t+e}function Vu(u,e){if(u.nodeType===Node.TEXT_NODE){e.push(u);return}for(const n of Array.from(u.childNodes))Vu(n,e)}function Ku(u,e){let n=null,t=0;if(u.nodeType===Node.TEXT_NODE)n=u,t=e;else{const i=[];for(let c=e;c<u.childNodes.length&&(Vu(u.childNodes[c],i),!(i.length>0));c++);if(i[0])n=i[0],t=0;else for(let c=Math.min(e,u.childNodes.length)-1;c>=0;c--){const a=[];if(Vu(u.childNodes[c],a),a.length>0){n=a[a.length-1],t=n.length;break}}}if(!n||!n.parentElement)return null;const r=n.parentElement.closest("[data-o]"),o=k0(r);return o?o[0]===o[1]?o[0]:o[0]+_0(n,t,r):null}function y0(u){if(u.isCollapsed||u.rangeCount===0)return null;const e=u.getRangeAt(0),n=Ku(e.startContainer,e.startOffset),t=Ku(e.endContainer,e.endOffset);return n==null||t==null?null:n>t?{start:t,end:n,quotedText:u.toString()}:{start:n,end:t,quotedText:u.toString()}}function v0(u){if(u.rangeCount===0)return null;const e=u.getRangeAt(0);return Ku(e.startContainer,e.startOffset)}let Y=null;function C0(u){const e=Y;Y=null,e&&e(u)}function Yu(u){return C0(null),new Promise(e=>{const n=document.createElement("div");n.className="fxr-input-popover";const t=document.createElement("div");t.className="fxr-input-popover-title",t.textContent=u.title;const r=document.createElement("textarea");r.className="fxr-input-popover-area",r.value=u.value??"",r.rows=2;const o=document.createElement("div");o.className="fxr-input-popover-actions";const i=document.createElement("button");i.type="button",i.className="fxr-btn fxr-btn-ghost",i.textContent="取消";const c=document.createElement("button");c.type="button",c.className="fxr-btn fxr-btn-primary",c.textContent="确认",o.append(i,c);const a=p=>{Y=null,document.removeEventListener("mousedown",l,!0),n.remove(),e(p)};Y=a;const s=()=>{const p=r.value;!p.trim()&&!u.allowEmpty||a(p)};r.addEventListener("keydown",p=>{p.key==="Enter"&&!p.shiftKey&&!p.isComposing?(p.preventDefault(),s()):p.key==="Escape"&&(p.preventDefault(),a(null))}),c.addEventListener("click",s),i.addEventListener("click",()=>a(null));const l=p=>{n.contains(p.target)||a(null)};window.setTimeout(()=>{Y===a&&document.addEventListener("mousedown",l,!0)},0),n.append(t,r,o),document.body.appendChild(n),E0(n,u.anchor),window.setTimeout(()=>{Y===a&&(r.focus(),u.value&&r.select())},0)})}const Xu=320;function E0(u,e){let n,t;e&&(e.width>0||e.height>0||e.top>0)?(n=e.left+e.width/2-Xu/2,t=e.bottom+8):(n=window.innerWidth/2-Xu/2,t=window.innerHeight/3),n=Math.max(8,Math.min(n,window.innerWidth-Xu-8));const r=u.offsetHeight;e&&t+r>window.innerHeight-8&&(t=Math.max(8,e.top-r-8)),u.style.left=`${n+window.scrollX}px`,u.style.top=`${t+window.scrollY}px`}let an=0;function w0(){return an+=1,`a${Date.now().toString(36)}${an}`}function sn(){const u=window.getSelection();if(!u||u.rangeCount===0)return{selection:null,caret:null,anchorRect:null};const e=u.getRangeAt(0).getBoundingClientRect();return u.isCollapsed?{selection:null,caret:v0(u),anchorRect:e}:{selection:y0(u),caret:null,anchorRect:e}}function yu(){window.getSelection()?.removeAllRanges()}function vu(u,e,n,t,r={}){return{id:w0(),type:u,srcStart:e,srcEnd:n,quotedText:t,...r}}function Ju(u,e){return u.selection?u.selection.start===u.selection.end?(e.notify("选区未能定位到源码位置，请在正文原文上重新选择"),null):e.store.overlaps(u.selection.start,u.selection.end)?(e.notify("该段落已有重叠批注，CriticMarkup 不支持重叠"),null):u.selection:(e.notify("请先选中要批注的文字"),null)}async function D0(u,e,n){const{store:t,notify:r}=n;switch(u){case"insertion":{const o=e.caret??e.selection?.start??null;if(o==null)return r("请先在正文中点击一个插入位置"),!1;const i=await Yu({title:"输入要插入的新文字",anchor:e.anchorRect});return i==null?!1:(t.addAnnotation(vu(u,o,o,"",{insertedText:i})),yu(),!0)}case"deletion":case"highlight":{const o=Ju(e,n);return o?(t.addAnnotation(vu(u,o.start,o.end,o.quotedText)),yu(),!0):!1}case"substitution":{const o=Ju(e,n);if(!o)return!1;const i=await Yu({title:"输入替换后的新文字",value:o.quotedText,anchor:e.anchorRect,allowEmpty:!0});return i==null?!1:(t.addAnnotation(vu(u,o.start,o.end,o.quotedText,{replacement:i})),yu(),!0)}case"comment":{const o=Ju(e,n);return o?(t.addAnnotation(vu(u,o.start,o.end,o.quotedText,{comment:""})),yu(),!0):!1}}}const A0=["{++","++}","{--","--}","{==","==}","{~~","~~}","{>>","<<}","~>"];function Cu(u){let e=u;for(const n of A0)e=e.split(n).join(n[0]+" "+n.slice(1));return e}const Eu=0,F0=1,wu=2;function S0(u){const e=[];let n=0;const t=(r,o,i)=>{e.push({at:r,text:o,rank:i,seq:n++})};for(const r of u)switch(r.type){case"insertion":{t(r.srcStart,`{++ ${Cu(r.insertedText??"")} ++}`,F0);break}case"deletion":{t(r.srcStart,"{-- ",wu),t(r.srcEnd," --}",Eu);break}case"highlight":{t(r.srcStart,"{== ",wu),t(r.srcEnd," ==}",Eu);break}case"substitution":{t(r.srcStart,"{~~ ",wu),t(r.srcEnd,` ~> ${Cu(r.replacement??"")} ~~}`,Eu);break}case"comment":{const o=Cu((r.comment??"").trim());t(r.srcStart,"{== ",wu),t(r.srcEnd,o?` ==}{>> ${o} <<}`:" ==}",Eu);break}}return e}function Qu(u,e){const n=e.filter(i=>!i.unmapped),t=e.filter(i=>i.unmapped),r=S0(n);r.sort((i,c)=>i.at!==c.at?c.at-i.at:i.rank!==c.rank?c.rank-i.rank:c.seq-i.seq);let o=u;for(const i of r)o=o.slice(0,i.at)+i.text+o.slice(i.at);if(t.length>0){o+=`

---
`;for(const i of t){const c=Cu((i.quotedText||i.insertedText||i.replacement||"").replace(/\n/g," "));o+=`
{>> 未能定位到原段落的 ${i.type} 批注：${c} <<}`}}return o}function Du(u){return Qu(u.state.source,u.state.annotations)}function ln(u){return(u.state.fileName||"document.md").replace(/\.(md|markdown|mdown)$/i,"")}async function fn(u){try{return await navigator.clipboard.writeText(u),!0}catch{const e=document.createElement("textarea");e.value=u,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();let n=!1;try{n=document.execCommand("copy")}catch{n=!1}return e.remove(),n}}function dn(u,e){const n=new Blob([e],{type:"text/markdown;charset=utf-8"}),t=URL.createObjectURL(n),r=document.createElement("a");r.href=t,r.download=u,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(t)}async function T0(u,e){const n=Du(u);await fn(n)?e("已复制批注全文"):e("复制失败，请手动复制")}function z0(u,e){dn(`${ln(u)}-annotated.md`,Du(u)),e("已下载批注全文")}async function N0(u,e){const n=`${u.state.prompt}

${Du(u)}`;await fn(n)?e("已复制 Prompt + 批注全文"):e("复制失败，请手动复制")}function M0(u,e){dn(`${ln(u)}-for-ai.md`,`${u.state.prompt}

${Du(u)}`),e("已下载 Prompt + 批注全文")}function I0(u){let e,n;const t=(r,o=2200)=>{(!n||!n.isConnected)&&(n=document.createElement("div"),n.className="fxr-toast",u().appendChild(n)),n.textContent=r,n.classList.add("fxr-toast-visible"),e&&window.clearTimeout(e),e=window.setTimeout(()=>{n?.classList.remove("fxr-toast-visible")},o)};return t.dispose=()=>{e&&window.clearTimeout(e),n?.remove(),n=void 0},t}const hn={insertion:{label:"插入",icon:"➕",title:"插入新文字",key:"I"},deletion:{label:"删除",icon:"✂️",title:"标记为删除",key:"D"},substitution:{label:"替换",icon:"🔁",title:"替换为新文字",key:"S"},highlight:{label:"高亮",icon:"🔆",title:"高亮关注",key:"H"},comment:{label:"评论",icon:"💬",title:"添加评论",key:"C"}},R0=["deletion","substitution","highlight","comment","insertion"],pn=262,B0=40,X=8;function L0(u){const e=document.createElement("div");e.className="fxr-sel-menu";for(const n of R0){const t=hn[n],r=document.createElement("button");r.className=`fxr-sel-menu-btn fxr-sel-menu-${n}`,r.title=`${t.title}（快捷键 ${t.key}）`,r.innerHTML=`<span class="fxr-btn-icon">${t.icon}</span><span class="fxr-btn-label">${t.label}</span>`,r.addEventListener("pointerdown",o=>{o.preventDefault()}),r.addEventListener("click",()=>{u.annotate(n)}),e.appendChild(r)}return u.root.appendChild(e),{el:e,show(n){if(!u.store.state.source)return;const t=u.root.getBoundingClientRect();e.style.display="flex";let r=n.top-t.top-X-B0;r<X&&(r=n.bottom-t.top+X);let o=n.left-t.left+n.width/2-pn/2;o=Math.max(X,Math.min(o,t.width-pn-X)),e.style.top=`${Math.max(X,r)}px`,e.style.left=`${o}px`},hide(){e.style.display="none"}}}function q0(u){switch(u.type){case"insertion":return"插入";case"deletion":return"删除";case"substitution":return"替换";case"highlight":return"高亮";case"comment":return"评论"}}function P0(u){const e=document.createElement("aside");e.className="fxr-comments-panel";const n=document.createElement("div");n.className="fxr-drawer-backdrop",e.innerHTML=`
    <div class="fxr-comments-head">
      <span class="fxr-comments-title">评论与批注</span>
      <span class="fxr-comments-tools">
        <button class="fxr-comments-tool" data-act="undo" title="撤销（⌘/Ctrl+Z）">↩</button>
        <button class="fxr-comments-tool" data-act="redo" title="重做（⌘/Ctrl+Shift+Z）">↪</button>
        <button class="fxr-comments-tool" data-act="clear" title="清除全部批注">🗑</button>
        <span class="fxr-comments-count">0</span>
      </span>
      <span class="fxr-comments-tools fxr-comments-tail">
        ${u.canSubmit()?'<button class="fxr-submit-btn" data-act="submit" title="把批注全文放到会话输入框上方，发送时附带">提交</button>':""}
        <button class="fxr-comments-tool fxr-comments-close" data-act="close" title="收起批注栏">✕</button>
      </span>
    </div>
    <div class="fxr-comments-list"></div>`;const t=e.querySelector(".fxr-comments-list"),r=e.querySelector(".fxr-comments-count"),o=e.querySelector('[data-act="undo"]'),i=e.querySelector('[data-act="redo"]'),c=e.querySelector('[data-act="clear"]'),a=()=>{n.classList.remove("show"),e.classList.remove("open")},s=()=>{n.classList.add("show"),e.classList.add("open")};o.addEventListener("click",()=>{u.undo()||u.notify("没有可撤销的操作")}),i.addEventListener("click",()=>{u.redo()||u.notify("没有可重做的操作")}),c.addEventListener("click",()=>{u.store.state.annotations.length!==0&&window.confirm("确定清除全部批注？")&&u.clearAnnotations()}),e.querySelector('[data-act="submit"]')?.addEventListener("click",()=>u.submit()),e.querySelector('[data-act="close"]').addEventListener("click",a),n.addEventListener("click",a),$0(u,e);function l(h){const f=document.createElement("div");f.className=`fxr-comment-entry fxr-comment-entry-${h.type}`,f.dataset.id=h.id;const d=q0(h),g=h.quotedText||(h.type==="insertion"?h.insertedText:"")||"",m=h.type==="insertion"||h.type==="substitution";f.innerHTML=`
      <div class="fxr-comment-meta">
        <span class="fxr-comment-tag fxr-comment-tag-${h.type}">${d}</span>
        <button class="fxr-comment-locate" title="定位到正文">↗</button>
        ${m?'<button class="fxr-comment-edit" title="编辑文字">✎</button>':""}
        <button class="fxr-comment-del" title="删除该批注">✕</button>
      </div>
      <div class="fxr-comment-quote"></div>
      <div class="fxr-comment-extra"></div>`,f.querySelector(".fxr-comment-quote").textContent=g;const _=f.querySelector(".fxr-comment-extra");if(h.type==="substitution")_.innerHTML='<span class="fxr-sub-old"></span><span class="fxr-sub-arrow"> → </span><span class="fxr-sub-new"></span>',_.querySelector(".fxr-sub-old").textContent=h.quotedText,_.querySelector(".fxr-sub-new").textContent=h.replacement??"";else if(h.type==="insertion")_.innerHTML='<span class="fxr-ins-text"></span>',_.querySelector(".fxr-ins-text").textContent=h.insertedText??"";else if(h.type==="comment"){const b=document.createElement("textarea");b.className="fxr-comment-note",b.placeholder="输入审阅意见…",b.value=h.comment??"",b.addEventListener("input",()=>{u.store.setComment(h.id,b.value),u.onSilentMutation()}),_.appendChild(b)}f.querySelector(".fxr-comment-locate").addEventListener("click",()=>{u.flash(h)});const x=f.querySelector(".fxr-comment-edit");return x&&x.addEventListener("click",async()=>{const b=h.type==="insertion",k=await Yu({title:b?"修改插入文字":"修改替换后的新文字",value:(b?h.insertedText:h.replacement)??"",anchor:f.getBoundingClientRect(),allowEmpty:h.type==="substitution"});k!=null&&u.store.updateAnnotation(h.id,b?{insertedText:k}:{replacement:k})}),f.querySelector(".fxr-comment-del").addEventListener("click",()=>{u.store.removeAnnotation(h.id)}),f}function p(){const h=u.store.state.annotations;r.textContent=String(h.length),o.disabled=!u.store.canUndo,i.disabled=!u.store.canRedo;const f=document.activeElement,d=f instanceof Element?f.closest(".fxr-comment-entry"):null,g=d?.dataset.id??null;if(h.length===0){t.innerHTML='<div class="fxr-comments-empty">尚无批注。选中正文文字后点击批注按钮，或在选区旁的浮动菜单操作。</div>';return}const m=[...h].sort((x,b)=>x.srcStart-b.srcStart),_=g!==null&&m.some(x=>x.id===g);for(const x of[...t.children])_&&x===d||x.remove();for(const x of m)_&&x.id===g&&d!==null?t.appendChild(d):t.appendChild(l(x));_&&f instanceof HTMLElement&&f.isConnected&&f.focus({preventScroll:!0})}return{el:e,backdrop:n,refresh:p,open:s,close:a,toggle(){e.classList.contains("open")?a():s()}}}function $0(u,e){const n=document.createElement("div");n.className="fxr-resizer",n.title="拖动调整批注栏宽度",e.appendChild(n);let t=!1;const r=240,o=640,i=l=>{u.root.style.setProperty("--fxr-panel-w",`${Math.round(l)}px`)},c=l=>{l.button===0&&(t=!0,n.setPointerCapture(l.pointerId),l.preventDefault())},a=l=>{if(!t)return;const p=e.parentElement;if(!p)return;const h=p.getBoundingClientRect(),f=Math.min(o,Math.max(r,h.right-l.clientX-1));i(f)},s=()=>{if(t){t=!1;try{const l=u.root.style.getPropertyValue("--fxr-panel-w");l&&window.localStorage.setItem("fx-review:panelWidth",l)}catch{}}};n.addEventListener("pointerdown",c),n.addEventListener("pointermove",a),n.addEventListener("pointerup",s),n.addEventListener("pointercancel",s),n.addEventListener("dblclick",()=>{u.root.style.removeProperty("--fxr-panel-w");try{window.localStorage.removeItem("fx-review:panelWidth")}catch{}})}const O0=["insertion","deletion","substitution","highlight","comment"];function I(u,e,n,t){const r=document.createElement("button");return r.type="button",r.className=u,r.title=e,r.innerHTML=n,r.addEventListener("click",t),r}function H0(u){const e=document.createElement("header");e.className="fxr-toolbar";let n=null;if(u.variant==="full"){const f=document.createElement("div");f.className="fxr-brand",f.innerHTML='<span class="fxr-brand-name">fx-review</span><span class="fxr-brand-sub"></span>',n=f.querySelector(".fxr-brand-sub"),e.appendChild(f)}const t=document.createElement("div");t.className="fxr-btn-group";for(const f of O0){const d=hn[f];t.appendChild(I(`fxr-btn fxr-btn-anno fxr-btn-anno-${f}`,`${d.title}（选中后按 ${d.key}）`,`<span class="fxr-btn-icon">${d.icon}</span><span class="fxr-btn-label">${d.label}</span>`,()=>u.annotate(f)))}e.appendChild(t);const r=document.createElement("div");r.className="fxr-btn-group";const o=I("fxr-btn fxr-btn-ghost","撤销（⌘/Ctrl+Z）","↩",()=>{u.undo()||u.notify("没有可撤销的操作")}),i=I("fxr-btn fxr-btn-ghost","重做（⌘/Ctrl+Shift+Z）","↪",()=>{u.redo()||u.notify("没有可重做的操作")}),c=I("fxr-btn fxr-btn-ghost","清除全部批注","🗑 清空",()=>{u.store.state.annotations.length!==0&&window.confirm("确定清除全部批注？")&&u.clearAnnotations()});r.append(o,i,c),e.appendChild(r);const a=document.createElement("div");a.className="fxr-btn-group",a.appendChild(I("fxr-btn fxr-btn-export","复制带 CriticMarkup 批注的全文","复制批注",()=>void u.copy(!1))),u.variant==="full"&&a.appendChild(I("fxr-btn fxr-btn-export","下载带批注的全文 .md","下载批注",()=>u.download(!1))),a.appendChild(I("fxr-btn fxr-btn-export","复制引导 Prompt + 批注全文（⌘/Ctrl+Shift+C）",u.variant==="full"?"复制(含Prompt)":"复制含P",()=>void u.copy(!0))),u.variant==="full"&&a.appendChild(I("fxr-btn fxr-btn-export","下载 Prompt + 批注全文 .md","下载(含Prompt)",()=>u.download(!0))),e.appendChild(a);const s=document.createElement("div");s.className="fxr-btn-group fxr-toolbar-tail",s.appendChild(I("fxr-btn fxr-btn-ghost","编辑「含 Prompt」导出的引导词","Prompt",()=>{u.openPromptEditor()}));let l=null;u.variant==="full"&&(l=I("fxr-btn fxr-btn-ghost","切换主题","🌙",()=>{u.setTheme(u.getTheme()==="dark"?"light":"dark")}),s.appendChild(l));const p=I("fxr-btn fxr-btn-ghost fxr-panel-toggle","打开评论与批注栏",'📋 <span class="fxr-panel-toggle-count">0</span>',()=>u.togglePanel());s.appendChild(p);const h=p.querySelector(".fxr-panel-toggle-count");return e.appendChild(s),{el:e,setFileName(f){n&&(n.textContent=f||"未打开文件"),e.title=f},setCount(f){h.textContent=String(f)},setUndoRedo(f,d){o.disabled=!f,i.disabled=!d},setThemeIcon(f){l&&(l.textContent=f==="dark"?"☀️":"🌙")}}}function j0(u){const e=document.createElement("div");e.className="fxr-modal-overlay";const n=document.createElement("div");n.className="fxr-modal-box",n.innerHTML=`
    <h3>编辑引导 Prompt</h3>
    <p class="fxr-modal-hint">复制/下载“含 Prompt”时，会把它前置到批注全文之前。</p>
    <textarea class="fxr-prompt-area" spellcheck="false"></textarea>
    <div class="fxr-modal-actions">
      <button class="fxr-btn fxr-btn-ghost" data-act="reset">恢复默认</button>
      <div class="fxr-modal-actions-right">
        <button class="fxr-btn fxr-btn-ghost" data-act="cancel">取消</button>
        <button class="fxr-btn fxr-btn-primary" data-act="save">保存</button>
      </div>
    </div>`,e.appendChild(n),e.addEventListener("click",r=>{r.target===e&&e.remove()}),u.root.appendChild(e);const t=n.querySelector(".fxr-prompt-area");t.value=u.store.state.prompt,n.querySelector('[data-act="cancel"]').addEventListener("click",()=>e.remove()),n.querySelector('[data-act="reset"]').addEventListener("click",()=>{t.value=T}),n.querySelector('[data-act="save"]').addEventListener("click",()=>{u.setPrompt(t.value.trim()||T),e.remove(),u.notify("Prompt 已保存")}),t.focus()}const U0=()=>new Promise(()=>{});let Z0=0;const W0="fx-review:panelWidth",Fu=class Fu{constructor(e){C(this,"store",new te);C(this,"root");C(this,"preview");C(this,"previewWrap");C(this,"variant");C(this,"ns");C(this,"notify");C(this,"container");C(this,"md",tn());C(this,"persistence");C(this,"toaster");C(this,"toolbarApi");C(this,"commentsApi");C(this,"menuApi");C(this,"emptyState");C(this,"disposers",[]);C(this,"onSubmit");C(this,"panelFab");C(this,"fabCount");C(this,"themeMode");C(this,"theme","light");C(this,"lastRenderedSource","");C(this,"notifiedNoHighlight",!1);C(this,"capturedCtx",null);this.container=e.container,this.variant=e.variant??"full",this.themeMode=e.theme??(this.variant==="compact"?"host":"auto"),this.ns=e.ns??(this.variant==="compact"?`fxr${++Z0}`:""),this.onSubmit=e.onSubmit,this.toaster=I0(()=>this.root.isConnected?this.root:this.container),this.notify=(t,r)=>this.toaster(t,r),e.storagePrefix!==null?(this.persistence=new oe(this.store,{prefix:e.storagePrefix??"fx-review:",maxDocs:e.maxSavedDocs}),this.disposers.push(()=>this.persistence?.dispose())):this.persistence=null,this.root=document.createElement("div"),this.root.className=`fxr-root${this.variant==="compact"?" fxr-compact":""}`;try{const t=window.localStorage.getItem(W0);t&&/^\d{2,4}px$/.test(t)&&this.root.style.setProperty("--fxr-panel-w",t)}catch{}const n=document.createElement("div");if(n.className="fxr-workspace",this.previewWrap=document.createElement("section"),this.previewWrap.className="fxr-preview-wrap",this.preview=document.createElement("article"),this.preview.className="fxr-preview markdown-body",this.emptyState=e.emptyState??G0(),this.previewWrap.append(this.preview,this.emptyState),this.variant==="compact"?(this.panelFab=document.createElement("button"),this.panelFab.type="button",this.panelFab.className="fxr-panel-fab",this.panelFab.title="评论与批注",this.panelFab.innerHTML='📋 <span class="fxr-panel-fab-count">0</span>',this.panelFab.addEventListener("click",()=>this.togglePanel()),this.previewWrap.appendChild(this.panelFab),this.fabCount=this.panelFab.querySelector(".fxr-panel-fab-count")):(this.panelFab=null,this.fabCount=null),this.commentsApi=P0(this),this.toolbarApi=this.variant==="full"?H0(this):null,this.toolbarApi&&this.root.append(this.toolbarApi.el),this.root.append(n),n.append(this.previewWrap,this.commentsApi.el,this.commentsApi.backdrop),this.container.appendChild(this.root),e.bindScrollport?.(this.previewWrap),this.disposers.push(()=>e.bindScrollport?.(null)),this.ns){const t=document.createElement("style");t.dataset.fxrHighlightNs=this.ns,t.textContent=V0(this.ns),document.head.appendChild(t),this.disposers.push(()=>t.remove())}this.store.state.prompt=e.prompt??(this.variant==="full"?Fn()??T:T),this.store.subscribe(()=>this.renderAll()),l0(this.md,()=>{this.lastRenderedSource="",this.renderAll()},e.loadHighlighter??U0),this.initTheme(),this.installSelectionBridge(),this.installKeys(),e.source!=null&&e.source!==""&&e.fileName?this.setDocument(e.fileName,e.source):this.renderAll()}setDocument(e,n){if(e===this.store.state.fileName&&n===this.store.state.source)return this.store.state.annotations.length;const t=this.persistence?.restore(e,n)??[];return this.store.loadFile(e,n,t),t.length}setPrompt(e){this.store.setPrompt(e),this.variant==="full"&&An(e)}undo(){return this.store.undo()}redo(){return this.store.redo()}clearAnnotations(){this.store.state.annotations.length!==0&&(this.store.clearAnnotations(),this.notify("已清除全部批注"))}getAnnotatedSource(e){const n=Qu(this.store.state.source,this.store.state.annotations);return e?`${this.store.state.prompt}

${n}`:n}annotationCount(){return this.store.state.annotations.length}canSubmit(){return this.onSubmit!==void 0}submit(){if(!this.requireDocument())return;const e={fileName:this.store.state.fileName,count:this.store.state.annotations.length,prompt:this.store.state.prompt,annotatedSource:Qu(this.store.state.source,this.store.state.annotations)};this.onSubmit?.(e)!==!0&&this.copy(!0)}setTheme(e){this.theme=e,this.root.dataset.theme=e,this.toolbarApi?.setThemeIcon(e)}getTheme(){return this.theme}togglePanel(){this.commentsApi.toggle()}openPromptEditor(){j0(this)}annotate(e){if(!this.store.state.source){this.notify("请先打开 Markdown 文档");return}const n=sn(),t=n.selection!==null||n.caret!==null?n:this.capturedCtx??n;D0(e,t,{store:this.store,notify:this.notify})}async copy(e){this.requireDocument()&&(e?await N0(this.store,this.notify):await T0(this.store,this.notify))}download(e){this.requireDocument()&&(e?M0(this.store,this.notify):z0(this.store,this.notify))}flash(e){m0(this.preview,e,this.ns)}onSilentMutation(){this.persistence?.saveSoon(),this.setBadgeCount(this.store.state.annotations.length)}destroy(){for(const e of this.disposers.splice(0))try{e()}catch{}if(this.ns)for(const e of["cm-del","cm-hl","cm-sub-old","cm-comment","cm-flash"])try{CSS.highlights?.delete(`${this.ns}-${e}`)}catch{}this.root.remove()}requireDocument(){return this.store.state.source?!0:(this.notify("请先打开 Markdown 文档"),!1)}setBadgeCount(e){this.toolbarApi?.setCount(e),this.fabCount&&(this.fabCount.textContent=String(e))}renderAll(){const{source:e,annotations:n}=this.store.state;e!==this.lastRenderedSource&&(this.lastRenderedSource=e,e?(this.preview.innerHTML=s0(this.md,e),this.preview.style.display="block",this.emptyState.style.display="none"):(this.preview.innerHTML="",this.preview.style.display="none",this.emptyState.style.display="flex")),e&&(p0(this.preview,n,this.ns),!this.notifiedNoHighlight&&!x0()&&(this.notifiedNoHighlight=!0,this.variant==="full"&&this.notify("当前浏览器不支持 Highlight API，批注将降级显示",4e3))),this.commentsApi.refresh(),this.toolbarApi?.setFileName(this.store.state.fileName||(this.variant==="full"?"未打开文件":"")),this.setBadgeCount(n.length),this.toolbarApi?.setUndoRedo(this.store.canUndo,this.store.canRedo)}initTheme(){if(this.themeMode==="host"){const t=()=>document.body?.hasAttribute("data-ds-dark-theme")||window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light";this.setTheme(t());const r=new MutationObserver(()=>this.setTheme(t()));r.observe(document.documentElement,{attributes:!0,attributeFilter:["data-ds-dark-theme"]}),r.observe(document.body??document.documentElement,{attributes:!0,attributeFilter:["data-ds-dark-theme"]}),this.disposers.push(()=>r.disconnect());return}const e=window.matchMedia("(prefers-color-scheme: dark)");this.setTheme(e.matches?"dark":"light");const n=t=>this.setTheme(t.matches?"dark":"light");e.addEventListener("change",n),this.disposers.push(()=>e.removeEventListener("change",n))}installSelectionBridge(){this.menuApi=L0(this);let e=0;const n=()=>{e&&window.clearTimeout(e),e=window.setTimeout(()=>{e=0;const r=window.getSelection();if(!r||r.isCollapsed||r.rangeCount===0||!this.store.state.source){this.menuApi.hide(),this.capturedCtx=null;return}const o=r.getRangeAt(0);if(!this.preview.contains(o.commonAncestorContainer)){this.menuApi.hide(),this.capturedCtx=null;return}const i=o.getBoundingClientRect();if(i.width===0&&i.height===0){this.menuApi.hide(),this.capturedCtx=null;return}this.menuApi.show(i),this.capturedCtx=sn()},0)};document.addEventListener("selectionchange",n),this.disposers.push(()=>{document.removeEventListener("selectionchange",n),e&&window.clearTimeout(e)});const t=()=>{this.menuApi.hide(),this.capturedCtx=null};this.previewWrap.addEventListener("scroll",t,{passive:!0}),this.disposers.push(()=>this.previewWrap.removeEventListener("scroll",t))}isTypingTarget(e){return e instanceof HTMLTextAreaElement||e instanceof HTMLInputElement||e instanceof HTMLElement&&e.isContentEditable}isActive(e){if(e instanceof Node&&this.root.contains(e))return!0;const n=window.getSelection();return!!(n&&n.rangeCount>0&&this.preview.contains(n.getRangeAt(0).commonAncestorContainer))}selectionInPreview(){const e=window.getSelection();return!e||e.isCollapsed||e.rangeCount===0?!1:this.preview.contains(e.getRangeAt(0).commonAncestorContainer)}installKeys(){const e=n=>{if(!this.root.isConnected||this.isTypingTarget(n.target))return;const t=n.key.toLowerCase();if((n.metaKey||n.ctrlKey)&&n.shiftKey&&t==="c"){if(!this.isActive(n.target)||(n.preventDefault(),!this.requireDocument()))return;this.copy(!0);return}if((n.metaKey||n.ctrlKey)&&!n.altKey&&t==="z"){if(!this.isActive(n.target))return;n.preventDefault(),(n.shiftKey?this.redo():this.undo())||this.notify(n.shiftKey?"没有可重做的操作":"没有可撤销的操作");return}if(!n.metaKey&&!n.ctrlKey&&!n.altKey&&this.store.state.source&&(this.selectionInPreview()||this.capturedCtx!==null)){const r=Fu.SINGLE_KEY_ANNOTATIONS[t];r&&(n.preventDefault(),this.annotate(r))}};window.addEventListener("keydown",e),this.disposers.push(()=>window.removeEventListener("keydown",e))}};C(Fu,"SINGLE_KEY_ANNOTATIONS",{d:"deletion",s:"substitution",h:"highlight",c:"comment",i:"insertion"});let ue=Fu;function G0(){const u=document.createElement("div");return u.className="fxr-empty",u.innerHTML='<div class="fxr-empty-line">打开 Markdown 文档后开始批注审阅</div>',u}function V0(u){return[`::highlight(${u}-cm-del){color:var(--cm-del);text-decoration:line-through;text-decoration-color:var(--cm-del)}`,`::highlight(${u}-cm-hl){background-color:var(--cm-hl-bg)}`,`::highlight(${u}-cm-sub-old){color:var(--cm-del);text-decoration:line-through;text-decoration-color:var(--cm-del)}`,`::highlight(${u}-cm-comment){background-color:var(--cm-comment-bg);text-decoration:underline wavy var(--cm-comment-line)}`,`::highlight(${u}-cm-flash){background-color:var(--cm-flash)}`].join(`
`)}function K0(u){return new ue(u)}const Y0="fx-review:embed:";function X0(u){if(!u)return null;if(u.kind==="bytes"&&u.data)try{return new TextDecoder("utf-8",{fatal:!0}).decode(u.data)}catch{return null}return u.kind==="text"&&typeof u.text=="string"?u.text:null}function J0(u){if(!u)return{sessionId:null,fileName:"document.md"};try{const n=u.split(/[?#]/)[0].replace(/^dsh-resource:\/\/file\//,"").split("/").filter(Boolean).map(t=>decodeURIComponent(t));return n[0]==="session"&&n.length>=3?{sessionId:n[1],fileName:n[n.length-1]||"document.md"}:{sessionId:null,fileName:n[n.length-1]||"document.md"}}catch{return{sessionId:null,fileName:"document.md"}}}function Q0(u,e,n){return function(r){const o=u.useRef(null),i=u.useRef(null),c=u.useRef({sessionId:null,fileName:"document.md"});return u.useEffect(()=>{const a=o.current;if(!a)return;const s=e({container:a,variant:"compact",theme:"host",storagePrefix:Y0,maxSavedDocs:50,bindScrollport:l=>r.scrollportRef?.(l),onSubmit:n===null?void 0:l=>{const{sessionId:p}=c.current;if(p===null)return!1;const h=n.commit(p,l);return h&&s.notify("批注已放到输入框上方，发送时附带"),h}});return i.current=s,()=>{s.destroy(),i.current=null}},[]),u.useEffect(()=>{const a=X0(r.content);if(a==null){r.content&&i.current?.notify("文件内容不是 UTF-8 文本，无法批注");return}c.current=J0(r.resourceAddress),i.current?.setDocument(c.current.fileName,a)},[r.content,r.resourceAddress]),u.createElement("div",{ref:o,className:"fxr-host"})}}const bn="__fxrSubmitSendPatch";function uo(u,e){try{const n=u?.getSnapshot?.()?.id;if(typeof n=="string")return n}catch{}try{const n=e?.list?.getSnapshot?.().current;if(typeof n=="string")return n}catch{}return null}function eo(u,e){const n="````markdown\n"+e.annotatedSource+"\n````",t=`---
【fx-review 批注 · ${e.fileName}】
${e.prompt}

${n}`,r=String(u??"");return r===""?t:`${r}

${t}`}function no(u){const{react:e}=u,n=new Map,t=new Set,r=()=>{for(const h of[...t])try{h()}catch{}},o=()=>{try{return u.ctx.get("sessions")}catch{return null}},i=h=>h!==null&&typeof h.sendSession=="function",c=()=>{const h=o();let f=null;try{f=u.ctx.get("conversation")??null}catch{f=null}if(f===null)try{const m=h?.list?.getSnapshot?.().current;f=(typeof m=="string"?h?.scope?.(m):void 0)?.get?.("conversation")??null}catch{f=null}if(!i(f))return!1;const d=f,g=d[bn];if(g===void 0||d.sendSession!==g.wrapped){const m=d.sendSession.bind(d),_=function(...b){const[k,y]=b,v=uo(k,h),E=v===null?null:n.get(v)??null;if(v===null||E===null)return m(...b);n.delete(v),r();const D=m(k,eo(String(y??""),E),...b.slice(2));return D!==null&&typeof D.catch=="function"&&D.catch(()=>{n.set(v,E),r()}),D};d[bn]={original:d.sendSession,wrapped:_},d.sendSession=_}return!0},a=h=>{const f=e.useMemo(()=>()=>n.get(h??"")??null,[h]),d=e.useMemo(()=>_=>(t.add(_),()=>{t.delete(_)}),[]);if(e.useSyncExternalStore!==void 0)return e.useSyncExternalStore(d,f);const[g,m]=e.useState(f);return e.useEffect(()=>(m(f()),d(()=>m(f()))),[f,d]),g},s=(h,f)=>{e.useEffect(()=>{const d=h.current;if(d===null||!f)return;const g=()=>{let v=d.parentElement;for(let E=0;E<4&&v!==null;E++){const D=v.querySelector("[data-composer-card]");if(D!==null)return D;v=v.parentElement}return null},m=()=>{const v=g();if(v===null){d.style.paddingLeft="";return}const E=d.querySelector(".fxr-dock-chip");if(E===null)return;const D=v.getBoundingClientRect().left-E.getBoundingClientRect().left;if(Math.abs(D)<=1)return;const P=parseFloat(d.style.paddingLeft||"0")||0;d.style.paddingLeft=`${Math.max(0,P+D)}px`};let _=0,x=0;const b=()=>{m(),_+=1,_<12&&(x=window.requestAnimationFrame(b))};b();const k=g(),y=k!==null&&typeof ResizeObserver<"u"?new ResizeObserver(m):null;return y!==null&&k!==null&&y.observe(k),window.addEventListener("resize",m),()=>{window.cancelAnimationFrame(x),y?.disconnect(),window.removeEventListener("resize",m)}},[f])},l=e.createElement.bind(e);return{commit(h,f){return c()?(n.set(h,{fileName:f.fileName,count:f.count,prompt:f.prompt,annotatedSource:f.annotatedSource,savedAt:Date.now()}),r(),!0):!1},remove(h){n.delete(h)&&r()},subscribe(h){return t.add(h),()=>{t.delete(h)}},recordOf(h){return h===void 0?null:n.get(h)??null},Dock:h=>{const f=typeof h.sessionId=="string"?h.sessionId:void 0,d=a(f),[g,m]=e.useState(!1),_=e.useRef(null);if(s(_,d!==null),f===void 0||d===null)return null;const x=d.annotatedSource.length>600?`${d.annotatedSource.slice(0,600)}…`:d.annotatedSource;return l("div",{ref:_,className:"fxr-dock","data-fxr-submit-dock":""},[l("button",{type:"button",className:"fxr-dock-chip","aria-expanded":g?"true":"false","data-fxr-submit-count":d.count,onClick:()=>m(!g)},["📝 ",`批注文档 · ${d.fileName} · ${d.count} 处`,l("span",{className:"fxr-dock-chevron"},g?"▴":"▾")]),g?l("div",{className:"fxr-dock-box"},[l("div",{className:"fxr-dock-preview"},x),l("div",{className:"fxr-dock-hint"},"发送时会附加到这条消息的末尾；可在输入框里先补充你的要求。"),l("button",{type:"button",className:"fxr-dock-remove",onClick:()=>{n.delete(f),r()}},"移除")]):null].filter(b=>b!==null&&b!==!1))}}}const xn="dsh-fx-review/criticmarkup",Au="dshFxReview",to={"viewer.label":"fx-review 批注","submit.chip":"批注文档 · {file} · {n} 处","submit.hint":"发送时会附加到这条消息的末尾；可在输入框里先补充你的要求。","submit.remove":"移除"},ro={"viewer.label":"fx-review","submit.chip":"Annotated doc · {file} · {n} marks","submit.hint":"Appended to the end of your message when you send it; add instructions in the composer first.","submit.remove":"Remove"};function oo(u){if(document.querySelector("style[data-fxr-embed-css]"))return;const e=document.createElement("style");e.dataset.fxrEmbedCss="",e.textContent=u,document.head.appendChild(e)}function io(u){const e=n();function n(){let o=null;return{body:Q0(u.react,u.mountReviewer,{commit(c,a){return o?.commit(c,a)??!1},remove(c){o?.remove(c)},subscribe(c){return o?.subscribe(c)??(()=>{})},recordOf(c){return o?.recordOf(c)??null},Dock(c){return o===null?null:o.Dock(c)}}),setSubmit(c){o=c}}}const t=["slots","locale","documentPreviews","sessions"];function r(o){const i=o.locale.bind(Au);o.effect(()=>o.locale.register(Au,{zh:to,en:ro}),"dsh-fx-review: dictionaries"),oo(u.embedCss),o.effect(()=>o.documentPreviews.register({id:xn,extensions:["md","markdown","mdown"],priority:"extension",title:()=>i("viewer.label"),loading:"bytes-complete",wrap:!1}),"dsh-fx-review: renderer metadata"),o.effect(()=>o.slots.inject("sidebar.right.tab.document",()=>o.slots.register({name:"sidebar.right.tab.document",key:xn,locale:Au},e.body)),"dsh-fx-review: renderer body");const c=no({react:u.react,ctx:{get:a=>o.get(a)}});e.setSubmit(c),o.effect(()=>o.slots.inject("conversation.input.dock",()=>o.slots.register({name:"conversation.input.dock",id:"fxr-submit",order:12,locale:Au},c.Dock)),"dsh-fx-review: submit dock")}return{inject:t,apply:r}}const ee={exports:{}};window.__ModuleLoader__.load({id:"dsh-fx-review",factory:u=>{const e=u("react"),n=io({react:e,mountReviewer:K0,embedCss:U});return ee.exports.inject=n.inject,ee.exports.apply=n.apply,ee.exports}})})();
