'use client';

import { AppImage as Image } from '@/components/cms/AppImage';
import { YoutubeEmbedPlayer } from '@/components/cms/YoutubeEmbedPlayer';
import { useState } from 'react';

import {
  parseYoutubeVideoId,
  withVideoAutoplay,
} from '@/lib/contentful/video/resolveVideoEmbedUrl';
import { cn } from '@/lib/utils';

type VideoEmbedPosterProps = {
  posterUrl?: string;
  posterAlt?: string;
  embedUrl: string;
  title: string;
  className?: string;
  showDimOverlay?: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
};

function VideoPlayIcon() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect x="4" y="8" width="52" height="44" rx="4" stroke="white" strokeWidth="3" />
      <path d="M26 22v16l14-8-14-8Z" fill="white" />
    </svg>
  );
}

function VideoIframe({
  embedUrl,
  title,
  className,
  autoplay = false,
  onPlayingChange,
}: {
  embedUrl: string;
  title: string;
  className?: string;
  autoplay?: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
}) {
  const youtubeVideoId = parseYoutubeVideoId(embedUrl);

  if (youtubeVideoId && onPlayingChange) {
    return (
      <YoutubeEmbedPlayer
        videoId={youtubeVideoId}
        title={title}
        className={className}
        autoplay={autoplay}
        onPlayingChange={onPlayingChange}
      />
    );
  }

  return (
    <div
      className={cn(
        'relative h-[280px] w-full overflow-hidden rounded-lg sm:h-[360px] lg:h-[442px]',
        className,
      )}
    >
      <iframe
        src={autoplay ? withVideoAutoplay(embedUrl) : embedUrl}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

export function VideoEmbedPoster({
  posterUrl,
  posterAlt = '',
  embedUrl,
  title,
  className,
  showDimOverlay = true,
  onPlayingChange,
}: VideoEmbedPosterProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlayingChange?.(true);
  };

  if (isPlaying) {
    return (
      <VideoIframe
        embedUrl={embedUrl}
        title={title}
        className={className}
        autoplay
        onPlayingChange={onPlayingChange}
      />
    );
  }

  if (!posterUrl) {
    return <VideoIframe embedUrl={embedUrl} title={title} className={className} />;
  }

  return (
    <button
      type="button"
      aria-label={`Reproducir video: ${title}`}
      onClick={handlePlay}
      className={cn(
        'group relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-lg sm:h-[360px] lg:h-[442px]',
        className,
      )}
    >
      <Image
        src={posterUrl}
        alt={posterAlt}
        fill
        sizes="(min-width: 1280px) 1280px, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
      />

      {showDimOverlay ? <div aria-hidden className="absolute inset-0 bg-black/30" /> : null}

      <div className="relative z-10">
        <VideoPlayIcon />
      </div>
    </button>
  );
}
