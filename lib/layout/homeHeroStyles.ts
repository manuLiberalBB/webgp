import { FEATURED_NEWS_HERO_MIN_HEIGHT_CLASS } from '@/lib/news/featuredNewsHeroStyles';

export const HOME_HERO_HEIGHT_CLASS = FEATURED_NEWS_HERO_MIN_HEIGHT_CLASS;

export const HOME_HERO_OVERLAY_GRADIENT =
  'linear-gradient(51.844deg, rgba(0, 0, 0, 0.80) 24.907%, rgba(0, 0, 0, 0.50) 52.193%, rgba(0, 0, 0, 0.00) 79.479%)';

export const HOME_HERO_WRAPPER_CLASS =
  `relative flex h-full w-full flex-col overflow-hidden ${HOME_HERO_HEIGHT_CLASS}`;

export const HOME_HERO_LOGO_WRAPPER_CLASS =
  'relative h-[52px] w-[160px] shrink-0 md:h-[64px] md:w-[200px]';

export const HOME_HERO_LOGO_IMAGE_CLASS =
  'object-contain object-left brightness-0 invert';

export const HOME_HERO_CONTENT_CLASS =
  'relative z-10 flex h-full w-full flex-col justify-end px-6 pb-12 pt-10 md:justify-start md:px-0 md:pb-[60px] md:pl-layout-x md:pr-[60px] md:pt-[120px]';

export const HOME_HERO_INNER_CLASS =
  'flex w-full max-w-[900px] flex-col items-start gap-5 md:gap-8';

export const HOME_HERO_TITLE_CLASS =
  'w-full text-[34px] leading-[1.2] font-normal text-white md:text-[54px] md:leading-[75px]';

export const HOME_HERO_SUBTITLE_CLASS =
  'w-full max-w-[900px] text-[20px] leading-normal text-[#e5e7eb] md:text-[24px] md:leading-[1.35]';
