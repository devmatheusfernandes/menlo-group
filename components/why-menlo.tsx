import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { btnOutlineDark, btnSm, sectionHeading, wrap } from "@/lib/styles";
import { PILLARS } from "@/lib/why-menlo";

/** Condensed version of /why-menlo, shown on the landing page. */
export function WhyMenlo() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-gradient-to-b from-navy-900 to-navy-800 py-26"
    >
      <div className={wrap}>
        <Reveal>
          <Eyebrow onDark>What stays the same across both divisions</Eyebrow>
        </Reveal>
        <Reveal
          delay={0.08}
          className="mb-11 flex flex-wrap items-end justify-between gap-6"
        >
          <h2 className={`${sectionHeading} mt-4 max-w-[20ch] text-white`}>
            The Menlo standard, in every transaction.
          </h2>
          <Link href="/why-menlo" className={`${btnOutlineDark} ${btnSm} group`}>
            Why Menlo
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.num}
              delay={i * 0.08}
              className="rounded-card border border-white/10 bg-white/4 px-5.5 py-6.5"
            >
              <span className="font-mono text-[0.82rem] font-semibold text-gold-500">
                {pillar.num}
              </span>
              <h3 className="mt-3.5 mb-2.5 font-display text-[1.08rem] font-semibold text-white">
                {pillar.title}
              </h3>
              <p className="text-[0.88rem] leading-[1.55] text-white/65">
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
