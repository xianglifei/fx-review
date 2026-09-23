import type { ReactLike } from './react-types';
import type { SubmitFeature } from './submit';

export type MountReviewer = (opts: {
  container: HTMLElement;
  variant: 'compact';
  theme: 'host';
  storagePrefix: string;
  maxSavedDocs?: number;
  bindScrollport?: (node: HTMLElement | null) => void;
  onSubmit?: (payload: import('../../src/editor').SubmitPayload) => boolean;
}) => {
  setDocument(fileName: string, source: string): number;
  notify(message: string, duration?: number): void;
  destroy(): void;
};

/** documentpreview body 拿到的 content（bytes-complete 形态为主，text 形态防御兼容） */
interface ContentProp {
  kind: 'bytes' | 'text';
  data?: Uint8Array;
  text?: string;
}

export interface BodyProps {
  content?: ContentProp;
  resourceAddress?: string;
  /** 宿主的滚动容器绑定（dsh 记录 tab 滚动位置用），挂到正文滚动区 */
  scrollportRef?: (node: HTMLElement | null) => void;
}

/** 批注持久化用独立前缀，与网页版 fx-review 互不干扰 */
const EMBED_STORAGE_PREFIX = 'fx-review:embed:';

function decodeContent(content: ContentProp | undefined): string | null {
  if (!content) return null;
  if (content.kind === 'bytes' && content.data) {
    try {
      return new TextDecoder('utf-8', { fatal: true }).decode(content.data);
    } catch {
      return null; // 非 UTF-8：不交给 markdown 渲染
    }
  }
  if (content.kind === 'text' && typeof content.text === 'string') {
    return content.text;
  }
  return null;
}

/** dsh-resource://file/session/<id>/<encoded path> → 各段解码（[sessionId, 文件名]） */
function parseAddress(address: string | undefined): { sessionId: string | null; fileName: string } {
  if (!address) return { sessionId: null, fileName: 'document.md' };
  try {
    const path = address.split(/[?#]/)[0].replace(/^dsh-resource:\/\/file\//, '');
    const segs = path.split('/').filter(Boolean).map((s) => decodeURIComponent(s));
    if (segs[0] === 'session' && segs.length >= 3) {
      return { sessionId: segs[1], fileName: segs[segs.length - 1] || 'document.md' };
    }
    return { sessionId: null, fileName: segs[segs.length - 1] || 'document.md' };
  } catch {
    return { sessionId: null, fileName: 'document.md' };
  }
}

/**
 * React body 组件工厂：宿主传入 react（运行时 require），返回可注册进
 * sidebar.right.tab.document keyed slot 的组件。渲染层只有这一个 div，
 * 编辑器本体是 vanilla DOM，在 effect 里挂载/销毁。
 */
export function makeBody(react: ReactLike, mountReviewer: MountReviewer, submit: SubmitFeature | null) {
  return function FxReviewBody(props: BodyProps): unknown {
    const hostRef = react.useRef<HTMLElement | null>(null);
    const reviewerRef = react.useRef<ReturnType<MountReviewer> | null>(null);
    /** 本 tab 的会话 id（session 作用域的地址在 tab 生命周期内不变；地址变化时更新） */
    const sessionRef = react.useRef<{ sessionId: string | null; fileName: string }>({
      sessionId: null,
      fileName: 'document.md',
    });

    react.useEffect(() => {
      const host = hostRef.current;
      if (!host) return undefined;
      const reviewer = mountReviewer({
        container: host,
        variant: 'compact',
        theme: 'host',
        storagePrefix: EMBED_STORAGE_PREFIX,
        maxSavedDocs: 50,
        bindScrollport: (node) => props.scrollportRef?.(node),
        onSubmit: submit === null
          ? undefined
          : (payload) => {
              const { sessionId } = sessionRef.current;
              if (sessionId === null) return false;
              const ok = submit.commit(sessionId, payload);
              if (ok) reviewer.notify('批注已放到输入框上方，发送时附带');
              return ok;
            },
      });
      reviewerRef.current = reviewer;
      return () => {
        reviewer.destroy();
        reviewerRef.current = null;
      };
    }, []);

    react.useEffect(() => {
      const text = decodeContent(props.content);
      if (text == null) {
        if (props.content) reviewerRef.current?.notify('文件内容不是 UTF-8 文本，无法批注');
        return;
      }
      sessionRef.current = parseAddress(props.resourceAddress);
      reviewerRef.current?.setDocument(sessionRef.current.fileName, text);
    }, [props.content, props.resourceAddress]);

    return react.createElement('div', { ref: hostRef, className: 'fxr-host' });
  };
}
