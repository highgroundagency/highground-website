import type { ReactElement } from "react";
import type { ServiceIcon } from "../../data/services";

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function svgProps(className?: string) {
  return {
    className,
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em",
    "aria-hidden": true,
    focusable: false as const,
  };
}

/* ----------------------------- Service icons ---------------------------- */

function AdsIcon({ className }: IconProps) {
  // Target — putting you in front of the right local buyers.
  return (
    <svg {...svgProps(className)}>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <circle cx="12" cy="12" r="5" {...stroke} />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function ContentIcon({ className }: IconProps) {
  // Video camera — script, film & edit.
  return (
    <svg {...svgProps(className)}>
      <rect x="3" y="6" width="13" height="12" rx="2.5" {...stroke} />
      <path d="M16 10l5-3v10l-5-3z" {...stroke} />
    </svg>
  );
}

function SocialIcon({ className }: IconProps) {
  // Speech bubble + posts — social growth & posting.
  return (
    <svg {...svgProps(className)}>
      <path
        d="M20 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-4A8 8 0 1 1 20 11.5z"
        {...stroke}
      />
      <circle cx="9" cy="11.5" r="0.9" fill="currentColor" />
      <circle cx="12.5" cy="11.5" r="0.9" fill="currentColor" />
      <circle cx="16" cy="11.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function WebIcon({ className }: IconProps) {
  // Browser window — websites & landing pages.
  return (
    <svg {...svgProps(className)}>
      <rect x="3" y="4" width="18" height="14" rx="2.5" {...stroke} />
      <path d="M3 8.5h18" {...stroke} />
      <path d="M9 22h6M12 18v4" {...stroke} />
      <circle cx="6" cy="6.2" r="0.55" fill="currentColor" />
      <circle cx="8" cy="6.2" r="0.55" fill="currentColor" />
    </svg>
  );
}

function EmailIcon({ className }: IconProps) {
  // Envelope — email automation.
  return (
    <svg {...svgProps(className)}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" {...stroke} />
      <path d="M4 7.5l8 5.5 8-5.5" {...stroke} />
    </svg>
  );
}

export const ServiceIcons: Record<
  ServiceIcon,
  (props: IconProps) => ReactElement
> = {
  ads: AdsIcon,
  content: ContentIcon,
  social: SocialIcon,
  web: WebIcon,
  email: EmailIcon,
};

/* ------------------------------- UI icons ------------------------------- */

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M4 12h15M13 6l6 6-6 6" {...stroke} />
    </svg>
  );
}

export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 5v14M6 13l6 6 6-6" {...stroke} />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M4 7h16M4 12h16M4 17h16" {...stroke} />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M6 6l12 12M18 6L6 18" {...stroke} />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M5 12.5l4.5 4.5L19 6.5" {...stroke} />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 5v14M5 12h14" {...stroke} />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} />
      <circle cx="12" cy="12" r="4" {...stroke} />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}
