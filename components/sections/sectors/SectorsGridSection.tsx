import type { SectorsGridItem } from '@/lib/contentful/sector/types';
import { cn } from '@/lib/utils';

import { SectorsGridDesktop } from './SectorsGridDesktop';
import { SectorsGridMobile } from './SectorsGridMobile';

type SectorsGridSectionProps = {
  subtitle?: string;
  items: SectorsGridItem[];
  className?: string;
};

export function SectorsGridSection({
  subtitle,
  items,
  className,
}: SectorsGridSectionProps) {
  if (items.length === 0 && !subtitle) return null;

  const firstRowItems = items.slice(0, 3);
  const secondRowItems = items.slice(3, 7);

  return (
    <section
      className={cn('bg-white px-6 py-10 md:px-layout-x md:py-section-y', className)}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-section-y">
        {subtitle ? (
          <p className="text-heading text-center text-2xl leading-normal">{subtitle}</p>
        ) : null}

        {items.length > 0 ? (
          <>
            <SectorsGridMobile items={items} />

            <SectorsGridDesktop
              firstRowItems={firstRowItems}
              secondRowItems={secondRowItems}
              sectorCount={items.length}
            />
          </>
        ) : null}
      </div>
    </section>
  );
}
