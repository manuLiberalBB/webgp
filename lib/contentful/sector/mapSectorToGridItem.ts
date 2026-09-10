import type { Entry } from 'contentful';

import { getAssetUrl } from '../getAssetUrl';
import { resolveNavLink } from '../resolveNavLink';
import type { SectorFields } from '../types/sector';

import { resolveSectorPagePath } from './resolveSectorPagePath';
import type { SectorsGridItem } from './types';

export const SECTOR_GRID_CTA_LABEL = 'Ver más';

export function mapSectorToGridItem(
  id: string,
  fields: SectorFields,
): SectorsGridItem | null {
  const imageUrl = getAssetUrl(fields.image);
  const iconUrl = fields.icon ? getAssetUrl(fields.icon) : undefined;

  if (!imageUrl || !fields.description || !fields.name) return null;

  const imageAlt =
    (typeof fields.image?.fields.title === 'string'
      ? fields.image.fields.title
      : undefined) ?? fields.name;
  const iconAlt = iconUrl
    ? ((typeof fields.icon?.fields.title === 'string'
        ? fields.icon.fields.title
        : undefined) ?? fields.name)
    : undefined;
  const cta = fields.cta ? resolveNavLink(fields.cta as Entry) : null;
  const href = resolveSectorPagePath(fields);

  return {
    id,
    contentfulName: fields.contentfulName,
    title: fields.name,
    description: fields.description,
    imageUrl,
    imageAlt,
    iconUrl,
    iconAlt,
    href,
    linkLabel: href ? SECTOR_GRID_CTA_LABEL : undefined,
    external: cta?.isExternal,
  };
}
