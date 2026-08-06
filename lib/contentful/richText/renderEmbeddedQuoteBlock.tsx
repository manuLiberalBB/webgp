import type { Entry } from 'contentful';

import { QuoteBlock } from '@/components/ui/QuoteBlock';
import type { QuoteBlockFields } from '@/lib/contentful/types/quoteBlock';

export function isQuoteBlockEntry(
  target: Entry | undefined,
): target is Entry & { fields: QuoteBlockFields } {
  return target?.sys?.contentType?.sys?.id === 'bloqueDeCita';
}

export function renderEmbeddedQuoteBlock(target: Entry | undefined) {
  if (!isQuoteBlockEntry(target)) return null;

  return <QuoteBlock fields={target.fields} className="pt-12 md:pb-12" />;
}
