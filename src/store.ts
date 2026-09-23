import type { Annotation, DocState } from './types';
import { DEFAULT_PROMPT } from './export/prompt';

type Listener = () => void;

const UNDO_LIMIT = 100;

/** 可实例化的文档状态仓库：网页壳用默认单例，嵌入场景（dsh 插件等）每实例一个 */
export class Store {
  state: DocState = {
    fileName: '',
    source: '',
    annotations: [],
    prompt: DEFAULT_PROMPT,
  };

  private listeners = new Set<Listener>();
  /** 撤销/重做栈：保存批注数组快照（数组从不原地修改，浅拷贝即可） */
  private undoStack: Annotation[][] = [];
  private redoStack: Annotation[][] = [];

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify(): void {
    for (const fn of this.listeners) fn();
  }

  /** 结构性变更前记录快照；新的操作会使重做栈失效。评论输入等静默更新不记录 */
  private snapshot(): void {
    this.undoStack.push(this.state.annotations);
    if (this.undoStack.length > UNDO_LIMIT) this.undoStack.shift();
    this.redoStack = [];
  }

  loadFile(fileName: string, source: string, initialAnnotations: Annotation[] = []): void {
    this.state = {
      ...this.state,
      fileName,
      source,
      annotations: [...initialAnnotations],
    };
    this.undoStack = [];
    this.redoStack = [];
    this.notify();
  }

  addAnnotation(a: Annotation): void {
    this.snapshot();
    this.state = { ...this.state, annotations: [...this.state.annotations, a] };
    this.notify();
  }

  updateAnnotation(id: string, patch: Partial<Annotation>): void {
    this.snapshot();
    this.state = {
      ...this.state,
      annotations: this.state.annotations.map((a) =>
        a.id === id ? { ...a, ...patch } : a,
      ),
    };
    this.notify();
  }

  /** 静默更新评论备注，不触发重渲染（避免输入时重建 textarea 丢焦点），也不产生撤销点 */
  setComment(id: string, comment: string): void {
    this.state = {
      ...this.state,
      annotations: this.state.annotations.map((a) =>
        a.id === id ? { ...a, comment } : a,
      ),
    };
  }

  removeAnnotation(id: string): void {
    this.snapshot();
    this.state = {
      ...this.state,
      annotations: this.state.annotations.filter((a) => a.id !== id),
    };
    this.notify();
  }

  clearAnnotations(): void {
    this.snapshot();
    this.state = { ...this.state, annotations: [] };
    this.notify();
  }

  setPrompt(prompt: string): void {
    this.state = { ...this.state, prompt };
    this.notify();
  }

  /** 检查候选区间是否与已有非零宽批注重叠 */
  overlaps(start: number, end: number): boolean {
    if (start === end) return false; // 零宽（插入点）不冲突
    return this.state.annotations.some((a) => {
      if (a.srcStart === a.srcEnd) return false;
      return start < a.srcEnd && end > a.srcStart;
    });
  }

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /** 撤销上一次结构性变更；无可撤销时返回 false */
  undo(): boolean {
    const prev = this.undoStack.pop();
    if (!prev) return false;
    this.redoStack.push(this.state.annotations);
    this.state = { ...this.state, annotations: prev };
    this.notify();
    return true;
  }

  /** 重做被撤销的变更；无可重做时返回 false */
  redo(): boolean {
    const next = this.redoStack.pop();
    if (!next) return false;
    this.undoStack.push(this.state.annotations);
    this.state = { ...this.state, annotations: next };
    this.notify();
    return true;
  }
}

export const store = new Store();
