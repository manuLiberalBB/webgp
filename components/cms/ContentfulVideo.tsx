import type { VideoItem } from '@/lib/contentful/types/video';
import { cn } from '@/lib/utils';

type ContentfulVideoProps = {
  item: VideoItem;
  className?: string;
};

export function ContentfulVideo({ item, className }: ContentfulVideoProps) {
  const hasCaption = Boolean(item.title || item.author);
  const iframeTitle = item.title ?? item.contenfulName;

  return (
    <figure className={cn('flex w-full flex-col gap-3', className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        {item.source === 'asset' ? (
          <video
            src={item.url}
            title={iframeTitle}
            controls
            playsInline
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <iframe
            src={item.embedUrl}
            title={iframeTitle}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>

      {hasCaption ? (
        <figcaption className="flex flex-col gap-1 text-sm leading-5 text-text-muted">
          {item.title ? <p className="text-body text-base leading-6">{item.title}</p> : null}
          {item.author ? <p className="text-xs leading-4 italic">{item.author}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
