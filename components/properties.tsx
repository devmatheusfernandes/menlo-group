"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { InfoIcon, SearchIcon } from "@/components/icons";
import { NdaModal } from "@/components/nda-modal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { filters, listings, type Division, type Listing } from "@/lib/listings";
import { sectionHeading, wrap } from "@/lib/styles";

export function Properties() {
  const [activeFilter, setActiveFilter] = useState<Division | "all">("all");
  const [query, setQuery] = useState("");
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const reduceMotion = useReducedMotion();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((listing) => {
      const matchesFilter =
        activeFilter === "all" || listing.cat === activeFilter;
      const haystack =
        `${listing.title} ${listing.loc} ${listing.catLabel} ${listing.meta.join(" ")}`.toLowerCase();
      return matchesFilter && (!q || haystack.includes(q));
    });
  }, [activeFilter, query]);

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
        <Reveal delay={0.16}>
          <p className="max-w-[66ch] text-[1.08rem] text-muted">
            Today this search only lives on the Real Estate site. On a unified
            Menlo Group, it becomes the central hub: filter by division, browse
            the public summary, and when you&apos;re ready for the financial
            detail, sign the NDA right on screen — no need to leave the page.
          </p>
        </Reveal>

        <Reveal
          delay={0.24}
          className="my-8 flex flex-wrap items-center justify-between gap-5 lg:mt-11"
        >
          <div
            className="flex flex-wrap gap-2 rounded-full border border-line bg-white p-[5px]"
            role="tablist"
            aria-label="Filter by division"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`relative rounded-full px-4.5 py-2.5 text-[0.85rem] font-semibold transition-colors ${
                    isActive ? "text-white" : "text-muted hover:text-navy-800"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-navy-900"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 36 }
                      }
                    />
                  )}
                  <span className="relative z-[1]">{filter.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex min-w-[240px] max-w-[380px] flex-1 items-center gap-2.5 rounded-full border border-line bg-white px-4.5 py-2.5">
            <SearchIcon className="h-[17px] w-[17px] shrink-0 text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, type or keyword…"
              aria-label="Search listings"
              className="w-full border-none bg-transparent text-[0.92rem] outline-none"
            />
          </div>
        </Reveal>

        <motion.div
          layout={!reduceMotion}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                reduceMotion={!!reduceMotion}
                onOpen={() => setActiveListing(listing)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="py-15 text-center text-muted">
            No results found — try another term or clear your filters.
          </p>
        )}
      </div>

      <NdaModal listing={activeListing} onClose={() => setActiveListing(null)} />
    </section>
  );
}

function ListingCard({
  listing,
  reduceMotion,
  onOpen,
}: {
  listing: Listing;
  reduceMotion: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.article
      layout={!reduceMotion}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
      transition={{ duration: 0.5, ease: [0.22, 0.68, 0.2, 1] }}
      className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card"
    >
      <div className="relative flex h-[170px] items-end p-3.5">
        <Image
          src={listing.img}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 350px"
          className="object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 [background:linear-gradient(180deg,transparent_40%,rgba(14,36,56,.55))]"
        />
        <span className="relative z-[1] rounded-full bg-white/92 px-2.5 py-[5px] font-mono text-[0.68rem] font-semibold tracking-[0.05em] text-navy-900">
          {listing.catLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-5 pt-5 pb-5.5">
        <h3 className="font-display text-[1.12rem] font-semibold text-navy-900">
          {listing.title}
        </h3>
        <p className="text-[0.85rem] text-muted">{listing.loc}</p>
        <div className="my-1 flex flex-wrap gap-3.5">
          {listing.meta.map((meta) => (
            <span
              key={meta}
              className="rounded-md bg-cream-100 px-2.5 py-1 font-mono text-[0.74rem] text-navy-700"
            >
              {meta}
            </span>
          ))}
        </div>
        <p className="flex-1 text-[0.86rem] text-muted">{listing.teaser}</p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-3 text-[0.85rem] font-semibold text-white transition-colors hover:bg-gold-600"
        >
          View details &amp; reserve tour
          <InfoIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.article>
  );
}
