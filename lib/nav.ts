export type NavLink = {
  href: string;
  label: string;
  /** Section anchors on the landing page get highlighted by scroll position. */
  section?: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/listings", label: "Listings" },
  { href: "/our-team", label: "Our Team" },
  { href: "/why-menlo", label: "Why Menlo" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

export const PHONE = { label: "(480) 525-5362", tel: "4805255362" };
