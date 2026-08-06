import { formatPullQuoteText } from '@/lib/contentful/quote/formatPullQuoteText';
import { cn } from '@/lib/utils';
import type { QuoteBlockFields } from '@/lib/contentful/types/quoteBlock';

type QuoteBlockProps = {
  fields: QuoteBlockFields;
  className?: string;
};

export function QuoteBlock({ fields, className }: QuoteBlockProps) {
  return (
    <figure className={cn('quote-block', className)}>
      <blockquote className="quote-block__quote">
        {formatPullQuoteText(fields.quote)}
      </blockquote>

      <figcaption className="quote-block__footer">
        <span className="quote-block__footer-line" aria-hidden />

        <div className="quote-block__attribution">
          <p className="quote-block__author">{fields.author}</p>

          {fields.authorTitle ? (
            <p className="quote-block__author-title">{fields.authorTitle}</p>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}
