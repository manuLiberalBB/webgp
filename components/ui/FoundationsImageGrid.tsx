import Image from 'next/image';

import type { FoundationImageItem } from '@/lib/contentful/types/image';
import { cn } from '@/lib/utils';

type FoundationImageCardProps = {
  item: FoundationImageItem;
  className?: string;
};

export function FoundationImageCard({ item, className }: FoundationImageCardProps) {
  return (
    <figure
      className={cn(
        'w-full overflow-hidden rounded-2xl border-2 border-t-[8px] bg-white p-3 shadow-[0px_1px_1.5px_rgba(0,0,0,0.1)]',
        className,
      )}
      style={{ borderColor: item.accentColor }}
    >
      <div className="relative aspect-[3/1] w-full overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 768px) 302px, 50vw"
          className="object-cover object-center"
        />
      </div>

      {item.epigraph ? (
        <figcaption className="sr-only">{item.epigraph}</figcaption>
      ) : null}
    </figure>
  );
}

type FoundationsImageGridProps = {
  items: FoundationImageItem[];
  className?: string;
};

export function FoundationsImageGrid({ items, className }: FoundationsImageGridProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        'flex flex-wrap justify-center gap-6',
        className,
      )}
      aria-label="Fundaciones por región"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="w-[calc(50%-12px)] md:w-[calc((100%-72px)/4)]"
        >
          <FoundationImageCard item={item} />
        </div>
      ))}
    </div>
  );
}
