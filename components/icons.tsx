import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 40" fill="none" aria-hidden="true" {...props}>
      <path
        d="M16 2.5a12 12 0 0 0-7 21.7c1.3 1 2 2.5 2 4.1v1.2h10v-1.2c0-1.6.7-3.1 2-4.1A12 12 0 0 0 16 2.5Z"
        stroke="var(--color-gold-500)"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      <line
        x1="12.5"
        y1="33.5"
        x2="19.5"
        y2="33.5"
        stroke="var(--color-gold-500)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="13.5"
        y1="37.5"
        x2="18.5"
        y2="37.5"
        stroke="var(--color-gold-500)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 21V9l8-6 8 6v12M9 21v-7h6v7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToothIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21c-1.5 0-2-4-3.5-4S6 20 5 20c-1.4 0-2-1.8-2-4.2C3 10 5 4 8 4c1.3 0 1.8.9 3 .9S13.7 4 15 4c3 0 5 6 5 11.8 0 2.4-.6 4.2-2 4.2-1 0-1.8-1-3.5-1S13.5 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StorefrontIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 21h18M4 21V10l3-4h10l3 4v11M9 21v-6h6v6M8 10h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="m21 21-4.3-4.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 17v-6M9 8h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V21h-4V9Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.42.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.42.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77a4.9 4.9 0 0 1 1.77-1.15c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.2-2.7a1.17 1.17 0 1 0 0-2.33 1.17 1.17 0 0 0 0 2.33Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-8.4h2.8l.4-3.3h-3.2V7.1c0-.96.27-1.6 1.66-1.6h1.77V2.5c-.3-.04-1.35-.13-2.56-.13-2.53 0-4.27 1.55-4.27 4.4v2.5H7v3.3h2.6V21h3.9Z" />
    </svg>
  );
}
