import type { Asset, Entry, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

export const GRID_SECTION_CARD_STYLES = [
  'ImageOverlayCard',
  'FeatureCard',
  'IconCard',
] as const;

export type GridSectionCardStyle = (typeof GRID_SECTION_CARD_STYLES)[number];

export function isGridSectionCardStyle(
  value?: string,
): value is GridSectionCardStyle {
  if (!value) return false;

  return GRID_SECTION_CARD_STYLES.includes(value as GridSectionCardStyle);
}

export function resolveGridSectionCardStyle(
  value?: string,
): GridSectionCardStyle | undefined {
  const normalized = value?.trim();

  return isGridSectionCardStyle(normalized) ? normalized : undefined;
}

/**
 * Content type: `gridSection` (Bloque Cuadrícula)
 * @see display field: `contentfulName`
 */
export type GridSectionFields = {
  contentfulName: string;
  tag?: string;
  title?: string;
  subtitle?: string;
  icon?: Asset;
  body?: Document;
  items?: Entry[];
  urlList?: Entry[];
  image?: Asset;
  backgroundImage?: Asset;
  /** Estilo de cards cuando `items` contiene entries `card`. */
  cardStyle?: GridSectionCardStyle;
};

export type GridSectionEntry = {
  fields: GridSectionFields;
};

export type GridSectionSkeleton = EntrySkeletonType & {
  contentTypeId: 'gridSection';
  fields: GridSectionFields;
};

export const LOGO_GRID_SECTION_CONTENTFUL_NAME =
  'SECCION - EMPRESAS QUE TRANSFORMAN REGIONES';

export const COMPANY_LOGO_GRID_SECTION_CONTENTFUL_NAME =
  'SECCION - EMPRESAS QUE IMPULSAN EL DESARROLLO';

export const BUSINESS_ECOSYSTEM_SECTION_CONTENTFUL_NAME =
  'SECCION - NUESTRO ECOSISTEMA EMPRESARIAL';

export function isBusinessEcosystemSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === BUSINESS_ECOSYSTEM_SECTION_CONTENTFUL_NAME ||
    normalized.includes('ECOSISTEMA EMPRESARIAL')
  );
}

export function isLogoGridSectionContentfulName(contentfulName?: string): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === LOGO_GRID_SECTION_CONTENTFUL_NAME.toUpperCase() ||
    normalized === COMPANY_LOGO_GRID_SECTION_CONTENTFUL_NAME.toUpperCase() ||
    normalized.includes('EMPRESAS QUE IMPULSAN') ||
    normalized.includes('EMPRESAS QUE TRANSFORMAN')
  );
}

export const TALENT_CULTURE_SECTION_CONTENTFUL_NAME = 'SECCION - TALENTO Y CULTURA';

export function isTalentCultureSectionContentfulName(contentfulName?: string): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === TALENT_CULTURE_SECTION_CONTENTFUL_NAME.toUpperCase() ||
    normalized.includes('TALENTO Y CULTURA')
  );
}

export const HIRING_ROOM_CTA_SECTION_CONTENTFUL_NAME = 'SECCION - CTA HIRING ROOM';

export const HIRING_ROOM_CTA_LABEL = 'Ver búsquedas laborales';

export function isHiringRoomCtaSectionContentfulName(contentfulName?: string): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === HIRING_ROOM_CTA_SECTION_CONTENTFUL_NAME ||
    normalized.includes('CTA HIRING ROOM')
  );
}

export function isSectorCompaniesSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return normalized.includes('EMPRESAS QUE IMPULSAN');
}

export const COMMUNITY_COMMITMENT_SECTION_CONTENTFUL_NAME =
  'SECCION - NUESTRO COMPROMISO CON LA COMUNIDAD';

export function isCommunityCommitmentSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === COMMUNITY_COMMITMENT_SECTION_CONTENTFUL_NAME ||
    normalized.includes('COMPROMISO CON LA COMUNIDAD')
  );
}

export const IN_PERSON_DYNAMICS_SECTION_CONTENTFUL_NAME =
  'SECCION - ULTIMAS DINAMICAS PRESENCIALES';

export function isInPersonDynamicsSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === IN_PERSON_DYNAMICS_SECTION_CONTENTFUL_NAME ||
    normalized.includes('DINAMICAS PRESENCIALES')
  );
}

export const REGIONAL_ECONOMIES_COMMITMENT_SECTION_CONTENTFUL_NAME =
  'SECCION - COMPROMISO ECONOMIAS REGIONALES';

export const REGIONAL_DEVELOPMENT_COMMITMENT_SECTION_CONTENTFUL_NAME =
  'SECCION - NUESTRO COMPROMISO CON EL DESARROLLO REGIONAL';

export function isRegionalEconomiesCommitmentSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === REGIONAL_ECONOMIES_COMMITMENT_SECTION_CONTENTFUL_NAME ||
    normalized === REGIONAL_DEVELOPMENT_COMMITMENT_SECTION_CONTENTFUL_NAME ||
    (normalized.includes('COMPROMISO') && normalized.includes('ECONOMIA')) ||
    (normalized.includes('COMPROMISO') &&
      normalized.includes('DESARROLLO') &&
      normalized.includes('REGIONAL'))
  );
}

export const STRATEGIC_SECTORS_SECTION_CONTENTFUL_NAME =
  'SECCION - SECTORES ESTRATEGICOS';

export function isStrategicSectorsSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === STRATEGIC_SECTORS_SECTION_CONTENTFUL_NAME ||
    normalized.includes('SECTORES ESTRATEGICOS') ||
    normalized.includes('SECTORES ESTRATÉGICOS')
  );
}

export const GROUP_WIDE_COMMITMENT_SECTION_CONTENTFUL_NAME =
  'SECCION - UN COMPROMISO QUE ATRAVIESA TODO EL GRUPO';

export function isGroupWideCommitmentSectionContentfulName(
  contentfulName?: string,
  title?: string,
  tag?: string,
): boolean {
  const normalizedName = contentfulName?.trim().toUpperCase() ?? '';
  const normalizedTitle = title?.trim().toUpperCase() ?? '';
  const normalizedTag = tag?.trim().toUpperCase() ?? '';

  const matchesCommitmentAcrossGroup = (value: string) =>
    value.includes('ATRAVIESA') &&
    (value.includes('GRUPO') || value.includes('GRUP'));

  return (
    normalizedName === GROUP_WIDE_COMMITMENT_SECTION_CONTENTFUL_NAME ||
    matchesCommitmentAcrossGroup(normalizedName) ||
    matchesCommitmentAcrossGroup(normalizedTitle) ||
    matchesCommitmentAcrossGroup(normalizedTag)
  );
}

export const REGIONAL_PRESENCE_SECTION_CONTENTFUL_NAME =
  'SECCION - ESTAMOS PRESENTES EN EL DESARROLLO REGIONAL';

export const FUNDACIONES_GRUPO_PETERSEN_SECTION_CONTENTFUL_NAME =
  'SECCION - Fundaciones Grupo Petersen';

export const FUNDACIONES_AREAS_ACCION_SECTION_CONTENTFUL_NAME =
  'SECCION - Areas de acción de las fundaciones';

export const PROGRAMS_DEVELOPMENT_SECTION_CONTENTFUL_NAME =
  'SECCION - PROGRAMAS QUE IMPULSAN EL DESARROLLO';

export function isProgramsDevelopmentSectionContentfulName(
  contentfulName?: string,
  title?: string,
): boolean {
  const normalizedName = contentfulName?.trim().toUpperCase() ?? '';
  const normalizedTitle = title?.trim().toUpperCase() ?? '';

  return (
    normalizedName === PROGRAMS_DEVELOPMENT_SECTION_CONTENTFUL_NAME ||
    (normalizedName.includes('PROGRAMAS') &&
      normalizedName.includes('IMPULSAN') &&
      normalizedName.includes('DESARROLLO')) ||
    normalizedTitle.includes('PROGRAMAS QUE IMPULSAN EL DESARROLLO')
  );
}

export function isI3InnovationSectionContentfulName(
  contentfulName?: string,
  title?: string,
): boolean {
  const normalizedName = contentfulName?.trim().toUpperCase() ?? '';
  const normalizedTitle = title?.trim().toUpperCase() ?? '';

  return (
    (normalizedName.includes('I3') &&
      normalizedName.includes('INNOVACI') &&
      normalizedName.includes('DESARROLLO')) ||
    normalizedTitle.includes('I3 - INNOVACI')
  );
}

export function isI3ConversationsSectionContentfulName(contentfulName?: string): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized.includes('I3') &&
    normalized.includes('CICLO') &&
    normalized.includes('CONVERSACION')
  );
}

export function isFundacionesGrupoPetersenSectionContentfulName(
  contentfulName?: string,
  title?: string,
): boolean {
  const normalizedName = contentfulName?.trim().toUpperCase() ?? '';
  const normalizedTitle = title?.trim().toUpperCase() ?? '';

  return (
    normalizedName === FUNDACIONES_GRUPO_PETERSEN_SECTION_CONTENTFUL_NAME.toUpperCase() ||
    (normalizedName.includes('FUNDACIONES') &&
      normalizedName.includes('GRUPO PETERSEN') &&
      !normalizedName.includes('CTA')) ||
    (normalizedTitle.includes('FUNDACIONES GRUPO PETERSEN') &&
      !normalizedName.includes('CTA'))
  );
}

export function isFundacionesCtaSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized.includes('CTA') &&
    normalized.includes('FUNDACION') &&
    !normalized.includes('GRUPO PETERSEN')
  );
}

export function isRegionalPresenceSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === REGIONAL_PRESENCE_SECTION_CONTENTFUL_NAME ||
    (normalized.includes('ESTAMOS PRESENTES') &&
      normalized.includes('DESARROLLO') &&
      normalized.includes('REGIONAL'))
  );
}

export const COMO_GENERAMOS_IMPACTO_SECTION_CONTENTFUL_NAME =
  'SECCION - Como generamos impacto';

function normalizeSectionLabel(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').trim().toUpperCase();
}

export function isComoGeneramosImpactoSectionContentfulName(
  contentfulName?: string,
  title?: string,
): boolean {
  const labels = [contentfulName, title].filter(
    (value): value is string => Boolean(value?.trim()),
  );

  return labels.some((label) =>
    normalizeSectionLabel(label).includes('GENERAMOS IMPACTO'),
  );
}

export function isFundacionesAreasAccionSectionContentfulName(
  contentfulName?: string,
  title?: string,
): boolean {
  const labels = [contentfulName, title].filter(
    (value): value is string => Boolean(value?.trim()),
  );

  return labels.some((label) => {
    const normalized = normalizeSectionLabel(label);

    return (
      normalized ===
        normalizeSectionLabel(FUNDACIONES_AREAS_ACCION_SECTION_CONTENTFUL_NAME) ||
      (normalized.includes('AREAS DE ACCION') && normalized.includes('FUNDACION'))
    );
  });
}

export const BANKING_CONNECT_SECTION_CONTENTFUL_NAME =
  'SECCION - La banca que conecta personas, empresas y comunidades';

export function isBankingConnectSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === BANKING_CONNECT_SECTION_CONTENTFUL_NAME.toUpperCase() ||
    normalized.includes('LA BANCA QUE CONECTA')
  );
}

export const BANKING_SUSTAINABILITY_SECTION_CONTENTFUL_NAME =
  'SECCION - IMPULSAMOS UNA MIRADA SOSTENTIBLE DEL NEGOCIO';

export function isBankingSustainabilitySectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === BANKING_SUSTAINABILITY_SECTION_CONTENTFUL_NAME ||
    normalized.includes('MIRADA SOSTENIBLE') ||
    normalized.includes('MIRADA SOSTENTIBLE')
  );
}

export const RESOURCE_CENTER_SECTION_CONTENTFUL_NAME = 'SECCION - CENTRO DE RECURSOS';

export function isResourceCenterSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === RESOURCE_CENTER_SECTION_CONTENTFUL_NAME ||
    normalized.includes('CENTRO DE RECURSOS')
  );
}

export const NEWS_DETAIL_MORE_ABOUT_GROUP_SECTION_CONTENTFUL_NAME =
  'SECCION - VISTA NOTICIA - MAS SOBRE EL GRUPO';

export function isNewsDetailMoreAboutGroupSectionContentfulName(
  contentfulName?: string,
): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === NEWS_DETAIL_MORE_ABOUT_GROUP_SECTION_CONTENTFUL_NAME.toUpperCase() ||
    (normalized.includes('VISTA NOTICIA') && normalized.includes('MAS SOBRE EL GRUPO'))
  );
}
