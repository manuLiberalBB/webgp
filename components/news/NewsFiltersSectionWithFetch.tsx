import { Suspense } from 'react';

import { COMPACT_SECTION_BOTTOM, COMPACT_SECTION_TOP } from '@/lib/layout/sectionPadding';
import { getNewsFilterCompanies } from '@/lib/contentful/queries';
import { cn } from '@/lib/utils';

import { NewsFiltersSection } from './NewsFiltersSection';

type NewsFiltersSectionWithFetchProps = {
  compactTop?: boolean;
  compactBottom?: boolean;
};

function NewsFiltersSectionFallback({
  compactTop = false,
  compactBottom = false,
}: NewsFiltersSectionWithFetchProps) {
  return (
    <section
      className={cn(
        'bg-white px-6 py-10 md:px-layout-x md:py-section-y',
        compactTop && COMPACT_SECTION_TOP,
        compactBottom && COMPACT_SECTION_BOTTOM,
      )}
    >
      <div className="mx-auto h-40 w-full max-w-content animate-pulse rounded-lg bg-black/5" />
    </section>
  );
}

export async function NewsFiltersSectionWithFetch({
  compactTop = false,
  compactBottom = false,
}: NewsFiltersSectionWithFetchProps) {
  const companies = await getNewsFilterCompanies();

  return (
    <Suspense fallback={<NewsFiltersSectionFallback compactTop={compactTop} compactBottom={compactBottom} />}>
      <NewsFiltersSection
        companies={companies}
        className={cn(
          compactTop && COMPACT_SECTION_TOP,
          compactBottom && COMPACT_SECTION_BOTTOM,
        )}
      />
    </Suspense>
  );
}
