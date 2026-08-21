import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LockIcon, ShieldIcon } from "@/components/icons";
import { ListingsExplorer } from "@/components/listings/listings-explorer";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { PRACTICES } from "@/lib/divisions";
import { listings, PRACTICE_FILTERS, type PracticeFilter } from "@/lib/listings";
import { btnGold, btnOutlineDark, textLink, wrap } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Listings",
  description:
    "Commercial properties, dental practices and businesses for sale through Menlo Group. Filter by practice area, and by doctor-to-doctor or DSO affiliation for dental.",
};

const VALID_PRACTICES = new Set(PRACTICE_FILTERS.map((f) => f.value));

function countOf(practice: PracticeFilter) {
  return practice === "all"
    ? listings.length
    : listings.filter((listing) => listing.practice === practice).length;
}

export default async function ListingsPage({
  searchParams,
}: PageProps<"/listings">) {
  const params = await searchParams;
  const requested = Array.isArray(params.practice)
    ? params.practice[0]
    : params.practice;
  const initialPractice: PracticeFilter =
    requested && VALID_PRACTICES.has(requested as PracticeFilter)
      ? (requested as PracticeFilter)
      : "all";

  return (
    <>
      <PageHero
        eyebrow="Properties, practices & businesses"
        title="Everything Menlo has on the market."
        lede="One search across both divisions. Commercial real estate is public from the first click. Dental practices and business opportunities show a public summary, and release financials once the agreements are signed."
        actions={
          <>
            <Link href="/#contact" className={`${btnGold} group`}>
              Tell us what you&apos;re looking for
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
            </Link>
            <Link href="/services" className={btnOutlineDark}>
              How a transition works
            </Link>
          </>
        }
        facts={[
          { value: String(countOf("all")), label: "Active listings" },
          {
            value: String(countOf("real-estate")),
            label: "Commercial properties",
          },
          { value: String(countOf("dental")), label: "Dental opportunities" },
          {
            value: String(countOf("business-brokerage")),
            label: "Businesses outside dentistry",
          },
        ]}
      />

      <section className="bg-cream-100 py-16 lg:py-20">
        <div className={wrap}>
          <div className="grid gap-5 sm:grid-cols-3">
            {(
              [
                {
                  icon: <ShieldIcon className="h-5 w-5" />,
                  title: "Public summaries first",
                  body: "Location, type and the shape of the opportunity are visible to everyone — no form in the way.",
                },
                {
                  icon: <LockIcon className="h-5 w-5" />,
                  title: "Financials behind an NDA",
                  body: "Collections, EBITDA and asking prices unlock in the browser as soon as you sign.",
                },
                {
                  icon: <ArrowRight className="h-5 w-5" />,
                  title: "Dental split by structure",
                  body: "Filter dental down to a doctor-to-doctor sale or a DSO affiliation — genuinely different deals.",
                },
              ] as const
            ).map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.08}
                className="rounded-card border border-line bg-white px-5 py-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-gold-500">
                  {item.icon}
                </span>
                <h2 className="mt-3.5 mb-2 font-display text-[1.02rem] font-semibold text-navy-900">
                  {item.title}
                </h2>
                <p className="text-[0.86rem] leading-[1.55] text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Remounted per query so a deep link from the footer or a division
              row always lands on the right filter. */}
          <ListingsExplorer
            key={initialPractice}
            initialPractice={initialPractice}
            pageSize={6}
          />

          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-panel border border-line bg-white px-6 py-6">
            <div>
              <h2 className="font-display text-[1.12rem] font-semibold text-navy-900">
                Not seeing it?
              </h2>
              <p className="mt-1.5 max-w-[54ch] text-[0.9rem] text-muted">
                A good share of what we sell never reaches this page. Tell us
                what you are looking for and we will match you against listings
                that are still confidential.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/#contact" className={`${btnGold} group`}>
                Set up a search
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
              </Link>
              <a
                href={`tel:${PRACTICES["real-estate"].tel}`}
                className={textLink}
              >
                {PRACTICES["real-estate"].phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
