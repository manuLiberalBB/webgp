import { getContentfulClient } from '../client';
import type { SectorSkeleton } from '../types/sector';

import { mapSectorEntryToCompanyCards } from './resolveSectorCompanies';
import type { SectorCompanyCardItem } from './types';

export async function fetchSectorCompanies(
  sectorId: string,
): Promise<SectorCompanyCardItem[]> {
  const client = getContentfulClient();

  const entry = await client.getEntry<SectorSkeleton>(sectorId, {
    include: 3,
  });

  return mapSectorEntryToCompanyCards(entry);
}
