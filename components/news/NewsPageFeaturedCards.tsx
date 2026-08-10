import Image from 'next/image';

import {
  NewsCardArticleShell,
  NewsCardOverlayLink,
} from '@/components/news/NewsCardNavigation';
import { NewsCategoryBadge } from '@/components/news/NewsCategoryBadge';
import type { FeaturedNewsItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

import { NewsReadNoteLink } from './NewsReadNoteLink';

type NewsPageFeaturedLargeCardProps = {
  item: FeaturedNewsItem;
  className?: string;
  readMoreLabel?: string;
};

export function NewsPageFeaturedLargeCard({
  item,
  className,
  readMoreLabel = 'Leer nota',
}: NewsPageFeaturedLargeCardProps) {
  return (
    <div
      className={cn(
        'group relative flex min-h-[360px] flex-col overflow-hidden rounded-lg md:min-h-[451px]',
        className,
      )}
    >
      <NewsCardOverlayLink href={item.href} ariaLabel={item.title} overlayTone="dark" />
      <Image
        src={item.coverImageUrl}
        alt={item.coverImageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 534px"
        className="pointer-events-none object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 via-50% to-transparent"
      />

      <div className="pointer-events-none relative z-10 flex min-h-full w-full flex-col justify-end p-6 md:p-8">
        <div className="pointer-events-auto">
          {item.category ? <NewsCategoryBadge category={item.category} /> : null}
        </div>

        <h3 className="pt-3 text-[24px] font-bold leading-[33px] text-white">
          {item.title}
        </h3>

        {item.subtitle ? (
          <p className="pt-2 text-sm leading-[22.75px] text-white/80">{item.subtitle}</p>
        ) : null}

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs leading-[15px] text-white">
            {item.readingMinutes} min
          </span>
          <div className="flex-1" />
          <NewsReadNoteLink
            href={item.href}
            variant="onDark"
            decorative
            className="text-sm leading-[16.5px]"
          >
            {readMoreLabel}
          </NewsReadNoteLink>
        </div>
      </div>
    </div>
  );
}

type NewsPageFeaturedStackedCardProps = {
  item: FeaturedNewsItem;
  className?: string;
  imageContainerClassName?: string;
};

export function NewsPageFeaturedStackedCard({
  item,
  className,
  imageContainerClassName = 'h-[252px]',
}: NewsPageFeaturedStackedCardProps) {
  return (
    <NewsCardArticleShell
      href={item.href}
      ariaLabel={item.title}
      overlayTone="light"
      className={cn('group flex flex-col', className)}
    >
      <div
        className={cn(
          'relative mb-4 block w-full overflow-hidden rounded-lg',
          imageContainerClassName,
        )}
      >
        <Image
          src={item.coverImageUrl}
          alt={item.coverImageAlt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {item.category ? <NewsCategoryBadge category={item.category} /> : null}

      <h3 className="pt-2.5 text-lg leading-[23.375px] font-bold text-[#111]">{item.title}</h3>

      <p className="pt-3.5 text-xs leading-[15px] text-[#777]">{item.readingMinutes} min</p>
    </NewsCardArticleShell>
  );
}

type NewsPageFeaturedCompactCardProps = {
  item: FeaturedNewsItem;
  className?: string;
};

export function NewsPageFeaturedCompactCard({
  item,
  className,
}: NewsPageFeaturedCompactCardProps) {
  return (
    <article className={cn('group relative flex gap-4', className)}>
      <NewsCardOverlayLink href={item.href} ariaLabel={item.title} overlayTone="light" />
      <div className="pointer-events-none relative h-[100px] w-[120px] shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.coverImageUrl}
          alt={item.coverImageAlt}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>

      <div className="pointer-events-none relative z-10 flex min-w-0 flex-1 flex-col">
        <div className="pointer-events-auto">
          {item.category ? <NewsCategoryBadge category={item.category} /> : null}
        </div>

        <h3 className="pt-1.5 text-[15px] font-bold leading-[20.625px] text-[#111]">
          {item.title}
        </h3>

        <div className="mt-2 flex items-center gap-4">
          <span className="text-[10px] leading-[15px] text-[#777]">
            {item.readingMinutes} min
          </span>
          <div className="flex-1" />
          <NewsReadNoteLink href={item.href} decorative />
        </div>
      </div>
    </article>
  );
}

type NewsPageFeaturedTextCardProps = {
  item: FeaturedNewsItem;
  className?: string;
};

export function NewsPageFeaturedTextCard({
  item,
  className,
}: NewsPageFeaturedTextCardProps) {
  return (
    <article className={cn('group relative border-t border-black/[0.07] pt-6', className)}>
      <NewsCardOverlayLink href={item.href} ariaLabel={item.title} overlayTone="light" />

      <div className="pointer-events-none relative z-10">
        <div className="pointer-events-auto w-fit">
          {item.category ? <NewsCategoryBadge category={item.category} /> : null}
        </div>

        <h3 className="pt-2 text-[17px] font-bold leading-[23.375px] text-[#111]">
          {item.title}
        </h3>

        {item.subtitle ? (
          <p className="pt-2 text-sm leading-[22.75px] text-[#666]">{item.subtitle}</p>
        ) : null}

        <div className="mt-3.5 flex items-center gap-4">
          <span className="text-[10px] leading-[15px] text-[#777]">
            {item.readingMinutes} min
          </span>
          <div className="flex-1" />
          <NewsReadNoteLink href={item.href} decorative />
        </div>
      </div>
    </article>
  );
}
