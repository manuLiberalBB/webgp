import Image from 'next/image';

import { AdaptiveHeroLogo } from '@/components/news/AdaptiveHeroLogo';
import { NewsArticleButton } from '@/components/news/NewsArticleButton';
import { NewsCategoryBadge } from '@/components/ui/NewsCategoryBadge';
import { NewsCompanyBadge } from '@/components/ui/NewsCompanyBadge';
import type { FeaturedNewsItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

type FeaturedNewsHeroProps = {
  item: FeaturedNewsItem;
  className?: string;
};

const HERO_EYEBROW_CLASS = 'px-2.5 py-1.5 text-xs tracking-[1.25px]';

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

export function FeaturedNewsHero({ item, className }: FeaturedNewsHeroProps) {
  return (
    <section
      className={cn(
        'relative flex w-full min-h-[440px] flex-col overflow-hidden md:min-h-[500px]',
        className,
      )}
    >
      <Image
        src={item.coverImageUrl}
        alt={item.coverImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"
      />

      <div className="relative z-10 px-6 pb-12 pt-10 md:px-layout-x md:pb-16 md:pt-14 lg:pt-16">
        <div className="mx-auto flex w-full max-w-content flex-col items-start gap-5 md:gap-6">
          <div className="flex flex-wrap items-start gap-3">
            {item.category ? (
              <NewsCategoryBadge category={item.category} className={HERO_EYEBROW_CLASS} />
            ) : null}
            {item.companyName ? (
              <NewsCompanyBadge name={item.companyName} className={HERO_EYEBROW_CLASS} />
            ) : null}
          </div>

          <h1 className="max-w-[50rem] text-[34px] leading-[1.2] font-normal text-white md:max-w-[58rem] md:text-[51px] md:leading-[1.3]">
            {item.title}
          </h1>

          {item.subtitle ? (
            <p className="max-w-[52.875rem] text-[19px] leading-normal text-[#e5e7eb] md:text-[22px] md:leading-[1.3]">
              {item.subtitle}
            </p>
          ) : null}

          <div className="flex w-full flex-col items-start gap-7">
            {item.companyLogoUrl ? (
              <AdaptiveHeroLogo
                coverImageUrl={item.coverImageUrl}
                logoUrl={item.companyLogoUrl}
                logoAlt={item.companyName ?? ''}
                width={item.companyLogoWidth ?? 250}
                height={item.companyLogoHeight ?? 55}
              />
            ) : null}

            <div className="flex w-full flex-col items-start gap-5 md:flex-row md:items-center md:gap-7">
              <NewsArticleButton
                href={item.href}
                className="w-full px-6 py-3 text-[15px] leading-6 md:w-auto md:py-3.5 md:text-base md:leading-7"
              >
                Leer nota completa
                <ArrowRightIcon />
              </NewsArticleButton>

              <div className="text-sm leading-[16.5px] text-white/80">
                <span>{item.readingMinutes} min lectura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
