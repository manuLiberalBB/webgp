'use client';

import type { SectorsGridItem } from '@/lib/contentful/sector/types';

import { SectorsGridCard } from './SectorsGridCard';
import { SectorsGridEqualHeightCell } from './SectorsGridEqualHeightCell';
import { SectorsGridPromoCard } from './SectorsGridPromoCard';
import { useSectorsGridEqualHeights } from './useSectorsGridEqualHeights';

type SectorsGridMobileProps = {
  items: SectorsGridItem[];
};

export function SectorsGridMobile({ items }: SectorsGridMobileProps) {
  const carouselRef = useSectorsGridEqualHeights([items]);

  return (
    <div className="flex flex-col gap-8 md:hidden">
      <SectorsGridPromoCard sectorCount={items.length} className="w-full" />

      <div className="-mx-6 min-w-0 overflow-x-auto overscroll-x-contain px-6 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div
          ref={carouselRef}
          className="flex w-max min-w-full snap-x snap-mandatory items-stretch gap-6"
        >
          {items.map((item) => (
            <SectorsGridEqualHeightCell
              key={item.id}
              className="w-[calc(100vw-3.5rem)] max-w-[320px] shrink-0 snap-start snap-always"
            >
              <SectorsGridCard item={item} className="h-full" />
            </SectorsGridEqualHeightCell>
          ))}
        </div>
      </div>
    </div>
  );
}
