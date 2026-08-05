export function isSectorPage(pagePath?: string[]): boolean {
  return pagePath?.[0] === 'sectores' && (pagePath?.length ?? 0) >= 2;
}

export function getSectorSlug(pagePath?: string[]): string | undefined {
  if (!isSectorPage(pagePath)) return undefined;
  return pagePath?.[1];
}

export function isBankingSectorPage(pagePath?: string[]): boolean {
  return getSectorSlug(pagePath) === 'banca';
}
