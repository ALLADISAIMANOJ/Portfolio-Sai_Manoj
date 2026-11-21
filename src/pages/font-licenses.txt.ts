import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';

export const GET: APIRoute = async () => {
  const notices = await Promise.all(['geist', 'geist-mono'].map(async (font) => {
    // Resolve relative to the project, not the build worker's bundled module.
    const text = await readFile(`node_modules/@fontsource-variable/${font}/LICENSE`, 'utf8');
    return `${font.toUpperCase()}\n\n${text.trim()}`;
  }));
  return new Response(notices.join('\n\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
