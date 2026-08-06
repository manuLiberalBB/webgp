import { cn } from '@/lib/utils';

type NewsTagsSectionProps = {
  tags?: string[];
  className?: string;
};

export function NewsTagsSection({ tags, className }: NewsTagsSectionProps) {
  if (!tags?.length) return null;

  return (
    <section className={cn('news-tags', className)} aria-label="Etiquetas">
      <div className="news-tags__row">
        <p className="news-tags__label">Etiquetas</p>

        <ul className="news-tags__list">
          {tags.map((tag) => (
            <li key={tag}>
              <span className="news-tags__tag">{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
