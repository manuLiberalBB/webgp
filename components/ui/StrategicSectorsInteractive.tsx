'use client';

import { useState } from 'react';

import type { StrategicSectorGridItem } from '@/lib/contentful/strategicSector/types';
import { cn } from '@/lib/utils';

import { StrategicSectorCard } from './StrategicSectorCard';
import { StrategicSectorDetailPanel } from './StrategicSectorDetailPanel';
import { StrategicSectorRelatedCompanies } from './StrategicSectorRelatedCompanies';

type StrategicSectorsInteractiveProps = {
  title?: string;
  subtitle?: string;
  items: StrategicSectorGridItem[];
  className?: string;
};

function getDesktopGridClassName(itemCount: number) {
  if (itemCount === 1) return 'max-w-sm';
  if (itemCount === 2) return 'md:grid-cols-2';
  if (itemCount === 3) return 'md:grid-cols-2 lg:grid-cols-3';
  if (itemCount === 4) return 'md:grid-cols-2 lg:grid-cols-4';
  return 'md:grid-cols-2 lg:grid-cols-5';
}

export function StrategicSectorsInteractive({
  title,
  subtitle,
  items,
  className,
}: StrategicSectorsInteractiveProps) {
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);
  const selectedItem = items.find((item) => item.id === selectedId) ?? null;

  return (
    <section
      className={cn(
        'overflow-x-hidden bg-white px-6 py-12 md:px-layout-x md:py-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full min-w-0 max-w-content flex-col gap-12">
        {(title || subtitle) && (
          <div className="flex flex-col gap-5">
            {title ? (
              <h2 className="text-heading text-[2rem] leading-tight font-semibold tracking-[-0.96px] md:text-[3rem] md:leading-[3.75rem]">
                {title}
              </h2>
            ) : null}

            {subtitle ? (
              <p className="max-w-[54.875rem] text-lg leading-[22.75px] text-[#6b6358] md:text-xl">
                {subtitle}
              </p>
            ) : null}
          </div>
        )}

        <div className="md:hidden -mx-6 min-w-0 overflow-x-auto overscroll-x-contain px-6 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max min-w-full snap-x snap-mandatory gap-3">
            {items.map((item) => (
              <StrategicSectorCard
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                onSelect={() => setSelectedId(item.id)}
                className="w-[78vw] max-w-[280px] shrink-0 snap-start snap-always"
              />
            ))}
          </div>
        </div>

        <div
          className={cn(
            'hidden w-full min-w-0 gap-3 md:grid',
            getDesktopGridClassName(items.length),
          )}
        >
          {items.map((item) => (
            <StrategicSectorCard
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              onSelect={() => setSelectedId(item.id)}
            />
          ))}
        </div>

        {selectedItem ? (
          <>
            <StrategicSectorDetailPanel item={selectedItem} />
            <StrategicSectorRelatedCompanies items={selectedItem.relatedCompanies} />
          </>
        ) : null}
      </div>
    </section>
  );
}
