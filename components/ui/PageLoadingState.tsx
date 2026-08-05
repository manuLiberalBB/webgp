import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

type PageLoadingStateProps = {
  label?: string;
  className?: string;
};

export function PageLoadingState({
  label = 'Cargando contenido...',
  className,
}: PageLoadingStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-20',
        className,
      )}
    >
      <LoadingSpinner size="lg" />
      <p className="text-card-description text-sm leading-5">{label}</p>
    </div>
  );
}
