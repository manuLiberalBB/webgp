type IconProps = {
  className?: string;
};

export function ShareXIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M9.2 7.2 13.5 2.5h-1.2l-3.7 4.1L6.2 2.5H2.5l4.5 6.6L2.5 13.5h1.2l3.9-4.3 3.1 4.3h3.7L9.2 7.2Zm-1.4 1.5-.46-.64L4.2 3.6h1.6l2.9 4 .46.64 3.7 5.2H9.7l-3-4.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ShareLinkedInIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M3.5 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM2.5 6h2v7.5h-2V6Zm4 0h1.9v1h.03c.27-.5.92-1.03 1.9-1.03 2.03 0 2.4 1.34 2.4 3.08V13.5H10.8v-4.1c0-1-.02-2.3-1.4-2.3-1.4 0-1.62 1.1-1.62 2.24V13.5H5.5V6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ShareFacebookIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M9.2 2.5h2V5h-1.6c-.32 0-.4.12-.4.4V6.8H11.2v2.4H9.2v5.3H6.8V9.2H5V6.8h1.8V5.1c0-1.7 1-2.6 2.5-2.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ShareWhatsAppIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M8 2.5a5.2 5.2 0 0 0-4.4 7.9l-.7 2.6 2.7-.7A5.2 5.2 0 1 0 8 2.5Zm0 9.4a4.2 4.2 0 0 1-2.1-.6l-.15-.08-1.6.42.43-1.55-.1-.16a4.2 4.2 0 1 1 3.52 1.97Zm2.3-1.6c-.12-.06-.73-.36-.84-.4-.11-.04-.19-.06-.27.06-.08.12-.3.4-.37.48-.07.08-.14.09-.26.03-.12-.06-.5-.18-.95-.58-.35-.31-.59-.7-.66-.82-.07-.12-.01-.18.06-.25.06-.06.12-.14.18-.21.06-.07.08-.12.12-.2.04-.08.02-.15-.01-.21-.03-.06-.27-.65-.37-.89-.1-.23-.2-.2-.27-.2h-.23c-.08 0-.21.03-.32.15-.11.12-.43.42-.43 1.02 0 .6.44 1.18.5 1.26.06.08.87 1.33 2.1 1.86.29.13.52.2.7.26.29.09.56.08.77.05.23-.03.73-.3.83-.58.1-.29.1-.53.07-.58-.03-.05-.11-.08-.23-.14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ShareLinkIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M6.7 9.3 9.3 6.7M7.4 5.3l1.2-1.2a2.1 2.1 0 0 1 3 3L10.4 8.1M8.6 10.7l-1.2 1.2a2.1 2.1 0 0 1-3-3l1.2-1.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SharePdfIcon({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path
        d="M3.5 1.5h4.6l2.4 2.4V12a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V2.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M8 1.5V4h2.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.5 7.5h5M4.5 9.5h3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
