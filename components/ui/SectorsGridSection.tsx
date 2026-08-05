import type { SectorsGridItem } from '@/lib/contentful/sector/types';
import { cn } from '@/lib/utils';

import { SectorsGridCard } from './SectorsGridCard';

type SectorsGridSectionProps = {
  subtitle?: string;
  items: SectorsGridItem[];
  className?: string;
};

function SectorsGridPromoCard({
  sectorCount,
  className,
}: {
  sectorCount: number;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        'flex min-h-[439px] flex-col items-center justify-center gap-10 rounded-lg bg-[#dce7ff] p-2.5',
        className,
      )}
    >
      <p className="text-center text-[30px] leading-normal text-[#123476]">
        <span className="font-bold">{sectorCount} sectores.</span>
        <br />
        <span className="font-normal">Un mismo </span>
        <span className="font-bold">compromiso</span>
      </p>

      <p className="text-center text-[30px] leading-normal italic text-[#123476]">
        Presencia
        <br />
        que impulsa
        <br />
        el país.
      </p>
    </aside>
  );
}

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
      className={cn('bg-white px-10 py-10 md:px-layout-x md:py-section-y', className)}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-section-y">
        {subtitle ? (
          <p className="text-heading text-center text-2xl leading-normal">{subtitle}</p>
        ) : null}

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {firstRowItems.map((item) => (
              <SectorsGridCard key={item.id} item={item} className="h-full" />
            ))}

            <SectorsGridPromoCard sectorCount={items.length} className="h-full" />

            {secondRowItems.map((item) => (
              <SectorsGridCard key={item.id} item={item} className="h-full" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
