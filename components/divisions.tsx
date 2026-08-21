import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseIcon,
  BuildingIcon,
  StorefrontIcon,
  ToothIcon,
} from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { DIVISIONS, PRACTICES, type Division, type PracticeId } from "@/lib/divisions";
import { btnOutlineNavy, btnSm, textLink, wrap } from "@/lib/styles";

const DIVISION_ICONS = {
  "real-estate": BuildingIcon,
  business: BriefcaseIcon,
} as const;

const PRACTICE_ICONS = {
  "real-estate": BuildingIcon,
  dental: ToothIcon,
  "business-brokerage": StorefrontIcon,
} as const;

/** Where "view listings" lands for each practice area. */
const LISTINGS_HREF: Record<PracticeId, string> = {
  "real-estate": "/listings?practice=real-estate",
  dental: "/listings?practice=dental",
  "business-brokerage": "/listings?practice=business-brokerage",
};

export function Divisions() {
  return (
    <>
      {DIVISIONS.map((division, i) => (
        <DivisionRow
          key={division.id}
          division={division}
          isLast={i === DIVISIONS.length - 1}
          reverse={i % 2 === 1}
        />
      ))}
    </>
  );
}

function DivisionRow({
  division,
  isLast,
  reverse,
}: {
  division: Division;
  isLast: boolean;
  reverse: boolean;
}) {
  const Icon = DIVISION_ICONS[division.id];
  const columns = reverse
    ? "lg:grid-cols-[56px_0.78fr_1fr]"
    : "lg:grid-cols-[56px_1fr_0.78fr]";
  const visualOrder = reverse ? "lg:order-2" : "lg:order-3";
  const contentOrder = reverse ? "lg:order-3" : "lg:order-2";

  return (
    <section id={division.slug} className="scroll-mt-24 py-14">
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
            <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
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
          <p className="mb-6 max-w-[58ch] text-[1.02rem] text-muted">
            {division.lede}
          </p>

          {/* A single-practice division lists services; the business division
              leads with its two practice areas, because that is the real fork
              in the road for a visitor. */}
          {division.practices.length > 1 ? (
            <div className="mb-7 grid gap-3.5 sm:grid-cols-2">
              {division.practices.map((id) => (
                <PracticeCard key={id} id={id} />
              ))}
            </div>
          ) : (
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
          )}

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href={
                division.practices.length > 1
                  ? "/listings"
                  : LISTINGS_HREF[division.practices[0]]
              }
              className={`${btnOutlineNavy} ${btnSm}`}
            >
              {division.id === "real-estate"
                ? "View available properties"
                : "View practices & businesses"}
            </Link>
            <Link
              href="/services"
              className={`${textLink} group inline-flex items-center gap-1.5`}
            >
              See the full service list
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PracticeCard({ id }: { id: PracticeId }) {
  const practice = PRACTICES[id];
  const Icon = PRACTICE_ICONS[id];

  return (
    <Link
      href={LISTINGS_HREF[id]}
      className="group flex flex-col gap-2 rounded-card border border-line bg-white px-4.5 py-4 transition-colors hover:border-navy-900/25"
    >
      <span className="flex items-center gap-2.5">
        <Icon className="h-4.5 w-4.5 shrink-0 text-gold-600" />
        <span className="font-display text-[1rem] font-semibold text-navy-900">
          {practice.label}
        </span>
      </span>
      <span className="font-mono text-[0.68rem] tracking-[0.06em] text-faint uppercase">
        {practice.brand}
      </span>
      <span className="text-[0.85rem] leading-[1.5] text-muted">
        {practice.blurb}
      </span>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[0.8rem] font-semibold text-navy-800 transition-colors group-hover:text-gold-600">
        Browse listings
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-[3px]" />
      </span>
    </Link>
  );
}
