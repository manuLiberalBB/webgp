import {
  isFundacionesGrupoPetersenSectionContentfulName,
  isI3InnovationSectionContentfulName,
  isProgramsDevelopmentSectionContentfulName,
} from '@/lib/contentful/types/gridSection';

type ResolveGridSectionAnchorIdParams = {
  contentfulName?: string;
  tag?: string;
  title?: string;
};

export function resolveGridSectionAnchorId({
  contentfulName,
  tag,
  title,
}: ResolveGridSectionAnchorIdParams): string | undefined {
  if (isFundacionesGrupoPetersenSectionContentfulName(contentfulName, title)) {
    return 'educacion-y-comunidades';
  }

  if (isProgramsDevelopmentSectionContentfulName(contentfulName, title)) {
    return 'nuestras-iniciativas';
  }

  if (isI3InnovationSectionContentfulName(contentfulName, title)) {
    return 'innovacion';
  }

  const normalizedTag = tag?.trim().toUpperCase() ?? '';

  if (normalizedTag.includes('EDUCACION') && normalizedTag.includes('COMUNIDAD')) {
    return 'educacion-y-comunidades';
  }

  if (normalizedTag.includes('NUESTRAS INICIATIVAS')) {
    return 'nuestras-iniciativas';
  }

  if (normalizedTag.includes('INNOVACI')) {
    return 'innovacion';
  }

  return undefined;
}
