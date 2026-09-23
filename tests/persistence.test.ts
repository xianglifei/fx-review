// @vitest-environment jsdom
import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { store } from '../src/store';
import {
  hashSource,
  loadSaved,
  saveCurrent,
  savePrompt,
  loadPrompt,
} from '../src/persistence';
import type { Annotation } from '../src/types';

// Node 25+ 在 globalThis 上自带实验性 localStorage（值为 undefined），
// vitest 的 populateGlobal 不覆盖已存在的全局键，导致 jsdom 的存储被挡住。
// 从 vitest 挂在全局的 jsdom 实例取真实 window 桥接；Node 20 等正常环境自动跳过。
beforeAll(() => {
  const jsdom = (globalThis as { jsdom?: { window?: Window } }).jsdom;
  const storage = jsdom?.window?.localStorage;
  if (storage && typeof globalThis.localStorage === 'undefined') {
    Object.defineProperty(globalThis, 'localStorage', {
      value: storage,
      configurable: true,
    });
  }
});

function mk(id: string): Annotation {
  return { id, type: 'deletion', srcStart: 0, srcEnd: 3, quotedText: 'abc' };
}

beforeEach(() => {
  localStorage.clear();
  store.loadFile('t.md', 'base content');
});

describe('hashSource', () => {
  it('相同内容哈希一致，不同内容不同', () => {
    expect(hashSource('同一份内容')).toBe(hashSource('同一份内容'));
    expect(hashSource('内容甲')).not.toBe(hashSource('内容乙'));
  });
});

describe('批注存取', () => {
  it('saveCurrent 后 loadSaved 能取回批注', () => {
    store.loadFile('a.md', '内容一', [mk('a1'), mk('a2')]);
    saveCurrent();
    const loaded = loadSaved('a.md', '内容一');
    expect(loaded).toHaveLength(2);
    expect(loaded[0].id).toBe('a1');
    expect(loaded[0].type).toBe('deletion');
  });

  it('内容变化（哈希不同）不恢复', () => {
    store.loadFile('a.md', '内容一', [mk('a1')]);
    saveCurrent();
    expect(loadSaved('a.md', '内容二（已修改）')).toHaveLength(0);
  });

  it('批注清空后存储被删除，刷新语义下不再恢复', () => {
    store.loadFile('a.md', '内容一', [mk('a1')]);
    saveCurrent();
    store.clearAnnotations();
    saveCurrent();
    expect(loadSaved('a.md', '内容一')).toHaveLength(0);
  });

  it('未打开文件时不写入存储', () => {
    store.loadFile('', '');
    // 直接调用 saveCurrent 不应抛错
    saveCurrent();
    expect(localStorage.length).toBe(0);
  });

  it('损坏的存储数据被安全忽略', () => {
    localStorage.setItem('fx-review:doc:a.md:' + hashSource('内容一'), '{broken json');
    expect(loadSaved('a.md', '内容一')).toHaveLength(0);

    localStorage.setItem(
      'fx-review:doc:a.md:' + hashSource('内容一'),
      JSON.stringify({ version: 1, annotations: [{ nope: 1 }, mk('ok')] }),
    );
    const loaded = loadSaved('a.md', '内容一');
    expect(loaded).toHaveLength(1);
    expect(loaded[0].id).toBe('ok');
  });

  it('文档数量超过上限时最旧的被裁剪', () => {
    for (let i = 0; i < 25; i++) {
      store.loadFile(`doc${i}.md`, `内容-${i}`, [mk(`x${i}`)]);
      saveCurrent();
    }
    const docKeys = Object.keys(localStorage).filter((k) => k.startsWith('fx-review:doc:'));
    expect(docKeys.length).toBeLessThanOrEqual(20);
    // 最新的还在，最旧的被裁掉
    expect(loadSaved('doc24.md', '内容-24')).toHaveLength(1);
    expect(loadSaved('doc0.md', '内容-0')).toHaveLength(0);
  });
});

describe('Prompt 持久化', () => {
  it('savePrompt / loadPrompt 往返', () => {
    savePrompt('自定义引导词');
    expect(loadPrompt()).toBe('自定义引导词');
  });
});
