import type { Entry } from 'contentful';
import Image from 'next/image';

import { CtaLinks } from '@/components/ui/CtaLinks';
import type { StatisticItem } from '@/lib/contentful/types/statistic';
import { HERO_BOTTOM_PADDING } from '@/lib/layout/sectionPadding';
import { cn } from '@/lib/utils';

type StatisticsBannerProps = {
  title?: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  statistics: StatisticItem[];
  urlList?: Entry[];
  className?: string;
};

export function StatisticsBanner({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  statistics,
  urlList,
  className,
}: StatisticsBannerProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-hero w-full flex-col items-center justify-center gap-10 px-10 pt-10 md:gap-12 md:px-layout-x md:pt-12',
        HERO_BOTTOM_PADDING,
        className,
      )}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div aria-hidden className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex w-full max-w-content flex-col items-center gap-5 text-center">
        {title ? (
          <h2 className="text-[2.25rem] font-semibold leading-[3rem] tracking-[-0.72px] text-white">
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
                'flex flex-1 flex-col items-center justify-center gap-4 px-5 py-12 text-center',
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
        <div className="relative z-10 flex justify-center">
          <CtaLinks links={urlList} />
        </div>
      ) : null}
    </section>
  );
}
