'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import { NewsCompanyFilterPanel } from './NewsCompanyFilterPanel';
import type { NewsFilterCompany } from './NewsFiltersSection';

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
      aria-hidden
      className={cn('shrink-0 transition-transform', className)}
    >
      <path
        d="M1 1.5 4 4.5 7 1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getCompanyFilterLabel(
  selectedCompanyIds: string[],
  companies: NewsFilterCompany[],
): string {
  if (selectedCompanyIds.length === 0) {
    return 'Todas';
  }

  if (selectedCompanyIds.length === 1) {
    return companies.find((company) => company.id === selectedCompanyIds[0])?.name ?? 'Todas';
  }

  return `${selectedCompanyIds.length} empresas`;
}

type NewsCompanyFilterDropdownProps = {
  companies: NewsFilterCompany[];
  selectedCompanyIds: string[];
  onToggleCompany: (companyId: string) => void;
  onClearCompanies: () => void;
};

export function NewsCompanyFilterDropdown({
  companies,
  selectedCompanyIds,
  onToggleCompany,
  onClearCompanies,
}: NewsCompanyFilterDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden w-full flex-col items-center gap-7 md:flex">
      <div className="flex items-center gap-1.5 py-1">
        <span className="text-sm leading-[13.5px] tracking-[1.62px] text-[#bbbbbb]">
          Filtrar por empresa:
        </span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="news-company-filter-panel"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex items-center gap-1.5 py-1 text-sm leading-[16.5px] text-[#777777]"
        >
          {getCompanyFilterLabel(selectedCompanyIds, companies)}
          <ChevronDownIcon className={open ? 'rotate-180' : undefined} />
        </button>
      </div>

      {open ? (
        <NewsCompanyFilterPanel
          id="news-company-filter-panel"
          companies={companies}
          selectedCompanyIds={selectedCompanyIds}
          onToggleCompany={onToggleCompany}
          onClearCompanies={onClearCompanies}
        />
      ) : null}
    </div>
  );
}
