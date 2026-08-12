import { AppImage as Image } from '@/components/cms/AppImage';
import Link from 'next/link';

import { NewsCategoryBadge } from '@/components/news/NewsCategoryBadge';
import { formatNewsCardDate } from '@/lib/news/formatNewsDate';
import { truncateText } from '@/lib/news/truncateText';
import type { FeaturedNewsItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

import { NewsReadNoteLink } from './NewsReadNoteLink';

const SIDE_CARD_SUBTITLE_MAX_LENGTH = 120;

type YouMayAlsoLikeSideCardProps = {
  item: FeaturedNewsItem;
  className?: string;
};

export function YouMayAlsoLikeSideCard({
  item,
  className,
}: YouMayAlsoLikeSideCardProps) {
  const cardDate = formatNewsCardDate(item.publishedAt);
  const subtitle = item.subtitle
    ? truncateText(item.subtitle, SIDE_CARD_SUBTITLE_MAX_LENGTH)
    : undefined;

  return (
    <article className={cn('flex gap-4', className)}>
      <Link
        href={item.href}
        className="relative w-[198px] shrink-0 self-stretch min-h-[140px] overflow-hidden rounded-md"
      >
        <Image
          src={item.coverImageUrl}
          alt={item.coverImageAlt}
          fill
          sizes="198px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        {item.category ? <NewsCategoryBadge category={item.category} /> : null}

        <h3 className="pt-1.5 text-base font-bold leading-[20.625px] text-[#111]">
          <Link href={item.href} className="hover:underline">
            {item.title}
          </Link>
        </h3>

        {subtitle ? (
          <p className="py-3 text-sm leading-[21.938px] text-[rgba(13,13,13,0.52)]">
            {subtitle}
          </p>
        ) : null}

        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] leading-[15px] text-[#777]">
            <span>{cardDate}</span>
            <span className="text-base leading-6 text-[#777]" aria-hidden>·</span>
            <span>{item.readingMinutes} min</span>
          </div>
          <div className="flex-1" />
          <NewsReadNoteLink href={item.href} />
        </div>
      </div>
    </article>
  );
}
