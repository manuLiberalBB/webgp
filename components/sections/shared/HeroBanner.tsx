import {
  AppImage as Image,
  HeroImage,
} from '@/components/cms/AppImage';
import { Button } from '@/components/ui/Button';
import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import { HERO_BOTTOM_PADDING } from '@/lib/layout/sectionPadding';
import {
  HOME_HERO_CONTENT_CLASS,
  HOME_HERO_INNER_CLASS,
  HOME_HERO_LOGO_IMAGE_CLASS,
  HOME_HERO_LOGO_WRAPPER_CLASS,
  HOME_HERO_OVERLAY_GRADIENT,
  HOME_HERO_SUBTITLE_CLASS,
  HOME_HERO_TITLE_CLASS,
  HOME_HERO_WRAPPER_CLASS,
} from '@/lib/layout/homeHeroStyles';
import { renderTextWithBoldMarkers } from '@/lib/ui/renderTextWithBoldMarkers';
import { COMPACT_MOBILE_HERO_SECTION_CLASS } from '@/lib/layout/compactMobileHeroPages';
import {
  COMPACT_LANDING_HERO_OVERLAY,
  isCompactLandingHeroPage,
} from '@/lib/layout/compactLandingHeroPages';
import {
  INSTITUTIONAL_HERO_EYEBROW_CLASS,
  INSTITUTIONAL_HERO_OVERLAY_GRADIENT,
  isInstitutionalHeroPage,
  isQueHacemosHeroPage,
} from '@/lib/layout/institutionalHeroPages';
import {
  isSectorHeroPage,
  SECTOR_HERO_OVERLAY_GRADIENT,
  SECTOR_HERO_OVERLAY_SIDE_GRADIENT,
  SECTOR_HERO_SECTION_CLASS,
  SECTOR_HERO_TITLE_CLASS,
} from '@/lib/layout/sectorHeroPages';
import { cn } from '@/lib/utils';

import type { Entry } from 'contentful';

import { Badge } from '@/components/ui/Badge';

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h9M9 5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type HeroBannerProps = {
  tag?: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  logoUrl?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  urlList?: Entry[];
  id?: string;
  pagePath?: string[];
  className?: string;
  compactMobile?: boolean;
  priority?: boolean;
  embedded?: boolean;
  homeHeroStyle?: boolean;
};

export function HeroBanner({
  tag,
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  logoUrl,
  logoAlt = '',
  logoWidth,
  logoHeight,
  urlList,
  id,
  pagePath,
  className,
  compactMobile = false,
  priority = true,
  embedded = false,
  homeHeroStyle = false,
}: HeroBannerProps) {
  const isInstitutionalHero = isInstitutionalHeroPage(pagePath);
  const isCompactLandingHero = isCompactLandingHeroPage(pagePath);
  const isSectorHero = isSectorHeroPage(pagePath);
  const useHomeHeroStyle = embedded && homeHeroStyle;
  const homeHeroCtaLink = useHomeHeroStyle
    ? urlList?.map(resolveNavLink).find(Boolean)
    : undefined;
  const Wrapper = embedded ? 'div' : 'section';

  return (
    <Wrapper
      id={id}
      className={cn(
        useHomeHeroStyle
          ? HOME_HERO_WRAPPER_CLASS
          : cn(
              'relative flex w-full max-w-full flex-col overflow-hidden px-6 md:px-layout-x',
              isSectorHero
                ? SECTOR_HERO_SECTION_CLASS
                : embedded
                  ? 'min-h-0 justify-center pb-12 pt-10 md:pb-16 md:pt-14'
                  : compactMobile
                    ? COMPACT_MOBILE_HERO_SECTION_CLASS
                    : cn(
                        'min-h-hero justify-center pt-10 md:pt-12',
                        HERO_BOTTOM_PADDING,
                      ),
            ),
        !useHomeHeroStyle && id && 'scroll-mt-20',
        className,
      )}
    >
      <HeroImage
        src={imageUrl}
        alt={imageAlt}
        fill
        priority={priority}
        className={cn('object-cover', isQueHacemosHeroPage(pagePath) && 'object-top')}
      />

      <div
        aria-hidden
        className={cn(
          'absolute inset-0',
          !useHomeHeroStyle &&
            !isInstitutionalHero &&
            !isCompactLandingHero &&
            !isSectorHero &&
            'bg-gradient-to-t from-black/80 from-[39.421%] to-black/25',
        )}
        style={
          useHomeHeroStyle
            ? { background: HOME_HERO_OVERLAY_GRADIENT }
            : isInstitutionalHero
              ? { background: INSTITUTIONAL_HERO_OVERLAY_GRADIENT }
              : isSectorHero
                ? {
                    background: `${SECTOR_HERO_OVERLAY_SIDE_GRADIENT}, ${SECTOR_HERO_OVERLAY_GRADIENT}`,
                  }
                : isCompactLandingHero
                  ? { background: COMPACT_LANDING_HERO_OVERLAY }
                  : undefined
        }
      />

      <div
        className={cn(
          useHomeHeroStyle
            ? HOME_HERO_CONTENT_CLASS
            : 'relative z-10 mx-auto flex w-full max-w-content flex-col justify-center',
        )}
      >
        <div
          className={cn(
            useHomeHeroStyle
              ? HOME_HERO_INNER_CLASS
              : cn(
                  'flex max-w-[52.875rem] flex-col justify-center',
                  isCompactLandingHero ? 'gap-10' : 'gap-0',
                ),
          )}
        >
          {tag ? (
            <div className={cn(!useHomeHeroStyle && 'mb-4 md:mb-6')}>
              {isInstitutionalHero || useHomeHeroStyle ? (
                <span
                  className={cn(
                    'inline-flex items-center justify-center',
                    INSTITUTIONAL_HERO_EYEBROW_CLASS,
                  )}
                >
                  {tag}
                </span>
              ) : (
                <Badge>{tag}</Badge>
              )}
            </div>
          ) : null}

          {title ? (
            <h1
              className={cn(
                useHomeHeroStyle
                  ? HOME_HERO_TITLE_CLASS
                  : cn(
                      'text-white',
                      isSectorHero || isCompactLandingHero
                        ? SECTOR_HERO_TITLE_CLASS
                        : 'text-[2.25rem] leading-[1.2] font-bold md:text-[3rem] md:leading-[4.25rem]',
                    ),
              )}
            >
              {title}
            </h1>
          ) : null}

          {subtitle ? (
            <p
              className={cn(
                useHomeHeroStyle
                  ? HOME_HERO_SUBTITLE_CLASS
                  : cn(
                      'text-white',
                      isSectorHero || isCompactLandingHero
                        ? 'text-lg leading-normal md:text-2xl'
                        : 'pt-4 text-[1.25rem] leading-9 md:pt-6 md:text-[1.375rem]',
                    ),
              )}
            >
              {renderTextWithBoldMarkers(subtitle, 'font-bold')}
            </p>
          ) : null}

          {useHomeHeroStyle && (logoUrl || homeHeroCtaLink) ? (
            <div className="flex w-full flex-col items-start gap-7">
              {logoUrl ? (
                <div className={HOME_HERO_LOGO_WRAPPER_CLASS}>
                  <Image
                    src={logoUrl}
                    alt={logoAlt}
                    fill
                    sizes="(max-width: 768px) 160px, 200px"
                    className={HOME_HERO_LOGO_IMAGE_CLASS}
                  />
                </div>
              ) : null}

              {homeHeroCtaLink ? (
                <div className="flex w-full flex-col items-start gap-5 md:flex-row md:items-center md:gap-7">
                  <Button
                    href={homeHeroCtaLink.href}
                    external={homeHeroCtaLink.isExternal}
                    className="w-full px-6 py-3 text-[15px] leading-6 md:w-auto md:py-3.5 md:text-base md:leading-7"
                  >
                    {homeHeroCtaLink.label}
                    <ArrowRightIcon />
                  </Button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
}
