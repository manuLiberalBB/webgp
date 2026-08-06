import type { Asset, Entry, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

export const GRID_SECTION_CARD_STYLES = [
  'ImageOverlayCard',
  'FeatureCard',
  'IconCard',
] as const;

export type GridSectionCardStyle = (typeof GRID_SECTION_CARD_STYLES)[number];

export function isGridSectionCardStyle(
  value?: string,
): value is GridSectionCardStyle {
  if (!value) return false;

  return GRID_SECTION_CARD_STYLES.includes(value as GridSectionCardStyle);
}

export function resolveGridSectionCardStyle(
  value?: string,
): GridSectionCardStyle | undefined {
  const normalized = value?.trim();

  return isGridSectionCardStyle(normalized) ? normalized : undefined;
}

/**
 * Content type: `gridSection` (Bloque Cuadrícula)
 * @see display field: `contentfulName`
 */
export type GridSectionFields = {
  contentfulName: string;
  /**
   * Stable slug that identifies which section layout to render.
   * @see GRID_SECTION_VARIANTS in lib/contentful/gridSection/sectionVariants.ts
   */
  sectionVariant?: string;
  tag?: string;
  title?: string;
  subtitle?: string;
  icon?: Asset;
  body?: Document;
  items?: Entry[];
  urlList?: Entry[];
  image?: Asset;
  backgroundImage?: Asset;
  /** Estilo de cards cuando `items` contiene entries `card`. */
  cardStyle?: GridSectionCardStyle;
};

export type GridSectionEntry = {
  fields: GridSectionFields;
};

export type GridSectionSkeleton = EntrySkeletonType & {
  contentTypeId: 'gridSection';
  fields: GridSectionFields;
};

export const HIRING_ROOM_CTA_LABEL = 'Ver búsquedas laborales';
