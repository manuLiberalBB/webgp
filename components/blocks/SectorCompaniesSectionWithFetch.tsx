import type { Entry } from 'contentful';

import { SectorCompaniesSection } from '@/components/ui/SectorCompaniesSection';
import { fetchSectorCompaniesByPagePath } from '@/lib/contentful/sector/fetchSectorCompaniesByPagePath';
import { isBankingSectorPage } from '@/lib/contentful/sector/isSectorPage';
import {
  resolveSectorCompaniesFromItems,
  type SectorCompaniesLayout,
} from '@/lib/contentful/sector/resolveSectorCompaniesFromItems';

type SectorCompaniesSectionWithFetchProps = {
  pagePath?: string[];
  tag?: string;
  title?: string;
  subtitle?: string;
  urlList?: Entry[];
  contentItems?: Entry[];
};

function resolveSectorCompaniesLayout(pagePath?: string[]): SectorCompaniesLayout {
  return isBankingSectorPage(pagePath) ? 'banking' : 'feature';
}

export async function SectorCompaniesSectionWithFetch({
  pagePath,
  tag,
  title,
  subtitle,
  urlList,
  contentItems,
}: SectorCompaniesSectionWithFetchProps) {
  const layout = resolveSectorCompaniesLayout(pagePath);
  const sectionItems = resolveSectorCompaniesFromItems(contentItems, { layout });
  const items =
    sectionItems.length > 0
      ? sectionItems
      : await fetchSectorCompaniesByPagePath(pagePath, { layout });

  return (
    <SectorCompaniesSection
      tag={tag}
      title={title}
      subtitle={subtitle}
      items={items}
      urlList={urlList}
      layout={layout}
    />
  );
}
