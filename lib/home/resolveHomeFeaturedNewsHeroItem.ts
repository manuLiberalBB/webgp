import type { Entry } from 'contentful';

import type { FeaturedNewsFields } from '@/lib/contentful/types/featuredNews';
import type { NewsFields } from '@/lib/contentful/types/news';
import { mapFeaturedNewsItem } from '@/lib/news/mapFeaturedNewsItem';
import { resolveNewsHeroSubtitle } from '@/lib/news/resolveNewsDisplaySubtitle';
import type { FeaturedNewsItem } from '@/lib/news/types';

export function resolveHomeFeaturedNewsHeroItem(
  entry: Entry,
): FeaturedNewsItem | null {
  const { news } = entry.fields as FeaturedNewsFields;
  const firstEntry = news?.[0];

  if (!firstEntry) return null;

  const item = mapFeaturedNewsItem(
    firstEntry.sys.id,
    firstEntry.fields as NewsFields,
    firstEntry.sys,
  );

  if (!item) return null;

  return {
    ...item,
    subtitle: resolveNewsHeroSubtitle(firstEntry.fields as NewsFields),
  };
}
