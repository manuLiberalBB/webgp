import { AppImage as Image } from '@/components/cms/AppImage';

import {
  CONTENT_PADDED_IMAGE_SIZES,
  FEATURED_NEWS_LARGE_CARD_SIZES,
} from '@/components/cms/AppImage';
import type { FeaturedNewsItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

import {
  NewsCardArticleShell,
  NewsCardOverlayLink,
} from '@/components/news/NewsCardNavigation';
import { NewsCategoryBadge } from '@/components/news/NewsCategoryBadge';
import { NewsCompanyBadge } from '@/components/news/NewsCompanyBadge';

type FeaturedNewsCardProps = {
  item: FeaturedNewsItem;
  variant: 'large' | 'vertical' | 'horizontal' | 'stacked';
  companyBadgeVariant?: 'default' | 'brand' | 'green';
  className?: string;
};

const CARD_GRADIENT =
  'linear-gradient(16.56deg, rgba(0, 0, 0, 0.8) 18.3%, rgba(0, 0, 0, 0.2) 51.74%, rgba(0, 0, 0, 0) 85.18%)';

export function FeaturedNewsCard({
  item,
  variant,
  companyBadgeVariant = 'brand',
  className,
}: FeaturedNewsCardProps) {
  if (variant === 'large') {
    return (
      <div
        className={cn(
          'group relative flex h-[400px] overflow-hidden rounded-lg md:h-[480px]',
          className,
        )}
      >
        <NewsCardOverlayLink href={item.href} ariaLabel={item.title} overlayTone="dark" />
        <Image
          src={item.coverImageUrl}
          alt={item.coverImageAlt}
          fill
          sizes={FEATURED_NEWS_LARGE_CARD_SIZES}
          className="pointer-events-none object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: CARD_GRADIENT }}
        />
        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end gap-3 p-6 md:p-8">
          <div className="pointer-events-auto flex flex-wrap items-start gap-3">
            {item.category ? <NewsCategoryBadge category={item.category} /> : null}
            {item.companyName ? (
              <NewsCompanyBadge name={item.companyName} variant={companyBadgeVariant} />
            ) : null}
          </div>
          <h3 className="text-[24px] leading-[1.25] text-white md:text-[30px] md:leading-[37.5px]">
            {item.title}
          </h3>
        </div>
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <NewsCardArticleShell
        href={item.href}
        ariaLabel={item.title}
        overlayTone="light"
        className={cn('group flex flex-col', className)}
      >
        <div className="relative mb-4 block h-[200px] w-full overflow-hidden rounded-lg">
          <Image
            src={item.coverImageUrl}
            alt={item.coverImageAlt}
            fill
            sizes={CONTENT_PADDED_IMAGE_SIZES}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        {item.category ? <NewsCategoryBadge category={item.category} /> : null}

        <h3 className="pt-2.5 text-lg leading-[23px] font-bold text-[#111]">{item.title}</h3>

        <p className="mt-3.5 text-[10px] leading-[15px] text-[#777]">
          {item.readingMinutes} min
        </p>
      </NewsCardArticleShell>
    );
  }

  if (variant === 'vertical') {
    return (
      <div
        className={cn(
          'group relative flex flex-col overflow-hidden rounded-[10px] bg-white',
          className,
        )}
      >
        <NewsCardOverlayLink href={item.href} ariaLabel={item.title} overlayTone="light" />
        <div className="pointer-events-none relative h-[206px] w-full overflow-hidden">
          <Image
            src={item.coverImageUrl}
            alt={item.coverImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 386px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="pointer-events-none relative z-10 flex flex-col gap-2 p-6">
          <div className="pointer-events-auto flex flex-wrap items-center gap-2">
            {item.category ? <NewsCategoryBadge category={item.category} /> : null}
            {item.companyName ? (
              <NewsCompanyBadge name={item.companyName} variant="green" />
            ) : null}
          </div>
          <h3 className="text-ecosystem-title text-xl leading-[27.5px]">{item.title}</h3>
          <p className="text-[#6a7282] text-sm leading-5">{item.readingMinutes} min</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('group relative flex items-center gap-4 rounded-[10px] p-4', className)}>
      <NewsCardOverlayLink href={item.href} ariaLabel={item.title} overlayTone="light" />
      <div className="pointer-events-none relative h-24 w-32 shrink-0 overflow-hidden rounded">
        <Image
          src={item.coverImageUrl}
          alt={item.coverImageAlt}
          fill
          sizes="128px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="pointer-events-none relative z-10 flex min-w-0 flex-1 flex-col gap-2">
        <div className="pointer-events-auto">
          {item.category ? <NewsCategoryBadge category={item.category} /> : null}
        </div>
        <h3 className="text-ecosystem-title line-clamp-2 text-base leading-[22px]">
          {item.title}
        </h3>
        <p className="text-[#6a7282] text-xs leading-4">{item.readingMinutes} min</p>
      </div>
    </div>
  );
}
