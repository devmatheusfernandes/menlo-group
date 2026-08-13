import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { sectionHeading, wrap } from "@/lib/styles";

export function DivisionsIntro() {
  return (
    <section id="divisions" className="scroll-mt-24 pt-24 pb-5">
      <div className={wrap}>
        <Reveal>
          <Eyebrow>Why unify</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className={`${sectionHeading} mt-4 mb-5 max-w-[16ch]`}>
            Three businesses. One way of working.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="max-w-[66ch] text-[1.08rem] text-muted">
            Commercial real estate, dental practice transitions and business
            sales can feel like different worlds — but at Menlo, all three start
            from the same question:{" "}
            <em className="font-medium text-navy-800 not-italic">
              how do we prepare our client for the next chapter with the least
              risk possible?
            </em>{" "}
            Bringing the three under one site simply reflects what was already
            true in practice: one team behind every division.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
