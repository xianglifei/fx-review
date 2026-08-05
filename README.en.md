# fx-review

> 🌐 Live: [review.feixing.io](https://review.feixing.io) ｜ 📖 [中文](./README.md)

A web-based Markdown annotation and review tool. Drop in a local Markdown file → annotate the rendered text with CriticMarkup → copy or download the annotated document and hand it to an AI for revision. No install, device-agnostic, hosted on Cloudflare Pages.

![fx-review screenshot](docs/screenshot.png)

## Inspiration & Contribution

This project is inspired by [easychen/markmark](https://github.com/easychen/markmark) — a native macOS Markdown reader that uses [CriticMarkup](https://criticmarkup.com) syntax to annotate text, then hands the annotated document to an AI for revision.

**My contribution**: I keep markmark's core idea (CriticMarkup annotations + a one-click hand-off-to-AI review loop), but **migrate it from a native app to the pure web**:

- **Zero install**: just open a web page — any device, any OS, Mac/Windows/Linux.
- **Files never leave the browser**: Markdown is read and rendered locally; nothing is uploaded.
- **Self-built source-offset mapping**: selecting text in the rendered preview resolves back to the exact character position in the source Markdown, so standard CriticMarkup markers can be inserted — the hardest part of a web version.
- **CSS Custom Highlight API rendering**: the rendered DOM is never mutated, so repeated annotations never drift.

How it differs from markmark: markmark is a Mac-native reader (with editing, PDF export, Mermaid, etc.); this project focuses on one thing — lightweight review in the browser — with a lower barrier and no device lock-in.

## Positioning

**Not a Markdown editor**, but a "read + annotate for review" tool. The focus is on the words, not the formatting — if the AI-generated Markdown has formatting errors (heading levels, misplaced bold), just leave a comment annotation for the AI.

## Five CriticMarkup annotation types

| Type | Syntax | Display |
|------|--------|---------|
| Insertion | `{++ text ++}` | Green |
| Deletion | `{-- text --}` | Red strikethrough |
| Substitution | `{~~ old ~> new ~~}` | Old red strikethrough → new green |
| Highlight | `{== text ==}` | Yellow highlighter |
| Comment | `{== text ==}{>> note <<}` | Wavy yellow underline + side panel |

## How to use

### 1. Open a file
**Drag a local `.md` file anywhere onto the window**, or click the "打开 Markdown 文件" (Open Markdown File) button in the center of the page. The file is read locally in the browser and never uploaded.

### 2. Annotate
**Select a passage** in the rendered text — two entry points appear: a **floating pill menu** next to the selection (fastest), and the 5 annotation buttons in the top toolbar.

- **Delete / Highlight / Comment**: select text, then click the button.
- **Substitution (替换)**: select text, click "替换", enter the new text; the body shows ~~old~~ → new.
- **Insertion (插入)**: click once in the text to place the caret, then click "插入" and type the new text (shown in green).
- **Comment** notes are edited in the **right side panel** — read the body while writing your review; click ↗ on an entry to jump back to it in the text.

> Annotations cannot overlap (a CriticMarkup limitation). To express different opinions on the same passage, use "替换" or annotate adjacent positions separately.

### 3. Hand off to AI
Four export buttons on the top right:

- **复制批注 (Copy annotated)** / **下载批注 (Download annotated)**: the full text with CriticMarkup markers only.
- **复制(含Prompt) (Copy w/ prompt)** / **下载(含Prompt) (Download w/ prompt)**: prepends a guiding prompt that tells the AI how to read the markers. Shortcut `⌘/Ctrl + Shift + C`.

Paste into any AI chat, or drag the downloaded `.md` to an AI agent. The AI understands `{-- --}` (delete), `{++ ++}` (insert), `{~~ ~> ~~}` (replace), etc., and outputs the revised full document.

### Other
- **清空批注 (Clear)**: remove all annotations and restore the original preview.
- **编辑 Prompt (Edit prompt)**: customize the guiding prompt for "w/ prompt" exports (session-only).
- **Theme**: toggle light/dark at the top right; defaults to the system setting.

## How it works

1. markdown-it renders the Markdown; a custom render rule injects `data-o="srcStart,srcEnd"` onto each rendered text fragment, aligning rendered DOM text nodes with source character offsets.
2. On selection, `data-o` resolves the selection back to a source range.
3. The display layer uses the **CSS Custom Highlight API** (`::highlight`) for styling — the rendered DOM is never mutated, so offsets never drift no matter how many annotations you add. Insertions use `<ins>` nodes at points.
4. On export, CriticMarkup markers are inserted in descending source-offset order to produce the final text.

> Browser support: the CSS Custom Highlight API requires Chrome/Edge 105+, Safari 17+, or Firefox 140+. Unsupported browsers fall back to `<mark>` wrapping.

## Development

```bash
npm install
npm run dev      # local dev
npm run build    # typecheck + build dist/
npm run preview  # preview the build
```

## Deploy to Cloudflare Pages

Fully static, no backend. Live domain: **[review.feixing.io](https://review.feixing.io)** (Pages project `fx-review`, production branch `main`).

- **CLI** (current): `npm run deploy` (≡ `npm run build && wrangler pages deploy dist`).
- **Git integration** (optional auto-deploy): connect this GitHub repo in the Cloudflare Pages dashboard with Build command `npm run build` and Build output `dist`; pushes to `main` then auto-deploy.
- **Custom domain**: add `review.feixing.io` under Pages project → Custom domains and follow the DNS instructions.

## Tech stack

- Vite + TypeScript (vanilla, no framework)
- markdown-it (the only runtime dependency)
- Cloudflare Pages (static hosting)

## Roadmap (not in v1)

- Mermaid / PlantUML / KaTeX rendering, Prism code highlighting
- Annotation persistence (localStorage / cross-device sync)
- Multi-file / tabs
- Mobile layout

## License

MIT
