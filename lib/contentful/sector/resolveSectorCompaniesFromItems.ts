import type { Entry } from 'contentful';

import type { CompanyFields } from '../types/company';

import {
  mapCompanyToSectorBankingCard,
  mapCompanyToSectorCard,
  mapCompanyToSectorFeatureItem,
} from './mapSectorCompanyCard';
import type { SectorCompanyCardItem } from './types';

export type SectorCompaniesLayout = 'feature' | 'cards' | 'banking';

type ResolveSectorCompaniesFromItemsOptions = {
  layout?: SectorCompaniesLayout;
};

export function resolveSectorCompaniesFromItems(
  items?: Entry[],
  options: ResolveSectorCompaniesFromItemsOptions = {},
): SectorCompanyCardItem[] {
  const layout = options.layout ?? 'feature';
  const mapCompany =
    layout === 'banking'
      ? mapCompanyToSectorBankingCard
      : layout === 'cards'
        ? mapCompanyToSectorCard
        : mapCompanyToSectorFeatureItem;

  return (items ?? [])
    .filter((item) => item.sys.contentType?.sys.id === 'company')
    .map((item) => mapCompany(item.sys.id, item.fields as CompanyFields))
    .filter((item): item is SectorCompanyCardItem => item !== null);
}
