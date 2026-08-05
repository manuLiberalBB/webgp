type IconProps = {
  className?: string;
};

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M8 8.667a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14.667s4.667-3.333 4.667-8A4.667 4.667 0 1 0 3.333 6.667c0 4.667 4.667 8 4.667 8Z"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M4.667 2.667h2l1.333 3-1.667 1a8.667 8.667 0 0 0 4.667 4.667l1-1.667 3 1.333v2c0 .734-.6 1.334-1.334 1.334C4.4 14.667.667 10.934.667 6.667.667 5.933 1.267 5.333 2 5.333h2.667Z"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M2.667 4h10.666c.734 0 1.334.6 1.334 1.334v5.332c0 .734-.6 1.334-1.334 1.334H2.667c-.734 0-1.334-.6-1.334-1.334V5.334c0-.734.6-1.334 1.334-1.334Z"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m14.667 5.334-6 4-6-4"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M13.333 6.667a4.167 4.167 0 0 1 4.167 4.166v5H14.17v-5a1.25 1.25 0 1 0-2.5 0v5H6.667v-8.333h2.5v1.2a2.917 2.917 0 0 1 2.666-1.45 3.125 3.125 0 0 1 3.333 3.125v5.458h-2.5v-5a1.25 1.25 0 0 0-2.5 0v5H6.667V6.667h2.5v1.2Z"
        fill="currentColor"
      />
      <path d="M2.5 6.667h2.5v8.333H2.5V6.667Z" fill="currentColor" />
      <path
        d="M3.75 2.5a1.458 1.458 0 1 0 0 2.917 1.458 1.458 0 0 0 0-2.917Z"
        fill="currentColor"
      />
    </svg>
  );
}
