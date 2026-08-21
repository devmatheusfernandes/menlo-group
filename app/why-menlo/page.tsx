import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, NetworkIcon, ShieldIcon } from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { PROCESS } from "@/lib/services";
import {
  btnGold,
  btnOutlineDark,
  btnOutlineNavy,
  btnSm,
  sectionHeading,
  wrap,
} from "@/lib/styles";
import { DIFFERENTIATORS, FAQS, PILLARS, STATS } from "@/lib/why-menlo";

export const metadata: Metadata = {
  title: "Why Menlo",
  description:
    "What clients get from Menlo Group that a generalist broker cannot offer: confidentiality by default, valuation before listing, a dental specialty that is genuinely specialised, and both space and business handled by one firm.",
};

export default function WhyMenloPage() {
  return (
    <>
      <PageHero
        eyebrow="Why clients pick us"
        title="Confidential by default. Specialised by design."
        lede="Menlo has been doing this since 2008, out of one office in Tempe. Two divisions, three practice areas, and a single non-negotiable: nothing about your transition becomes public before you decide it should."
        actions={
          <>
            <Link href="/#contact" className={`${btnGold} group`}>
              Start a private conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
            </Link>
            <Link href="/our-team" className={btnOutlineDark}>
              Meet the team
            </Link>
          </>
        }
        facts={STATS.map((stat) => ({ value: stat.num, label: stat.label }))}
      />

      {/* --------------------------------------------------------- pillars */}
      <section className="bg-cream-50 py-18 lg:py-22">
        <div className={wrap}>
          <Reveal>
            <Eyebrow>The four things that never change</Eyebrow>
            <h2 className={`${sectionHeading} mt-4 mb-10 max-w-[22ch]`}>
              The Menlo standard, in every transaction.
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => (
              <Reveal
                key={pillar.num}
                delay={i * 0.08}
                className="rounded-panel border border-line bg-white px-6 py-6 shadow-card"
              >
                <span className="font-mono text-[0.82rem] font-semibold text-gold-600">
                  {pillar.num}
                </span>
                <h3 className="mt-3.5 mb-2.5 font-display text-[1.12rem] font-semibold text-navy-900">
                  {pillar.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.6] text-muted">
                  {pillar.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- differentiators */}
      <section className="bg-cream-100 py-18 lg:py-22">
        <div className={wrap}>
          <Reveal>
            <Eyebrow>Where we differ</Eyebrow>
            <h2 className={`${sectionHeading} mt-4 mb-4 max-w-[24ch]`}>
              What a generalist broker does differently.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mb-10 max-w-[64ch] text-[1.06rem] text-muted">
              None of this is exotic. It is simply what happens when a firm
              refuses to price on optimism and refuses to market in public.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2">
            {DIFFERENTIATORS.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.06}
                className="rounded-panel border border-line bg-white px-6 py-6"
              >
                <h3 className="flex items-start gap-3 font-display text-[1.14rem] font-semibold text-navy-900">
                  <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.94rem] leading-[1.62] text-muted">
                  {item.body}
                </p>
                <p className="mt-4 border-t border-line pt-3.5 text-[0.85rem] text-faint italic">
                  {item.contrast}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ one process */}
      <section className="bg-gradient-to-b from-navy-900 to-navy-800 py-22">
        <div className={wrap}>
          <Reveal>
            <Eyebrow onDark>One process, two divisions</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={`${sectionHeading} mt-4 mb-4 max-w-[22ch] text-white`}>
              You always know which step you&apos;re on.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mb-11 max-w-[62ch] text-[1.04rem] text-white/70">
              The most common complaint about brokers is silence. Every Menlo
              engagement runs through the same six steps, and you are told which
              one you are in.
            </p>
          </Reveal>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((step, i) => (
              <Reveal
                key={step.num}
                delay={i * 0.06}
                className="rounded-card border border-white/10 bg-white/4 px-5.5 py-6"
              >
                <span className="font-mono text-[0.82rem] font-semibold text-gold-500">
                  {step.num}
                </span>
                <h3 className="mt-3 mb-2 font-display text-[1.06rem] font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-[0.88rem] leading-[1.55] text-white/65">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------- cross-division */}
      <section className="bg-cream-50 py-18 lg:py-22">
        <div className={`${wrap} grid items-center gap-10 lg:grid-cols-[1fr_.8fr]`}>
          <Reveal>
            <Eyebrow>The part nobody else can copy</Eyebrow>
            <h2 className={`${sectionHeading} mt-4 mb-5 max-w-[22ch]`}>
              The building and the business, in one conversation.
            </h2>
            <p className="max-w-[58ch] text-[1.04rem] leading-[1.65] text-muted">
              A dentist buying a practice usually also needs the space. An owner
              selling a company often owns the building it sits in. Handled by
              two firms, that becomes two timelines and a client stuck in the
              middle. Here it is one phone call, one team, one closing calendar.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link href="/services" className={`${btnOutlineNavy} ${btnSm} group`}>
                See both service lists
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
              </Link>
              <Link href="/listings" className={`${btnOutlineNavy} ${btnSm}`}>
                Browse listings
              </Link>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-panel border border-line bg-white px-7 py-8 shadow-card"
          >
            <NetworkIcon className="h-9 w-9 text-gold-600" />
            <p className="mt-5 font-display text-[1.12rem] leading-[1.45] font-medium text-navy-900 italic">
              &ldquo;We needed to buy the location and value an acquisition at
              the same time — having both under one team saved us weeks.&rdquo;
            </p>
            <p className="mt-4 text-[0.86rem] font-semibold text-navy-800">
              Multi-division client
            </p>
            <p className="text-[0.8rem] text-muted">
              Real Estate + Business Advisors
            </p>
            <p className="mt-4 border-t border-line pt-3 text-[0.74rem] text-faint">
              * Illustrative quote for this presentation build.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQ */}
      <section className="bg-cream-100 py-18 lg:py-22">
        <div className={wrap}>
          <Reveal>
            <Eyebrow>Questions we get every week</Eyebrow>
            <h2 className={`${sectionHeading} mt-4 mb-9 max-w-[20ch]`}>
              Before you call.
            </h2>
          </Reveal>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.05}>
                <details className="group rounded-panel border border-line bg-white px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-5 font-display text-[1.05rem] font-semibold text-navy-900">
                    {faq.q}
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line font-mono text-[1rem] text-gold-600 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3.5 max-w-[70ch] text-[0.94rem] leading-[1.65] text-muted">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-11 flex flex-wrap items-center gap-5">
            <Link href="/#contact" className={`${btnGold} group`}>
              Ask us directly
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
            </Link>
            <Link href="/our-team" className={`${btnOutlineNavy} ${btnSm}`}>
              Meet the team
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
