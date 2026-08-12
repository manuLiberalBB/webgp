import { AppImage as Image } from '@/components/cms/AppImage';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

import { ProgramDevelopmentCardDescription } from './ProgramDevelopmentCardDescription';

type ProgramDevelopmentCardProps = {
  fields: CardFields;
  className?: string;
};

export function ProgramDevelopmentCard({ fields, className }: ProgramDevelopmentCardProps) {
  const iconUrl = fields.icon ? getAssetUrl(fields.icon) : undefined;
  const descriptionText = fields.longDescription?.trim() || fields.description?.trim() || '';

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

      {descriptionText ? (
        <ProgramDevelopmentCardDescription text={descriptionText} />
      ) : null}
    </article>
  );
}
