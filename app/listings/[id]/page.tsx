import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  DocumentIcon,
  MailIcon,
  PinIcon,
  ShieldIcon,
} from "@/components/icons";
import { ListingCard } from "@/components/listings/listing-card";
import { NdaGate, type NdaSibling } from "@/components/listings/nda-gate";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { PRACTICES } from "@/lib/divisions";
import {
  DEAL_TYPE_LABELS,
  STATUS_LABELS,
  getListing,
  listings,
  locationOf,
  practiceLabel,
  relatedListings,
} from "@/lib/listings";
import { btnOutlineNavy, btnSm, chip, sectionHeading, wrap } from "@/lib/styles";

export function generateStaticParams() {
  return listings.map((listing) => ({ id: listing.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/listings/[id]">): Promise<Metadata> {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) return { title: "Listing not found" };

  return {
    title: `${listing.title} (${listing.ref})`,
    description: listing.teaser,
  };
}

const DEAL_TYPE_EXPLAINER: Record<string, string> = {
  "doctor-to-doctor":
    "A doctor-to-doctor practice sale goes to an individual dentist buyer, is usually bank-financed against the practice's own numbers, and closes with a defined handover period. Menlo represents the seller and screens every buyer before a name is released.",
  "dso-affiliation":
    "A DSO affiliation is a competitive process with institutional buyers. Expect a quality-of-earnings review, EBITDA normalization, rollover equity and an earn-out tied to post-close performance. It is prepared and marketed very differently from a doctor-to-doctor sale.",
};

export default async function ListingPage({
  params,
}: PageProps<"/listings/[id]">) {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) notFound();

  const practice = PRACTICES[listing.practice];
  const related = relatedListings(listing);
  // Anything else the visitor could attach to the same NDA.
  const siblings: NdaSibling[] = listings
    .filter(
      (other) =>
        other.id !== listing.id &&
        other.requiresNda &&
        other.practice === listing.practice,
    )
    .map((other) => ({ id: other.id, ref: other.ref, title: other.title }));

  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section className="relative isolate overflow-hidden bg-navy-900 pt-28 pb-0 lg:pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={listing.img}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(8,22,36,.96)_0%,rgba(8,22,36,.86)_45%,rgba(8,22,36,.55)_100%)]" />
          <div className="absolute inset-0 [background:linear-gradient(180deg,rgba(8,22,36,.85)_0%,rgba(8,22,36,.35)_35%,var(--color-navy-900)_100%)]" />
        </div>

        <div className={`${wrap} relative z-[1] pb-14`}>
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] text-white/45 uppercase"
          >
            <Link href="/" className="transition-colors hover:text-gold-500">
              Menlo Group
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/listings"
              className="transition-colors hover:text-gold-500"
            >
              Listings
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/listings?practice=${listing.practice}`}
              className="transition-colors hover:text-gold-500"
            >
              {practiceLabel(listing)}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-gold-500">{listing.ref}</span>
          </nav>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-[0.68rem] font-semibold tracking-[0.08em] text-white/85">
              {listing.ref}
            </span>
            <span className="rounded-full bg-gold-500 px-3 py-1.5 font-mono text-[0.68rem] font-semibold tracking-[0.08em] text-navy-900 uppercase">
              {STATUS_LABELS[listing.status]}
            </span>
            {listing.dealType && (
              <span className="rounded-full border border-gold-500/60 px-3 py-1.5 font-mono text-[0.68rem] font-semibold tracking-[0.08em] text-gold-500 uppercase">
                {DEAL_TYPE_LABELS[listing.dealType]}
              </span>
            )}
          </div>

          <h1 className="mt-5 max-w-[20ch] text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.06] tracking-[-0.025em] text-balance text-white">
            {listing.title}
          </h1>

          <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.95rem] text-white/70">
            <span className="inline-flex items-center gap-2">
              <PinIcon className="h-4 w-4 text-gold-500" />
              {locationOf(listing)}
            </span>
            <span className="text-white/30">·</span>
            <span>{listing.kind}</span>
            <span className="text-white/30">·</span>
            <span>{practice.brand}</span>
          </p>

          <p className="mt-5 max-w-[62ch] text-[1.04rem] leading-[1.6] text-white/75">
            {listing.teaser}
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- content */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12`}>
          <div>
            <Reveal>
              <Eyebrow>Overview</Eyebrow>
              <h2 className="mt-3.5 mb-4 text-[1.6rem]">
                What we can say publicly
              </h2>
              <ul className="flex flex-col gap-3">
                {listing.summary.map((point) => (
                  <li
                    key={point}
                    className="relative pl-5.5 text-[0.98rem] leading-[1.6] text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.6em] left-0 h-2 w-2 rotate-45 rounded-[2px] bg-gold-500"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <h2 className="mb-4 text-[1.35rem]">Listing facts</h2>
              <dl className="grid gap-x-8 gap-y-3 rounded-panel border border-line bg-white px-6 py-6 sm:grid-cols-2">
                {Object.entries(listing.facts).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-4 border-b border-line/60 pb-3 last:border-b-0 sm:last:border-b-0"
                  >
                    <dt className="text-[0.86rem] text-muted">{key}</dt>
                    <dd className="text-right text-[0.88rem] font-semibold text-navy-900">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                {listing.meta.map((meta) => (
                  <span key={meta} className={chip}>
                    {meta}
                  </span>
                ))}
              </div>
            </Reveal>

            {listing.dealType && (
              <Reveal
                delay={0.12}
                className="mt-10 rounded-panel border-l-[3px] border-gold-500 bg-white px-6 py-6 shadow-card"
              >
                <h2 className="flex items-center gap-2.5 text-[1.15rem]">
                  <ShieldIcon className="h-5 w-5 text-gold-600" />
                  {DEAL_TYPE_LABELS[listing.dealType]} — what that means here
                </h2>
                <p className="mt-3 text-[0.94rem] leading-[1.65] text-muted">
                  {DEAL_TYPE_EXPLAINER[listing.dealType]}
                </p>
                <Link
                  href={`/listings?practice=dental`}
                  className={`${btnOutlineNavy} ${btnSm} group mt-5`}
                >
                  Compare other dental opportunities
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
                </Link>
              </Reveal>
            )}

            <Reveal delay={0.16} className="mt-10">
              <h2 className="mb-4 text-[1.35rem]">Gallery</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {listing.gallery.map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden rounded-card"
                  >
                    <Image
                      src={src}
                      alt={`${listing.title} — photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 45vw, 240px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[0.76rem] text-faint">
                * Representative imagery for this presentation build.
              </p>
            </Reveal>
          </div>

          {/* Sticky rail: the NDA gate plus who to call. */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <NdaGate listing={listing} siblings={siblings} />

            <div className="rounded-panel border border-line bg-white px-6 py-6">
              <Eyebrow>Listing advisor</Eyebrow>
              <p className="mt-3 font-display text-[1.08rem] font-semibold text-navy-900">
                {practice.brand}
              </p>
              <p className="mt-1.5 text-[0.86rem] leading-[1.55] text-muted">
                {practice.blurb}
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={`tel:${practice.tel}`}
                  className="font-mono text-[0.92rem] font-semibold text-navy-900 transition-colors hover:text-gold-600"
                >
                  {practice.phone}
                </a>
                <a
                  href={`mailto:${practice.email}`}
                  className="inline-flex items-center gap-2 text-[0.86rem] text-muted transition-colors hover:text-gold-600"
                >
                  <MailIcon className="h-4 w-4" />
                  {practice.email}
                </a>
              </div>
              <Link
                href="/our-team"
                className={`${btnOutlineNavy} ${btnSm} group mt-5 w-full justify-center`}
              >
                Meet the team
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
              </Link>
            </div>

            {listing.requiresNda && (
              <div className="rounded-panel border border-line bg-cream-100 px-6 py-5">
                <p className="flex items-center gap-2 font-display text-[0.98rem] font-semibold text-navy-900">
                  <DocumentIcon className="h-4.5 w-4.5 text-gold-600" />
                  Why the agreements
                </p>
                <p className="mt-2 text-[0.84rem] leading-[1.55] text-muted">
                  {listing.requiresHipaa
                    ? "Dental information touches patient data, so every buyer signs both a non-disclosure agreement and a HIPAA Business Associate Agreement before the practice detail is released."
                    : "The seller's employees, customers and vendors don't know the business is for sale. The non-disclosure agreement is what keeps it that way."}
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* --------------------------------------------------------- related */}
      {related.length > 0 && (
        <section className="bg-cream-100 py-20">
          <div className={wrap}>
            <Reveal>
              <Eyebrow>Also on the market</Eyebrow>
              <h2 className={`${sectionHeading} mt-4 mb-9 max-w-[20ch]`}>
                Related opportunities.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <ListingCard key={other.id} listing={other} />
              ))}
            </div>
            <div className="mt-9">
              <Link
                href="/listings"
                className={`${btnOutlineNavy} ${btnSm} group`}
              >
                Back to all listings
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
