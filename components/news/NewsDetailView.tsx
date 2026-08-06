import { NewsArticleBody } from '@/components/news/NewsArticleBody';
import { NewsArticleMeta } from '@/components/news/NewsArticleMeta';
import { NewsSidebar } from '@/components/news/NewsSidebar';
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

type NewsDetailViewProps = {
  fields: NewsFields;
  publishedAt?: string;
};

export async function NewsDetailView({ fields, publishedAt }: NewsDetailViewProps) {
  const imageUrl = getAssetUrl(fields.coverImage);
  const imageAlt =
    (typeof fields.coverImage.fields.title === 'string'
      ? fields.coverImage.fields.title
      : undefined) ?? fields.noticeTitle;

  if (!imageUrl) return null;

  const category = normalizeNewsCategory(fields.category);

  const [relatedNews] = await Promise.all([
    getRelatedNews({
      excludePath: fields.path,
      category,
      limit: 2,
    }),
  ]);

  const articleContext = buildNewsArticleContext(fields, publishedAt);
  const company = getPrimaryCompany(fields.companies);

  return (
    <article>
      <NewsHero
        title={fields.noticeTitle}
        subtitle={fields.subtitle}
        category={category}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />

      <NewsArticleMeta
        noticeTitle={fields.noticeTitle}
        category={category}
        companyName={articleContext.companyName}
        content={fields.content}
        subtitle={fields.subtitle}
        publishedAt={publishedAt}
      />

      <div className="px-6 py-10 md:px-layout-x lg:py-12">
        <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-10 xl:grid-cols-[minmax(0,54rem)_minmax(20.5rem,21.5rem)] xl:gap-12">
          <NewsArticleBody content={fields.content} tags={fields.tags} />

          <NewsSidebar
            noticeTitle={fields.noticeTitle}
            relatedNews={relatedNews}
            meta={articleContext}
            company={company}
          />
        </div>
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
