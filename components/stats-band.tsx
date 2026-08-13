import { Reveal } from "@/components/ui/reveal";
import { wrap } from "@/lib/styles";

const STATS = [
  { num: "2008", label: "Founded in Tempe, AZ" },
  { num: "03", label: "Specialized divisions, one Menlo standard" },
  { num: "AZ → US", label: "Arizona roots, nationwide reach in Dental" },
  { num: "100%", label: "Confidential process, first call to closing" },
];

export function StatsBand() {
  return (
    <section className="bg-cream-50 pt-14 pb-2">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-5 border-y border-line py-7 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:py-9">
          {STATS.map((stat, i) => (
            <Reveal key={stat.num} delay={i * 0.08} className="flex flex-col gap-2">
              <span className="font-mono text-[1.5rem] font-semibold text-navy-900">
                {stat.num}
              </span>
              <span className="max-w-[22ch] text-[0.84rem] leading-[1.45] text-muted">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
