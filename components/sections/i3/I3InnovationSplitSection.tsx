import type { Entry } from 'contentful';

import { I3ConversationsPanel } from '@/components/sections/i3/I3ConversationsPanel';
import { I3InnovationPanel } from '@/components/sections/i3/I3InnovationPanel';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { resolveVideoItems } from '@/lib/contentful/video/resolveVideoItem';
import { resolveVideoPosterUrl } from '@/lib/contentful/video/resolveVideoEmbedUrl';
import type { CardFields } from '@/lib/contentful/types/card';
import type { GridSectionFields } from '@/lib/contentful/types/gridSection';
import { cn } from '@/lib/utils';

type I3InnovationSplitSectionProps = {
  innovation: GridSectionFields;
  conversations?: GridSectionFields;
  sectionId?: string;
  className?: string;
};

function resolveCardEntries(items?: Entry[]): CardFields[] {
  return (
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'card')
      .map((item) => item.fields as CardFields) ?? []
  );
}

function I3InnovationBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex w-fit items-center justify-center rounded bg-[#0b2d4e] px-3 py-2 text-sm font-semibold tracking-[0.35px] text-white uppercase">
      {tag}
    </span>
  );
}

export function I3InnovationSplitSection({
  innovation,
  conversations,
  sectionId,
  className,
}: I3InnovationSplitSectionProps) {
  const innovationCards = resolveCardEntries(innovation.items);
  const videos = resolveVideoItems(conversations?.items);
  const defaultPosterUrl =
    (conversations?.image ? getAssetUrl(conversations.image) : undefined) ??
    (videos[0] ? resolveVideoPosterUrl(videos[0].url) ?? undefined : undefined);
  const posterAlt =
    (typeof conversations?.image?.fields.title === 'string'
      ? conversations.image.fields.title
      : undefined) ?? videos[0]?.title ?? 'i3 Inspira';

  if (!conversations) {
    return (
      <section
        id={sectionId}
        className={cn(
          'section-anchor bg-white px-10 py-10 md:px-layout-x md:py-section-y',
          className,
        )}
      >
        <div className="mx-auto w-full max-w-content">
          <I3InnovationPanel
            tag={innovation.tag}
            title={innovation.title}
            subtitle={innovation.subtitle}
            cards={innovationCards}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id={sectionId}
      className={cn(
        'section-anchor bg-white px-10 py-10 md:px-layout-x md:py-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-8">
        {innovation.tag ? (
          <div className="lg:w-1/2">
            <I3InnovationBadge tag={innovation.tag} />
          </div>
        ) : null}

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[46px]">
          <div className="min-w-0 lg:w-1/2">
            <I3InnovationPanel
              title={innovation.title}
              subtitle={innovation.subtitle}
              cards={innovationCards}
              hideTag
            />
          </div>

          <div className="min-w-0 lg:w-1/2">
            <I3ConversationsPanel
              posterUrl={defaultPosterUrl}
              posterAlt={posterAlt}
              title={conversations.title}
              subtitle={conversations.subtitle}
              videos={videos}
              urlList={conversations.urlList}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
