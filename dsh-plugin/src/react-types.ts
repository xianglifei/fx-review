/**
 * 宿主 React 的最小结构类型：dsh 客户端模块的 factory(require) 在运行时
 * 把 react 递进来，本插件不打包 React，也无需其完整类型声明。
 */
export interface ReactLike {
  useRef: <T>(initial: T) => { current: T };
  useEffect: (effect: () => void | (() => void), deps?: readonly unknown[]) => void;
  useMemo: <T>(factory: () => T, deps: readonly unknown[]) => T;
  useState: <T>(initial: T | (() => T)) => [T, (value: T | ((prev: T) => T)) => void];
  useSyncExternalStore?: <T>(
    subscribe: (onStoreChange: () => void) => () => void,
    getSnapshot: () => T,
  ) => T;
  createElement: (
    type: string,
    props: Record<string, unknown> | null,
    ...children: unknown[]
  ) => unknown;
}
