import type { Entry } from 'contentful';

import type { CardFields } from '../types/card';

import { resolveFoundationImageItems } from '../image/resolveFoundationImageItems';
import type { FoundationImageItem } from '../types/image';

function normalizeContentfulName(contentfulName: string): string {
  return contentfulName
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function isFundacionesConoceCtaCardContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = normalizeContentfulName(contentfulName);

  return (
    normalized.includes('CTA') &&
    (normalized.includes('CONOCE') || normalized.includes('CONOC')) &&
    normalized.includes('FUNDACION')
  );
}

export function resolveFundacionesCtaCard(items?: Entry[]): CardFields | null {
  const cards =
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'card')
      .map((item) => item.fields as CardFields) ?? [];

  if (cards.length === 0) return null;

  return (
    cards.find((card) =>
      isFundacionesConoceCtaCardContentfulName(card.contentfulName),
    ) ?? cards[0]
  );
}

export function resolveFundacionesSectionItems(items?: Entry[]): {
  images: FoundationImageItem[];
  ctaCard: CardFields | null;
} {
  return {
    images: resolveFoundationImageItems(items),
    ctaCard: resolveFundacionesCtaCard(items),
  };
}
