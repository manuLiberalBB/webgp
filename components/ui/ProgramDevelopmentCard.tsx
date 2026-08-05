import Image from 'next/image';
import Link from 'next/link';
import type { Entry } from 'contentful';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

type ProgramDevelopmentCardProps = {
  fields: CardFields;
  className?: string;
};

function resolveCardLink(url?: Entry[]) {
  const entry = url?.[0];
  if (!entry) return null;
  return resolveNavLink(entry);
}

function parseDescription(description: string) {
  const match = description.match(/^([\s\S]*?)(\s*\.\.\.\s*)?(ver\s+m[aá]s)\.?$/i);

  if (!match) {
    return { body: description, hasVerMas: false };
  }

  const suffix = match[2] ?? '';
  const body = `${match[1].trimEnd()}${suffix ? `${suffix.trimEnd()} ` : ' '}`;

  return { body, hasVerMas: true };
}

function VerMasLink({
  href,
  external,
}: {
  href: string;
  external?: boolean;
}) {
  const className = 'text-link-cta underline decoration-solid underline-offset-2';

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        ver más
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      ver más
    </Link>
  );
}

export function ProgramDevelopmentCard({ fields, className }: ProgramDevelopmentCardProps) {
  const iconUrl = fields.icon ? getAssetUrl(fields.icon) : undefined;
  const link = resolveCardLink(fields.url);
  const { body, hasVerMas } = fields.description
    ? parseDescription(fields.description)
    : { body: '', hasVerMas: false };

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-lg border border-black/10 bg-white p-6',
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        {iconUrl ? (
          <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-[rgba(21,93,252,0.1)]">
            <div className="relative size-6">
              <Image src={iconUrl} alt="" fill className="object-contain" />
            </div>
          </div>
        ) : null}

        {fields.title ? (
          <h3 className="pb-2 text-lg leading-6 font-semibold text-[#123476]">{fields.title}</h3>
        ) : null}
      </div>

      {body || hasVerMas ? (
        <p className="text-body text-base leading-normal">
          {body}
          {hasVerMas ? (
            link ? (
              <VerMasLink href={link.href} external={link.isExternal} />
            ) : (
              <span className="text-link-cta underline decoration-solid underline-offset-2">
                ver más
              </span>
            )
          ) : null}
        </p>
      ) : null}
    </article>
  );
}
