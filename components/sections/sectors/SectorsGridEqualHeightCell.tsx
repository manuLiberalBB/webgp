import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectorsGridEqualHeightCellProps = {
  children: ReactNode;
  className?: string;
};

export function SectorsGridEqualHeightCell({
  children,
  className,
}: SectorsGridEqualHeightCellProps) {
  return (
    <div data-sector-grid-card className={cn('h-full min-h-0', className)}>
      {children}
    </div>
  );
}
