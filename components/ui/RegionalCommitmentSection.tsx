import { AppImage, HALF_WIDTH_IMAGE_SIZES } from '@/components/ui/AppImage';
import { Badge } from '@/components/ui/Badge';
import { RichText } from '@/components/ui/RichText';
import type { StatisticItem } from '@/lib/contentful/types/statistic';
import type { Document } from '@contentful/rich-text-types';
import { cn } from '@/lib/utils';

type RegionalCommitmentSectionProps = {
  tag?: string;
  title?: string;
  body: Document;
  imageUrl: string;
  imageAlt?: string;
  statistic?: StatisticItem;
  className?: string;
};

export function RegionalCommitmentSection({
  tag,
  title,
  body,
  imageUrl,
  imageAlt = '',
  statistic,
  className,
}: RegionalCommitmentSectionProps) {
  return (
    <section
      className={cn(
        'bg-[#f6f4ef] px-6 py-12 md:px-layout-x md:py-20',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-8 lg:flex-row lg:items-center lg:gap-2 min-[1400px]:gap-0">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex w-full max-w-[600px] flex-col gap-8">
            {tag ? (
              <Badge className="w-fit rounded bg-[#0b2d4e] px-3 py-2 text-sm leading-5 font-semibold tracking-[0.35px]">
                {tag}
              </Badge>
            ) : null}

          <div className="flex flex-col gap-6">
            {title ? (
              <h2 className="text-heading text-[2rem] leading-tight font-semibold tracking-[-0.96px] md:text-[3rem] md:leading-[3.5rem]">
                {title}
              </h2>
            ) : null}

              <RichText document={body} className="regional-commitment-body" />
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 shrink-0 lg:mx-0 lg:w-[min(100%,28rem)] lg:max-w-[28rem] lg:pb-8">
          <div className="relative aspect-[431/530] w-full overflow-hidden rounded-lg bg-white">
            <AppImage
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes={HALF_WIDTH_IMAGE_SIZES}
              className="object-cover object-center"
            />
          </div>

          {statistic ? (
            <div
              className={cn(
                'absolute -bottom-4 left-4 z-10 hidden max-w-[210px] rounded-lg bg-[#1b2a38] p-7 lg:block',
                'shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)]',
                'lg:-bottom-6 min-[1400px]:-left-16',
              )}
            >
              <p className="text-[2.25rem] leading-9 font-bold text-white">{statistic.value}</p>

              {statistic.label ? (
                <p className="pt-2 text-xs leading-[16.5px] text-white">{statistic.label}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
