import type { Entry } from 'contentful';

import { HeroImage } from '@/components/cms/AppImage';
import { CtaLinks } from '@/components/ui/CtaLinks';
import type { StatisticItem } from '@/lib/contentful/types/statistic';
import { HERO_BOTTOM_PADDING } from '@/lib/layout/sectionPadding';
import { COMPACT_MOBILE_HERO_SECTION_CLASS } from '@/lib/layout/compactMobileHeroPages';
import { cn } from '@/lib/utils';

type StatisticsBannerProps = {
  title?: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  statistics: StatisticItem[];
  urlList?: Entry[];
  className?: string;
  compactMobile?: boolean;
  priority?: boolean;
};

export function StatisticsBanner({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  statistics,
  urlList,
  className,
  compactMobile = false,
  priority = true,
}: StatisticsBannerProps) {
  return (
    <section
      className={cn(
        'relative flex w-full flex-col items-center px-6 md:px-layout-x',
        compactMobile
          ? cn(COMPACT_MOBILE_HERO_SECTION_CLASS, 'gap-8 md:gap-12')
          : cn(
              'min-h-hero items-center justify-center gap-10 pt-10 md:gap-12 md:pt-12',
              HERO_BOTTOM_PADDING,
            ),
        className,
      )}
    >
      <HeroImage
        src={imageUrl}
        alt={imageAlt}
        fill
        priority={priority}
        className="object-cover"
      />

      <div aria-hidden className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex w-full max-w-content flex-col items-center gap-5 text-center">
        {title ? (
          <h2 className="text-[1.75rem] font-bold leading-9 tracking-[-0.56px] text-white md:text-[2.25rem] md:leading-[3rem] md:tracking-[-0.72px]">
            {title}
          </h2>
        ) : null}

        {subtitle ? (
          <p className="max-w-[656px] text-lg leading-7 text-white">{subtitle}</p>
        ) : null}
      </div>

      {statistics.length > 0 ? (
        <div className="relative z-10 flex w-full max-w-content flex-col rounded-lg border-2 border-white lg:flex-row">
          {statistics.map((statistic, index) => (
            <div
              key={statistic.id}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-4 bg-black/40 px-5 py-12 text-center',
                'min-h-[172px]',
                index < statistics.length - 1 &&
                  'border-b-2 border-white lg:border-r-2 lg:border-b-0',
              )}
            >
              <p className="text-[3rem] font-semibold leading-[3rem] tracking-[-1.2px] text-white">
                {statistic.value}
              </p>

              {statistic.label ? (
                <p className="text-base font-bold leading-[16.5px] text-white">
                  {statistic.label}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {urlList?.length ? (
        <div className="relative z-10 flex w-full max-w-content justify-center">
          <CtaLinks
            links={urlList}
            buttonVariant="inverse"
            className="w-full justify-center md:w-auto"
            buttonClassName="w-full justify-center md:w-auto"
          />
        </div>
      ) : null}
    </section>
  );
}
