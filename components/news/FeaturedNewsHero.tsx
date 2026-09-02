import { AppImage as Image, AUTO_ASPECT_STYLE, HeroImage } from '@/components/cms/AppImage';
import { NewsArticleButton } from '@/components/news/NewsArticleButton';
import { NewsCategoryBadge } from '@/components/news/NewsCategoryBadge';
import { NewsCompanyBadge } from '@/components/news/NewsCompanyBadge';
import type { FeaturedNewsItem } from '@/lib/news/types';
import {
  FEATURED_NEWS_HERO_CONTENT_CLASS,
  FEATURED_NEWS_HERO_OVERLAY_GRADIENT,
  FEATURED_NEWS_HERO_WRAPPER_CLASS,
} from '@/lib/news/featuredNewsHeroStyles';
import { renderTextWithBoldMarkers } from '@/lib/ui/renderTextWithBoldMarkers';
import { cn } from '@/lib/utils';

type FeaturedNewsHeroProps = {
  item: FeaturedNewsItem;
  className?: string;
  embedded?: boolean;
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

export function FeaturedNewsHero({
  item,
  className,
  embedded = false,
}: FeaturedNewsHeroProps) {
  const Wrapper = embedded ? 'div' : 'section';

  return (
    <Wrapper
      className={cn(FEATURED_NEWS_HERO_WRAPPER_CLASS, className)}
    >
      <HeroImage
        src={item.coverImageUrl}
        alt={item.coverImageAlt}
        fill
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: FEATURED_NEWS_HERO_OVERLAY_GRADIENT }}
      />

      <div className={FEATURED_NEWS_HERO_CONTENT_CLASS}>
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
              {renderTextWithBoldMarkers(item.subtitle, 'font-bold')}
            </p>
          ) : null}

          <div className="flex w-full flex-col items-start gap-7">
            {item.companyLogoUrl ? (
              <Image
                src={item.companyLogoUrl}
                alt={item.companyName ?? ''}
                width={item.companyLogoWidth ?? 250}
                height={item.companyLogoHeight ?? 55}
                style={AUTO_ASPECT_STYLE}
                className="block h-[52px] w-auto max-w-[234px] self-start object-contain object-left brightness-0 invert"
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

              <div className="text-sm font-semibold leading-[16.5px] text-white">
                <span>{item.readingMinutes} min lectura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
