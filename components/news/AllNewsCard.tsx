import Image from 'next/image';
import Link from 'next/link';

import { NewsCategoryBadge } from '@/components/ui/NewsCategoryBadge';
import { formatNewsCardDate } from '@/lib/news/formatNewsDate';
import type { NewsListItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

type AllNewsCardProps = {
  item: NewsListItem;
  className?: string;
};

export function AllNewsCard({ item, className }: AllNewsCardProps) {
  const cardDate = formatNewsCardDate(item.publishedAt);

  return (
    <article className={cn('flex flex-col', className)}>
      <Link
        href={item.href}
        className="relative mb-4 block h-[200px] w-full overflow-hidden md:h-[252px]"
      >
        <Image
          src={item.coverImageUrl}
          alt={item.coverImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 344px"
          className="object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      </Link>

      {item.category ? <NewsCategoryBadge category={item.category} /> : null}

      <h3 className="pt-2.5 text-lg font-bold leading-[23px] text-[#111]">
        <Link href={item.href} className="hover:underline">
          {item.title}
        </Link>
      </h3>

      <div className="mt-3.5 flex items-center gap-2 text-[10px] leading-[15px] text-[#777]">
        <span>{cardDate}</span>
        <span className="text-base leading-6 text-[#e0e0e0]" aria-hidden>·</span>
        <span>{item.readingMinutes} min</span>
      </div>
    </article>
  );
}
