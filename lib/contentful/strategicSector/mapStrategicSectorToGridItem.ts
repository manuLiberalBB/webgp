import { getAssetUrl } from '../getAssetUrl';
import type { StrategicSectorFields } from '../types/strategicSector';

import { resolveRelatedAreaLink } from './resolveRelatedAreaLink';
import { resolveStrategicSectorCompanies } from './resolveStrategicSectorCompanies';
import type { StrategicSectorGridItem } from './types';

export const STRATEGIC_SECTOR_CTA_LABEL = 'Conocer más';
export const STRATEGIC_SECTOR_PROJECTS_CTA_LABEL = 'Ver proyectos';
export const STRATEGIC_SECTOR_CONTRIBUTE_HEADING = 'Cómo contribuimos';

export function mapStrategicSectorToGridItem(
  id: string,
  fields: StrategicSectorFields,
): StrategicSectorGridItem | null {
  const imageUrl =
    getAssetUrl(fields.coverImage) ?? getAssetUrl(fields.image);

  if (!imageUrl || !fields.name) return null;

  const imageAlt =
    (typeof fields.coverImage?.fields.title === 'string'
      ? fields.coverImage.fields.title
      : undefined) ??
    (typeof fields.image?.fields.title === 'string'
      ? fields.image.fields.title
      : undefined) ??
    fields.name;

  const detailImageUrl =
    getAssetUrl(fields.image) ?? getAssetUrl(fields.coverImage);
  const detailImageAlt =
    (typeof fields.image?.fields.title === 'string'
      ? fields.image.fields.title
      : undefined) ??
    imageAlt;

  const projectsLink = resolveRelatedAreaLink(fields.relatedArea);

  return {
    id,
    title: fields.name,
    description: fields.cardDescription ?? fields.subtitle,
    imageUrl,
    imageAlt,
    linkLabel: STRATEGIC_SECTOR_CTA_LABEL,
    sectorSubtitle: fields.subtitle,
    body: fields.body,
    detailImageUrl,
    detailImageAlt,
    waysWeContribute: fields.listOfWaysWeContribute ?? [],
    projectsHref: projectsLink?.href,
    projectsExternal: projectsLink?.external,
    projectsLabel: STRATEGIC_SECTOR_PROJECTS_CTA_LABEL,
    relatedCompanies: resolveStrategicSectorCompanies(fields.companiesRelated),
  };
}
