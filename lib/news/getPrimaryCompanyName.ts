import type { Entry } from 'contentful';

import type { CompanyFields } from '@/lib/contentful/types/company';

/** Resuelve el nombre de la primera empresa relacionada, si existe. */
export function getPrimaryCompanyName(
  companies: Entry[] | undefined,
): string | undefined {
  const first = companies?.[0];

  if (!first || !('fields' in first)) return undefined;

  const fields = first.fields as CompanyFields;
  return fields.name || undefined;
}
