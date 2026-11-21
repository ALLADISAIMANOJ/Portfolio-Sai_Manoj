// Helpers for links that must respect the deployment base path,
// e.g. "/" locally or "/portfolio/" on a GitHub Pages project site.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function withBase(path: string): string {
  if (/^[a-z][a-z\d+.-]*:/i.test(path)) return path;
  const [pathname, hash = ''] = path.split('#');
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${normalized}${hash ? `#${hash}` : ''}`;
}

export const isExternal = (href: string) => /^https?:\/\//i.test(href);
