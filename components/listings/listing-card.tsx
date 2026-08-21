"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockIcon } from "@/components/icons";
import {
  DEAL_TYPE_LABELS,
  STATUS_LABELS,
  locationOf,
  practiceLabel,
  type Listing,
} from "@/lib/listings";
import { chip } from "@/lib/styles";

const STATUS_TONE: Record<Listing["status"], string> = {
  available: "bg-white/92 text-navy-900",
  new: "bg-gold-500 text-navy-900",
  "under-contract": "bg-navy-900 text-white",
};

export function ListingCard({
  listing,
  reduceMotion = false,
}: {
  listing: Listing;
  reduceMotion?: boolean;
}) {
  return (
    <motion.article
      // Staggered by the grid that owns it; exiting is handled there too.
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 0.68, 0.2, 1] },
        },
      }}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-shadow hover:shadow-soft"
    >
      <div className="relative flex h-[180px] items-end justify-between gap-2 p-3.5">
        <Image
          src={listing.img}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 350px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 [background:linear-gradient(180deg,rgba(14,36,56,.35)_0%,transparent_38%,rgba(14,36,56,.6))]"
        />

        <span className="absolute top-3.5 left-3.5 z-[1] rounded-full bg-navy-900/80 px-2.5 py-[5px] font-mono text-[0.66rem] font-semibold tracking-[0.06em] text-white/90">
          {listing.ref}
        </span>
        <span
          className={`absolute top-3.5 right-3.5 z-[1] rounded-full px-2.5 py-[5px] font-mono text-[0.62rem] font-semibold tracking-[0.08em] uppercase ${STATUS_TONE[listing.status]}`}
        >
          {STATUS_LABELS[listing.status]}
        </span>

        <span className="relative z-[1] rounded-full bg-white/92 px-2.5 py-[5px] font-mono text-[0.68rem] font-semibold tracking-[0.05em] text-navy-900">
          {practiceLabel(listing)}
        </span>
        {listing.dealType && (
          <span className="relative z-[1] rounded-full bg-gold-500 px-2.5 py-[5px] font-mono text-[0.66rem] font-semibold tracking-[0.05em] text-navy-900">
            {DEAL_TYPE_LABELS[listing.dealType]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-5 pt-5 pb-5.5">
        <h3 className="font-display text-[1.12rem] font-semibold text-navy-900">
          {listing.title}
        </h3>
        <p className="text-[0.85rem] text-muted">
          {locationOf(listing)} · {listing.kind}
        </p>

        <div className="my-1 flex flex-wrap gap-2">
          {listing.meta.map((meta) => (
            <span key={meta} className={chip}>
              {meta}
            </span>
          ))}
        </div>

        <p className="flex-1 text-[0.86rem] text-muted">{listing.teaser}</p>

        {listing.requiresNda && (
          <p className="flex items-center gap-1.5 text-[0.75rem] font-medium text-gold-600">
            <LockIcon className="h-3.5 w-3.5" />
            NDA required for financials
          </p>
        )}

        <Link
          href={`/listings/${listing.id}`}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-3 text-[0.85rem] font-semibold text-white transition-colors hover:bg-gold-600"
        >
          View listing
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}
