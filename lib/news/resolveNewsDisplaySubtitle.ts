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
  maxLength: number | null = NEWS_DISPLAY_SUBTITLE_MAX_LENGTH,
): string | undefined {
  const subtitle = fields.subtitle?.trim();

  if (subtitle) {
    return maxLength === null ? subtitle : truncateText(subtitle, maxLength);
  }

  const contentFragment = extractContentPlainText(fields.content);

  if (!contentFragment) {
    return undefined;
  }

  return maxLength === null ? contentFragment : truncateText(contentFragment, maxLength);
}

/** Resuelve la bajada para heroes: muestra la bajada completa solo si existe `subtitle`; si no, usa un extracto truncado del contenido. */
export function resolveNewsHeroSubtitle(
  fields: Pick<NewsFields, 'subtitle' | 'content'>,
): string | undefined {
  const subtitle = fields.subtitle?.trim();

  if (subtitle) {
    return subtitle;
  }

  return resolveNewsDisplaySubtitle(fields);
}
