import type { Entry, EntrySkeletonType } from 'contentful';

/**
 * Content type: `sectorsGridSection` (Sección Grilla Sectores)
 * @see display field: `contentfulName`
 */
export type SectorsGridSectionFields = {
  contentfulName: string;
  subtitle?: string;
  items?: Entry[];
};

export type SectorsGridSectionEntry = {
  fields: SectorsGridSectionFields;
};

export type SectorsGridSectionSkeleton = EntrySkeletonType & {
  contentTypeId: 'sectorsGridSection';
  fields: SectorsGridSectionFields;
};

export const SECTORS_GRID_SECTION_CONTENTFUL_NAME = 'SECCION - GRILLA SECTORES';

export function isSectorsGridSectionContentfulName(contentfulName?: string): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === SECTORS_GRID_SECTION_CONTENTFUL_NAME.toUpperCase() ||
    normalized.includes('GRILLA SECTORES')
  );
}
