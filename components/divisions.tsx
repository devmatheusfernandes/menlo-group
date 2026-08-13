import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BuildingIcon,
  StorefrontIcon,
  ToothIcon,
} from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { btnOutlineNavy, btnSm, textLink, wrap } from "@/lib/styles";

type DivisionSection = {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  services: string[];
  primaryCta: string;
  secondaryCta: string;
  icon: ReactNode;
  img: string;
  imgAlt: string;
  visualTag: string;
  /** Places the image on the left on desktop. */
  reverse?: boolean;
};

const DIVISIONS: DivisionSection[] = [
  {
    id: "real-estate",
    eyebrow: "Commercial Real Estate",
    title: "Menlo Real Estate",
    lede: "Full-service commercial brokerage across the Greater Phoenix area — buyer and tenant representation, seller and landlord representation, investment consulting and property management for industrial, retail, child care and medical/dental office markets.",
    services: [
      "Buyer & tenant representation",
      "Seller & landlord representation",
      "Investment services & real estate consulting",
      "Commercial property management",
    ],
    primaryCta: "View available properties",
    secondaryCta: "Talk to a broker",
    icon: <BuildingIcon className="h-5 w-5 lg:h-6 lg:w-6" />,
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=70",
    imgAlt: "Modern commercial office building exterior",
    visualTag: "INDUSTRIAL · RETAIL · MEDICAL/DENTAL",
  },
  {
    id: "dental",
    eyebrow: "Dental Practice Transitions",
    title: "Menlo Dental Transitions",
    lede: "A nationwide affiliate specializing in dental practice transitions — sales, purchases, certified appraisals and new-practice startups, backed by the same confidentiality and process discipline that made Menlo a name Arizona dentists trust.",
    services: [
      "Dental practice sales",
      "Buyer & startup advisory",
      "Certified Valuation Analyst™ appraisals",
      "DSO (Dental Service Organization) transactions",
    ],
    primaryCta: "View practices for sale",
    secondaryCta: "Request an appraisal",
    icon: <ToothIcon className="h-5 w-5 lg:h-6 lg:w-6" />,
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=70",
    imgAlt: "Modern dental office treatment room",
    visualTag: "SELL · BUY · APPRAISE",
    reverse: true,
  },
  {
    id: "brokerage",
    eyebrow: "Business Sales & Valuation",
    title: "Menlo Business Brokerage",
    lede: "Buying, selling and valuing businesses outside the dental world, with the same commitment to discretion: your employees, vendors and customers don't need to know anything until it makes sense for the business.",
    services: [
      "Confidential business sales",
      "Buyer & investor advisory",
      "Business valuation & strategic pricing",
      "Post-sale transition planning",
    ],
    primaryCta: "View businesses for sale",
    secondaryCta: "Request a valuation",
    icon: <StorefrontIcon className="h-5 w-5 lg:h-6 lg:w-6" />,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=70",
    imgAlt: "Business partners shaking hands after a deal",
    visualTag: "CONFIDENTIAL · NDA REQUIRED",
  },
];

export function Divisions() {
  return (
    <>
      {DIVISIONS.map((division, i) => (
        <DivisionRow
          key={division.id}
          division={division}
          isLast={i === DIVISIONS.length - 1}
        />
      ))}
    </>
  );
}

function DivisionRow({
  division,
  isLast,
}: {
  division: DivisionSection;
  isLast: boolean;
}) {
  const columns = division.reverse
    ? "lg:grid-cols-[56px_0.78fr_1fr]"
    : "lg:grid-cols-[56px_1fr_0.78fr]";
  const visualOrder = division.reverse ? "lg:order-2" : "lg:order-3";
  const contentOrder = division.reverse ? "lg:order-3" : "lg:order-2";

  return (
    <section id={division.id} className="scroll-mt-24 py-14">
      <div
        className={`${wrap} grid grid-cols-[44px_1fr] items-center gap-x-5 gap-y-4 lg:gap-9 ${columns}`}
      >
        <div
          aria-hidden="true"
          className="relative row-span-2 flex self-stretch justify-center lg:order-1 lg:row-span-1"
        >
          {!isLast && (
            <span className="absolute top-12 -bottom-10 left-1/2 w-0.5 -translate-x-1/2 [background:repeating-linear-gradient(to_bottom,var(--color-gold-500)_0_6px,transparent_6px_12px)] lg:top-[60px] lg:-bottom-14" />
          )}
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-500 shadow-[0_0_0_6px_var(--color-cream-50),0_8px_20px_-8px_rgba(14,36,56,.4)] lg:h-14 lg:w-14">
            {division.icon}
          </span>
        </div>

        <Reveal
          delay={0.08}
          className={`relative mb-4 flex aspect-[16/10] overflow-hidden rounded-panel shadow-card lg:mb-0 lg:aspect-[4/3.1] ${visualOrder}`}
        >
          <Image
            src={division.img}
            alt={division.imgAlt}
            fill
            sizes="(max-width: 1024px) 90vw, 420px"
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-navy-900/85 px-3 py-1.5 font-mono text-[0.66rem] font-semibold tracking-[0.08em] text-white">
            {division.visualTag}
          </span>
        </Reveal>

        <Reveal className={contentOrder}>
          <Eyebrow>{division.eyebrow}</Eyebrow>
          <h3 className="mt-3.5 mb-4 text-[clamp(1.6rem,2.6vw,2.1rem)]">
            {division.title}
          </h3>
          <p className="mb-5 max-w-[56ch] text-[1.02rem] text-muted">
            {division.lede}
          </p>
          <ul className="mb-7 flex flex-col gap-2.5">
            {division.services.map((service) => (
              <li
                key={service}
                className="relative pl-5.5 text-[0.94rem] font-medium text-navy-800"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-[0.55em] left-0 h-2 w-2 rotate-45 rounded-[2px] bg-gold-500"
                />
                {service}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#properties" className={`${btnOutlineNavy} ${btnSm}`}>
              {division.primaryCta}
            </a>
            <a href="#contact" className={`${textLink} group inline-flex items-center gap-1.5`}>
              {division.secondaryCta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
