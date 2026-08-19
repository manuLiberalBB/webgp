import type { NewsFields } from '@/lib/contentful/types/news';

import {
  NEWS_DISPLAY_SUBTITLE_MAX_LENGTH,
  resolveNewsDisplaySubtitle,
} from './resolveNewsDisplaySubtitle';

const NEWS_META_DESCRIPTION_MAX_LENGTH = NEWS_DISPLAY_SUBTITLE_MAX_LENGTH;

/** Construye la meta description a partir del subtítulo o del contenido de la noticia. */
export function buildNewsMetaDescription(
  fields: Pick<NewsFields, 'subtitle' | 'content'>,
): string {
  return (
    resolveNewsDisplaySubtitle(fields, NEWS_META_DESCRIPTION_MAX_LENGTH) ?? ''
  );
}
