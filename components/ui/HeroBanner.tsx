import Image from 'next/image';

import { HERO_BOTTOM_PADDING } from '@/lib/layout/sectionPadding';
import { cn } from '@/lib/utils';

import { Badge } from './Badge';

type HeroBannerProps = {
  tag?: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  id?: string;
  className?: string;
};

export function HeroBanner({
  tag,
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  id,
  className,
}: HeroBannerProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative flex min-h-hero w-full max-w-full flex-col justify-center overflow-hidden px-[1.875rem] pt-10 md:px-layout-x md:pt-12',
        HERO_BOTTOM_PADDING,
        id && 'scroll-mt-20',
        className,
      )}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 from-[39.421%] to-black/25"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col justify-center">
        <div className="flex max-w-[52.875rem] flex-col justify-center gap-0">
          {tag ? (
            <div className="mb-4 md:mb-6">
              <Badge>{tag}</Badge>
            </div>
          ) : null}

          {title ? (
            <h1 className="text-[2.25rem] leading-[1.2] font-bold text-white md:text-[3rem] md:leading-[4.25rem]">
              {title}
            </h1>
          ) : null}

          {subtitle ? (
            <p className="pt-4 text-[1.25rem] leading-9 text-white md:pt-6 md:text-[1.375rem]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
