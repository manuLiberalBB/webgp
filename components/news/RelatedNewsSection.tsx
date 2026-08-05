import type { RelatedNewsItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

import { RelatedNewsCard } from './RelatedNewsCard';
import { NewsSidebarSectionTitle } from './sidebar/NewsSidebarPrimitives';

type RelatedNewsSectionProps = {
  items: RelatedNewsItem[];
  className?: string;
};

export function RelatedNewsSection({ items, className }: RelatedNewsSectionProps) {
  if (!items.length) return null;

  return (
    <section className={cn('w-full', className)} aria-label="Noticias relacionadas">
      <NewsSidebarSectionTitle>noticias relacionadas</NewsSidebarSectionTitle>

      <div className="flex flex-col">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(index === 0 ? 'pb-6' : undefined)}
          >
            <RelatedNewsCard item={item} showTopSpacing={index === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
