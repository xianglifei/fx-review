import { store } from '../store';
import { buildAnnotatedSource } from './criticmarkup';
import { toast } from '../ui/toast';

function annotatedSource(): string {
  return buildAnnotatedSource(store.state.source, store.state.annotations);
}

function baseName(): string {
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

export async function copyAnnotated(): Promise<void> {
  const text = annotatedSource();
  if (await copyText(text)) toast('已复制批注全文');
  else toast('复制失败，请手动复制');
}

export function downloadAnnotated(): void {
  download(`${baseName()}-annotated.md`, annotatedSource());
  toast('已下载批注全文');
}

export async function copyWithPrompt(): Promise<void> {
  const text = `${store.state.prompt}\n\n${annotatedSource()}`;
  if (await copyText(text)) toast('已复制 Prompt + 批注全文');
  else toast('复制失败，请手动复制');
}

export function downloadWithPrompt(): void {
  download(`${baseName()}-for-ai.md`, `${store.state.prompt}\n\n${annotatedSource()}`);
  toast('已下载 Prompt + 批注全文');
}
