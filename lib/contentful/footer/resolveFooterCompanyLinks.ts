import type { Entry } from 'contentful';

import type { FooterLinkItem } from '@/lib/footer/types';

import { resolveCompanyWebsiteUrl } from '../company/resolveCompanyWebsite';
import type { CompanyFields } from '../types/company';

export function resolveFooterCompanyLinks(companies?: Entry[]): FooterLinkItem[] {
  if (!companies?.length) return [];

  return companies.flatMap((entry) => {
    const fields = entry.fields as CompanyFields;
    if (!fields?.name) return [];

    const href = resolveCompanyWebsiteUrl(fields.webSiteURL);

    return [
      {
        id: entry.sys.id,
        label: fields.name,
        ...(href ? { href, external: true as const } : {}),
      },
    ];
  });
}
