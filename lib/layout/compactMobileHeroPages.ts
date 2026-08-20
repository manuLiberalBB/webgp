import { isSectorPage } from '@/lib/contentful/sector/isSectorPage';

const COMPACT_MOBILE_HERO_PAGES = new Set([
  'quienes-somos',
  'economias-regionales',
  'nuestro-impacto',
  'trabaja-en-gp',
]);

export function isCompactMobileHeroPage(pagePath?: string[]): boolean {
  if (isSectorPage(pagePath)) return true;

  return pagePath?.length === 1 && COMPACT_MOBILE_HERO_PAGES.has(pagePath[0]);
}

export const COMPACT_MOBILE_HERO_SECTION_CLASS =
  'min-h-[22rem] justify-center pt-12 pb-10 short-landscape:min-h-0 short-landscape:py-8 layout-md:min-h-0 layout-md:justify-center layout-md:pt-[6.25rem] layout-md:pb-20';
