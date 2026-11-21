import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from '../lib/url';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts appear only in `npm run dev`. */
export async function publishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export const isExternalPost = (post: Post) => Boolean(post.data.externalUrl);

export const postHref = (post: Post) => post.data.externalUrl ?? withBase(`/blog/${post.id}/`);

export function readingMinutes(post: Post): number | undefined {
  if (isExternalPost(post) || !post.body) return undefined;
  const words = post.body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export function allTags(posts: Post[]): string[] {
  return [...new Set(posts.flatMap((p) => p.data.tags))].sort((a, b) => a.localeCompare(b));
}
