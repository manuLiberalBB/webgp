/**
 * Stable slugs for gridSection entries.
 * Set `sectionVariant` in Contentful to one of these values instead of relying on contentfulName.
 */
export const GRID_SECTION_VARIANTS = {
  SECTORS_GRID: 'sectors-grid',
  LOGO_GRID: 'logo-grid',
  NEWS_DETAIL_MORE_ABOUT_GROUP: 'news-detail-more-about-group',
  YOU_MAY_ALSO_LIKE: 'you-may-also-like',
  RESOURCE_CENTER: 'resource-center',
  SECTOR_COMPANIES: 'sector-companies',
  HIRING_ROOM_CTA: 'hiring-room-cta',
  IN_PERSON_DYNAMICS: 'in-person-dynamics',
  FUNDACIONES_GRUPO_PETERSEN: 'fundaciones-grupo-petersen',
  FUNDACIONES_CTA: 'fundaciones-cta',
  REGIONAL_ECONOMIES_COMMITMENT: 'regional-economies-commitment',
  STRATEGIC_SECTORS: 'strategic-sectors',
  BUSINESS_ECOSYSTEM: 'business-ecosystem',
  CAROUSEL: 'carousel',
  PROGRAMS_DEVELOPMENT: 'programs-development',
  IMAGE_OVERLAY_GRID: 'image-overlay-grid',
  BORDERED_GRID: 'bordered-grid',
  ICON_CARD_GRID: 'icon-card-grid',
  BANKING_CONNECT: 'banking-connect',
  BANKING_SUSTAINABILITY: 'banking-sustainability',
  TALENT_CULTURE: 'talent-culture',
  DEFAULT: 'default',
  /** Used by PageRenderer when pairing consecutive I3 sections. */
  I3_INNOVATION: 'i3-innovation',
  I3_CONVERSATIONS: 'i3-conversations',
} as const;

export type GridSectionVariant =
  (typeof GRID_SECTION_VARIANTS)[keyof typeof GRID_SECTION_VARIANTS];

const KNOWN_VARIANTS = new Set<string>(Object.values(GRID_SECTION_VARIANTS));

export function normalizeSectionVariant(value?: string): GridSectionVariant | undefined {
  const normalized = value?.trim().toLowerCase();

  if (!normalized || !KNOWN_VARIANTS.has(normalized)) {
    return undefined;
  }

  return normalized as GridSectionVariant;
}

export function isKnownGridSectionVariant(
  value?: string,
): value is GridSectionVariant {
  return normalizeSectionVariant(value) !== undefined;
}

/** Anchor ids for in-page hash navigation. */
export const GRID_SECTION_ANCHOR_IDS: Partial<Record<GridSectionVariant, string>> = {
  [GRID_SECTION_VARIANTS.FUNDACIONES_GRUPO_PETERSEN]: 'educacion-y-comunidades',
  [GRID_SECTION_VARIANTS.PROGRAMS_DEVELOPMENT]: 'nuestras-iniciativas',
  [GRID_SECTION_VARIANTS.I3_INNOVATION]: 'innovacion',
};
