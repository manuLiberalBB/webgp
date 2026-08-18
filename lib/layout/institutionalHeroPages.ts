const INSTITUTIONAL_HERO_PAGES = new Set(['quienes-somos', 'que-hacemos']);

/** Overlay del hero en páginas institucionales (Quiénes somos, Qué hacemos). */
export const INSTITUTIONAL_HERO_OVERLAY_GRADIENT =
  'linear-gradient(5deg, rgba(0, 0, 0, 0.70) 41.78%, rgba(0, 0, 0, 0.25) 55.81%)';

export const INSTITUTIONAL_HERO_EYEBROW_CLASS =
  'rounded bg-white/70 px-3 py-2 text-sm leading-5 font-semibold tracking-[0.35px] text-[#0b2d4e] uppercase';

export function isInstitutionalHeroPage(pagePath?: string[]): boolean {
  return pagePath?.length === 1 && INSTITUTIONAL_HERO_PAGES.has(pagePath[0]);
}

export function isQueHacemosHeroPage(pagePath?: string[]): boolean {
  return pagePath?.length === 1 && pagePath[0] === 'que-hacemos';
}
