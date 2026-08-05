// CriticMarkup 五种批注类型
export type AnnotationType =
  | 'insertion' // 插入 {++ text ++}
  | 'deletion' // 删除 {-- text --}
  | 'substitution' // 替换 {~~ old ~> new ~~}
  | 'highlight' // 高亮 {== text ==}
  | 'comment'; // 评论 {== text ==}{>> note <<}

export interface Annotation {
  id: string;
  type: AnnotationType;
  /** 源 Markdown 的绝对字符偏移；insertion 时 srcStart === srcEnd（插入点） */
  srcStart: number;
  srcEnd: number;
  /** 选中的渲染文本（评论栏展示 / 降级时使用） */
  quotedText: string;
  /** insertion：要插入的新文字 */
  insertedText?: string;
  /** substitution：替换后的新文字 */
  replacement?: string;
  /** comment：审阅备注 */
  comment?: string;
  /** 未能精确定位到源码（导出时降级附加到文末） */
  unmapped?: boolean;
}

export interface DocState {
  fileName: string;
  source: string;
  annotations: Annotation[];
  prompt: string;
}

export const ANNOTATION_META: Record<
  AnnotationType,
  { label: string; icon: string; title: string }
> = {
  insertion: { label: '插入', icon: '➕', title: '插入新文字' },
  deletion: { label: '删除', icon: '✂️', title: '标记为删除' },
  substitution: { label: '替换', icon: '🔁', title: '替换为新文字' },
  highlight: { label: '高亮', icon: '🔆', title: '高亮关注' },
  comment: { label: '评论', icon: '💬', title: '添加评论' },
};
