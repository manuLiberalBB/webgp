import { AppImage as Image } from '@/components/cms/AppImage';

import {
  NewsSidebarSectionTitle,
  NewsSidebarTextLink,
} from '@/components/news/sidebar/NewsSidebarPrimitives';
import type { NewsCompanyInfo } from '@/lib/news/types';
import { cn } from '@/lib/utils';

type NewsCompanyInfoSectionProps = {
  company: NewsCompanyInfo;
  className?: string;
};

export function NewsCompanyInfoSection({
  company,
  className,
}: NewsCompanyInfoSectionProps) {
  return (
    <section className={cn('w-full', className)} aria-label="Sobre la empresa">
      <NewsSidebarSectionTitle>Sobre la empresa</NewsSidebarSectionTitle>

      <div className="bg-news-sidebar-image-bg mt-4 h-[171px] w-full overflow-hidden">
        <Image
          src={company.imageUrl}
          alt={company.imageAlt}
          width={368}
          height={171}
          className="h-full w-full object-cover"
        />
      </div>

      <h3 className="text-news-sidebar-title pt-3 text-sm leading-5 font-bold">
        {company.name}
      </h3>

      <p className="text-news-meta pt-1 pb-3 text-xs leading-[21.125px]">
        {company.description}
      </p>

      {company.websiteUrl ? (
        <NewsSidebarTextLink href={company.websiteUrl} external>
          {company.websiteLabel}
        </NewsSidebarTextLink>
      ) : null}
    </section>
  );
}
