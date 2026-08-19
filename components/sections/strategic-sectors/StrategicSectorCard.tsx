import { AppImage as Image } from '@/components/cms/AppImage';

import type { StrategicSectorGridItem } from '@/lib/contentful/strategicSector/types';
import { CARD_IMAGE_OVERLAY_GRADIENT } from '@/lib/ui/cardImageOverlayGradient';
import { cn } from '@/lib/utils';

type StrategicSectorCardProps = {
  item: StrategicSectorGridItem;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
};

function ArrowIcon({ isSelected = false }: { isSelected?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={cn(
        'shrink-0 transition-transform duration-300',
        isSelected && 'rotate-90',
      )}
    >
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
    'inline-flex items-center gap-2 text-sm leading-5 font-semibold text-white transition-opacity group-hover:opacity-80';

  const textContent = (
    <div className="relative z-10 flex w-full flex-col gap-2 md:gap-3">
      <h3 className="min-h-0 text-[22px] leading-7 font-bold text-white line-clamp-2 md:min-h-14">
        {item.title}
      </h3>

      <p className="min-h-0 text-base leading-6 font-normal text-white line-clamp-2 md:min-h-[4.5rem] md:line-clamp-3">
        {item.description ?? '\u00A0'}
      </p>

      <span className={cn(ctaClassName, 'shrink-0')}>
        {item.linkLabel}
        <ArrowIcon isSelected={isSelected} />
      </span>
    </div>
  );

  const cardClassName = cn(
    'group relative flex h-[280px] w-full min-w-0 cursor-pointer flex-col justify-end overflow-hidden rounded-lg px-4 py-4 text-left transition-shadow md:h-[381px] md:py-5',
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
        className="absolute inset-0 rounded-lg"
        style={{ background: CARD_IMAGE_OVERLAY_GRADIENT }}
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
