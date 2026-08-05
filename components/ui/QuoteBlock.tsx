import { formatPullQuoteText } from '@/lib/contentful/quote/formatPullQuoteText';
import { cn } from '@/lib/utils';
import type { QuoteBlockFields } from '@/lib/contentful/types/quoteBlock';

type QuoteBlockProps = {
  fields: QuoteBlockFields;
  className?: string;
};

export function QuoteBlock({ fields, className }: QuoteBlockProps) {
  return (
    <figure
      className={cn(
        'quote-block border-news-sidebar-link border-l-[3px] pl-[35px]',
        className,
      )}
    >
      <blockquote className="quote-block__quote">
        {formatPullQuoteText(fields.quote)}
      </blockquote>

      <figcaption className="flex items-center gap-3 pt-5">
        <span
          className="bg-news-sidebar-link h-px w-7 shrink-0"
          aria-hidden
        />

        <div className="min-w-0">
          <p className="text-news-sidebar-title text-sm leading-[14px] font-medium">
            {fields.author}
          </p>

          {fields.authorTitle ? (
            <p className="text-news-meta pt-1 font-mono text-[11px] leading-[20.02px]">
              {fields.authorTitle}
            </p>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}
