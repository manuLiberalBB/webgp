import { cn } from '@/lib/utils';

const sizeClasses = {
  sm: 'size-4 border',
  md: 'size-8 border-2',
  lg: 'size-12 border-[3px]',
} as const;

type LoadingSpinnerProps = {
  size?: keyof typeof sizeClasses;
  className?: string;
  label?: string;
};

export function LoadingSpinner({
  size = 'md',
  className,
  label = 'Cargando',
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'animate-spin rounded-full border-[#123476]/15 border-t-[#123476]',
        sizeClasses[size],
        className,
      )}
    />
  );
}
