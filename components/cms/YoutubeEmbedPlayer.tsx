'use client';

import { useEffect, useId, useRef } from 'react';

import { loadYoutubeIframeApi } from '@/lib/video/loadYoutubeIframeApi';
import { cn } from '@/lib/utils';

type YoutubeEmbedPlayerProps = {
  videoId: string;
  title: string;
  className?: string;
  autoplay?: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
};

type YoutubePlayerInstance = {
  destroy: () => void;
};

type YoutubePlayerConstructor = new (
  element: HTMLElement,
  options: {
    videoId: string;
    playerVars?: Record<string, number | string>;
    events?: {
      onStateChange?: (event: { data: number }) => void;
    };
  },
) => YoutubePlayerInstance;

export function YoutubeEmbedPlayer({
  videoId,
  title,
  className,
  autoplay = false,
  onPlayingChange,
}: YoutubeEmbedPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YoutubePlayerInstance | null>(null);
  const onPlayingChangeRef = useRef(onPlayingChange);
  const elementId = useId().replace(/:/g, '');

  useEffect(() => {
    onPlayingChangeRef.current = onPlayingChange;
  }, [onPlayingChange]);

  useEffect(() => {
    let isCancelled = false;

    async function createPlayer() {
      await loadYoutubeIframeApi();

      if (isCancelled || !containerRef.current) return;

      const youtubeApi = (
        window as Window & {
          YT?: {
            Player: YoutubePlayerConstructor;
            PlayerState: {
              PLAYING: number;
              PAUSED: number;
              ENDED: number;
            };
          };
        }
      ).YT;

      if (!youtubeApi?.Player) return;

      playerRef.current?.destroy();

      playerRef.current = new youtubeApi.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onStateChange: (event) => {
            const { PLAYING, PAUSED, ENDED } = youtubeApi.PlayerState;

            if (event.data === PLAYING) {
              onPlayingChangeRef.current?.(true);
              return;
            }

            if (event.data === PAUSED || event.data === ENDED) {
              onPlayingChangeRef.current?.(false);
            }
          },
        },
      });
    }

    void createPlayer();

    return () => {
      isCancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [autoplay, videoId]);

  return (
    <div
      className={cn(
        'relative h-[280px] w-full overflow-hidden rounded-lg sm:h-[360px] lg:h-[442px]',
        className,
      )}
    >
      <div
        ref={containerRef}
        id={elementId}
        title={title}
        className="absolute inset-0 h-full w-full [&>iframe]:h-full [&>iframe]:w-full"
      />
    </div>
  );
}
