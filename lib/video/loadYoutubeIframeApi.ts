type YoutubeIframeApiWindow = Window & {
  YT?: {
    Player: new (
      elementId: string | HTMLElement,
      options: {
        videoId: string;
        playerVars?: Record<string, number | string>;
        events?: {
          onStateChange?: (event: { data: number }) => void;
        };
      },
    ) => { destroy: () => void };
    PlayerState: {
      PLAYING: number;
      PAUSED: number;
      ENDED: number;
    };
  };
  onYouTubeIframeAPIReady?: () => void;
};

let youtubeIframeApiPromise: Promise<void> | null = null;

export function loadYoutubeIframeApi(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  const youtubeWindow = window as YoutubeIframeApiWindow;

  if (youtubeWindow.YT?.Player) {
    return Promise.resolve();
  }

  if (!youtubeIframeApiPromise) {
    youtubeIframeApiPromise = new Promise((resolve) => {
      const previousReady = youtubeWindow.onYouTubeIframeAPIReady;

      youtubeWindow.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        resolve();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
    });
  }

  return youtubeIframeApiPromise;
}
