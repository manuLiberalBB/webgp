import type { Document } from '@contentful/rich-text-types';

import { richTextToPlainText } from './richTextPlainText';

const WORDS_PER_MINUTE = 200;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Estima minutos de lectura a partir de texto plano. */
export function calculateReadingTimeMinutes(text: string): number {
  const words = countWords(text);

  if (words === 0) return 1;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Calcula minutos de lectura para una noticia (cuerpo + título + bajada). */
export function calculateNewsReadingTimeMinutes(input: {
  content?: Document;
  noticeTitle: string;
  subtitle?: string;
}): number {
  const text = [
    input.content ? richTextToPlainText(input.content) : '',
    input.noticeTitle,
    input.subtitle,
  ]
    .filter(Boolean)
    .join(' ');

  return calculateReadingTimeMinutes(text);
}
