import { getCollection } from 'astro:content';

export async function selectedWork() {
  return (await getCollection('work')).sort((a, b) =>
    a.data.order - b.data.order || a.id.localeCompare(b.id),
  );
}
