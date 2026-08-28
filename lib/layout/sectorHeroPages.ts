import { isSectorPage } from '@/lib/contentful/sector/isSectorPage';

/** Overlay del hero de sectores (Figma node 1557:3353). */
export const SECTOR_HERO_OVERLAY_GRADIENT =
  'linear-gradient(1.911deg, rgba(0, 0, 0, 0.70) 41.78%, rgba(0, 0, 0, 0.25) 55.81%)';

export const SECTOR_HERO_OVERLAY_SIDE_GRADIENT =
  'linear-gradient(90deg, rgba(0, 0, 0, 0.70) 26.92%, rgba(38, 38, 38, 0.53) 70.67%, rgba(102, 102, 102, 0.25) 100%)';

/** Desktop: 448px de alto, py 80px. Mobile: altura compacta proporcional. */
export const SECTOR_HERO_SECTION_CLASS =
  'min-h-[22rem] justify-center py-12 md:min-h-[28rem] md:py-20';

export const SECTOR_HERO_TITLE_CLASS =
  'text-[2.25rem] font-semibold leading-[1.2] tracking-[-0.04em] md:text-[3.375rem] md:leading-[4.104rem] md:tracking-[-1.52px]';

export function isSectorHeroPage(pagePath?: string[]): boolean {
  return isSectorPage(pagePath);
}
