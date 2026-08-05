import NextImage from 'next/image';

import type { ImageItem } from '@/lib/contentful/types/image';
import { cn } from '@/lib/utils';

type ContentfulImageProps = {
  item: ImageItem;
  className?: string;
  priority?: boolean;
};

export function ContentfulImage({ item, className, priority = false }: ContentfulImageProps) {
  const hasCaption = Boolean(item.epigraph || item.source);

  return (
    <figure className={cn('flex w-full flex-col gap-3', className)}>
      <div className="relative w-full overflow-hidden rounded-lg">
        <NextImage
          src={item.imageUrl}
          alt={item.imageAlt}
          width={item.width}
          height={item.height}
          priority={priority}
          sizes="(min-width: 1024px) 960px, 100vw"
          className="h-auto w-full object-cover"
        />
      </div>

      {hasCaption ? (
        <figcaption className="flex flex-col gap-1 text-sm leading-5 text-text-muted">
          {item.epigraph ? <p>{item.epigraph}</p> : null}
          {item.source ? <p className="text-xs leading-4 italic">{item.source}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
