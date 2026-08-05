import { VideoEmbedPoster } from '@/components/ui/VideoEmbedPoster';
import { cn } from '@/lib/utils';

type InPersonDynamicsSectionProps = {
  title?: string;
  subtitle?: string;
  posterUrl: string;
  posterAlt?: string;
  videoEmbedUrl: string;
  videoTitle?: string;
  className?: string;
};

export function InPersonDynamicsSection({
  title,
  subtitle,
  posterUrl,
  posterAlt = '',
  videoEmbedUrl,
  videoTitle,
  className,
}: InPersonDynamicsSectionProps) {
  return (
    <section
      className={cn(
        'bg-white px-6 py-12 md:px-layout-x md:py-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-12">
        {(title || subtitle) && (
          <div className="flex max-w-[54.875rem] flex-col gap-4">
            {title ? (
              <h2 className="text-card-title text-[2rem] leading-normal tracking-[-0.96px] md:text-[3rem]">
                {title}
              </h2>
            ) : null}

            {subtitle ? (
              <p className="text-card-description text-lg leading-normal md:text-xl">
                {subtitle}
              </p>
            ) : null}
          </div>
        )}

        <VideoEmbedPoster
          posterUrl={posterUrl}
          posterAlt={posterAlt}
          embedUrl={videoEmbedUrl}
          title={videoTitle ?? title ?? 'Video'}
        />
      </div>
    </section>
  );
}
