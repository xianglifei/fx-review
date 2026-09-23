import type { Store } from '../store';
import { buildAnnotatedSource } from './criticmarkup';

type Notify = (message: string, duration?: number) => void;

function annotatedSource(store: Store): string {
  return buildAnnotatedSource(store.state.source, store.state.annotations);
}

function baseName(store: Store): string {
  const name = store.state.fileName || 'document.md';
  return name.replace(/\.(md|markdown|mdown)$/i, '');
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // 降级：用隐藏 textarea + execCommand
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}

function download(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function copyAnnotated(store: Store, notify: Notify): Promise<void> {
  const text = annotatedSource(store);
  if (await copyText(text)) notify('已复制批注全文');
  else notify('复制失败，请手动复制');
}

export function downloadAnnotated(store: Store, notify: Notify): void {
  download(`${baseName(store)}-annotated.md`, annotatedSource(store));
  notify('已下载批注全文');
}

export async function copyWithPrompt(store: Store, notify: Notify): Promise<void> {
  const text = `${store.state.prompt}\n\n${annotatedSource(store)}`;
  if (await copyText(text)) notify('已复制 Prompt + 批注全文');
  else notify('复制失败，请手动复制');
}

export function downloadWithPrompt(store: Store, notify: Notify): void {
  download(`${baseName(store)}-for-ai.md`, `${store.state.prompt}\n\n${annotatedSource(store)}`);
  notify('已下载 Prompt + 批注全文');
}
