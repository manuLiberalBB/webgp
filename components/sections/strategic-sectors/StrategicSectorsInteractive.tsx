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

function getDesktopContainerClassName(itemCount: number) {
  if (itemCount === 1) return 'md:flex md:max-w-sm';

  return 'md:grid md:grid-cols-2 lg:flex';
}

function getDesktopCardClassName(isSelected: boolean, itemCount: number) {
  if (itemCount <= 1) return undefined;

  return cn(
    'lg:min-w-0 lg:transition-[flex-grow,flex-shrink,flex-basis] lg:duration-300 lg:ease-out',
    isSelected ? 'lg:flex-[1.35]' : 'lg:flex-[0.9]',
  );
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
              <h2 className="text-[2rem] leading-tight font-semibold tracking-[-0.96px] text-black md:text-[3rem] md:leading-[3.75rem]">
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
                className="w-[calc(100vw-3.5rem)] max-w-[340px] shrink-0 snap-start snap-always md:w-full md:max-w-none"
              />
            ))}
          </div>
        </div>

        <div
          className={cn(
            'hidden w-full min-w-0 gap-3 md:grid',
            getDesktopContainerClassName(items.length),
          )}
        >
          {items.map((item) => {
            const isSelected = selectedId === item.id;

            return (
              <StrategicSectorCard
                key={item.id}
                item={item}
                isSelected={isSelected}
                onSelect={() => setSelectedId(item.id)}
                className={getDesktopCardClassName(isSelected, items.length)}
              />
            );
          })}
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
