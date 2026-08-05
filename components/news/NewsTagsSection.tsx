import { cn } from '@/lib/utils';

type NewsTagsSectionProps = {
  tags?: string[];
  className?: string;
};

export function NewsTagsSection({ tags, className }: NewsTagsSectionProps) {
  if (!tags?.length) return null;

  return (
    <section className={cn('border-border mt-10 border-t pt-8', className)} aria-label="Etiquetas">
      <h2 className="text-text mb-4 text-sm font-semibold tracking-wide uppercase">
        Etiquetas
      </h2>

      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <span className="bg-surface-muted text-text-muted inline-flex rounded-full px-3 py-1.5 text-sm">
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
