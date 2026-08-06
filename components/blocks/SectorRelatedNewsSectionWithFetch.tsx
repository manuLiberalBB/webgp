import { YouMayAlsoLikeSection } from '@/components/news/YouMayAlsoLikeSection';
import { NEWS_LIST_PATH } from '@/lib/contentful/news/newsListFilters';
import { getRelatedNewsForCompanies } from '@/lib/contentful/queries';
import { fetchSectorCompaniesByPagePath } from '@/lib/contentful/sector/fetchSectorCompaniesByPagePath';

const RELATED_NEWS_LIMIT = 3;

type SectorRelatedNewsSectionWithFetchProps = {
  pagePath?: string[];
};

export async function SectorRelatedNewsSectionWithFetch({
  pagePath,
}: SectorRelatedNewsSectionWithFetchProps) {
  const companies = await fetchSectorCompaniesByPagePath(pagePath);
  const companyIds = companies.map((company) => company.id);

  const items = await getRelatedNewsForCompanies({
    companyIds,
    limit: RELATED_NEWS_LIMIT,
  });

  if (items.length === 0) return null;

  return (
    <YouMayAlsoLikeSection
      items={items}
      title="Noticias relacionadas"
      viewAllHref={NEWS_LIST_PATH}
    />
  );
}
