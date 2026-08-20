import Image from 'next/image';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type NewsFilterSheetProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  variant?: 'bottom-sheet' | 'category';
};

export function NewsFilterSheet({
  open,
  title,
  onClose,
  children,
  variant = 'bottom-sheet',
}: NewsFilterSheetProps) {
  if (!open) return null;

  const isCategoryVariant = variant === 'category';

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
        className={cn(
          'absolute bg-white',
          isCategoryVariant
            ? 'inset-x-6 top-1/2 max-h-[85vh] -translate-y-1/2 overflow-y-auto rounded-[10px] px-[18px] py-6'
            : 'inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl px-6 pt-6 pb-8',
        )}
      >
        {isCategoryVariant ? (
          <div className="flex flex-col gap-8">
            <h2 className="text-card-title w-full text-[22px] leading-normal font-semibold">
              {title}
            </h2>
            {children}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

type NewsFilterRadioOptionProps = {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

export function NewsFilterRadioOption({
  name,
  value,
  label,
  checked,
  onChange,
}: NewsFilterRadioOptionProps) {
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
      <Image
        src={checked ? '/icons/news/radio-checked.svg' : '/icons/news/radio-unchecked.svg'}
        alt=""
        width={16}
        height={16}
        aria-hidden
        className="size-4 shrink-0"
      />
      <span className="text-[20px] leading-4 tracking-[0.15px] text-[#535353] whitespace-nowrap">
        {label}
      </span>
    </label>
  );
}

function NewsFilterCheckboxIndicator({
  checked,
  variant = 'selected',
}: {
  checked: boolean;
  variant?: 'selected' | 'all';
}) {
  if (!checked) {
    return (
      <span aria-hidden className="flex size-6 shrink-0 items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M16 0C17.1 0 18 0.9 18 2V16C18 17.1 17.1 18 16 18H2C0.9 18 0 17.1 0 16V2C0 0.9 0.9 0 2 0H16ZM2 2V16H16V2H2Z"
            fill="#535353"
          />
        </svg>
      </span>
    );
  }

  if (variant === 'all') {
    return (
      <span aria-hidden className="flex size-6 shrink-0 items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0Z"
            fill="#BBBBBB"
          />
          <path
            d="M7 14L2 8.99999L3.41 7.58999L7 11.17L14.59 3.57999L16 4.99999L7 14Z"
            fill="white"
          />
        </svg>
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className="flex size-6 shrink-0 items-center justify-center rounded-[3px] bg-[#123476]"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2.75 7.25 5.75 10.25 11.25 3.75"
          stroke="white"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
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
  checkedVariant?: 'selected' | 'all';
  disabled?: boolean;
};

export function NewsFilterCheckboxOption({
  label,
  checked,
  onChange,
  layout = 'list',
  checkedVariant = 'selected',
  disabled = false,
}: NewsFilterCheckboxOptionProps) {
  return (
    <label
      className={cn(
        'flex items-center gap-2 rounded-[10px] px-1',
        disabled ? 'cursor-default' : 'cursor-pointer',
        layout === 'list' && 'border-b border-black/5 py-4 last:border-b-0',
        layout === 'dropdown' && 'shrink-0',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={disabled ? undefined : onChange}
        className="sr-only"
      />
      <NewsFilterCheckboxIndicator checked={checked} variant={checkedVariant} />
      <span className="text-[14px] leading-4 tracking-[0.15px] text-[#535353] whitespace-nowrap">
        {label}
      </span>
    </label>
  );
}
