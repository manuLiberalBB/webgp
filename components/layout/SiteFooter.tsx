import {
  getFooter,
  getFooterCompanyLinks,
  getFooterDownloadableResources,
  getHeaderNavigationLinks,
} from '@/lib/contentful/queries';

import { Footer } from './Footer';

export async function SiteFooter() {
  const [fields, companies, resources, pages] = await Promise.all([
    getFooter(),
    getFooterCompanyLinks(),
    getFooterDownloadableResources(),
    getHeaderNavigationLinks(),
  ]);

  if (!fields) return null;

  return (
    <Footer
      fields={fields}
      companies={companies}
      resources={resources}
      pages={pages}
    />
  );
}
