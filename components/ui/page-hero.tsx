import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { wrap } from "@/lib/styles";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  /** Buttons or links under the lede. */
  actions?: ReactNode;
  /** Small mono facts pinned to the bottom of the band. */
  facts?: { label: string; value: string }[];
};

/**
 * The navy band every inner page opens with. The landing page has its own
 * cinematic hero; everything else shares this one so the pages read as a set.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  facts,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-32 pb-14 lg:pt-40 lg:pb-18">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[length:44px_44px] opacity-70 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_70%_at_22%_30%,black_20%,transparent_78%)]" />
        <div className="absolute inset-0 [background:radial-gradient(520px_340px_at_18%_8%,rgba(245,185,20,.18),transparent_72%)]" />
      </div>

      <div className={wrap}>
        <Reveal>
          <Eyebrow onDark>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-balance text-white">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-[62ch] text-[1.06rem] leading-[1.62] text-white/72">
            {lede}
          </p>
        </Reveal>

        {actions && (
          <Reveal delay={0.24} className="mt-8 flex flex-wrap items-center gap-5">
            {actions}
          </Reveal>
        )}

        {facts && facts.length > 0 && (
          <Reveal
            delay={0.32}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/12 pt-6 lg:grid-cols-4"
          >
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1.5">
                <span className="font-mono text-[1.15rem] font-semibold text-gold-500">
                  {fact.value}
                </span>
                <span className="max-w-[22ch] text-[0.8rem] leading-[1.45] text-white/55">
                  {fact.label}
                </span>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
