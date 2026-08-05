import Image from 'next/image';
import Link from 'next/link';

import { NewsCategoryBadge } from '@/components/ui/NewsCategoryBadge';
import type { NewsListItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

import { NewsReadNoteLink } from './NewsReadNoteLink';

type LatestNewsCardProps = {
  item: NewsListItem;
  className?: string;
};

export function LatestNewsCard({ item, className }: LatestNewsCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-6',
        className,
      )}
    >
      <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-[20px] sm:h-[282px] sm:w-[269px]">
        <Link href={item.href} className="absolute inset-0 z-0" aria-label={item.title} />
        <Image
          src={item.coverImageUrl}
          alt={item.coverImageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 269px"
          className="object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
        {item.category ? (
          <div className="absolute bottom-5 left-5 z-10">
            <NewsCategoryBadge category={item.category} />
          </div>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-col gap-2">
          <h3 className="text-[22px] leading-8 text-[#0d0d0d] md:text-[24px] md:leading-8">
            <Link href={item.href} className="hover:underline">
              {item.title}
            </Link>
          </h3>

          {item.subtitle ? (
            <p className="text-base leading-6 text-[#808080]">{item.subtitle}</p>
          ) : null}
        </div>

        <NewsReadNoteLink href={item.href} variant="underline" />
      </div>
    </article>
  );
}
