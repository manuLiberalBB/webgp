import Image from 'next/image';

import type { StrategicSectorGridItem } from '@/lib/contentful/strategicSector/types';
import { cn } from '@/lib/utils';

type StrategicSectorCardProps = {
  item: StrategicSectorGridItem;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
};

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0">
      <path
        d="M2.25 6h6.75M6.75 3.75 9.75 6l-3 2.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StrategicSectorCard({
  item,
  isSelected = false,
  onSelect,
  className,
}: StrategicSectorCardProps) {
  const ctaClassName =
    'inline-flex items-center gap-2 text-xs leading-[18px] font-semibold text-white transition-opacity group-hover:opacity-80';

  const textContent = (
    <div className="relative z-10 flex w-full flex-col gap-3">
      <h3 className="text-xl font-bold leading-6 text-white">{item.title}</h3>

      {item.description ? (
        <p className="text-xs leading-[19.5px] font-normal text-white">{item.description}</p>
      ) : null}

      <span className={ctaClassName}>
        {item.linkLabel}
        <ArrowRightIcon />
      </span>
    </div>
  );

  const cardClassName = cn(
    'group relative flex h-[381px] w-full min-w-0 cursor-pointer flex-col justify-end overflow-hidden rounded-lg px-4 py-5 text-left transition-shadow',
    isSelected && 'ring-2 ring-cta ring-offset-2',
    className,
  );

  const overlay = (
    <>
      <Image
        src={item.imageUrl}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 1024px) 50vw, 240px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 rounded-lg bg-black/60 transition-opacity',
          isSelected && 'bg-black/50',
        )}
      />
    </>
  );

  return (
    <button type="button" onClick={onSelect} className={cardClassName} aria-pressed={isSelected}>
      {overlay}
      {textContent}
    </button>
  );
}
