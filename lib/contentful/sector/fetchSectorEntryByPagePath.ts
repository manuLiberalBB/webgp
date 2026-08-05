import type { Entry } from 'contentful';

import { getContentfulClient } from '../client';
import { resolveNavLink } from '../resolveNavLink';
import type { SectorFields, SectorSkeleton } from '../types/sector';

import { isSectorPage } from './isSectorPage';
import { resolveSectorContentfulName } from './resolveSectorContentfulName';

function toSectorPagePath(pagePath: string[]): string {
  return `/${pagePath.join('/')}`;
}

function normalizeSectorSlug(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

async function findSectorEntryByPath(path: string): Promise<Entry<SectorSkeleton> | null> {
  const client = getContentfulClient();
  const normalizedPathSlug = normalizeSectorSlug(path.replace(/^\/sectores\//, ''));

  const byCta = await client.getEntries<SectorSkeleton>({
    content_type: 'sector',
    include: 3,
    'fields.cta.fields.link': path,
    'fields.cta.sys.contentType.sys.id': 'link',
    limit: 1,
  });

  if (byCta.items.length > 0) return byCta.items[0];

  const sectors = await client.getEntries<SectorSkeleton>({
    content_type: 'sector',
    include: 3,
    limit: 100,
  });

  const byLink = sectors.items.find((entry) => {
    const cta = entry.fields.cta;
    if (!cta || typeof cta !== 'object' || !('sys' in cta)) return false;

    return resolveNavLink(cta as Entry)?.href === path;
  });

  if (byLink) return byLink;

  return (
    sectors.items.find((entry) => {
      const fields = entry.fields as SectorFields;
      const nameSlug = normalizeSectorSlug(fields.name ?? '').replace(/\s+/g, '-');
      const contentfulSlug = normalizeSectorSlug(
        fields.contentfulName.replace(/^SECTOR\s*-\s*/i, ''),
      ).replace(/\s+/g, '-');

      return nameSlug === normalizedPathSlug || contentfulSlug === normalizedPathSlug;
    }) ?? null
  );
}

export async function fetchSectorEntryByPagePath(
  pagePath?: string[],
): Promise<Entry<SectorSkeleton> | null> {
  if (!isSectorPage(pagePath)) return null;

  const path = toSectorPagePath(pagePath!);
  const entry = await findSectorEntryByPath(path);

  if (entry) return entry;

  const client = getContentfulClient();
  const fallback = await client.getEntries<SectorSkeleton>({
    content_type: 'sector',
    include: 3,
    'fields.contentfulName': resolveSectorContentfulName(pagePath),
    limit: 1,
  });

  if (fallback.items.length === 0) return null;

  return fallback.items[0];
}
