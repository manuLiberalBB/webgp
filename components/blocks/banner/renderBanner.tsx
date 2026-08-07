import type { ReactNode } from 'react';

import type { BlockComponentProps } from '@/components/blocks/registry';
import { buildBannerContext } from '@/lib/contentful/banner/buildBannerContext';
import { logBannerVariantResolution } from '@/lib/contentful/banner/bannerVariantLogger';
import {
  BANNER_VARIANTS,
  type BannerVariant,
} from '@/lib/contentful/banner/bannerVariants';

import { bannerRenderers } from './renderers';

function resolveBannerVariant(
  ctx: NonNullable<ReturnType<typeof buildBannerContext>>,
  logContext?: Pick<BlockComponentProps, 'entryId' | 'pagePath'>,
): BannerVariant {
  const rawBannerVariant = ctx.fields.bannerVariant?.trim();
  const resolvedVariant = ctx.bannerVariant ?? BANNER_VARIANTS.HERO;

  logBannerVariantResolution({
    entryId: logContext?.entryId,
    contentfulName: ctx.contentfulName,
    title: ctx.title,
    pagePath: logContext?.pagePath,
    rawBannerVariant,
    resolvedVariant,
  });

  return resolvedVariant;
}

export function renderBanner(props: BlockComponentProps): ReactNode {
  const ctx = buildBannerContext(props);
  if (!ctx) return null;

  const variant = resolveBannerVariant(ctx, props);
  const render = bannerRenderers[variant] ?? bannerRenderers[BANNER_VARIANTS.HERO];

  return render(ctx);
}
