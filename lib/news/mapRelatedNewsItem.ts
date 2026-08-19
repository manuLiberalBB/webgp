import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { NewsFields } from '@/lib/contentful/types/news';
import { getNewsPath } from '@/lib/contentful/types/news';

import {
  NEWS_RELATED_SUBTITLE_MAX_LENGTH,
  resolveNewsDisplaySubtitle,
} from './resolveNewsDisplaySubtitle';
import type { RelatedNewsItem } from './types';

export function mapRelatedNewsItem(
  id: string,
  fields: NewsFields,
): RelatedNewsItem | null {
  const coverImageUrl = getAssetUrl(fields.coverImage);
  if (!coverImageUrl || !fields.path) return null;

  return {
    id,
    title: fields.noticeTitle,
    subtitle: resolveNewsDisplaySubtitle(fields, NEWS_RELATED_SUBTITLE_MAX_LENGTH),
    coverImageUrl,
    coverImageAlt: fields.noticeTitle,
    href: getNewsPath(fields.path),
  };
}
