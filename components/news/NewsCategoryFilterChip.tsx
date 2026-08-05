import type { NewsFilterCategory } from '@/lib/contentful/news/newsCategories';
import { cn } from '@/lib/utils';

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M7 7 17 17M17 7 7 17"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

type NewsCategoryFilterChipProps = {
  label: NewsFilterCategory;
  isActive: boolean;
  onClick: () => void;
};

export function NewsCategoryFilterChip({
  label,
  isActive,
  onClick,
}: NewsCategoryFilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-1 rounded-lg border px-[17px] py-[9px] text-sm leading-[18px] whitespace-nowrap transition-colors',
        isActive
          ? 'border-[#0b2d4e] bg-[#0b2d4e] text-white'
          : 'border-black/10 bg-white text-[#555555] hover:border-[#0b2d4e] hover:bg-[#f5f8fc]',
      )}
    >
      <span>{label}</span>
      {isActive ? <CloseIcon /> : null}
    </button>
  );
}
