import type { Document } from '@contentful/rich-text-types';

import type { NewsFields } from '@/lib/contentful/types/news';

import { richTextToPlainText } from './richTextPlainText';
import { truncateText } from './truncateText';

export const NEWS_DISPLAY_SUBTITLE_MAX_LENGTH = 160;
export const NEWS_RELATED_SUBTITLE_MAX_LENGTH = 120;

function extractContentPlainText(content: NewsFields['content'] | string | undefined): string | undefined {
  if (typeof content === 'string') {
    const trimmed = content.trim();
    return trimmed || undefined;
  }

  if (!content || typeof content !== 'object') {
    return undefined;
  }

  const plainText = richTextToPlainText(content as Document).trim();
  return plainText || undefined;
}

/** Resuelve la bajada visible en listados/cards: usa `subtitle` o, si falta, un fragmento inicial del contenido en texto plano. */
export function resolveNewsDisplaySubtitle(
  fields: Pick<NewsFields, 'subtitle' | 'content'>,
  maxLength = NEWS_DISPLAY_SUBTITLE_MAX_LENGTH,
): string | undefined {
  const subtitle = fields.subtitle?.trim();

  if (subtitle) {
    return maxLength ? truncateText(subtitle, maxLength) : subtitle;
  }

  const contentFragment = extractContentPlainText(fields.content);

  if (!contentFragment) {
    return undefined;
  }

  return truncateText(contentFragment, maxLength);
}
