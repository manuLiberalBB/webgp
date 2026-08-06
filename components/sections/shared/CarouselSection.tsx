import type { Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

import type { CarouselItem } from '@/lib/contentful/carousel/types';
import { cn } from '@/lib/utils';

import { CtaLinks } from '@/components/ui/CtaLinks';
import { RichText } from '@/components/cms/RichText';
import { MarqueeCarousel, type MarqueeCarouselVariant } from './MarqueeCarousel';

type CarouselSectionProps = {
  title?: string;
  subtitle?: string;
  body?: Document;
  urlList?: Entry[];
  items: CarouselItem[];
  className?: string;
  headerTextClassName?: string;
  companyVariant?: MarqueeCarouselVariant;
};

export function CarouselSection({
  title,
  subtitle,
  body,
  urlList,
  items,
  className,
  headerTextClassName,
  companyVariant,
}: CarouselSectionProps) {
  return (
    <section
      className={cn(
        'bg-ecosystem overflow-hidden px-10 py-10 md:px-layout-x md:py-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full min-w-0 max-w-content flex-col gap-16">
        {title || subtitle || body ? (
          <header className="flex w-full flex-col gap-6">
            {title ? (
              <h2
                className={cn(
                  'text-ecosystem-title text-[2rem] leading-tight font-normal md:text-5xl',
                  headerTextClassName,
                )}
              >
                {title}
              </h2>
            ) : null}

            {subtitle ? (
              <p
                className={cn(
                  'text-ecosystem-body text-lg leading-normal md:text-xl',
                  headerTextClassName,
                )}
              >
                {subtitle}
              </p>
            ) : null}

            {body ? (
              <RichText document={body} className="grid-section-body text-ecosystem-body" />
            ) : null}
          </header>
        ) : null}

        <MarqueeCarousel items={items} variant={companyVariant} />

        {urlList?.length ? (
          <div className="flex w-full justify-center">
            <CtaLinks
              links={urlList}
              className={companyVariant === 'cards' ? 'w-full md:w-auto' : undefined}
              buttonClassName={
                companyVariant === 'cards' ? 'w-full md:w-auto' : undefined
              }
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
