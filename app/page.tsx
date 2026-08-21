import { Contact } from "@/components/contact";
import { Divisions } from "@/components/divisions";
import { DivisionsIntro } from "@/components/divisions-intro";
import { Hero } from "@/components/hero";
import { Properties } from "@/components/properties";
import { StatsBand } from "@/components/stats-band";
import { Testimonials } from "@/components/testimonials";
import { WhyMenlo } from "@/components/why-menlo";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <DivisionsIntro />
      <Divisions />
      <Properties />
      <WhyMenlo />
      <Testimonials />
      <Contact />
    </>
  );
}
