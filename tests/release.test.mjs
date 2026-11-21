import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { basename, sep } from 'node:path';
import { test } from 'node:test';

const output = new URL('../dist/', import.meta.url);
const files = new Set((await readdir(output, { recursive: true })).map((f) => f.split(sep).join('/')));
const pages = new Map(await Promise.all([...files].filter((f) => f.endsWith('.html'))
  .map(async (f) => [f, await readFile(new URL(f, output), 'utf8')])));
const origin = 'http://site.test';
const base = `/${(process.env.BASE_PATH ?? '/').replace(/^\/+|\/+$/g, '')}/`.replace('//', '/');

async function frontmatter(dir) {
  const folder = new URL(`../src/content/${dir}/`, import.meta.url);
  const names = (await readdir(folder)).filter((n) => /\.mdx?$/.test(n));
  return Promise.all(names.map(async (name) => {
    const text = await readFile(new URL(name, folder), 'utf8');
    const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    return {
      id: basename(name).replace(/\.mdx?$/, ''),
      draft: /^draft:\s*true\b/m.test(fm),
      external: /^externalUrl:/m.test(fm),
      title: fm.match(/^title:\s*"(.*)"\s*$/m)?.[1],
    };
  }));
}

test('core pages, every case study and every published local post are built and linked', async () => {
  for (const page of ['index.html', 'resume/index.html', '404.html', 'blog/index.html', 'work/index.html']) assert.ok(pages.has(page), `Missing ${page}`);
  const workIndex = pages.get('work/index.html');
  for (const note of await frontmatter('work')) {
    assert.ok(pages.has(`work/${note.id}/index.html`), `Missing case study ${note.id}`);
    assert.ok(workIndex.includes(`href="${base}work/${note.id}/"`), `Work index does not link to ${note.id}`);
  }
  const blog = pages.get('blog/index.html');
  for (const post of await frontmatter('blog')) {
    const built = pages.has(`blog/${post.id}/index.html`);
    if (post.draft) {
      assert.ok(!built, `Draft ${post.id} was published`);
      if (post.title) assert.ok(![...pages.values()].some((h) => h.includes(post.title)), `Draft title leaked: ${post.id}`);
    } else if (post.external) {
      assert.ok(!built, `External post ${post.id} should not get a local page`);
    } else {
      assert.ok(built, `Missing post page ${post.id}`);
      assert.ok(blog.includes(`href="${base}blog/${post.id}/"`), `Blog index does not link to ${post.id}`);
    }
  }
});

test('internal links, anchors and assets resolve under the build base path', () => {
  for (const [file, html] of pages) {
    const pageUrl = new URL(base + file.replace(/index\.html$/, ''), origin);
    for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
      const url = new URL(raw.replaceAll('&amp;', '&'), pageUrl);
      const where = file;
      if (url.origin !== origin) {
        assert.equal(attr, 'href', `${where}: external asset ${raw}`);
        assert.equal(url.protocol, 'https:', `${where}: insecure external link ${raw}`);
        continue;
      }
      assert.ok(url.pathname.startsWith(base), `${where}: ${raw} ignores the base path`);
      const rel = decodeURIComponent(url.pathname.slice(base.length));
      const target = rel === '' || rel.endsWith('/') ? `${rel}index.html` : rel;
      assert.ok(files.has(target), `${where}: ${raw} → ${target} does not exist`);
      if (url.hash.length > 1 && pages.has(target)) {
        assert.ok(pages.get(target).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${where}: missing anchor ${raw}`);
      }
    }
  }
});

test('stylesheets and scripts never fetch third-party resources', async () => {
  for (const f of [...files].filter((x) => /\.(css|js)$/.test(x))) {
    const text = await readFile(new URL(f, output), 'utf8');
    assert.doesNotMatch(text, /(?:@import|url\()\s*['"]?https?:\/\//i, `${f} loads a remote resource`);
    assert.doesNotMatch(text, /fetch\(\s*['"`]https?:/i, `${f} fetches a remote URL`);
  }
  for (const [file, html] of pages) {
    assert.doesNotMatch(html, /<(?:script|img|iframe)\b[^>]*\ssrc="(?:https?:)?\/\//i, `${file}: remote embed`);
    for (const [tag] of html.matchAll(/<link\b[^>]*>/gi)) {
      if (/\brel="(?:stylesheet|icon|preload|preconnect|dns-prefetch)"/i.test(tag)) {
        assert.doesNotMatch(tag, /\bhref="(?:https?:)?\/\//i, `${file}: remote resource`);
      }
    }
  }
});

test('the release excludes PDFs, environment files and direct contact details', () => {
  for (const file of files) assert.doesNotMatch(file, /(?:\.pdf$|(?:^|\/)\.(?:env|git)(?:$|[./]))/i);
  for (const [file, html] of pages) {
    assert.doesNotMatch(html, /(?:mailto:|tel:|[\w.+-]+@[\w-]+\.[\w.-]*[a-z]{2,}(?![\w-]))/i, `${file}: contact detail found`);
  }
});

test('fresh visits start in Aurora dark mode and published metadata uses the deployment origin', async () => {
  const site = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : '';
  for (const [file, html] of pages) {
    assert.ok(html.includes(`property="og:image" content="${site}${base}share.png"`), file);
    assert.match(html, /<html[^>]*data-theme="dark"/, file);
    assert.match(html, /data-theme-toggle/, file);
    if (site && file !== '404.html') {
      assert.ok(html.includes(`rel="canonical" href="${site}${base}${file.replace(/index\.html$/, '')}"`), file);
    }
  }
  assert.match(pages.get('404.html'), /name="robots" content="noindex/);
  const png = await readFile(new URL('share.png', output));
  assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  const rss = await readFile(new URL('rss.xml', output), 'utf8');
  assert.match(rss, /^<\?xml/);
  const published = (await frontmatter('blog')).filter((p) => !p.draft);
  assert.equal((rss.match(/<item>/g) ?? []).length, published.length, 'RSS item count');
  if (site) assert.ok(rss.includes(`<link>${site}${base}blog/</link>`));
});
