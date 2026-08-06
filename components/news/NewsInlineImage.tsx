import { AppImage, LARGE_CONTAINER_IMAGE_SIZES } from '@/components/cms/AppImage';
import type { ImageItem } from '@/lib/contentful/types/image';
import { cn } from '@/lib/utils';

type NewsInlineImageProps = {
  item: ImageItem;
  className?: string;
};

export function NewsInlineImage({ item, className }: NewsInlineImageProps) {
  const epigraph = item.epigraph?.trim();
  const source = item.source?.trim();
  const hasCaption = Boolean(epigraph || source);

  return (
    <figure className={cn('mb-12 flex w-full flex-col pt-12', className)}>
      <div className="relative h-[405px] w-full overflow-hidden bg-news-sidebar-image-bg">
        <AppImage
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes={LARGE_CONTAINER_IMAGE_SIZES}
          className="object-cover"
        />
      </div>

      {hasCaption ? (
        <figcaption className="border-news-divider flex flex-col gap-1 border-l-2 pl-3.5 pt-3">
          {epigraph ? (
            <p className="text-news-meta text-xs leading-[18.688px]">{epigraph}</p>
          ) : null}
          {source ? (
            <p className="text-news-meta text-xs leading-[18.688px]">{source}</p>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
