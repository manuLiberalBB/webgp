import type { Entry } from 'contentful';

import { getAssetUrl } from '../getAssetUrl';
import { resolveNavLink } from '../resolveNavLink';
import type { CompanyFields } from '../types/company';
import type { SectorFields } from '../types/sector';

import type { NewsDetailMoreAboutGroupCardItem } from './newsDetailMoreAboutGroupTypes';

function resolveSectorCta(sector?: Entry) {
  if (!sector?.fields || sector.sys.contentType?.sys.id !== 'sector') {
    return null;
  }

  const fields = sector.fields as SectorFields;
  if (!fields.cta) return null;

  return resolveNavLink(fields.cta as Entry);
}

export function mapCompanyToNewsDetailMoreAboutGroupCard(
  id: string,
  fields: CompanyFields,
): NewsDetailMoreAboutGroupCardItem | null {
  const title = fields.name?.trim();
  const description = fields.description?.trim();
  const link = resolveSectorCta(fields.sector);

  if (!title || !description || !getAssetUrl(fields.image) || !link) {
    return null;
  }

  return {
    id,
    title,
    description,
    image: fields.image,
    link,
  };
}
