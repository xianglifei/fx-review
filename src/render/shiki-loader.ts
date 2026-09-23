import type { HighlighterCore } from 'shiki/core';

/**
 * 网页壳的默认 Shiki 加载器（从 highlight.ts 拆出：动态 import 只有这里引用，
 * 嵌入构建（dsh 插件）不 import 本文件，shiki 就完全进不了插件产物）。
 *
 * 细粒度加载：只打进选定的语言与主题（若从 'shiki' 主入口 import，
 * Rollup 会为全部语言和 WASM 引擎生成 chunk，产物多出几百个无用文件）。
 * JS 正则引擎无 WASM 依赖；forgiving 容忍个别语法不支持。
 */
export function defaultShikiLoader(): Promise<HighlighterCore> {
  return (async () => {
    const [
      { createHighlighterCore },
      { createJavaScriptRegexEngine },
      javascript,
      typescript,
      json,
      bash,
      python,
      html,
      css,
      xml,
      markdown,
      yaml,
      sql,
      diff,
      go,
      rust,
      java,
      cpp,
      c,
      { default: githubLight },
      { default: githubDark },
    ] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('shiki/langs/javascript.mjs'),
      import('shiki/langs/typescript.mjs'),
      import('shiki/langs/json.mjs'),
      import('shiki/langs/bash.mjs'),
      import('shiki/langs/python.mjs'),
      import('shiki/langs/html.mjs'),
      import('shiki/langs/css.mjs'),
      import('shiki/langs/xml.mjs'),
      import('shiki/langs/markdown.mjs'),
      import('shiki/langs/yaml.mjs'),
      import('shiki/langs/sql.mjs'),
      import('shiki/langs/diff.mjs'),
      import('shiki/langs/go.mjs'),
      import('shiki/langs/rust.mjs'),
      import('shiki/langs/java.mjs'),
      import('shiki/langs/cpp.mjs'),
      import('shiki/langs/c.mjs'),
      import('shiki/themes/github-light.mjs'),
      import('shiki/themes/github-dark.mjs'),
    ]);
    return createHighlighterCore({
      themes: [githubLight, githubDark],
      langs: [
        javascript,
        typescript,
        json,
        bash,
        python,
        html,
        css,
        xml,
        markdown,
        yaml,
        sql,
        diff,
        go,
        rust,
        java,
        cpp,
        c,
      ],
      engine: createJavaScriptRegexEngine({ forgiving: true }),
    });
  })();
}
