'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from 'react';

import {
  buildNewsFilterHref,
  parseNewsSearchParams,
  resolveCompanyNamesToIds,
} from '@/lib/contentful/news/newsListFilters';
import {
  NEWS_FILTER_OPTIONS,
  type NewsFilterCategory,
} from '@/lib/contentful/news/newsCategories';
import { NEWS_SEARCH_DEBOUNCE_MS, useDebouncedValue } from '@/lib/hooks/useDebouncedValue';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

import { NewsCategoryFilterChip } from './NewsCategoryFilterChip';
import { NewsCompanyFilterDropdown } from './NewsCompanyFilterDropdown';
import { NewsCompanyFilterPanel } from './NewsCompanyFilterPanel';
import {
  NewsFilterRadioOption,
  NewsFilterSheet,
} from './NewsFilterSheet';

export type NewsFilterCompany = {
  id: string;
  name: string;
};

function TagOutlineIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M20 12.5 12.5 20a2 2 0 0 1-2.83 0l-6.34-6.34a2 2 0 0 1-.58-1.41V7.41A2 2 0 0 1 5.24 6h4.84a2 2 0 0 1 1.41.58L20 12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="9.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M4 20V6.5A1.5 1.5 0 0 1 5.5 5H10v15M10 10h4M10 14h4M14 20V9.5A1.5 1.5 0 0 1 15.5 8H20v12M4 20h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type NewsFiltersSectionProps = {
  companies?: NewsFilterCompany[];
  className?: string;
};

export function NewsFiltersSection({
  companies = [],
  className,
}: NewsFiltersSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categoriesSheetOpen, setCategoriesSheetOpen] = useState(false);
  const [companiesSheetOpen, setCompaniesSheetOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { category, companyIds, query } = useMemo(() => {
    const parsed = parseNewsSearchParams(
      Object.fromEntries(searchParams.entries()),
    );

    return {
      category: parsed.category,
      companyIds: resolveCompanyNamesToIds(parsed.companyNames, companies),
      query: parsed.query ?? '',
    };
  }, [searchParams, companies]);

  const [searchInput, setSearchInput] = useState(query);
  const debouncedSearchInput = useDebouncedValue(searchInput, NEWS_SEARCH_DEBOUNCE_MS);
  const pendingUrlQueryRef = useRef<string | null>(null);

  const activeCategory = category;

  const syncFiltersToUrl = useCallback(
    (
      nextCategory: NewsFilterCategory | undefined,
      nextCompanyIds: string[],
      nextQuery: string,
    ) => {
      startTransition(() => {
        router.replace(
          buildNewsFilterHref(
            pathname,
            nextCategory,
            nextCompanyIds,
            companies,
            nextQuery,
          ),
          { scroll: false },
        );
      });
    },
    [companies, pathname, router],
  );

  useEffect(() => {
    const nextQuery = debouncedSearchInput.trim();
    const currentQuery = query.trim();

    if (nextQuery === currentQuery) {
      pendingUrlQueryRef.current = null;
      return;
    }

    pendingUrlQueryRef.current = nextQuery;
    syncFiltersToUrl(category, companyIds, nextQuery);
  }, [category, companyIds, debouncedSearchInput, query, syncFiltersToUrl]);

  useEffect(() => {
    const urlQuery = query.trim();

    if (pendingUrlQueryRef.current !== null) {
      if (urlQuery === pendingUrlQueryRef.current) {
        pendingUrlQueryRef.current = null;
      }
      return;
    }

    setSearchInput((current) => (urlQuery === current.trim() ? current : query));
  }, [query]);

  function updateFilters(
    nextCategory: NewsFilterCategory | undefined,
    nextCompanyIds: string[],
    nextQuery?: string,
  ) {
    const resolvedQuery = nextQuery !== undefined ? nextQuery : searchInput.trim();
    pendingUrlQueryRef.current = resolvedQuery;
    syncFiltersToUrl(nextCategory, nextCompanyIds, resolvedQuery);
  }

  function clearCategory() {
    updateFilters(undefined, companyIds);
  }

  function handleCategoryClick(option: NewsFilterCategory) {
    if (activeCategory === option) {
      clearCategory();
      return;
    }

    updateFilters(option, companyIds);
  }

  function toggleCompany(companyId: string) {
    const nextCompanyIds = companyIds.includes(companyId)
      ? companyIds.filter((id) => id !== companyId)
      : [...companyIds, companyId];

    updateFilters(category, nextCompanyIds);
  }

  function clearCompanies() {
    updateFilters(category, []);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchInput.trim();
    pendingUrlQueryRef.current = nextQuery;
    syncFiltersToUrl(category, companyIds, nextQuery);
  }

  return (
    <section
      className={cn(
        'bg-white px-6 py-10 md:px-layout-x md:py-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-7">
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-[36.25rem] items-center rounded-lg border border-card-border bg-white px-6 py-5 md:h-12 md:py-0"
        >
          <input
            type="search"
            placeholder="Buscar noticias..."
            aria-label="Buscar noticias"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="text-card-description w-full bg-transparent text-base leading-5 outline-none placeholder:text-card-description md:text-sm"
          />
        </form>

        {isPending ? (
          <div
            className="text-card-description flex items-center justify-center gap-2 text-sm leading-5"
            aria-live="polite"
          >
            <LoadingSpinner size="sm" label="Actualizando resultados" />
            <span>Actualizando resultados...</span>
          </div>
        ) : null}

        {/* Mobile */}
        <div className="flex w-full items-center justify-center gap-[42px] md:hidden">
          <button
            type="button"
            onClick={() => setCategoriesSheetOpen(true)}
            className="text-news-sidebar-link inline-flex items-center gap-1.5 py-1 text-base leading-[16.5px] underline"
          >
            Ver categorías
            <TagOutlineIcon />
          </button>

          <button
            type="button"
            onClick={() => setCompaniesSheetOpen(true)}
            className="text-news-sidebar-link inline-flex items-center gap-1.5 py-1 text-base leading-[16.5px] underline"
          >
            Ver empresas
            <BuildingIcon />
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden w-full flex-wrap items-center justify-between gap-3 md:flex">
          {NEWS_FILTER_OPTIONS.map((option) => (
            <NewsCategoryFilterChip
              key={option}
              label={option}
              isActive={activeCategory === option}
              onClick={() => handleCategoryClick(option)}
            />
          ))}
        </div>

        <NewsCompanyFilterDropdown
          companies={companies}
          selectedCompanyIds={companyIds}
          onToggleCompany={toggleCompany}
          onClearCompanies={clearCompanies}
        />
      </div>

      <NewsFilterSheet
        open={categoriesSheetOpen}
        title="Seleccionar categoría"
        onClose={() => setCategoriesSheetOpen(false)}
      >
        <div role="radiogroup" aria-label="Categorías">
          {NEWS_FILTER_OPTIONS.map((option) => (
            <NewsFilterRadioOption
              key={option}
              name="news-category"
              value={option}
              label={option}
              checked={activeCategory === option}
              removable={activeCategory === option}
              onChange={() => {
                handleCategoryClick(option);
                setCategoriesSheetOpen(false);
              }}
              onClear={() => {
                clearCategory();
                setCategoriesSheetOpen(false);
              }}
            />
          ))}
        </div>
      </NewsFilterSheet>

      <NewsFilterSheet
        open={companiesSheetOpen}
        title="Seleccionar empresas"
        onClose={() => setCompaniesSheetOpen(false)}
      >
        <NewsCompanyFilterPanel
          companies={companies}
          selectedCompanyIds={companyIds}
          onToggleCompany={toggleCompany}
          onClearCompanies={clearCompanies}
        />
      </NewsFilterSheet>
    </section>
  );
}
