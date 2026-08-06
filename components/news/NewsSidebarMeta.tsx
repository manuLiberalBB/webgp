import type { ReactNode } from 'react';

import { NewsSidebarSectionTitle } from '@/components/news/sidebar/NewsSidebarPrimitives';
import { NewsCategoryBadge } from '@/components/news/NewsCategoryBadge';
import { BuildingIcon, ClockIcon } from '@/components/news/icons/NewsMetaIcons';
import type { NewsArticleContext } from '@/lib/news/types';
import { cn } from '@/lib/utils';

type NewsSidebarMetaProps = {
  meta: NewsArticleContext;
  companyWebsiteUrl?: string;
  className?: string;
};

function MetaField({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <NewsSidebarSectionTitle>{label}</NewsSidebarSectionTitle>
      <div className="pt-2">{children}</div>
    </div>
  );
}

export function NewsSidebarMeta({
  meta,
  companyWebsiteUrl,
  className,
}: NewsSidebarMetaProps) {
  return (
    <section className={cn('w-full', className)} aria-label="Metadatos de la noticia">
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-1 lg:gap-x-0">
        <MetaField label="Categoría">
          {meta.category ? <NewsCategoryBadge category={meta.category} /> : null}
        </MetaField>

        <MetaField label="Empresa">
          {meta.companyName ? (
            <div className="flex items-center gap-1.5">
              <BuildingIcon className="text-news-meta shrink-0" />
              {companyWebsiteUrl ? (
                <a
                  href={companyWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nav text-sm leading-5 underline"
                >
                  {meta.companyName}
                </a>
              ) : (
                <span className="text-nav text-sm leading-5 underline">{meta.companyName}</span>
              )}
            </div>
          ) : null}
        </MetaField>

        <MetaField label="Publicado">
          <p className="text-news-meta text-sm leading-5">{meta.publishDate}</p>
        </MetaField>

        <MetaField label="Lectura">
          <div className="text-news-meta flex items-center gap-1.5 text-sm leading-5">
            <ClockIcon className="shrink-0" />
            <span>{meta.readingMinutes} minutos</span>
          </div>
        </MetaField>
      </div>
    </section>
  );
}
