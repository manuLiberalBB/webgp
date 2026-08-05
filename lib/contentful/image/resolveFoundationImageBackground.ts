const FOUNDATION_REGION_BACKGROUNDS = {
  entreRios: '#DA1E28',
  santaFe: '#00943A',
  santaCruz: '#0971CE',
  sanJuan: '#FEC526',
} as const;

function normalizeFoundationRegionLabel(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toUpperCase();
}

export function resolveFoundationAccentColor(
  contentfulName?: string,
  epigraph?: string,
): string {
  const normalized = normalizeFoundationRegionLabel(
    `${contentfulName ?? ''} ${epigraph ?? ''}`,
  );

  if (normalized.includes('ENTRE RIOS')) {
    return FOUNDATION_REGION_BACKGROUNDS.entreRios;
  }

  if (normalized.includes('SANTA CRUZ')) {
    return FOUNDATION_REGION_BACKGROUNDS.santaCruz;
  }

  if (normalized.includes('SANTA FE')) {
    return FOUNDATION_REGION_BACKGROUNDS.santaFe;
  }

  if (normalized.includes('SAN JUAN')) {
    return FOUNDATION_REGION_BACKGROUNDS.sanJuan;
  }

  return FOUNDATION_REGION_BACKGROUNDS.entreRios;
}
