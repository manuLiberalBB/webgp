import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { NewsFields } from '@/lib/contentful/types/news';
import { getNewsPath } from '@/lib/contentful/types/news';

import { normalizeNewsCategory } from '@/lib/contentful/news/normalizeNewsCategory';
import { calculateNewsReadingTimeMinutes } from './readingTime';
import { formatNewsCardDate } from './formatNewsDate';
import type { NewsListItem } from './types';

export function mapNewsListItem(
  id: string,
  fields: Pick<
    NewsFields,
    'noticeTitle' | 'subtitle' | 'path' | 'category' | 'coverImage'
  >,
  publishedAt?: string,
): NewsListItem | null {
  const coverImageUrl = getAssetUrl(fields.coverImage);
  if (!coverImageUrl || !fields.path) return null;

  const readingMinutes = calculateNewsReadingTimeMinutes({
    noticeTitle: fields.noticeTitle,
    subtitle: fields.subtitle,
  });

  return {
    id,
    title: fields.noticeTitle,
    subtitle: fields.subtitle,
    coverImageUrl,
    coverImageAlt: fields.noticeTitle,
    href: getNewsPath(fields.path),
    category: normalizeNewsCategory(fields.category),
    publishDate: formatNewsCardDate(publishedAt),
    publishedAt: publishedAt ?? new Date().toISOString(),
    readingMinutes,
  };
}
