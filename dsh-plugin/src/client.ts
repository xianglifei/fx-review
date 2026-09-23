// dsh-fx-review —— 客户端半层入口（构建产物 lib/client.js）
//
// dsh 的客户端模块格式：window.__ModuleLoader__.load({ id, factory })，
// factory(require) 里 require 壳内置的 react（与 fi-sidebar 同一约定）。
// 本文件由 vite 打成单文件 IIFE（embed.css 以 ?raw 内联、markdown-it 打包、
// 不含 shiki），产物可被 <script> 直接执行。
import embedCss from '../../src/embed.css?raw';
import { mountReviewer } from '../../src/editor';
import { makePlugin } from './register';
import type { ReactLike } from './react-types';

declare global {
  interface Window {
    __ModuleLoader__: {
      load: (definition: { id: string; factory: (require: (id: string) => unknown) => unknown }) => void;
    };
  }
}

const module = { exports: {} as Record<string, unknown> };

window.__ModuleLoader__.load({
  id: 'dsh-fx-review',
  factory: (require) => {
    const react = require('react') as ReactLike;
    const plugin = makePlugin({ react, mountReviewer, embedCss });
    module.exports.inject = plugin.inject;
    module.exports.apply = plugin.apply;
    return module.exports;
  },
});
