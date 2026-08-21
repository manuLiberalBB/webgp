import { VideoEmbedPoster } from '@/components/cms/VideoEmbedPoster';
import type { VideoSource } from '@/lib/contentful/types/video';
import { cn } from '@/lib/utils';

type InPersonDynamicsSectionProps = {
  title?: string;
  subtitle?: string;
  posterUrl: string;
  posterAlt?: string;
  videoUrl: string;
  videoSource?: VideoSource;
  videoTitle?: string;
  className?: string;
};

export function InPersonDynamicsSection({
  title,
  subtitle,
  posterUrl,
  posterAlt = '',
  videoUrl,
  videoSource = 'embed',
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
          videoUrl={videoUrl}
          source={videoSource}
          title={videoTitle ?? title ?? 'Video'}
        />
      </div>
    </section>
  );
}
