import { cn } from '@/lib/utils';

type HomeHeroCarouselDotsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

export function HomeHeroCarouselDots({
  count,
  activeIndex,
  onSelect,
  className,
}: HomeHeroCarouselDotsProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-[9px] bg-white py-[10px]',
        className,
      )}
      role="tablist"
      aria-label="Seleccionar hero"
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`Hero ${index + 1}`}
            aria-selected={isActive}
            onClick={() => onSelect(index)}
            className={cn(
              'size-[13px] shrink-0 rounded-full transition-colors',
              isActive ? 'bg-heading' : 'bg-[#d1d5db]',
            )}
          />
        );
      })}
    </div>
  );
}
