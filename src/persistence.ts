import { Store, store } from './store';
import type { Annotation, AnnotationType } from './types';

/**
 * 批注持久化：localStorage 按「文件名 + 内容哈希」为键存储，
 * 同一文件（内容未变）重新打开时自动恢复批注；内容变化视为新文档不恢复。
 * 批注被清空后存储同步删除，刷新后不再恢复。
 * 自定义 Prompt 全局存一份，跨会话保留。
 *
 * DocPersistence 为实例化形态（每个编辑器实例一个，可带独立键前缀与容量）；
 * 模块底部的具名函数是绑到默认单例 store 上的兼容层，网页壳与测试在用。
 */

const DOC_PREFIX = 'fx-review:doc:';
const INDEX_KEY = 'fx-review:docs';
const PROMPT_KEY = 'fx-review:prompt';
const MAX_DOCS = 20;
const SAVE_DELAY = 500;

const ANNO_TYPES: readonly AnnotationType[] = [
  'insertion',
  'deletion',
  'substitution',
  'highlight',
  'comment',
];

/** FNV-1a 32 位哈希（base36）。文件名同时参与存储键，冲突概率可忽略 */
export function hashSource(src: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < src.length; i++) {
    h ^= src.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

export interface PersistenceOptions {
  /** 存储键前缀（嵌入场景用独立前缀，与网页版互不干扰） */
  prefix?: string;
  /** 文档索引键（LRU 裁剪清单） */
  indexKey?: string;
  /** 最多保留的文档批注份数 */
  maxDocs?: number;
  /** 构造即订阅 store 变化自动落盘（编辑器实例用）；兼容层传 false 只做手动保存 */
  subscribe?: boolean;
}

interface SavedDoc {
  version: 1;
  annotations: Annotation[];
  savedAt: number;
}

function isValidAnnotation(x: unknown): x is Annotation {
  if (typeof x !== 'object' || x === null) return false;
  const a = x as Record<string, unknown>;
  return (
    typeof a.id === 'string' &&
    typeof a.type === 'string' &&
    (ANNO_TYPES as readonly string[]).includes(a.type) &&
    typeof a.srcStart === 'number' &&
    typeof a.srcEnd === 'number'
  );
}

interface IndexEntry {
  key: string;
  savedAt: number;
}

/** 读取一份已保存的批注；无存储或格式非法返回空数组 */
function readSaved(docKey: string): Annotation[] {
  if (!docKey) return [];
  try {
    const raw = localStorage.getItem(docKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<SavedDoc>;
    if (parsed.version !== 1 || !Array.isArray(parsed.annotations)) return [];
    return parsed.annotations.filter(isValidAnnotation);
  } catch {
    return [];
  }
}

/** 按前缀读取已保存批注（无前缀 = 网页版默认键） */
export function loadSavedWith(
  prefix: string,
  fileName: string,
  source: string,
): Annotation[] {
  if (!fileName || !source) return [];
  return readSaved(`${prefix}${fileName}:${hashSource(source)}`);
}

/** 读取已保存的批注；无存储或格式非法返回空数组（网页版兼容层） */
export function loadSaved(fileName: string, source: string): Annotation[] {
  return loadSavedWith(DOC_PREFIX, fileName, source);
}

/** 单个持久化实例：绑定一个 store，订阅其变化自动落盘 */
export class DocPersistence {
  private readonly store: Store;
  private readonly prefix: string;
  private readonly indexKey: string;
  private readonly maxDocs: number;
  private saveTimer = 0;
  private readonly unsubscribe: (() => void) | null;

  constructor(store: Store, opts: PersistenceOptions = {}) {
    this.store = store;
    this.prefix = opts.prefix ?? DOC_PREFIX;
    this.indexKey = opts.indexKey ?? INDEX_KEY;
    this.maxDocs = opts.maxDocs ?? MAX_DOCS;
    this.unsubscribe = opts.subscribe === false
      ? null
      : store.subscribe(() => this.save());
  }

  private docKey(fileName: string, source: string): string {
    return `${this.prefix}${fileName}:${hashSource(source)}`;
  }

  /** 读取该前缀下某文档的已存批注（loadFile 前调用） */
  restore(fileName: string, source: string): Annotation[] {
    if (!fileName || !source) return [];
    return readSaved(this.docKey(fileName, source));
  }

  private readIndex(): IndexEntry[] {
    try {
      const raw = localStorage.getItem(this.indexKey);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      return Array.isArray(parsed)
        ? parsed.filter(
            (e): e is IndexEntry =>
              typeof e === 'object' &&
              e !== null &&
              typeof (e as IndexEntry).key === 'string',
          )
        : [];
    } catch {
      return [];
    }
  }

  /** 更新索引并裁剪：只保留最近 maxDocs 份文档，被裁掉的连数据一起删除。
   *  条目按插入顺序维护（天然时间序），不依赖时间戳排序——
   *  短时间内多次保存时 Date.now() 相同，排序会退化且方向不可控。 */
  private touchIndex(key: string): void {
    const entries = this.readIndex().filter((e) => e.key !== key);
    entries.push({ key, savedAt: Date.now() });
    const dropped = entries.splice(0, Math.max(0, entries.length - this.maxDocs));
    try {
      localStorage.setItem(this.indexKey, JSON.stringify(entries));
      for (const e of dropped) localStorage.removeItem(e.key);
    } catch {
      /* 存储不可用时静默失败 */
    }
  }

  private removeFromIndex(key: string): void {
    try {
      localStorage.removeItem(key);
      localStorage.setItem(
        this.indexKey,
        JSON.stringify(this.readIndex().filter((e) => e.key !== key)),
      );
    } catch {
      /* ignore */
    }
  }

  /** 把当前文档的批注写入 localStorage。批注为空时删除存储（清空后刷新不恢复） */
  save(): void {
    const { fileName, source, annotations } = this.store.state;
    if (!fileName || !source) return;
    const key = this.docKey(fileName, source);
    try {
      if (annotations.length === 0) {
        this.removeFromIndex(key);
        return;
      }
      const doc: SavedDoc = { version: 1, annotations, savedAt: Date.now() };
      localStorage.setItem(key, JSON.stringify(doc));
      this.touchIndex(key);
    } catch {
      /* 隐私模式 / 配额满：静默失败，仅本次会话内可用 */
    }
  }

  /** 防抖保存：评论输入等高频静默更新用 */
  saveSoon(): void {
    if (this.saveTimer) window.clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => {
      this.saveTimer = 0;
      this.save();
    }, SAVE_DELAY);
  }

  dispose(): void {
    if (this.saveTimer) window.clearTimeout(this.saveTimer);
    this.unsubscribe?.();
  }
}

/** 绑到默认单例 store 的持久化实例（兼容层：不订阅，只在显式调用时落盘，
 *  保持旧 saveCurrent 的纯手动语义——import 本模块没有写入副作用） */
const defaultPersistence = new DocPersistence(store, { subscribe: false });

export function saveCurrent(): void {
  defaultPersistence.save();
}

export function saveCurrentSoon(): void {
  defaultPersistence.saveSoon();
}

export function savePrompt(prompt: string): void {
  try {
    localStorage.setItem(PROMPT_KEY, prompt);
  } catch {
    /* ignore */
  }
}

export function loadPrompt(): string | null {
  try {
    return localStorage.getItem(PROMPT_KEY);
  } catch {
    return null;
  }
}
