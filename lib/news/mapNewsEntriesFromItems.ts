import type { Entry } from 'contentful';

import type { NewsFields } from '@/lib/contentful/types/news';
import { mapFeaturedNewsItem } from '@/lib/news/mapFeaturedNewsItem';
import type { FeaturedNewsItem } from '@/lib/news/types';

export function mapNewsEntriesToFeaturedItems(
  entries?: Entry[],
  limit?: number,
): FeaturedNewsItem[] {
  if (!entries?.length) return [];

  const newsEntries = entries.filter(
    (entry) => entry.sys.contentType?.sys.id === 'news',
  );

  const mapped = newsEntries
    .map((entry) =>
      mapFeaturedNewsItem(
        entry.sys.id,
        entry.fields as NewsFields,
        entry.sys,
      ),
    )
    .filter((item): item is FeaturedNewsItem => item !== null);

  return limit ? mapped.slice(0, limit) : mapped;
}

export function hasNewsEntries(entries?: Entry[]): boolean {
  return entries?.some((entry) => entry.sys.contentType?.sys.id === 'news') ?? false;
}
