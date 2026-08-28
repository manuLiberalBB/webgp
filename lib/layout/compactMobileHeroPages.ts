const COMPACT_MOBILE_HERO_PAGES = new Set([
  'quienes-somos',
  'economias-regionales',
  'nuestro-impacto',
  'trabaja-en-gp',
]);

export function isCompactMobileHeroPage(pagePath?: string[]): boolean {
  return pagePath?.length === 1 && COMPACT_MOBILE_HERO_PAGES.has(pagePath[0]);
}

export const COMPACT_MOBILE_HERO_SECTION_CLASS =
  'min-h-[22rem] justify-center pt-12 pb-10 md:min-h-0 md:justify-center md:pt-[6.25rem] md:pb-20';
