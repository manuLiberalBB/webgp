import type { Metadata } from 'next';

import { NewsDetailView } from '@/components/news/NewsDetailView';
import { PageRenderer } from '@/components/blocks/PageRenderer';
import { getNewsByPath, getNewsMetadataFields, getPageByPath } from '@/lib/contentful/queries';
import { fetchSectorEntryByPagePath } from '@/lib/contentful/sector/fetchSectorEntryByPagePath';
import { isSectorPage } from '@/lib/contentful/sector/isSectorPage';
import type { SectorFields } from '@/lib/contentful/types/sector';
import {
  formatPageKeywords,
  type NewsFields,
  type PageFields,
  type PageProps,
} from '@/lib/contentful/types';
import { getLinkHref } from '@/lib/contentful/types/link';
import { buildNewsMetaDescription } from '@/lib/news/buildNewsMetaDescription';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { page } = await params;
  const entries = await getPageByPath(page);

  if (entries.items.length > 0) {
    const fields = entries.items[0].fields as PageFields;
    const isHome = getLinkHref(fields.path) === '/inicio';

    return {
      title: `${isHome ? '' : `${fields.title} | `}Grupo Petersen`,
      description: fields.metaDescription,
      keywords: formatPageKeywords(fields.keywords),
    };
  }

  if (isSectorPage(page)) {
    const sectorEntry = await fetchSectorEntryByPagePath(page);

    if (sectorEntry?.fields.name) {
      const sectorFields = sectorEntry.fields as SectorFields;

      return {
        title: `${sectorFields.name} | Grupo Petersen`,
        description: sectorFields.description,
      };
    }
  }

  const newsFields = await getNewsMetadataFields(page);

  if (!newsFields) {
    return { title: 'Grupo Petersen' };
  }

  const fields = newsFields as Pick<NewsFields, 'noticeTitle' | 'subtitle' | 'content'>;

  return {
    title: `${fields.noticeTitle} | Grupo Petersen`,
    description: buildNewsMetaDescription(fields),
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { page } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const entries = await getPageByPath(page);

  if (entries.items.length > 0) {
    const fields = entries.items[0].fields as PageFields;

    return (
      <PageRenderer
        content={fields.content}
        pagePath={page}
        searchParams={resolvedSearchParams}
      />
    );
  }

  if (isSectorPage(page)) {
    const sectorEntry = await fetchSectorEntryByPagePath(page);

    if (sectorEntry) {
      return (
        <PageRenderer
          content={[]}
          pagePath={page}
          searchParams={resolvedSearchParams}
        />
      );
    }
  }

  const newsEntries = await getNewsByPath(page);

  if (newsEntries.items.length === 0) {
    const { notFound } = await import('next/navigation');
    notFound();
  }

  const newsEntry = newsEntries.items[0];
  const newsFields = newsEntry.fields as NewsFields;

  return (
    <NewsDetailView
      fields={newsFields}
      publishedAt={newsEntry.sys.createdAt}
    />
  );
}
