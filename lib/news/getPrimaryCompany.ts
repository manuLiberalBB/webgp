import type { Entry } from 'contentful';

import { resolveCompanyWebsiteLink } from '@/lib/contentful/company/resolveCompanyWebsite';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { CompanyFields } from '@/lib/contentful/types/company';

import type { NewsCompanyInfo } from './types';

/** Resuelve la primera empresa relacionada con datos para el sidebar. */
export function getPrimaryCompany(
  companies: Entry[] | undefined,
): NewsCompanyInfo | undefined {
  const first = companies?.[0];

  if (!first || !('fields' in first)) return undefined;

  const fields = first.fields as CompanyFields;
  const imageUrl = getAssetUrl(fields.image) ?? getAssetUrl(fields.logo);
  if (!imageUrl) return undefined;

  const website = fields.webSiteURL
    ? resolveCompanyWebsiteLink(fields.webSiteURL)
    : undefined;

  return {
    id: first.sys.id,
    name: fields.name,
    description: fields.description,
    imageUrl,
    imageAlt: fields.name,
    websiteUrl: website?.href,
    websiteLabel: 'Conocer más',
  };
}
