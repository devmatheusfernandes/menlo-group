import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  LogoMark,
} from "@/components/icons";
import { wrap } from "@/lib/styles";

const COLUMNS = [
  {
    heading: "Real Estate",
    links: [
      { label: "About the division", href: "#real-estate" },
      { label: "Available properties", href: "#properties" },
      { label: "Talk to a broker", href: "#contact" },
    ],
  },
  {
    heading: "Dental Transitions",
    links: [
      { label: "About the division", href: "#dental" },
      { label: "Practices for sale", href: "#properties" },
      { label: "Request an appraisal", href: "#contact" },
    ],
  },
  {
    heading: "Business Brokerage",
    links: [
      { label: "About the division", href: "#brokerage" },
      { label: "Businesses for sale", href: "#properties" },
      { label: "Request a valuation", href: "#contact" },
    ],
  },
  {
    heading: "Menlo Group",
    links: [
      { label: "About us", href: "#about" },
      { label: "Privacy policy", href: "#top" },
      { label: "Careers", href: "#contact" },
    ],
  },
];

const SOCIAL = [
  { label: "LinkedIn", Icon: LinkedInIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "Facebook", Icon: FacebookIcon },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-900 pt-15">
      <div
        className={`${wrap} grid grid-cols-1 gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]`}
      >
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <LogoMark className="h-[26px] w-5" />
            <span className="font-display text-[1.02rem] font-normal tracking-[0.03em] text-white">
              MENLO <b className="font-bold">GROUP</b>
            </span>
          </a>
          <p className="mt-4 max-w-[26ch] text-[0.85rem] text-white/55">
            Illuminating the path to success since 2008.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.heading} className="flex flex-col gap-2.5">
            <h2 className="mb-1.5 font-mono text-[0.7rem] font-semibold tracking-[0.08em] text-gold-500 uppercase">
              {column.heading}
            </h2>
            {column.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[0.86rem] text-white/60 transition-colors hover:text-gold-500"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div
        className={`${wrap} flex flex-wrap items-center justify-between gap-3.5 border-t border-white/10 py-6`}
      >
        <p className="text-[0.8rem] text-white/45">
          © 2008–2026 Menlo Group. All rights reserved.
        </p>
        <div className="flex gap-3.5" aria-label="Social media">
          {SOCIAL.map(({ label, Icon }) => (
            <a
              key={label}
              href="#top"
              aria-label={label}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-navy-900"
            >
              <Icon className="h-[15px] w-[15px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
