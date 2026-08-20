import { HeroImage } from '@/components/cms/AppImage';
import { HERO_BOTTOM_PADDING } from '@/lib/layout/sectionPadding';
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
import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/Badge';

type HeroBannerProps = {
  tag?: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  id?: string;
  pagePath?: string[];
  className?: string;
  compactMobile?: boolean;
  priority?: boolean;
};

export function HeroBanner({
  tag,
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  id,
  pagePath,
  className,
  compactMobile = false,
  priority = true,
}: HeroBannerProps) {
  const isInstitutionalHero = isInstitutionalHeroPage(pagePath);
  const isCompactLandingHero = isCompactLandingHeroPage(pagePath);
  return (
    <section
      id={id}
      className={cn(
        'relative flex w-full max-w-full flex-col overflow-hidden px-6 md:px-layout-x',
        compactMobile
          ? COMPACT_MOBILE_HERO_SECTION_CLASS
          : cn(
              'min-h-hero justify-center pt-10 md:pt-12',
              HERO_BOTTOM_PADDING,
            ),
        id && 'scroll-mt-20',
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
          !isInstitutionalHero &&
            !isCompactLandingHero &&
            'bg-gradient-to-t from-black/80 from-[39.421%] to-black/25',
        )}
        style={
          isInstitutionalHero
            ? { background: INSTITUTIONAL_HERO_OVERLAY_GRADIENT }
            : isCompactLandingHero
              ? { background: COMPACT_LANDING_HERO_OVERLAY }
              : undefined
        }
      />

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col justify-center">
        <div
          className={cn(
            'flex max-w-[52.875rem] flex-col justify-center',
            isCompactLandingHero ? 'gap-10' : 'gap-0',
          )}
        >
          {tag ? (
            <div className="mb-4 md:mb-6">
              {isInstitutionalHero ? (
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
                'text-white',
                isCompactLandingHero
                  ? 'text-[2.25rem] font-semibold leading-[1.2] tracking-[-0.04em] md:text-[3.375rem] md:leading-[4.104rem] md:tracking-[-1.52px]'
                  : 'text-[2.25rem] leading-[1.2] font-bold md:text-[3rem] md:leading-[4.25rem]',
              )}
            >
              {title}
            </h1>
          ) : null}

          {subtitle ? (
            <p
              className={cn(
                'text-white',
                isCompactLandingHero
                  ? 'text-lg leading-normal md:text-2xl'
                  : 'pt-4 text-[1.25rem] leading-9 md:pt-6 md:text-[1.375rem]',
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
