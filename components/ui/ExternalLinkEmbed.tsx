import { cn } from '@/lib/utils';

type ExternalLinkEmbedProps = {
  src: string;
  title: string;
  className?: string;
};

export function ExternalLinkEmbed({ src, title, className }: ExternalLinkEmbedProps) {
  return (
    <section
      className={cn(
        'sticky top-header z-10 flex h-[calc(100dvh-var(--spacing-header))] w-full max-w-full min-w-0 flex-col overflow-hidden bg-surface',
        className,
      )}
      aria-label={title}
    >
      <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
        <iframe
          src={src}
          title={title}
          className="block h-full w-full max-w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
