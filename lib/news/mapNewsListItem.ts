import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { NewsFields } from '@/lib/contentful/types/news';
import { getNewsPath } from '@/lib/contentful/types/news';

import { normalizeNewsCategory } from '@/lib/contentful/news/normalizeNewsCategory';
import { calculateNewsReadingTimeMinutes } from './readingTime';
import { formatNewsCardDate } from './formatNewsDate';
import { resolveNewsDisplaySubtitle } from './resolveNewsDisplaySubtitle';
import { resolveNewsPublishedAt, type NewsEntryPublicationSys } from './resolveNewsPublishedAt';
import type { NewsListItem } from './types';

export function mapNewsListItem(
  id: string,
  fields: Pick<
    NewsFields,
    'noticeTitle' | 'subtitle' | 'path' | 'category' | 'coverImage' | 'date' | 'content'
  >,
  entrySys?: NewsEntryPublicationSys,
): NewsListItem | null {
  const coverImageUrl = getAssetUrl(fields.coverImage);
  if (!coverImageUrl || !fields.path) return null;

  const publishedAt = resolveNewsPublishedAt(fields, entrySys);

  const readingMinutes = calculateNewsReadingTimeMinutes({
    noticeTitle: fields.noticeTitle,
    subtitle: fields.subtitle,
  });

  return {
    id,
    title: fields.noticeTitle,
    subtitle: resolveNewsDisplaySubtitle(fields),
    coverImageUrl,
    coverImageAlt: fields.noticeTitle,
    href: getNewsPath(fields.path),
    category: normalizeNewsCategory(fields.category),
    publishDate: formatNewsCardDate(publishedAt),
    publishedAt,
    readingMinutes,
  };
}
