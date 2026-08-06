import {
  getFooter,
  getFooterCompanyLinks,
  getHeaderNavigationLinks,
} from '@/lib/contentful/queries';

import { Footer } from './Footer';

export async function SiteFooter() {
  const [fields, companies, pages] = await Promise.all([
    getFooter(),
    getFooterCompanyLinks(),
    getHeaderNavigationLinks(),
  ]);

  if (!fields) return null;

  return (
    <Footer
      fields={fields}
      companies={companies}
      pages={pages}
    />
  );
}
