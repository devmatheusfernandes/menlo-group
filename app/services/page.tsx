import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BuildingIcon,
  CalendarIcon,
  ChartIcon,
  DocumentIcon,
  HandshakeIcon,
  KeyIcon,
  LockIcon,
  NetworkIcon,
  ScaleIcon,
  SearchIcon,
  SproutIcon,
  StorefrontIcon,
  TagIcon,
  ToothIcon,
} from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { PRACTICE_LIST, type PracticeId } from "@/lib/divisions";
import {
  PRACTICE_MEDIA,
  PROCESS,
  servicesOfPractice,
  type ServiceIcon,
} from "@/lib/services";
import {
  btnGold,
  btnOutlineDark,
  btnOutlineNavy,
  btnSm,
  sectionHeading,
  wrap,
} from "@/lib/styles";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Everything Menlo Group does, by practice area: commercial real estate brokerage and management, dental practice transitions including DSO affiliations, and confidential sales and valuations for every other business.",
};

const SERVICE_ICONS: Record<
  ServiceIcon,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  search: SearchIcon,
  tag: TagIcon,
  chart: ChartIcon,
  key: KeyIcon,
  tooth: ToothIcon,
  network: NetworkIcon,
  scale: ScaleIcon,
  sprout: SproutIcon,
  lock: LockIcon,
  handshake: HandshakeIcon,
  calendar: CalendarIcon,
  document: DocumentIcon,
};

const PRACTICE_ICONS = {
  "real-estate": BuildingIcon,
  dental: ToothIcon,
  "business-brokerage": StorefrontIcon,
} as const;

const DIVISION_LABEL: Record<PracticeId, string> = {
  "real-estate": "Menlo Real Estate",
  dental: "Menlo Business Advisors",
  "business-brokerage": "Menlo Business Advisors",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we actually do"
        title="Two divisions. Three practice areas. Twelve services."
        lede="Find your row, scan the four cards under it. That is the whole page."
        actions={
          <>
            <Link href="/#contact" className={`${btnGold} group`}>
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
            </Link>
            <Link href="/listings" className={btnOutlineDark}>
              Browse listings
            </Link>
          </>
        }
      />

      {/* Visual jump nav — the photo does the explaining. */}
      <section className="bg-cream-50 py-12 lg:py-14">
        <div className={`${wrap} grid gap-5 sm:grid-cols-3`}>
          {PRACTICE_LIST.map((practice, i) => {
            const media = PRACTICE_MEDIA[practice.id];
            const Icon = PRACTICE_ICONS[practice.id];
            return (
              <Reveal key={practice.id} delay={i * 0.08}>
                <a
                  href={`#${practice.id}`}
                  className="group relative flex h-[190px] flex-col justify-end overflow-hidden rounded-panel shadow-card"
                >
                  <Image
                    src={media.img}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 360px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 [background:linear-gradient(180deg,rgba(8,22,36,.15)_0%,rgba(8,22,36,.55)_55%,rgba(8,22,36,.9)_100%)]"
                  />
                  <span className="relative z-[1] flex items-center gap-2.5 px-5 pb-5">
                    <Icon className="h-5 w-5 shrink-0 text-gold-500" />
                    <span className="font-display text-[1.15rem] font-semibold text-white">
                      {practice.label}
                    </span>
                    <ArrowRight className="ml-auto h-4 w-4 text-gold-500 transition-transform group-hover:translate-x-[3px]" />
                  </span>
                  <span className="relative z-[1] px-5 pb-4 font-mono text-[0.62rem] tracking-[0.1em] text-white/60">
                    {media.tag}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      {PRACTICE_LIST.map((practice, index) => {
        const Icon = PRACTICE_ICONS[practice.id];
        const services = servicesOfPractice(practice.id);
        const tinted = index % 2 === 0;

        return (
          <section
            key={practice.id}
            id={practice.id}
            className={`scroll-mt-24 py-16 lg:py-20 ${tinted ? "bg-cream-100" : "bg-cream-50"}`}
          >
            <div className={wrap}>
              <Reveal className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-500">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <Eyebrow>{DIVISION_LABEL[practice.id]}</Eyebrow>
                    <h2 className={`${sectionHeading} mt-1.5`}>
                      {practice.label}
                    </h2>
                  </div>
                </div>
                <Link
                  href={`/listings?practice=${practice.id}`}
                  className={`${btnOutlineNavy} ${btnSm} group shrink-0`}
                >
                  View listings
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
                </Link>
              </Reveal>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((service, i) => {
                  const ServiceIconComponent = SERVICE_ICONS[service.icon];
                  return (
                    <Reveal
                      key={service.id}
                      delay={i * 0.06}
                      className="group flex flex-col rounded-panel border border-line bg-white px-5 py-6 shadow-card transition-colors hover:border-gold-500"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-card bg-cream-100 text-navy-900 transition-colors group-hover:bg-gold-500">
                        <ServiceIconComponent className="h-6 w-6" />
                      </span>
                      <h3 className="mt-4 font-display text-[1.08rem] leading-[1.25] font-semibold text-navy-900">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 text-[0.88rem] leading-[1.55] text-muted">
                        {service.summary}
                      </p>
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {service.points.map((point) => (
                          <li
                            key={point}
                            className="rounded-md bg-cream-100 px-2 py-1 font-mono text-[0.68rem] text-navy-700"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ---------------------------------------------------------- process */}
      <section className="bg-gradient-to-b from-navy-900 to-navy-800 py-20">
        <div className={wrap}>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow onDark>The same six steps, every time</Eyebrow>
              <h2 className={`${sectionHeading} mt-4 max-w-[20ch] text-white`}>
                How an engagement runs.
              </h2>
            </div>
            <Link href="/why-menlo" className={`${btnOutlineDark} ${btnSm}`}>
              Why clients pick Menlo
            </Link>
          </Reveal>

          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {PROCESS.map((step, i) => (
              <Reveal
                key={step.num}
                delay={i * 0.05}
                className="relative rounded-card border border-white/10 bg-white/4 px-4 py-5"
              >
                {/* Connector between steps on the widest layout. */}
                {i < PROCESS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-3 hidden h-px w-3 bg-white/15 lg:block"
                  />
                )}
                <span className="font-mono text-[0.78rem] font-semibold text-gold-500">
                  {step.num}
                </span>
                <h3 className="mt-2 mb-1.5 font-display text-[0.98rem] font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-[0.8rem] leading-[1.5] text-white/60">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2} className="mt-10">
            <Link href="/#contact" className={`${btnGold} group`}>
              Start at step one
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
