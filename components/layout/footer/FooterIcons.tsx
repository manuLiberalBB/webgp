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
        d="M9.22133 11.0453C9.35902 11.1086 9.51413 11.123 9.66113 11.0863C9.80812 11.0496 9.93822 10.9639 10.03 10.8433L10.2667 10.5333C10.3909 10.3677 10.5519 10.2333 10.737 10.1408C10.9222 10.0482 11.1263 10 11.3333 10H13.3333C13.687 10 14.0261 10.1405 14.2761 10.3905C14.5262 10.6406 14.6667 10.9797 14.6667 11.3333V13.3333C14.6667 13.687 14.5262 14.0261 14.2761 14.2761C14.0261 14.5262 13.687 14.6667 13.3333 14.6667C10.1507 14.6667 7.09849 13.4024 4.84805 11.1519C2.59762 8.90151 1.33333 5.84926 1.33333 2.66667C1.33333 2.31304 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31304 1.33333 2.66667 1.33333H4.66667C5.02029 1.33333 5.35943 1.47381 5.60948 1.72386C5.85952 1.97391 6 2.31304 6 2.66667V4.66667C6 4.87366 5.95181 5.07781 5.85924 5.26295C5.76667 5.44809 5.63226 5.60914 5.46667 5.73333L5.15467 5.96733C5.03228 6.06078 4.94601 6.19372 4.91053 6.34357C4.87504 6.49341 4.89252 6.65092 4.96 6.78933C5.87112 8.63991 7.36962 10.1365 9.22133 11.0453Z"
        stroke="currentColor"
        strokeWidth="1.33333"
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
        d="M13.3333 6.66667C14.6594 6.66667 15.9312 7.19345 16.8689 8.13113C17.8065 9.06881 18.3333 10.3406 18.3333 11.6667V17.5H15V11.6667C15 11.2246 14.8244 10.8007 14.5118 10.4882C14.1993 10.1756 13.7754 10 13.3333 10C12.8913 10 12.4674 10.1756 12.1548 10.4882C11.8423 10.8007 11.6667 11.2246 11.6667 11.6667V17.5H8.33333V11.6667C8.33333 10.3406 8.86012 9.06881 9.7978 8.13113C10.7355 7.19345 12.0073 6.66667 13.3333 6.66667Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 7.5H1.66667V17.5H5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33333 5C4.25381 5 5 4.25381 5 3.33333C5 2.41286 4.25381 1.66667 3.33333 1.66667C2.41286 1.66667 1.66667 2.41286 1.66667 3.33333C1.66667 4.25381 2.41286 5 3.33333 5Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
