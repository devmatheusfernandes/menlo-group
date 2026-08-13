import { Contact } from "@/components/contact";
import { Divisions } from "@/components/divisions";
import { DivisionsIntro } from "@/components/divisions-intro";
import { Hero } from "@/components/hero";
import { Properties } from "@/components/properties";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatsBand } from "@/components/stats-band";
import { Testimonials } from "@/components/testimonials";
import { WhyMenlo } from "@/components/why-menlo";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[999] -translate-y-24 rounded-lg bg-navy-900 px-4 py-2.5 text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <StatsBand />
        <DivisionsIntro />
        <Divisions />
        <Properties />
        <WhyMenlo />
        <Testimonials />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
