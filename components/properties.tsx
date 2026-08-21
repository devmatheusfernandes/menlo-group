import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { ListingsExplorer } from "@/components/listings/listings-explorer";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { listings } from "@/lib/listings";
import { btnNavy, btnSm, sectionHeading, wrap } from "@/lib/styles";

/** Landing-page slice of the search. The full experience lives at /listings. */
export function Properties() {
  return (
    <section id="properties" className="scroll-mt-24 bg-cream-100 py-24">
      <div className={wrap}>
        <Reveal>
          <Eyebrow>One place to search</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className={`${sectionHeading} mt-4 mb-4 max-w-[22ch]`}>
            Properties, practices &amp; businesses — one search.
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-[62ch] text-[1.08rem] text-muted">
            Filter by practice area, narrow dental down to doctor-to-doctor or
            DSO affiliation, and open any listing for the full write-up. Confidential
            opportunities unlock as soon as the NDA is signed — right on the
            page, no email chain required.
          </p>
          <Link href="/listings" className={`${btnNavy} ${btnSm} group shrink-0`}>
            All {listings.length} listings
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
          </Link>
        </Reveal>

        <ListingsExplorer pageSize={3} />
      </div>
    </section>
  );
}
