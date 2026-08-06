type FoundationAreaTagStyle = {
  textColor: string;
  backgroundColor: string;
};

const FOUNDATION_AREA_TAG_STYLES = {
  educacion: {
    textColor: '#6D0F76',
    backgroundColor: '#FCF0FD',
  },
  culturales: {
    textColor: '#0F7612',
    backgroundColor: '#F0FCF0',
  },
  sociales: {
    textColor: '#763F0F',
    backgroundColor: '#FCF5F0',
  },
} satisfies Record<string, FoundationAreaTagStyle>;

function normalizeFoundationAreaLabel(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toUpperCase();
}

export function resolveFoundationAreaTagStyle(
  tag?: string,
  contentfulName?: string,
): FoundationAreaTagStyle {
  const normalized = normalizeFoundationAreaLabel(`${tag ?? ''} ${contentfulName ?? ''}`);

  if (normalized.includes('CULTUR')) {
    return FOUNDATION_AREA_TAG_STYLES.culturales;
  }

  if (normalized.includes('SOCIAL') || normalized.includes('COMUNIDAD')) {
    return FOUNDATION_AREA_TAG_STYLES.sociales;
  }

  if (normalized.includes('EDUCAC')) {
    return FOUNDATION_AREA_TAG_STYLES.educacion;
  }

  return FOUNDATION_AREA_TAG_STYLES.educacion;
}
