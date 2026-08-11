import { getFooter, getHeaderNavigationLinks } from '@/lib/contentful/queries';
import { resolveFooterCompanyLinks } from '@/lib/contentful/footer/resolveFooterCompanyLinks';

import { Footer } from './Footer';

export async function SiteFooter() {
  const [fields, pages] = await Promise.all([getFooter(), getHeaderNavigationLinks()]);

  if (!fields) return null;

  return (
    <Footer
      fields={fields}
      companies={resolveFooterCompanyLinks(fields.companies)}
      pages={pages}
    />
  );
}
