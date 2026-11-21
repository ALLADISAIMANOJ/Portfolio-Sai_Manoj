import type { APIRoute } from 'astro';
import { profile } from '../data/profile';
import { publishedPosts, postHref } from '../data/blog';
import { withBase } from '../lib/url';

const escape = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const absolute = (href: string) => (site && href.startsWith('/') ? new URL(href, site).href : href);
  const posts = (await publishedPosts()).filter((p) => !p.data.draft);
  const items = posts.map((post) => {
    const link = absolute(postHref(post));
    return `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${escape(link)}</link>
      <guid isPermaLink="true">${escape(link)}</guid>
      <description>${escape(post.data.description)}</description>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
${post.data.tags.map((t) => `      <category>${escape(t)}</category>`).join('\n')}
    </item>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(`${profile.name} — Blog`)}</title>
    <link>${escape(absolute(withBase('/blog/')))}</link>
    <description>${escape(`Writing by ${profile.name} on AI agents, retrieval and reliable backend systems.`)}</description>
    <language>en</language>
${items.join('\n')}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
