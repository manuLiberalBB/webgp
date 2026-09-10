'use client';

import type { SectorsGridItem } from '@/lib/contentful/sector/types';

import { SectorsGridCard } from './SectorsGridCard';
import { SectorsGridEqualHeightCell } from './SectorsGridEqualHeightCell';
import { SectorsGridPromoCard } from './SectorsGridPromoCard';
import { useSectorsGridEqualHeights } from './useSectorsGridEqualHeights';

type SectorsGridDesktopProps = {
  firstRowItems: SectorsGridItem[];
  secondRowItems: SectorsGridItem[];
  sectorCount: number;
};

export function SectorsGridDesktop({
  firstRowItems,
  secondRowItems,
  sectorCount,
}: SectorsGridDesktopProps) {
  const gridRef = useSectorsGridEqualHeights([firstRowItems, secondRowItems, sectorCount]);

  return (
    <div ref={gridRef} className="hidden flex-col gap-8 md:flex">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {firstRowItems.map((item) => (
          <SectorsGridEqualHeightCell key={item.id}>
            <SectorsGridCard item={item} className="h-full" />
          </SectorsGridEqualHeightCell>
        ))}

        <SectorsGridEqualHeightCell>
          <SectorsGridPromoCard sectorCount={sectorCount} className="h-full" />
        </SectorsGridEqualHeightCell>
      </div>

      {secondRowItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {secondRowItems.map((item) => (
            <SectorsGridEqualHeightCell key={item.id}>
              <SectorsGridCard item={item} className="h-full" />
            </SectorsGridEqualHeightCell>
          ))}
        </div>
      ) : null}
    </div>
  );
}
