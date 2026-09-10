export const FINANCIAL_SERVICES_SECTOR_SLUG = 'servicios-financieros';

/** Slug legacy del sector antes del rename a Servicios Financieros. */
export const LEGACY_FINANCIAL_SERVICES_SECTOR_SLUG = 'banca';

export function isSectorPage(pagePath?: string[]): boolean {
  return pagePath?.[0] === 'sectores' && (pagePath?.length ?? 0) >= 2;
}

export function getSectorSlug(pagePath?: string[]): string | undefined {
  if (!isSectorPage(pagePath)) return undefined;
  return pagePath?.[1];
}

export function isFinancialServicesSectorPage(pagePath?: string[]): boolean {
  const slug = getSectorSlug(pagePath);
  return (
    slug === FINANCIAL_SERVICES_SECTOR_SLUG ||
    slug === LEGACY_FINANCIAL_SERVICES_SECTOR_SLUG
  );
}

/** @deprecated Use `isFinancialServicesSectorPage` */
export const isBankingSectorPage = isFinancialServicesSectorPage;

export function resolveSectorHeroSubtitle(
  pagePath: string[] | undefined,
  subtitle: string | undefined,
): string | undefined {
  if (!subtitle) return undefined;
  if (isSectorPage(pagePath) && !isFinancialServicesSectorPage(pagePath)) {
    return undefined;
  }
  return subtitle;
}
