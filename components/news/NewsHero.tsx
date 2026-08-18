import { HeroImage } from '@/components/cms/AppImage';
import type { NewsCategory } from '@/lib/contentful/types/news';
import { NEWS_IMAGE_OVERLAY_GRADIENT } from '@/lib/news/newsImageOverlayGradient';
import { cn } from '@/lib/utils';

import { NewsCategoryBadge } from './NewsCategoryBadge';

type NewsHeroProps = {
  title: string;
  subtitle?: string;
  category?: NewsCategory;
  imageUrl: string;
  imageAlt?: string;
  className?: string;
};

export function NewsHero({
  title,
  subtitle,
  category,
  imageUrl,
  imageAlt = '',
  className,
}: NewsHeroProps) {
  return (
    <section className={cn('relative w-full', className)}>
      <HeroImage src={imageUrl} alt={imageAlt} fill className="object-cover" />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: NEWS_IMAGE_OVERLAY_GRADIENT }}
      />

      <div className="relative z-10 w-full px-6 md:px-layout-x">
        <div className="mx-auto flex w-full max-w-content flex-col items-start gap-4 pb-8 pt-10 md:gap-5 md:pb-10 md:pt-28 md:pb-15">
          {category ? <NewsCategoryBadge category={category} /> : null}

          <div className="flex w-full flex-col items-start gap-4 md:max-w-[52.875rem] md:gap-6">
            <h1 className="text-[2rem] leading-[1.2] font-normal tracking-[-1px] text-white md:text-[3rem] md:leading-[1.2] md:tracking-[-1.25px]">
              {title}
            </h1>

            {subtitle ? (
              <p className="text-[20px] leading-normal text-white md:text-[21px] md:leading-[1.3]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
