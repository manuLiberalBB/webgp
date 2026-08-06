import { Badge } from '@/components/ui/Badge';
import { FoundationsConoceCtaCard } from '@/components/sections/foundations/FoundationsConoceCtaCard';
import { FoundationsImageGrid } from '@/components/sections/foundations/FoundationsImageGrid';
import type { CardFields } from '@/lib/contentful/types/card';
import type { FoundationImageItem } from '@/lib/contentful/types/image';
import { cn } from '@/lib/utils';

type FoundationsGridSectionProps = {
  tag?: string;
  title?: string;
  subtitle?: string;
  items: FoundationImageItem[];
  ctaCard?: CardFields | null;
  sectionId?: string;
  className?: string;
};

export function FoundationsGridSection({
  tag,
  title,
  subtitle,
  items,
  ctaCard,
  sectionId,
  className,
}: FoundationsGridSectionProps) {
  return (
    <section
      id={sectionId}
      className={cn(
        'section-anchor bg-white px-10 py-10 md:px-layout-x md:py-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-10 md:gap-16">
        {tag || title || subtitle ? (
          <header className="flex w-full flex-col gap-6 md:gap-8">
            {tag ? (
              <Badge className="w-fit">{tag}</Badge>
            ) : null}

            <div className="flex flex-col gap-4 md:gap-6">
              {title ? (
                <h2 className="text-heading text-[2.25rem] leading-tight font-normal tracking-[-0.72px] md:text-5xl md:leading-[3.75rem] md:tracking-[-0.96px]">
                  {title}
                </h2>
              ) : null}

              {subtitle ? (
                <p className="text-body text-lg leading-7 md:text-xl">{subtitle}</p>
              ) : null}
            </div>
          </header>
        ) : null}

        <FoundationsImageGrid items={items} />

        {ctaCard ? <FoundationsConoceCtaCard fields={ctaCard} /> : null}
      </div>
    </section>
  );
}
