import type { Entry } from 'contentful';

import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import { cn } from '@/lib/utils';

import { Button } from './Button';

type CtaLinksProps = {
  links?: Entry[];
  className?: string;
  buttonClassName?: string;
  buttonVariant?: 'primary' | 'inverse';
};

export function CtaLinks({
  links = [],
  className,
  buttonClassName,
  buttonVariant = 'primary',
}: CtaLinksProps) {
  const resolved = links
    .map(resolveNavLink)
    .filter((link): link is NonNullable<typeof link> => link !== null);

  if (resolved.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
      {resolved.map((link) => (
        <Button
          key={link.id}
          href={link.href}
          external={link.isExternal}
          variant={buttonVariant}
          className={buttonClassName}
        >
          {link.label}
        </Button>
      ))}
    </div>
  );
}
