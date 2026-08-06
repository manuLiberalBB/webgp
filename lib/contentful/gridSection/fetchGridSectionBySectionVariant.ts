import { getContentfulClient } from '../client';
import { CONTENTFUL_INCLUDE } from '../includeDepth';
import type { GridSectionVariant } from './sectionVariants';
import type { GridSectionFields, GridSectionSkeleton } from '../types/gridSection';

export async function fetchGridSectionBySectionVariant(
  sectionVariant: GridSectionVariant,
): Promise<GridSectionFields | null> {
  const client = getContentfulClient();

  const entries = await client.getEntries<GridSectionSkeleton>({
    content_type: 'gridSection',
    include: CONTENTFUL_INCLUDE.gridSection,
    'fields.sectionVariant': sectionVariant,
    limit: 1,
  });

  if (entries.items.length === 0) return null;

  return entries.items[0].fields as GridSectionFields;
}
