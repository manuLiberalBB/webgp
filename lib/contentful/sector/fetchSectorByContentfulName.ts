import { getContentfulClient } from '../client';
import type { SectorSkeleton } from '../types/sector';

import { mapSectorEntryToCompanyCards } from './resolveSectorCompanies';
import type { SectorCompanyCardItem } from './types';

export async function fetchSectorByContentfulName(
  contentfulName: string,
): Promise<SectorCompanyCardItem[]> {
  const client = getContentfulClient();

  const entries = await client.getEntries<SectorSkeleton>({
    content_type: 'sector',
    include: 3,
    'fields.contentfulName': contentfulName,
    limit: 1,
  });

  if (entries.items.length === 0) return [];

  return mapSectorEntryToCompanyCards(entries.items[0]);
}
