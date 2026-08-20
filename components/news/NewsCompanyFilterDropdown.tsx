'use client';

import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import { NewsCompanyFilterChip } from './NewsCompanyFilterChip';
import { NewsCompanyFilterPanel, type CompanyFilterMode } from './NewsCompanyFilterPanel';
import type { NewsFilterCompany } from './NewsFiltersSection';

const MAX_VISIBLE_COMPANY_CHIPS = 3;

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
      <path d="M4 0L0 6H8L4 0Z" fill="currentColor" />
    </svg>
  );
}

type NewsCompanyFilterDropdownProps = {
  companies: NewsFilterCompany[];
  selectedCompanyIds: string[];
  companyFilterMode: CompanyFilterMode;
  onCompanyFilterModeChange: (mode: CompanyFilterMode) => void;
  onToggleCompany: (companyId: string) => void;
  onClearCompanies: () => void;
  onEnterSelectCompaniesMode: () => void;
};

export function NewsCompanyFilterDropdown({
  companies,
  selectedCompanyIds,
  companyFilterMode,
  onCompanyFilterModeChange,
  onToggleCompany,
  onClearCompanies,
  onEnterSelectCompaniesMode,
}: NewsCompanyFilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedCompanies = useMemo(
    () =>
      selectedCompanyIds
        .map((id) => companies.find((company) => company.id === id))
        .filter((company): company is NewsFilterCompany => Boolean(company)),
    [companies, selectedCompanyIds],
  );

  const visibleCompanies = selectedCompanies.slice(0, MAX_VISIBLE_COMPANY_CHIPS);
  const remainingCompaniesCount = Math.max(
    selectedCompanies.length - MAX_VISIBLE_COMPANY_CHIPS,
    0,
  );

  return (
    <div className="hidden w-full flex-col items-center gap-7 layout-md:flex">
      <div className="flex items-center gap-1.5 py-1">
        <span className="text-[14px] leading-[13.5px] tracking-[1.62px] text-[#bbb] whitespace-nowrap">
          Filtrar por empresa:
        </span>
        {selectedCompanies.length === 0 ? (
          <button
            type="button"
            aria-expanded={open}
            aria-controls="news-company-filter-panel"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex items-center gap-1.5 py-1 text-[#777777]"
          >
            <span className="text-sm leading-[16.5px]">Todas</span>
            <ChevronDownIcon className={open ? 'rotate-180' : undefined} />
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 py-1">
            <span className="flex flex-wrap items-center gap-1.5">
              {visibleCompanies.map((company) => (
                <NewsCompanyFilterChip
                  key={company.id}
                  label={company.name}
                  onRemove={() => onToggleCompany(company.id)}
                />
              ))}
              {remainingCompaniesCount > 0 ? (
                <span className="text-[14px] leading-4 tracking-[0.15px] text-[#006667] whitespace-nowrap">
                  y{' '}
                  {remainingCompaniesCount === 1
                    ? '1 empresa más'
                    : `${remainingCompaniesCount} empresas más`}
                </span>
              ) : null}
            </span>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="news-company-filter-panel"
              aria-label="Abrir filtro de empresas"
              onClick={() => setOpen((current) => !current)}
              className="inline-flex shrink-0 text-[#777777]"
            >
              <ChevronDownIcon className={open ? 'rotate-180' : undefined} />
            </button>
          </div>
        )}
      </div>

      {open ? (
        <NewsCompanyFilterPanel
          id="news-company-filter-panel"
          companies={companies}
          selectedCompanyIds={selectedCompanyIds}
          companyFilterMode={companyFilterMode}
          onCompanyFilterModeChange={onCompanyFilterModeChange}
          onToggleCompany={onToggleCompany}
          onClearCompanies={onClearCompanies}
          onEnterSelectCompaniesMode={onEnterSelectCompaniesMode}
        />
      ) : null}
    </div>
  );
}
