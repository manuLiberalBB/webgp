import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type FooterColumnProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <section className={cn('flex min-w-0 flex-1 flex-col gap-6', className)}>
      <h2 className="border-footer-border text-footer-heading border-b pb-3 text-base leading-6 font-normal tracking-[0.8px] uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
