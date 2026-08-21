import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BuildingIcon,
  MailIcon,
  PinIcon,
  StorefrontIcon,
  ToothIcon,
} from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { DIVISIONS, PRACTICES, type PracticeId } from "@/lib/divisions";
import { LEADERSHIP, TEAM, initials, type TeamMember } from "@/lib/team";
import {
  btnGold,
  btnOutlineDark,
  btnOutlineNavy,
  btnSm,
  sectionHeading,
  wrap,
} from "@/lib/styles";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "The people behind each part of Menlo Group — the commercial real estate division, and the business transitions division covering dental practices and every other kind of company.",
};

const PRACTICE_ICONS = {
  "real-estate": BuildingIcon,
  dental: ToothIcon,
  "business-brokerage": StorefrontIcon,
} as const;

export default function OurTeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Who you'll actually work with"
        title="One firm, two divisions, and the people inside each."
        lede="Real estate has its own brokers. Business transitions is split between a dental practice that works nationwide and a general brokerage team. Everyone sits in the same Tempe office."
        actions={
          <>
            <Link href="/#contact" className={`${btnGold} group`}>
              Talk to the right person
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
            </Link>
            <Link href="/services" className={btnOutlineDark}>
              See what each team does
            </Link>
          </>
        }
        facts={[
          {
            value: String(TEAM.length + LEADERSHIP.length),
            label: "People across the firm",
          },
          { value: "02", label: "Divisions" },
          { value: "03", label: "Practice areas" },
          { value: "Tempe, AZ", label: "One office behind all of it" },
        ]}
      />

      {/* ------------------------------------------------------- leadership */}
      <section className="bg-cream-50 py-18 lg:py-22">
        <div className={wrap}>
          <Reveal>
            <Eyebrow>Group leadership</Eyebrow>
            <h2 className={`${sectionHeading} mt-4 mb-9 max-w-[24ch]`}>
              The two people every division reports through.
            </h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {LEADERSHIP.map((member, i) => (
              <Reveal
                key={member.id}
                delay={i * 0.08}
                className="flex flex-col gap-5 rounded-panel border border-line bg-white p-6 shadow-card sm:flex-row sm:gap-7"
              >
                <Portrait member={member} className="w-full sm:w-[190px]" />
                <div className="min-w-0">
                  <h3 className="font-display text-[1.25rem] font-semibold text-navy-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[0.9rem] font-medium text-gold-600">
                    {member.role}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-[0.8rem] text-faint">
                    <PinIcon className="h-3.5 w-3.5" />
                    {member.base}
                  </p>
                  <p className="mt-3.5 text-[0.92rem] leading-[1.6] text-muted">
                    {member.bio}
                  </p>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-4 inline-flex items-center gap-2 text-[0.84rem] font-semibold text-navy-800 transition-colors hover:text-gold-600"
                  >
                    <MailIcon className="h-4 w-4" />
                    {member.email}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ division rosters */}
      {DIVISIONS.map((division, divisionIndex) => (
        <section
          key={division.id}
          id={division.slug}
          className={`scroll-mt-24 py-18 lg:py-22 ${
            divisionIndex % 2 === 0 ? "bg-cream-100" : "bg-cream-50"
          }`}
        >
          <div className={wrap}>
            <Reveal>
              <Eyebrow>
                Division {division.num} · {division.reach}
              </Eyebrow>
              <h2 className={`${sectionHeading} mt-4 max-w-[22ch]`}>
                {division.title}
              </h2>
              <p className="mt-4 max-w-[62ch] text-[1.04rem] text-muted">
                {division.tagline}
              </p>
            </Reveal>

            {division.practices.map((practiceId) => (
              <PracticeRoster key={practiceId} practiceId={practiceId} />
            ))}
          </div>
        </section>
      ))}

      {/* ------------------------------------------------------------- CTA */}
      <section className="bg-gradient-to-b from-navy-900 to-navy-800 py-22">
        <div
          className={`${wrap} flex flex-wrap items-center justify-between gap-8`}
        >
          <div>
            <Eyebrow onDark>Not sure who to ask for?</Eyebrow>
            <h2 className={`${sectionHeading} mt-4 max-w-[22ch] text-white`}>
              Send one message. We&apos;ll route it.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.02rem] text-white/70">
              Plenty of clients start in one division and end up needing the
              other. Describe the situation and the right person will call you
              back.
            </p>
          </div>
          <Link href="/#contact" className={`${btnGold} group shrink-0`}>
            Contact Menlo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
          </Link>
        </div>
      </section>

      <p className="bg-cream-50 px-8 py-8 text-center text-[0.76rem] text-faint">
        * Names, bios and headshots on this page are placeholders for the
        presentation build — swap them for the real roster before publishing.
      </p>
    </>
  );
}

function PracticeRoster({ practiceId }: { practiceId: PracticeId }) {
  const practice = PRACTICES[practiceId];
  const Icon = PRACTICE_ICONS[practiceId];
  const members = TEAM.filter((member) => member.practice === practiceId);

  return (
    <div id={practiceId} className="mt-11 scroll-mt-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-5 border-t border-line pt-8">
        <div className="flex items-start gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-500">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-[1.28rem] font-semibold text-navy-900">
              {practice.label}
            </h3>
            <p className="font-mono text-[0.7rem] tracking-[0.08em] text-faint uppercase">
              {practice.brand} · {practice.phone}
            </p>
          </div>
        </div>
        <Link
          href={`/listings?practice=${practiceId}`}
          className={`${btnOutlineNavy} ${btnSm} group`}
        >
          Their listings
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
        </Link>
      </Reveal>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member, i) => (
          <Reveal
            key={member.id}
            delay={i * 0.06}
            className="flex flex-col rounded-panel border border-line bg-white p-5 shadow-card"
          >
            <Portrait member={member} />
            <h4 className="mt-5 font-display text-[1.08rem] font-semibold text-navy-900">
              {member.name}
            </h4>
            <p className="mt-1 text-[0.84rem] font-medium text-gold-600">
              {member.role}
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[0.76rem] text-faint">
              <PinIcon className="h-3.5 w-3.5" />
              {member.base}
            </p>
            <p className="mt-3 text-[0.86rem] leading-[1.55] text-muted">
              {member.bio}
            </p>
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {member.credentials.map((credential) => (
                <li
                  key={credential}
                  className="rounded-md bg-cream-100 px-2 py-1 font-mono text-[0.68rem] text-navy-700"
                >
                  {credential}
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${member.email}`}
              className="mt-3 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-navy-800 transition-colors hover:text-gold-600"
            >
              <MailIcon className="h-3.5 w-3.5" />
              Email
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/**
 * Headshot with a gold block offset behind it. Falls back to tinted initials
 * for anyone whose photo hasn't been supplied yet.
 */
function Portrait({
  member,
  className = "",
}: {
  member: TeamMember;
  className?: string;
}) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <span
        aria-hidden="true"
        className="absolute -right-2 -bottom-2 h-[62%] w-[62%] rounded-card bg-gold-500"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-navy-900">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 240px"
            className="object-cover object-top"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center font-display text-[2rem] font-semibold text-gold-500"
          >
            {initials(member.name)}
          </span>
        )}
      </div>
    </div>
  );
}
