import type { Entry } from 'contentful';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { CardFields } from '@/lib/contentful/types/card';

function normalizeSectionLabel(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').trim().toUpperCase();
}

export function resolveCardEntries(items?: Entry[]): CardFields[] {
  return (
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'card')
      .map((item) => item.fields as CardFields) ?? []
  );
}

export function isNewsListingPage(pagePath?: string[]) {
  return pagePath?.length === 1 && pagePath[0] === 'noticias';
}

function isFoundationAreasSection(title?: string, subtitle?: string): boolean {
  const labels = [title, subtitle].filter(
    (value): value is string => Boolean(value?.trim()),
  );

  return labels.some((label) => {
    const normalized = normalizeSectionLabel(label);

    return (
      normalized.includes('AREAS DE ACCION') && normalized.includes('FUNDACION')
    );
  });
}

function isRegionalPresenceTitle(title?: string): boolean {
  if (!title?.trim()) return false;

  const normalized = normalizeSectionLabel(title);

  return (
    normalized.includes('ESTAMOS PRESENTES') && normalized.includes('REGIONAL')
  );
}

function isRegionalPresenceSection(title?: string, cardsCount?: number): boolean {
  if (isRegionalPresenceTitle(title)) return true;

  return cardsCount === 5;
}

function isNewsListingImpactSection(pagePath?: string[], title?: string): boolean {
  if (!isNewsListingPage(pagePath) || !title?.trim()) return false;

  return normalizeSectionLabel(title).includes('GENERAMOS IMPACTO');
}

function isCommunityCommitmentSection(title?: string): boolean {
  if (!title?.trim()) return false;

  const normalized = normalizeSectionLabel(title);

  return normalized.includes('COMPROMISO') && normalized.includes('COMUNIDAD');
}

function hasExpandableImageOverlayDescription(
  pagePath?: string[],
  title?: string,
): boolean {
  return (
    isNewsListingImpactSection(pagePath, title) ||
    isCommunityCommitmentSection(title) ||
    isRegionalPresenceTitle(title)
  );
}

export function isGroupWideCommitmentLayout(title?: string, tag?: string): boolean {
  const matchesCommitmentAcrossGroup = (value: string) =>
    value.includes('ATRAVIESA') &&
    (value.includes('GRUPO') || value.includes('GRUP'));

  const normalizedTitle = title?.trim().toUpperCase() ?? '';
  const normalizedTag = tag?.trim().toUpperCase() ?? '';

  return (
    matchesCommitmentAcrossGroup(normalizedTitle) ||
    matchesCommitmentAcrossGroup(normalizedTag)
  );
}

export function resolveImageOverlayGridSectionProps({
  title,
  subtitle,
  cards,
  pagePath,
}: {
  title?: string;
  subtitle?: string;
  cards: CardFields[];
  pagePath?: string[];
}) {
  const isRegionalPresence = isRegionalPresenceSection(title, cards.length);
  const isFundacionesAreasAccion = isFoundationAreasSection(title, subtitle);
  const hasExpandableDescription = hasExpandableImageOverlayDescription(
    pagePath,
    title,
  );

  return {
    title,
    subtitle,
    cards,
    headerAlign:
      isRegionalPresence || hasExpandableDescription || isFundacionesAreasAccion
        ? ('left' as const)
        : ('center' as const),
    cardLayout:
      isRegionalPresence && cards.length === 5
        ? ('three-two' as const)
        : ('default' as const),
    titleClassName: isRegionalPresence
      ? 'w-full text-[1.75rem] leading-tight md:text-[2.5rem] md:leading-[2.75rem]'
      : isFundacionesAreasAccion
        ? 'text-heading text-[22px] leading-[33px] font-semibold md:text-[22px] md:leading-[33px]'
        : undefined,
    subtitleClassName: isFundacionesAreasAccion
      ? 'text-body text-[18px] font-normal leading-normal md:text-[18px]'
      : undefined,
    className: isFundacionesAreasAccion ? 'pt-0 md:pt-0' : undefined,
    cardVariant: isFundacionesAreasAccion ? ('foundationArea' as const) : undefined,
    expandableDescription: hasExpandableDescription,
  };
}

export function isImageOverlayGrid(cards: CardFields[]): boolean {
  if (cards.length === 0) return false;

  return cards.every((card) => Boolean(card.image && getAssetUrl(card.image)));
}
