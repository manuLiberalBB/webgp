import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type NewsFilterSheetProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function NewsFilterSheet({ open, title, onClose, children }: NewsFilterSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="presentation">
      <button
        type="button"
        aria-label="Cerrar filtros"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white px-6 pt-6 pb-8"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-heading text-xl leading-7 font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-news-sidebar-link text-base leading-6 underline"
          >
            Listo
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

type NewsFilterRadioOptionProps = {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  removable?: boolean;
  onChange: () => void;
  onClear?: () => void;
};

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

export function NewsFilterRadioOption({
  name,
  value,
  label,
  checked,
  removable = false,
  onChange,
  onClear,
}: NewsFilterRadioOptionProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-3 border-b border-black/5 py-4 last:border-b-0 transition-colors hover:bg-[#f5f8fc]',
        checked && 'bg-[#0b2d4e] px-3 text-white hover:bg-[#0b2d4e]',
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="size-5 shrink-0 accent-[#123476]"
      />
      <span className="flex-1 text-base leading-6">{label}</span>
      {removable ? (
        <button
          type="button"
          aria-label={`Quitar filtro ${label}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onClear?.();
          }}
          className="inline-flex shrink-0 text-white"
        >
          <CloseIcon />
        </button>
      ) : null}
    </label>
  );
}

function NewsFilterCheckboxIndicator({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex size-6 shrink-0 items-center justify-center rounded-[3px]',
        checked ? 'bg-[#123476]' : 'border border-[#bdbdbd] bg-white',
      )}
    >
      {checked ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.75 7.25 5.75 10.25 11.25 3.75"
            stroke="white"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

function NewsFilterInlineRadioIndicator({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex size-4 shrink-0 items-center justify-center rounded-full border',
        checked ? 'border-[#123476]' : 'border-[#bdbdbd] bg-white',
      )}
    >
      {checked ? <span className="size-2 rounded-full bg-[#123476]" /> : null}
    </span>
  );
}

type NewsFilterInlineRadioOptionProps = {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

export function NewsFilterInlineRadioOption({
  name,
  value,
  label,
  checked,
  onChange,
}: NewsFilterInlineRadioOptionProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 px-2">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <NewsFilterInlineRadioIndicator checked={checked} />
      <span className="text-[14px] leading-4 tracking-[0.15px] text-[#535353] whitespace-nowrap">
        {label}
      </span>
    </label>
  );
}

type NewsFilterCheckboxOptionProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
  layout?: 'list' | 'dropdown';
};

export function NewsFilterCheckboxOption({
  label,
  checked,
  onChange,
  layout = 'list',
}: NewsFilterCheckboxOptionProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-[10px] px-1',
        layout === 'list' && 'border-b border-black/5 py-4 last:border-b-0',
        layout === 'dropdown' && 'shrink-0',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <NewsFilterCheckboxIndicator checked={checked} />
      <span className="text-[14px] leading-4 tracking-[0.15px] text-[#535353] whitespace-nowrap">
        {label}
      </span>
    </label>
  );
}
