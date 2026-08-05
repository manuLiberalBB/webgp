import type { Entry } from 'contentful';

import { resolveNavLink } from '../resolveNavLink';
import type { SectorFields } from '../types/sector';

function normalizeSectorSlug(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

export function resolveSectorPagePath(fields: SectorFields): string | undefined {
  if (fields.cta) {
    const link = resolveNavLink(fields.cta as Entry);
    if (link?.href && !link.isExternal) return link.href;
  }

  const source =
    fields.contentfulName.replace(/^SECTOR\s*-\s*/i, '').trim() || fields.name;

  const slug = normalizeSectorSlug(source);
  return slug ? `/sectores/${slug}` : undefined;
}
