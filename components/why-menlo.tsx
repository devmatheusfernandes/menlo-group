import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { sectionHeading, wrap } from "@/lib/styles";

const CARDS = [
  {
    num: "01",
    title: "Confidentiality first",
    body: "Employees, patients and customers don't find out about a transition until it makes sense — in real estate, dental practices or businesses.",
  },
  {
    num: "02",
    title: "Local roots, national reach",
    body: "We started in Tempe, AZ, and know the Arizona market inside and out — now serving dental transitions clients nationwide.",
  },
  {
    num: "03",
    title: "One team, three specialties",
    body: "Need a real estate broker and a business valuation expert on the same deal? It's the same phone call.",
  },
  {
    num: "04",
    title: "We illuminate the path",
    body: "Clear processes, realistic timelines and constant communication — from the first conversation to closing day.",
  },
];

export function WhyMenlo() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-gradient-to-b from-navy-900 to-navy-800 py-26"
    >
      <div className={wrap}>
        <Reveal>
          <Eyebrow onDark>What stays the same across all three</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className={`${sectionHeading} mt-4 mb-11 max-w-[20ch] text-white`}>
            The Menlo standard, in every transaction.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.num}
              delay={i * 0.08}
              className="rounded-card border border-white/10 bg-white/4 px-5.5 py-6.5"
            >
              <span className="font-mono text-[0.82rem] font-semibold text-gold-500">
                {card.num}
              </span>
              <h3 className="mt-3.5 mb-2.5 font-display text-[1.08rem] font-semibold text-white">
                {card.title}
              </h3>
              <p className="text-[0.88rem] leading-[1.55] text-white/65">
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
