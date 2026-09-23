import { defineConfig } from 'vite';

// dsh 插件客户端半层构建：单文件 IIFE。
// - 入口 src/client.ts（window.__ModuleLoader__.load 注册）
// - embed.css 经 ?raw 内联为字符串，markdown-it 打包进来
// - 不含 shiki（代码块纯文本回退），react 由宿主 require 注入
// - lib/index.js（服务端半层）是手写文件，构建不清空 lib 目录
export default defineConfig({
  build: {
    outDir: 'lib',
    emptyOutDir: false,
    target: 'es2020',
    lib: {
      entry: 'src/client.ts',
      name: 'dshFxReviewBundle',
      formats: ['iife'],
      fileName: () => 'client.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
