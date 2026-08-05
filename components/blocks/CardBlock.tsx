import { FoundationsConoceCtaCard } from '@/components/ui/FoundationsConoceCtaCard';
import { isFundacionesConoceCtaCardContentfulName } from '@/lib/contentful/foundations/resolveFundacionesSectionItems';
import type { CardFields } from '@/lib/contentful/types/card';

import type { BlockComponentProps } from './registry';

export function CardBlock({ fields }: BlockComponentProps) {
  const cardFields = fields as CardFields;

  if (!isFundacionesConoceCtaCardContentfulName(cardFields.contentfulName)) {
    return null;
  }

  return (
    <section className="bg-white px-10 py-10 md:px-layout-x md:py-section-y">
      <div className="mx-auto w-full max-w-content">
        <FoundationsConoceCtaCard fields={cardFields} />
      </div>
    </section>
  );
}
