import type { Entry } from 'contentful';

import type { CompanyFields } from '../types/company';
import type { SectorFields } from '../types/sector';

import {
  mapCompanyToSectorBankingCard,
  mapCompanyToSectorCard,
  mapCompanyToSectorFeatureItem,
} from './mapSectorCompanyCard';
import type { SectorCompanyCardItem } from './types';
import type { SectorCompaniesLayout } from './resolveSectorCompaniesFromItems';

type MapSectorCompaniesOptions = {
  layout?: SectorCompaniesLayout;
};

function isResolvedSectorEntry(entry: Entry): entry is Entry & { fields: SectorFields } {
  return (
    entry.sys.contentType?.sys.id === 'sector' &&
    Array.isArray((entry.fields as SectorFields).companies)
  );
}

function resolveCompanyFields(entry: Entry): CompanyFields | null {
  if (entry.sys.contentType?.sys.id !== 'company') return null;
  if (!entry.fields || typeof entry.fields !== 'object') return null;
  return entry.fields as CompanyFields;
}

export function mapSectorEntryToCompanyCards(
  sector: Entry,
  options: MapSectorCompaniesOptions = {},
): SectorCompanyCardItem[] {
  if (!isResolvedSectorEntry(sector)) return [];

  const mapCompany =
    options.layout === 'banking'
      ? mapCompanyToSectorBankingCard
      : options.layout === 'cards'
        ? mapCompanyToSectorCard
        : mapCompanyToSectorFeatureItem;

  return sector.fields.companies
    .map((company) => {
      const fields = resolveCompanyFields(company);
      if (!fields) return null;
      return mapCompany(company.sys.id, fields);
    })
    .filter((item): item is SectorCompanyCardItem => item !== null);
}
