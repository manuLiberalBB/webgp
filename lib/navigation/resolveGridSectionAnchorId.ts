import {
  GRID_SECTION_ANCHOR_IDS,
  normalizeSectionVariant,
} from '@/lib/contentful/gridSection/sectionVariants';

type ResolveGridSectionAnchorIdParams = {
  sectionVariant?: string;
  tag?: string;
};

export function resolveGridSectionAnchorId({
  sectionVariant,
  tag,
}: ResolveGridSectionAnchorIdParams): string | undefined {
  const variant = normalizeSectionVariant(sectionVariant);

  if (variant && GRID_SECTION_ANCHOR_IDS[variant]) {
    return GRID_SECTION_ANCHOR_IDS[variant];
  }

  const normalizedTag = tag?.trim().toUpperCase() ?? '';

  if (normalizedTag.includes('EDUCACION') && normalizedTag.includes('COMUNIDAD')) {
    return 'educacion-y-comunidades';
  }

  if (normalizedTag.includes('NUESTRAS INICIATIVAS')) {
    return 'nuestras-iniciativas';
  }

  if (normalizedTag.includes('INNOVACI')) {
    return 'innovacion';
  }

  return undefined;
}
