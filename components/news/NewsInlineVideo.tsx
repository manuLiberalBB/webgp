import { VideoEmbedPoster } from '@/components/cms/VideoEmbedPoster';
import { resolveVideoPosterUrl } from '@/lib/contentful/video/resolveVideoEmbedUrl';
import type { VideoItem } from '@/lib/contentful/types/video';
import { cn } from '@/lib/utils';

type NewsInlineVideoProps = {
  item: VideoItem;
  className?: string;
};

const NEWS_INLINE_VIDEO_HEIGHT =
  'h-[405px] sm:h-[405px] lg:h-[405px]';

export function NewsInlineVideo({ item, className }: NewsInlineVideoProps) {
  const title = item.title?.trim();
  const author = item.author?.trim();
  const hasCaption = Boolean(title || author);
  const iframeTitle = title ?? item.contenfulName;
  const posterUrl = resolveVideoPosterUrl(item.url) ?? undefined;

  return (
    <figure className={cn('mb-12 flex w-full flex-col pt-12', className)}>
      <VideoEmbedPoster
        posterUrl={posterUrl}
        posterAlt={iframeTitle}
        embedUrl={item.embedUrl}
        title={iframeTitle}
        className={cn(
          NEWS_INLINE_VIDEO_HEIGHT,
          'w-full overflow-hidden rounded-none bg-news-sidebar-image-bg',
        )}
      />

      {hasCaption ? (
        <figcaption className="border-news-divider flex flex-col gap-1 border-l-2 pl-3.5 pt-3">
          {title ? (
            <p className="text-news-meta text-xs leading-[18.688px]">{title}</p>
          ) : null}
          {author ? (
            <p className="text-news-meta text-xs leading-[18.688px]">{author}</p>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
