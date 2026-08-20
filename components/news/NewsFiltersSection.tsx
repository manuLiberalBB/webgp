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
import Image from 'next/image';

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

import { NewsCategoryFilterChip } from './NewsCategoryFilterChip';
import { NewsCompanyFilterDropdown } from './NewsCompanyFilterDropdown';
import { NewsCompanyFilterPanel, type CompanyFilterMode } from './NewsCompanyFilterPanel';
import {
  NewsFilterRadioOption,
  NewsFilterSheet,
} from './NewsFilterSheet';

export type NewsFilterCompany = {
  id: string;
  name: string;
};

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
  const [companyFilterMode, setCompanyFilterMode] = useState<CompanyFilterMode>('all');
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
  const skipAllModeSyncRef = useRef(false);

  const activeCategory = category;
  const empresaParam = searchParams.get('empresa');

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

  useEffect(() => {
    if (companyIds.length > 0) {
      setCompanyFilterMode('select');
      return;
    }

    if (!empresaParam) {
      if (skipAllModeSyncRef.current) {
        skipAllModeSyncRef.current = false;
        return;
      }

      setCompanyFilterMode('all');
    }
  }, [companyIds.length, empresaParam]);

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

    if (nextCompanyIds.length === companies.length && companies.length > 0) {
      clearCompanies();
      return;
    }

    setCompanyFilterMode('select');
    updateFilters(category, nextCompanyIds);
  }

  function clearCompanies() {
    setCompanyFilterMode('all');
    updateFilters(category, []);
  }

  function handleCompanyFilterModeChange(mode: CompanyFilterMode) {
    setCompanyFilterMode(mode);
  }

  function enterSelectCompaniesMode() {
    skipAllModeSyncRef.current = true;
    setCompanyFilterMode('select');

    if (companyIds.length > 0) {
      updateFilters(category, []);
    }
  }

  function handleCategorySelect(option: NewsFilterCategory) {
    if (option === 'Todo') {
      clearCategory();
    } else {
      updateFilters(option, companyIds);
    }

    setCategoriesSheetOpen(false);
  }

  function isCategorySelected(option: NewsFilterCategory): boolean {
    if (option === 'Todo') {
      return activeCategory === undefined || activeCategory === 'Todo';
    }

    return activeCategory === option;
  }

  function getCategoryFilterLabel(option: NewsFilterCategory): string {
    return option === 'Todo' ? 'Todas' : option;
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
        <div className="flex w-full items-center justify-center gap-[42px] layout-md:hidden">
          <button
            type="button"
            onClick={() => setCategoriesSheetOpen(true)}
            className="text-news-sidebar-link inline-flex items-center gap-1.5 py-1 text-base leading-[16.5px] underline"
          >
            Ver categorías
            <Image
              src="/icons/news/tag-outline.svg"
              alt=""
              width={21}
              height={21}
              aria-hidden
              className="size-[21px] shrink-0"
            />
          </button>

          <button
            type="button"
            onClick={() => setCompaniesSheetOpen(true)}
            className="text-news-sidebar-link inline-flex items-center gap-1.5 py-1 text-base leading-[16.5px] underline"
          >
            Ver empresas
            <Image
              src="/icons/news/building.svg"
              alt=""
              width={22}
              height={22}
              aria-hidden
              className="size-[22px] shrink-0"
            />
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden w-full flex-wrap items-center justify-between gap-3 layout-md:flex">
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
          companyFilterMode={companyFilterMode}
          onCompanyFilterModeChange={handleCompanyFilterModeChange}
          onToggleCompany={toggleCompany}
          onClearCompanies={clearCompanies}
          onEnterSelectCompaniesMode={enterSelectCompaniesMode}
        />
      </div>

      <NewsFilterSheet
        open={categoriesSheetOpen}
        title="Seleccionar categoría"
        variant="category"
        onClose={() => setCategoriesSheetOpen(false)}
      >
        <div role="radiogroup" aria-label="Categorías" className="flex flex-col gap-8">
          {NEWS_FILTER_OPTIONS.map((option) => (
            <NewsFilterRadioOption
              key={option}
              name="news-category"
              value={option}
              label={getCategoryFilterLabel(option)}
              checked={isCategorySelected(option)}
              onChange={() => handleCategorySelect(option)}
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
          companyFilterMode={companyFilterMode}
          onCompanyFilterModeChange={handleCompanyFilterModeChange}
          onToggleCompany={toggleCompany}
          onClearCompanies={clearCompanies}
          onEnterSelectCompaniesMode={enterSelectCompaniesMode}
        />
      </NewsFilterSheet>
    </section>
  );
}
