import type { NewsArticleContext, NewsCompanyInfo, RelatedNewsItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

import { NewsCompanyInfoSection } from './NewsCompanyInfoSection';
import { NewsShareSection } from './NewsShareSection';
import { NewsSidebarMeta } from './NewsSidebarMeta';
import { RelatedNewsSection } from './RelatedNewsSection';
import { NewsSidebarDivider } from './sidebar/NewsSidebarPrimitives';

type NewsSidebarProps = {
  noticeTitle: string;
  relatedNews: RelatedNewsItem[];
  meta: NewsArticleContext;
  company?: NewsCompanyInfo;
  className?: string;
};

export function NewsSidebar({
  noticeTitle,
  relatedNews,
  meta,
  company,
  className,
}: NewsSidebarProps) {
  return (
    <aside
      className={cn(
        'mx-auto flex w-full max-w-[16rem] min-w-0 flex-col lg:mx-0 lg:max-w-none xl:max-w-[21.5rem]',
        className,
      )}
    >
      {relatedNews.length > 0 ? (
        <>
          <RelatedNewsSection items={relatedNews} />
          <div className="pt-10">
            <NewsSidebarDivider />
          </div>
        </>
      ) : null}

      <div className={relatedNews.length > 0 ? 'pt-10' : undefined}>
        <NewsShareSection title={noticeTitle} />
      </div>

      <div className="pt-10">
        <NewsSidebarDivider />
      </div>

      <div className="pt-10">
        <NewsSidebarMeta meta={meta} companyWebsiteUrl={company?.websiteUrl} />
      </div>

      {company ? (
        <>
          <div className="pt-10">
            <NewsSidebarDivider />
          </div>

          <div className="pt-10">
            <NewsCompanyInfoSection company={company} />
          </div>
        </>
      ) : null}
    </aside>
  );
}
