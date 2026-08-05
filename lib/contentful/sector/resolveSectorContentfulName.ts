import { getSectorSlug } from './isSectorPage';

const SECTOR_TEST_CONTENTFUL_NAME = 'SECTOR - TEST';

function slugToSectorContentfulName(slug: string): string {
  const normalized = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return `SECTOR - ${normalized}`;
}

/**
 * Resuelve el `contentfulName` del sector a partir del path de la página.
 * Ej: `/sectores/mineria` → `SECTOR - Mineria`
 */
export function resolveSectorContentfulName(pagePath?: string[]): string {
  const slug = getSectorSlug(pagePath);
  if (!slug) return SECTOR_TEST_CONTENTFUL_NAME;

  return slugToSectorContentfulName(slug);
}
