import type { NewsCategory } from '@/lib/contentful/types/news';
import {
  GRID_SECTION_VARIANTS,
  normalizeSectionVariant,
} from '@/lib/contentful/gridSection/sectionVariants';
import type { GridSectionFields } from '@/lib/contentful/types/gridSection';

export type PageYouMayAlsoLikeConfig = {
  title: string;
  categories?: NewsCategory[];
};

const PAGE_YOU_MAY_ALSO_LIKE_CONFIG: Record<string, PageYouMayAlsoLikeConfig> = {
  'quienes-somos': {
    title: 'También puede interesarte',
  },
  'economias-regionales': {
    title: 'Noticias relacionadas',
    categories: ['Desarrollo regional'],
  },
  'nuestro-impacto': {
    title: 'También puede interesarte',
    categories: ['Educación', 'Innovación', 'Comunidad'],
  },
};

export function getPageYouMayAlsoLikeConfig(
  pagePath?: string[],
): PageYouMayAlsoLikeConfig | null {
  const pageSlug = pagePath?.[0];
  if (!pageSlug) return null;

  return PAGE_YOU_MAY_ALSO_LIKE_CONFIG[pageSlug] ?? null;
}

export function shouldSkipCmsYouMayAlsoLikeGridSection(
  fields: GridSectionFields,
): boolean {
  return (
    normalizeSectionVariant(fields.sectionVariant) ===
    GRID_SECTION_VARIANTS.YOU_MAY_ALSO_LIKE
  );
}
