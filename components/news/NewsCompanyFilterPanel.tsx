'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import type { NewsFilterCompany } from './NewsFiltersSection';
import {
  NewsFilterCheckboxOption,
  NewsFilterInlineRadioOption,
} from './NewsFilterSheet';

type CompanyFilterMode = 'all' | 'select';

type NewsCompanyFilterPanelProps = {
  companies: NewsFilterCompany[];
  selectedCompanyIds: string[];
  onToggleCompany: (companyId: string) => void;
  onClearCompanies: () => void;
  className?: string;
  id?: string;
};

export function NewsCompanyFilterPanel({
  companies,
  selectedCompanyIds,
  onToggleCompany,
  onClearCompanies,
  className,
  id,
}: NewsCompanyFilterPanelProps) {
  const [mode, setMode] = useState<CompanyFilterMode>(
    selectedCompanyIds.length > 0 ? 'select' : 'all',
  );

  useEffect(() => {
    if (selectedCompanyIds.length > 0) {
      setMode('select');
    }
  }, [selectedCompanyIds.length]);

  function handleSelectAll() {
    setMode('all');
    onClearCompanies();
  }

  function handleSelectCompanies() {
    setMode('select');
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
          checked={mode === 'all'}
          onChange={handleSelectAll}
        />
        <NewsFilterInlineRadioOption
          name="news-company-filter-mode"
          value="select"
          label="Seleccionar empresas"
          checked={mode === 'select'}
          onChange={handleSelectCompanies}
        />
      </div>

      {mode === 'select' ? (
        <div className="flex w-full flex-wrap items-start justify-center gap-x-7 gap-y-4">
          {companies.map((company) => (
            <NewsFilterCheckboxOption
              key={company.id}
              layout="dropdown"
              label={company.name}
              checked={selectedCompanyIds.includes(company.id)}
              onChange={() => onToggleCompany(company.id)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
