import { defineConfig } from 'vite';

// 纯静态站点，部署到 Cloudflare Pages。
// base: './' 让产物用相对路径，便于在 Pages 子路径下直接运行。
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
  },
});
