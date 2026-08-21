import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { sectionHeading, wrap } from "@/lib/styles";

export function DivisionsIntro() {
  return (
    <section id="divisions" className="scroll-mt-24 pt-24 pb-5">
      <div className={wrap}>
        <Reveal>
          <Eyebrow>How Menlo is organised</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className={`${sectionHeading} mt-4 mb-5 max-w-[16ch]`}>
            Two divisions. One way of working.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="max-w-[68ch] text-[1.08rem] text-muted">
            One division handles <strong className="font-semibold text-navy-800">space</strong> —
            commercial property to buy, lease, own and manage. The other handles{" "}
            <strong className="font-semibold text-navy-800">businesses</strong>: a
            dedicated dental practice that works nationwide, and a general
            brokerage team for every other kind of company. Different
            specialists, but the same question behind all of it:{" "}
            <em className="font-medium text-navy-800 not-italic">
              how do we prepare our client for the next chapter with the least
              risk possible?
            </em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
