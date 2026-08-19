'use client';

type NewsCompanyFilterChipProps = {
  label: string;
  onRemove: () => void;
};

function ChipCloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M4.26667 12.6667L3.33333 11.7333L7.06667 8L3.33333 4.26667L4.26667 3.33333L8 7.06667L11.7333 3.33333L12.6667 4.26667L8.93333 8L12.6667 11.7333L11.7333 12.6667L8 8.93333L4.26667 12.6667Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function NewsCompanyFilterChip({ label, onRemove }: NewsCompanyFilterChipProps) {
  return (
    <span className="inline-flex items-center rounded-[6px] bg-[#d2e4f3] px-2 py-1 text-[#006667]">
      <span className="inline-flex items-center gap-2">
        <span className="text-[14px] leading-4 tracking-[0.15px] whitespace-nowrap">
          {label}
        </span>
        <button
          type="button"
          aria-label={`Quitar filtro ${label}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRemove();
          }}
          className="inline-flex shrink-0 text-[#006667]"
        >
          <ChipCloseIcon />
        </button>
      </span>
    </span>
  );
}
