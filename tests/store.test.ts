import { describe, it, expect, beforeEach } from 'vitest';
import { store } from '../src/store';
import type { Annotation } from '../src/types';

function mk(id: string, extra: Partial<Annotation> = {}): Annotation {
  return {
    id,
    type: 'highlight',
    srcStart: 0,
    srcEnd: 2,
    quotedText: 'ab',
    ...extra,
  };
}

beforeEach(() => {
  store.loadFile('a.md', 'abcdef');
});

describe('store 撤销 / 重做', () => {
  it('新增批注后撤销恢复为空，重做恢复', () => {
    expect(store.canUndo).toBe(false);
    store.addAnnotation(mk('a1'));
    expect(store.state.annotations).toHaveLength(1);
    expect(store.canUndo).toBe(true);

    expect(store.undo()).toBe(true);
    expect(store.state.annotations).toHaveLength(0);
    expect(store.canRedo).toBe(true);

    expect(store.redo()).toBe(true);
    expect(store.state.annotations).toHaveLength(1);
    expect(store.state.annotations[0].id).toBe('a1');
  });

  it('删除批注后撤销找回', () => {
    store.addAnnotation(mk('a1'));
    store.addAnnotation(mk('a2'));
    store.removeAnnotation('a1');
    expect(store.state.annotations.map((a) => a.id)).toEqual(['a2']);

    store.undo();
    expect(store.state.annotations.map((a) => a.id)).toEqual(['a1', 'a2']);
  });

  it('清空批注后撤销恢复全部', () => {
    store.addAnnotation(mk('a1'));
    store.addAnnotation(mk('a2'));
    store.clearAnnotations();
    expect(store.state.annotations).toHaveLength(0);

    store.undo();
    expect(store.state.annotations).toHaveLength(2);
  });

  it('编辑批注（updateAnnotation）后撤销恢复旧文字', () => {
    store.addAnnotation(mk('a1', { type: 'substitution', replacement: '旧' }));
    store.updateAnnotation('a1', { replacement: '新' });
    expect(store.state.annotations[0].replacement).toBe('新');

    store.undo();
    expect(store.state.annotations[0].replacement).toBe('旧');
  });

  it('评论静默更新不产生撤销点，但会被后续动作的快照包含', () => {
    const a = mk('c1', { type: 'comment', comment: '' });
    store.addAnnotation(a);
    store.setComment('c1', '第一条意见');
    expect(store.canUndo).toBe(true); // 仍只有 add 的那一个撤销点

    store.addAnnotation(mk('a2'));
    store.undo(); // 回到“含评论文本、两条前”的状态
    expect(store.state.annotations).toHaveLength(1);
    expect(store.state.annotations[0].comment).toBe('第一条意见');
  });

  it('新动作会使重做栈失效', () => {
    store.addAnnotation(mk('a1'));
    store.undo();
    expect(store.canRedo).toBe(true);
    store.addAnnotation(mk('a2')); // 新动作
    expect(store.canRedo).toBe(false);
    expect(store.redo()).toBe(false);
  });

  it('loadFile 重置撤销/重做栈', () => {
    store.addAnnotation(mk('a1'));
    store.loadFile('b.md', '其他内容');
    expect(store.canUndo).toBe(false);
    expect(store.canRedo).toBe(false);
  });

  it('loadFile 可带入初始批注（持久化恢复用）', () => {
    store.loadFile('b.md', '其他内容', [mk('r1')]);
    expect(store.state.annotations).toHaveLength(1);
    expect(store.canUndo).toBe(false);
  });

  it('空栈撤销/重做返回 false', () => {
    expect(store.undo()).toBe(false);
    expect(store.redo()).toBe(false);
  });
});
