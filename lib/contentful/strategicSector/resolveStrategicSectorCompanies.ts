import type { Entry } from 'contentful';

import { mapCompanyToSectorCard } from '../sector/mapSectorCompanyCard';
import type { SectorCompanyCardItem } from '../sector/types';
import type { CompanyFields } from '../types/company';

export function resolveStrategicSectorCompanies(
  items?: Entry[],
): SectorCompanyCardItem[] {
  return (
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'company')
      .map((item) =>
        mapCompanyToSectorCard(item.sys.id, item.fields as CompanyFields),
      )
      .filter((item): item is SectorCompanyCardItem => item !== null) ?? []
  );
}
