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
        'flex flex-col items-center gap-4 rounded-lg bg-[#dce7ff] px-8 py-2 md:min-h-[439px] md:justify-center md:gap-10 md:p-2.5',
        className,
      )}
    >
      <p className="text-center text-xl leading-normal text-[#123476] md:text-[30px]">
        <span className="font-bold">{sectorCount} sectores.</span>
        <br />
        <span className="font-normal">Un mismo </span>
        <span className="font-bold">compromiso</span>
      </p>

      <p className="text-center text-xl leading-normal italic whitespace-nowrap text-[#123476] md:hidden">
        Presencia que impulsa el país.
      </p>

      <p className="hidden text-center text-[30px] leading-normal italic text-[#123476] md:block">
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
      className={cn('bg-white px-6 py-10 md:px-layout-x md:py-section-y', className)}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-section-y">
        {subtitle ? (
          <p className="text-heading text-center text-2xl leading-normal">{subtitle}</p>
        ) : null}

        {items.length > 0 ? (
          <>
            <div className="flex flex-col gap-8 md:hidden">
              <SectorsGridPromoCard sectorCount={items.length} className="w-full" />

              <div className="-mx-6 min-w-0 overflow-x-auto overscroll-x-contain px-6 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex w-max min-w-full snap-x snap-mandatory gap-6">
                  {items.map((item) => (
                    <SectorsGridCard
                      key={item.id}
                      item={item}
                      className="w-[calc(100vw-3.5rem)] max-w-[320px] shrink-0 snap-start snap-always"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden grid-cols-2 gap-8 md:grid lg:grid-cols-4">
              {firstRowItems.map((item) => (
                <SectorsGridCard key={item.id} item={item} className="h-full" />
              ))}

              <SectorsGridPromoCard sectorCount={items.length} className="h-full" />

              {secondRowItems.map((item) => (
                <SectorsGridCard key={item.id} item={item} className="h-full" />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
