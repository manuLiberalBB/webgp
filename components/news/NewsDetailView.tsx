import { NewsArticleBody } from '@/components/news/NewsArticleBody';
import { NewsArticleMeta } from '@/components/news/NewsArticleMeta';
import { NewsDetailContentLayout } from '@/components/news/NewsDetailContentLayout';
import { YouMayAlsoLikeSectionWithFetch } from '@/components/news/YouMayAlsoLikeSectionWithFetch';
import { NewsDetailMoreAboutGroupSectionWithFetch } from '@/components/news/NewsDetailMoreAboutGroupSectionWithFetch';
import { NewsHero } from '@/components/news/NewsHero';
import { PageContentReady } from '@/components/layout/PageLoadCoordinator';
import { getRelatedNews } from '@/lib/contentful/queries';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { normalizeNewsCategory } from '@/lib/contentful/news/normalizeNewsCategory';
import type { NewsFields } from '@/lib/contentful/types/news';
import { buildNewsArticleContext } from '@/lib/news/buildNewsArticleContext';
import { getPrimaryCompany } from '@/lib/news/getPrimaryCompany';
import { resolveNewsPublishedAt, type NewsEntryPublicationSys } from '@/lib/news/resolveNewsPublishedAt';

type NewsDetailViewProps = {
  fields: NewsFields;
  entrySys?: NewsEntryPublicationSys;
};

export async function NewsDetailView({ fields, entrySys }: NewsDetailViewProps) {
  const imageUrl = getAssetUrl(fields.coverImage);
  const imageAlt =
    (typeof fields.coverImage.fields.title === 'string'
      ? fields.coverImage.fields.title
      : undefined) ?? fields.noticeTitle;

  if (!imageUrl) return null;

  const category = normalizeNewsCategory(fields.category);

  const resolvedPublishedAt = resolveNewsPublishedAt(fields, entrySys);
  const subtitle = fields.subtitle?.trim() || undefined;

  const [relatedNews] = await Promise.all([
    getRelatedNews({
      excludePath: fields.path,
      category,
      limit: 2,
    }),
  ]);

  const articleContext = buildNewsArticleContext(fields, resolvedPublishedAt);
  const company = getPrimaryCompany(fields.companies);

  return (
    <article>
      <NewsHero
        title={fields.noticeTitle}
        subtitle={subtitle}
        category={category}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />

      <NewsArticleMeta
        noticeTitle={fields.noticeTitle}
        category={category}
        companyName={articleContext.companyName}
        content={fields.content}
        subtitle={subtitle}
        publishedAt={resolvedPublishedAt}
      />

      <div className="px-6 py-10 md:px-layout-x lg:py-12">
        <NewsDetailContentLayout
          noticeTitle={fields.noticeTitle}
          relatedNews={relatedNews}
          meta={articleContext}
          company={company}
        >
          <NewsArticleBody content={fields.content} tags={fields.tags} />
        </NewsDetailContentLayout>
      </div>

      <YouMayAlsoLikeSectionWithFetch
        excludePath={fields.path}
        category={category}
      />

      <NewsDetailMoreAboutGroupSectionWithFetch />
      <PageContentReady />
    </article>
  );
}
