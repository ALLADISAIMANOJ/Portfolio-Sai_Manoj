import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    context: z.string(),
    contribution: z.string(),
    tags: z.array(z.string()).min(1),
    cover: z.enum(['flow', 'pages']).default('pages'),
    order: z.number().int(),
  }),
});

/**
 * Two kinds of posts live here:
 *  - Posts written on this site: Markdown body, no `externalUrl`. They get their own page.
 *  - Posts published elsewhere (Medium, Hashnode, dev.to, LinkedIn…): set `externalUrl`;
 *    the card links straight to the original and the body can stay empty.
 */
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    externalUrl: z.url({ protocol: /^https$/, error: 'externalUrl must be an https:// link' }).optional(),
    publication: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, blog };
