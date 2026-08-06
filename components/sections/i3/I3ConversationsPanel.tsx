'use client';

import Link from 'next/link';
import type { Entry } from 'contentful';
import { useState } from 'react';

import { VideoEmbedPoster } from '@/components/cms/VideoEmbedPoster';
import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import { resolveVideoPosterUrl } from '@/lib/contentful/video/resolveVideoEmbedUrl';
import type { VideoItem } from '@/lib/contentful/types/video';
import { cn } from '@/lib/utils';

type I3ConversationsPanelProps = {
  posterUrl?: string;
  posterAlt?: string;
  title?: string;
  subtitle?: string;
  videos: VideoItem[];
  urlList?: Entry[];
  className?: string;
};

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M3 8h9M9 4.5 13 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConversationVideoItem({
  video,
  isSelected,
  onSelect,
  className,
}: {
  video: VideoItem;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        'flex w-full gap-3 rounded-[10px] border bg-white p-[17px] text-left transition-colors',
        isSelected
          ? 'border-[#123476] shadow-[0_0_0_1px_#123476]'
          : 'border-card-border hover:border-[#123476]/30',
        className,
      )}
    >
      <span
        className={cn(
          'mt-1.5 size-2 shrink-0 rounded-full',
          isSelected ? 'bg-[#123476]' : 'bg-[#123476]/40',
        )}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        {video.title ? (
          <p className="text-heading text-sm leading-[18px] font-semibold">{video.title}</p>
        ) : null}
        {video.author ? (
          <p className="text-body pt-1 text-xs leading-[18px]">{video.author}</p>
        ) : null}
      </div>
    </button>
  );
}

function getConversationItemVisibilityClassName(index: number) {
  if (index >= 4) return 'hidden';

  if (index >= 2) return 'hidden md:flex';

  return undefined;
}

export function I3ConversationsPanel({
  posterUrl: defaultPosterUrl,
  posterAlt = '',
  title,
  subtitle,
  videos,
  urlList,
  className,
}: I3ConversationsPanelProps) {
  const [selectedVideoId, setSelectedVideoId] = useState(videos[0]?.id);
  const ctaLink = urlList?.map(resolveNavLink).find(Boolean) ?? null;

  const selectedVideo =
    videos.find((video) => video.id === selectedVideoId) ?? videos[0] ?? null;

  const embedUrl = selectedVideo?.embedUrl;
  const posterUrl =
    (selectedVideo ? resolveVideoPosterUrl(selectedVideo.url) : null) ??
    defaultPosterUrl;
  const posterTitle = selectedVideo?.title ?? 'i3 Inspira';
  const posterSubtitle = selectedVideo?.author ?? 'Ciclo de conversaciones';

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-lg border border-card-border bg-[#f6f6f6]',
        className,
      )}
    >
      {embedUrl ? (
        <div className="relative h-[260px] w-full shrink-0 overflow-hidden">
          <VideoEmbedPoster
            key={selectedVideo?.id}
            embedUrl={embedUrl}
            posterUrl={posterUrl}
            posterAlt={selectedVideo?.title ?? posterAlt}
            title={posterTitle}
            className="absolute inset-0 h-full rounded-none sm:h-full lg:h-full"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex flex-col">
            <p className="text-2xl leading-9 font-bold text-white">{posterTitle}</p>
            <p className="text-sm leading-normal text-white/80">{posterSubtitle}</p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col justify-between gap-6 p-6">
        {title || subtitle ? (
          <div className="flex flex-col gap-2">
            {title ? (
              <p className="text-heading text-base leading-6 font-semibold">{title}</p>
            ) : null}
            {subtitle ? (
              <p className="text-body text-base leading-6">{subtitle}</p>
            ) : null}
          </div>
        ) : null}

        {videos.length > 0 ? (
          <div className="flex flex-col gap-2">
            {videos.map((video, index) => (
              <ConversationVideoItem
                key={video.id}
                video={video}
                isSelected={selectedVideo?.id === video.id}
                onSelect={() => setSelectedVideoId(video.id)}
                className={getConversationItemVisibilityClassName(index)}
              />
            ))}
          </div>
        ) : null}

        {ctaLink ? (
          ctaLink.isExternal ? (
            <a
              href={ctaLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-cta inline-flex items-center gap-1.5 text-sm leading-[19.5px] transition-opacity hover:opacity-80"
            >
              {ctaLink.label}
              <ArrowIcon />
            </a>
          ) : (
            <Link
              href={ctaLink.href}
              className="text-link-cta inline-flex items-center gap-1.5 text-sm leading-[19.5px] transition-opacity hover:opacity-80"
            >
              {ctaLink.label}
              <ArrowIcon />
            </Link>
          )
        ) : null}
      </div>
    </div>
  );
}
