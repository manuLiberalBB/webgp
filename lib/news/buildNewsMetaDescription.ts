import type { NewsFields } from '@/lib/contentful/types/news';

import { richTextToPlainText } from './richTextPlainText';
import { truncateText } from './truncateText';

const NEWS_META_DESCRIPTION_MAX_LENGTH = 160;

/** Construye la meta description a partir del subtítulo o del contenido de la noticia. */
export function buildNewsMetaDescription(
  fields: Pick<NewsFields, 'subtitle' | 'content'>,
): string {
  const subtitle = fields.subtitle?.trim();

  if (subtitle) {
    return truncateText(subtitle, NEWS_META_DESCRIPTION_MAX_LENGTH);
  }

  const plainText = richTextToPlainText(fields.content);

  return truncateText(plainText, NEWS_META_DESCRIPTION_MAX_LENGTH);
}
