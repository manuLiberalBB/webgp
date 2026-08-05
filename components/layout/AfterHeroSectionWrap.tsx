import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type AfterHeroSectionWrapProps = {
  children: ReactNode;
  active?: boolean;
  className?: string;
};

/** Reduce el padding superior del primer `<section>` hijo directo. */
export function AfterHeroSectionWrap({
  children,
  active = false,
  className,
}: AfterHeroSectionWrapProps) {
  if (!active) {
    return children;
  }

  return (
    <div
      className={cn(
        'contents [&>section]:!pt-8 [&>section]:md:!pt-10',
        className,
      )}
    >
      {children}
    </div>
  );
}
