import type { ReactNode } from 'react';

import { RichText } from '@/components/cms/RichText';
import { CtaLinks } from '@/components/ui/CtaLinks';
import type { BannerContext } from '@/lib/contentful/banner/buildBannerContext';

export function renderBannerHeroFooter(
  ctx: BannerContext,
  options?: { hideCta?: boolean },
): ReactNode {
  const showCta = !options?.hideCta && Boolean(ctx.urlList?.length);

  if (!ctx.body && !showCta) return null;

  return (
    <div className="bg-surface mx-auto w-full max-w-content px-6 py-10 md:px-layout-x">
      {ctx.body ? (
        <RichText document={ctx.body} className="rich-text-banner-body" />
      ) : null}
      {showCta ? (
        <CtaLinks links={ctx.urlList} className="mt-8" />
      ) : null}
    </div>
  );
}
