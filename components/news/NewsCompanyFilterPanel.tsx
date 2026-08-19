'use client';

import { cn } from '@/lib/utils';

import type { NewsFilterCompany } from './NewsFiltersSection';
import {
  NewsFilterCheckboxOption,
  NewsFilterInlineRadioOption,
} from './NewsFilterSheet';

export type CompanyFilterMode = 'all' | 'select';

type NewsCompanyFilterPanelProps = {
  companies: NewsFilterCompany[];
  selectedCompanyIds: string[];
  companyFilterMode: CompanyFilterMode;
  onCompanyFilterModeChange: (mode: CompanyFilterMode) => void;
  onToggleCompany: (companyId: string) => void;
  onClearCompanies: () => void;
  onEnterSelectCompaniesMode: () => void;
  className?: string;
  id?: string;
};

function isCompanyChecked(
  companyId: string,
  companyFilterMode: CompanyFilterMode,
  selectedCompanyIds: string[],
): boolean {
  return companyFilterMode === 'all' || selectedCompanyIds.includes(companyId);
}

export function NewsCompanyFilterPanel({
  companies,
  selectedCompanyIds,
  companyFilterMode,
  onCompanyFilterModeChange,
  onToggleCompany,
  onClearCompanies,
  onEnterSelectCompaniesMode,
  className,
  id,
}: NewsCompanyFilterPanelProps) {
  const isAllMode = companyFilterMode === 'all';

  function handleSelectAll() {
    onCompanyFilterModeChange('all');
    onClearCompanies();
  }

  function handleSelectCompanies() {
    onEnterSelectCompaniesMode();
  }

  return (
    <div
      id={id}
      className={cn('flex w-full flex-col items-center gap-7', className)}
    >
      <div
        role="radiogroup"
        aria-label="Modo de filtro por empresa"
        className="flex flex-wrap items-center justify-center gap-7"
      >
        <NewsFilterInlineRadioOption
          name="news-company-filter-mode"
          value="all"
          label="Todas"
          checked={companyFilterMode === 'all'}
          onChange={handleSelectAll}
        />
        <NewsFilterInlineRadioOption
          name="news-company-filter-mode"
          value="select"
          label="Seleccionar empresas"
          checked={companyFilterMode === 'select'}
          onChange={handleSelectCompanies}
        />
      </div>

      <div className="flex w-full flex-wrap items-start justify-center gap-x-7 gap-y-4">
        {companies.map((company) => (
          <NewsFilterCheckboxOption
            key={company.id}
            layout="dropdown"
            label={company.name}
            checked={isCompanyChecked(company.id, companyFilterMode, selectedCompanyIds)}
            checkedVariant={isAllMode ? 'all' : 'selected'}
            disabled={isAllMode}
            onChange={() => onToggleCompany(company.id)}
          />
        ))}
      </div>
    </div>
  );
}
