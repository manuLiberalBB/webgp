import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

type NewsResultsLoadingProps = {
  label?: string;
  className?: string;
  compact?: boolean;
};

export function NewsResultsLoading({
  label = 'Cargando noticias...',
  className,
  compact = false,
}: NewsResultsLoadingProps) {
  return (
    <section
      className={cn(
        'bg-[#f9fafb] px-6 md:px-layout-x',
        compact ? 'py-12' : 'py-16 md:py-section-y',
        className,
      )}
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[83.75rem] flex-col items-center justify-center gap-4',
          compact ? 'min-h-[12rem]' : 'min-h-[20rem]',
        )}
      >
        <LoadingSpinner size="lg" label={label} />
        <p className="text-card-description text-sm leading-5">{label}</p>
      </div>
    </section>
  );
}
