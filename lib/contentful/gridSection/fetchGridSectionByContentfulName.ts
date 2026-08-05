import { getContentfulClient } from '../client';
import { CONTENTFUL_INCLUDE } from '../includeDepth';
import type { GridSectionFields, GridSectionSkeleton } from '../types/gridSection';

export async function fetchGridSectionByContentfulName(
  contentfulName: string,
): Promise<GridSectionFields | null> {
  const client = getContentfulClient();

  const entries = await client.getEntries<GridSectionSkeleton>({
    content_type: 'gridSection',
    include: CONTENTFUL_INCLUDE.gridSection,    'fields.contentfulName': contentfulName,
    limit: 1,
  });

  if (entries.items.length === 0) return null;

  return entries.items[0].fields as GridSectionFields;
}
