import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'bg-badge inline-flex items-center justify-center rounded px-3 py-2 text-sm font-semibold tracking-[0.35px] text-white uppercase',
        className,
      )}
    >
      {children}
    </span>
  );
}
