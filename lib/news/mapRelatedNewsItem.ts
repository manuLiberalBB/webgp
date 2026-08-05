import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { NewsFields } from '@/lib/contentful/types/news';
import { getNewsPath } from '@/lib/contentful/types/news';

import { truncateText } from './truncateText';
import type { RelatedNewsItem } from './types';

const RELATED_SUBTITLE_MAX_LENGTH = 120;

export function mapRelatedNewsItem(
  id: string,
  fields: NewsFields,
): RelatedNewsItem | null {
  const coverImageUrl = getAssetUrl(fields.coverImage);
  if (!coverImageUrl || !fields.path) return null;

  return {
    id,
    title: fields.noticeTitle,
    subtitle: fields.subtitle
      ? truncateText(fields.subtitle, RELATED_SUBTITLE_MAX_LENGTH)
      : undefined,
    coverImageUrl,
    coverImageAlt: fields.noticeTitle,
    href: getNewsPath(fields.path),
  };
}
