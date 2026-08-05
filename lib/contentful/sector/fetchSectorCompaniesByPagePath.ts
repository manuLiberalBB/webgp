import { fetchSectorEntryByPagePath } from './fetchSectorEntryByPagePath';
import { mapSectorEntryToCompanyCards } from './resolveSectorCompanies';
import type { SectorCompanyCardItem } from './types';

import type { SectorCompaniesLayout } from './resolveSectorCompaniesFromItems';

type FetchSectorCompaniesOptions = {
  layout?: SectorCompaniesLayout;
};

export async function fetchSectorCompaniesByPagePath(
  pagePath?: string[],
  options: FetchSectorCompaniesOptions = {},
): Promise<SectorCompanyCardItem[]> {
  const entry = await fetchSectorEntryByPagePath(pagePath);
  if (!entry) return [];

  return mapSectorEntryToCompanyCards(entry, options);
}
