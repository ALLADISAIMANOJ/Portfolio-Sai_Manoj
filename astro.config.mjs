import { defineConfig } from 'astro/config';

// Optional build settings, all read from environment variables:
//   SITE_URL   Public HTTPS origin, e.g. https://alladisaimanoj.github.io
//              Enables canonical links, absolute share images, RSS links and indexing.
//   BASE_PATH  Sub-path when the site is not at the domain root, e.g. /portfolio
function siteUrl() {
  if (!process.env.SITE_URL) return undefined;
  const url = new URL(process.env.SITE_URL);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('SITE_URL must be an https:// origin, e.g. https://username.github.io');
  }
  return url.origin;
}

function basePath() {
  const raw = (process.env.BASE_PATH ?? '/').trim();
  if (!/^\/?[\w\-./]*$/.test(raw)) throw new Error('BASE_PATH may only contain a URL path, e.g. /portfolio');
  const path = `/${raw.replace(/^\/+|\/+$/g, '')}`;
  return path === '/' ? '/' : `${path}/`;
}

export default defineConfig({
  output: 'static',
  site: siteUrl(),
  base: basePath(),
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  server: { host: '127.0.0.1' },
  vite: {
    server: {
      fs: {
        deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/*.pdf'],
      },
    },
  },
});
