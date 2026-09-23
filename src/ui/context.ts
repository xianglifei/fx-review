import type { Reviewer } from '../editor';

/**
 * UI 工厂的公共上下文：各 ui/* 模块从编辑器实例取状态与动作，
 * 不再依赖模块级单例，同一页面可挂多个实例（网页壳、dsh 侧栏 tab）。
 */
export type EditorContext = Reviewer;
