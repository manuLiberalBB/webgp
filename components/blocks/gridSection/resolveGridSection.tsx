import type { ReactNode } from 'react';

import type { BlockComponentProps } from '@/components/blocks/registry';
import { buildGridSectionContext } from '@/lib/contentful/gridSection/buildGridSectionContext';
import { logGridSectionVariantResolution } from '@/lib/contentful/gridSection/sectionVariantLogger';
import {
  GRID_SECTION_VARIANTS,
  type GridSectionVariant,
} from '@/lib/contentful/gridSection/sectionVariants';

import { gridSectionRenderers } from './renderers';

function resolveSectionVariant(
  ctx: ReturnType<typeof buildGridSectionContext>,
  logContext?: Pick<BlockComponentProps, 'entryId' | 'pagePath'>,
): GridSectionVariant {
  const rawSectionVariant = ctx.fields.sectionVariant?.trim();
  const explicitVariant = ctx.sectionVariant;
  const resolvedVariant = explicitVariant ?? GRID_SECTION_VARIANTS.DEFAULT;

  logGridSectionVariantResolution({
    entryId: logContext?.entryId,
    contentfulName: ctx.contentfulName,
    title: ctx.title,
    pagePath: logContext?.pagePath,
    rawSectionVariant,
    resolvedVariant,
  });

  return resolvedVariant;
}

export function renderGridSection(props: BlockComponentProps): ReactNode {
  const ctx = buildGridSectionContext(props);
  const variant = resolveSectionVariant(ctx, props);
  const render = gridSectionRenderers[variant] ?? gridSectionRenderers.default;

  return render(ctx);
}
