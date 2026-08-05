import type { Annotation, DocState } from './types';
import { DEFAULT_PROMPT } from './export/prompt';

type Listener = () => void;

class Store {
  state: DocState = {
    fileName: '',
    source: '',
    annotations: [],
    prompt: DEFAULT_PROMPT,
  };

  private listeners = new Set<Listener>();

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify(): void {
    for (const fn of this.listeners) fn();
  }

  loadFile(fileName: string, source: string): void {
    this.state = { ...this.state, fileName, source, annotations: [] };
    this.notify();
  }

  addAnnotation(a: Annotation): void {
    this.state = { ...this.state, annotations: [...this.state.annotations, a] };
    this.notify();
  }

  updateAnnotation(id: string, patch: Partial<Annotation>): void {
    this.state = {
      ...this.state,
      annotations: this.state.annotations.map((a) =>
        a.id === id ? { ...a, ...patch } : a,
      ),
    };
    this.notify();
  }

  /** 静默更新评论备注，不触发重渲染（避免输入时重建 textarea 丢焦点） */
  setComment(id: string, comment: string): void {
    this.state = {
      ...this.state,
      annotations: this.state.annotations.map((a) =>
        a.id === id ? { ...a, comment } : a,
      ),
    };
  }

  removeAnnotation(id: string): void {
    this.state = {
      ...this.state,
      annotations: this.state.annotations.filter((a) => a.id !== id),
    };
    this.notify();
  }

  clearAnnotations(): void {
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
}

export const store = new Store();
