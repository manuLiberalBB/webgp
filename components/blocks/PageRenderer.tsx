import type { Entry } from 'contentful';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import { AfterHeroSectionWrap } from '@/components/layout/AfterHeroSectionWrap';
import { PageContentReady } from '@/components/layout/PageLoadCoordinator';

import { AllNewsSectionWithFetch } from '@/components/news/AllNewsSectionWithFetch';
import { NewsResultsLoading } from '@/components/news/NewsResultsLoading';
import { I3ConversationsPanel } from '@/components/ui/I3ConversationsPanel';
import { I3InnovationSplitSection } from '@/components/ui/I3InnovationSplitSection';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import {
  hasActiveNewsUrlFilters,
  parseNewsSearchParams,
} from '@/lib/contentful/news/newsListFilters';
import { resolveVideoItems } from '@/lib/contentful/video/resolveVideoItem';
import { isSectorPage } from '@/lib/contentful/sector/isSectorPage';

import { SectorCompaniesSectionWithFetch } from './SectorCompaniesSectionWithFetch';
import { SectorPageHeroWithFetch } from './SectorPageHeroWithFetch';
import { blockRegistry } from './registry';
import type { BlockComponentProps } from './registry';

import {
  type GridSectionFields,
  isI3ConversationsSectionContentfulName,
  isI3InnovationSectionContentfulName,
} from '@/lib/contentful/types/gridSection';
import { resolveGridSectionAnchorId } from '@/lib/navigation/resolveGridSectionAnchorId';
import { SECTION_PADDING } from '@/lib/layout/sectionPadding';

type PageRendererProps = {
  content?: Entry[];
  pagePath?: string[];
  searchParams?: Record<string, string | string[] | undefined>;
};

function isNewsListingPage(pagePath?: string[]) {
  return pagePath?.length === 1 && pagePath[0] === 'noticias';
}

function hasBannerBlock(content: Entry[]): boolean {
  return content.some((entry) => entry.sys.contentType?.sys.id === 'banner');
}

function getGridSectionFields(entry: Entry): GridSectionFields {
  return entry.fields as GridSectionFields;
}

function renderBlock(
  entry: Entry,
  pagePath?: string[],
  searchParams?: Record<string, string | string[] | undefined>,
) {
  const contentTypeId = entry.sys.contentType?.sys.id;
  if (!contentTypeId) return null;

  const Block = blockRegistry[contentTypeId];
  if (!Block) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <Section key={entry.sys.id} className="bg-surface-muted">
          <Container>
            <p className="text-sm text-text-muted">
              Bloque sin implementar: <code>{contentTypeId}</code>
            </p>
          </Container>
        </Section>
      );
    }
    return null;
  }

  const props: BlockComponentProps = {
    fields: entry.fields as Record<string, unknown>,
    pagePath,
    searchParams,
  };

  return <Block key={entry.sys.id} {...props} />;
}

export function PageRenderer({
  content = [],
  pagePath,
  searchParams,
}: PageRendererProps) {
  const isSector = isSectorPage(pagePath);
  const showSectorHeroFallback = isSector && !hasBannerBlock(content);
  const showSectorCompaniesFallback =
    isSector &&
    !content.some((entry) => entry.sys.contentType?.sys.id === 'gridSection');

  if (content.length === 0 && !isSector) {
    return (
      <Section>
        <Container>
          <p className="text-text-muted text-center text-sm">
            Esta página no tiene bloques de contenido todavía.
          </p>
        </Container>
      </Section>
    );
  }

  const parsedFilters = parseNewsSearchParams(searchParams ?? {});
  const isNewsFilteredView =
    isNewsListingPage(pagePath) && hasActiveNewsUrlFilters(parsedFilters);
  const contentToRender = isNewsFilteredView
    ? content.filter((entry) => entry.sys.contentType?.sys.id === 'featuredNews')
    : content;

  const blocks: ReactNode[] = [];
  let followsHero = showSectorHeroFallback;

  const pushBlock = (node: ReactNode, key: string, endsWithHero = false) => {
    if (!node) return;

    blocks.push(
      <AfterHeroSectionWrap key={key} active={followsHero}>
        {node}
      </AfterHeroSectionWrap>,
    );

    followsHero = endsWithHero;
  };

  for (let index = 0; index < contentToRender.length; index += 1) {
    const entry = contentToRender[index];
    const contentTypeId = entry.sys.contentType?.sys.id;

    if (contentTypeId === 'gridSection') {
      const fields = getGridSectionFields(entry);
      const nextEntry = contentToRender[index + 1];
      const nextFields =
        nextEntry?.sys.contentType?.sys.id === 'gridSection'
          ? getGridSectionFields(nextEntry)
          : null;

      if (
        isI3InnovationSectionContentfulName(fields.contentfulName, fields.title) &&
        nextFields &&
        isI3ConversationsSectionContentfulName(nextFields.contentfulName)
      ) {
        pushBlock(
          <I3InnovationSplitSection
            innovation={fields}
            conversations={nextFields}
            sectionId={resolveGridSectionAnchorId({
              contentfulName: fields.contentfulName,
              tag: fields.tag,
              title: fields.title,
            })}
          />,
          entry.sys.id,
        );
        index += 1;
        continue;
      }

      if (isI3InnovationSectionContentfulName(fields.contentfulName, fields.title)) {
        pushBlock(
          <I3InnovationSplitSection
            innovation={fields}
            sectionId={resolveGridSectionAnchorId({
              contentfulName: fields.contentfulName,
              tag: fields.tag,
              title: fields.title,
            })}
          />,
          entry.sys.id,
        );
        continue;
      }

      if (isI3ConversationsSectionContentfulName(fields.contentfulName)) {
        const videos = resolveVideoItems(fields.items);
        const posterUrl = fields.image ? getAssetUrl(fields.image) : undefined;

        pushBlock(
          <section className={`${SECTION_PADDING} bg-white`}>
            <div className="mx-auto flex w-full max-w-content justify-end">
              <div className="w-full lg:w-1/2">
                <I3ConversationsPanel
                  posterUrl={posterUrl}
                  posterAlt={
                    (typeof fields.image?.fields.title === 'string'
                      ? fields.image.fields.title
                      : undefined) ?? videos[0]?.title ?? 'i3 Inspira'
                  }
                  title={fields.title}
                  subtitle={fields.subtitle}
                  videos={videos}
                  urlList={fields.urlList}
                />
              </div>
            </div>
          </section>,
          entry.sys.id,
        );
        continue;
      }
    }

    pushBlock(
      renderBlock(entry, pagePath, searchParams),
      entry.sys.id,
      contentTypeId === 'banner',
    );
  }

  const showAllNewsSection = isNewsListingPage(pagePath);
  const hideAllNewsSection = showAllNewsSection && isNewsFilteredView;

  return (
    <div className="flex min-w-0 max-w-full flex-col overflow-x-clip">
      {showSectorHeroFallback ? (
        <SectorPageHeroWithFetch pagePath={pagePath} />
      ) : null}
      {blocks}
      {showSectorCompaniesFallback ? (
        <AfterHeroSectionWrap active={showSectorHeroFallback}>
          <SectorCompaniesSectionWithFetch
            pagePath={pagePath}
            title="Empresas que impulsan este sector"
          />
        </AfterHeroSectionWrap>
      ) : null}
      {showAllNewsSection && !hideAllNewsSection ? (
        <Suspense fallback={<NewsResultsLoading />}>
          <AllNewsSectionWithFetch />
        </Suspense>
      ) : null}
      <PageContentReady />
    </div>
  );
}
