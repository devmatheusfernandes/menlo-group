"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, SearchIcon } from "@/components/icons";
import { ListingCard } from "@/components/listings/listing-card";
import {
  DEAL_TYPE_FILTERS,
  PRACTICE_FILTERS,
  filterListings,
  type DealTypeFilter,
  type PracticeFilter,
} from "@/lib/listings";

type ExplorerProps = {
  /** Cards per page. */
  pageSize?: number;
  /** Pre-selects a practice — used by the deep links from the division rows. */
  initialPractice?: PracticeFilter;
};

export function ListingsExplorer({
  pageSize = 6,
  initialPractice = "all",
}: ExplorerProps) {
  const [practice, setPractice] = useState<PracticeFilter>(initialPractice);
  const [dealType, setDealType] = useState<DealTypeFilter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () => filterListings(practice, dealType, query),
    [practice, dealType, query],
  );

  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  // Filtering can shrink the set under the current page — clamp instead of
  // showing an empty grid until the next render.
  const current = Math.min(page, pageCount - 1);
  const start = current * pageSize;
  const paged = visible.slice(start, start + pageSize);

  /** Wraps around, so the arrows never dead-end on a short result set. */
  const goTo = (next: number) => setPage((next + pageCount) % pageCount);

  const selectPractice = (next: PracticeFilter) => {
    setPractice(next);
    // The doctor-to-doctor / DSO affiliation split only means something inside dental.
    if (next !== "dental") setDealType("all");
    setPage(0);
  };

  return (
    <div>
      <div className="my-8 flex flex-wrap items-center justify-between gap-5 lg:mt-11">
        <div
          className="flex flex-wrap gap-2 rounded-full border border-line bg-white p-[5px]"
          role="tablist"
          aria-label="Filter by practice area"
        >
          {PRACTICE_FILTERS.map((filter) => {
            const isActive = practice === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectPractice(filter.value)}
                className={`relative rounded-full px-4.5 py-2.5 text-[0.85rem] font-semibold transition-colors ${
                  isActive ? "text-white" : "text-muted hover:text-navy-800"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="practice-pill"
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

        <div className="flex max-w-[380px] min-w-[240px] flex-1 items-center gap-2.5 rounded-full border border-line bg-white px-4.5 py-2.5">
          <SearchIcon className="h-[17px] w-[17px] shrink-0 text-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search by city, file number or keyword…"
            aria-label="Search listings"
            className="w-full border-none bg-transparent text-[0.92rem] outline-none"
          />
        </div>
      </div>

      {/* Dental is the only practice where the deal structure changes who the
          buyer is, so the second row only appears there. */}
      <AnimatePresence initial={false}>
        {practice === "dental" && (
          <motion.div
            key="deal-type"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className="mb-8 flex flex-wrap items-center gap-3"
              role="tablist"
              aria-label="Filter dental listings by deal structure"
            >
              <span className="font-mono text-[0.7rem] tracking-[0.14em] text-faint uppercase">
                Structure
              </span>
              {DEAL_TYPE_FILTERS.map((filter) => {
                const isActive = dealType === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setDealType(filter.value);
                      setPage(0);
                    }}
                    className={`rounded-full border px-3.5 py-1.5 text-[0.8rem] font-semibold transition-colors ${
                      isActive
                        ? "border-gold-600 bg-gold-100 text-navy-900"
                        : "border-line bg-white text-muted hover:border-navy-900/30 hover:text-navy-800"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The whole grid swaps as one layer. The outgoing copy is pulled out of
          flow while it fades, so nothing reflows mid-transition. */}
      <div className="relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={`${practice}|${dealType}|${query}|${current}`}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: reduceMotion ? 0 : 0.07 },
              },
            }}
            initial="hidden"
            animate="show"
            exit={{
              opacity: 0,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              transition: { duration: 0.22, ease: "easeOut" },
            }}
          >
            {paged.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {visible.length === 0 ? (
        <p className="py-15 text-center text-muted">
          No results found — try another term or clear your filters.
        </p>
      ) : (
        <Pagination
          page={current}
          pageCount={pageCount}
          from={start + 1}
          to={start + paged.length}
          total={visible.length}
          reduceMotion={!!reduceMotion}
          onGoTo={goTo}
        />
      )}
    </div>
  );
}

/** Mono page counter, numbered steps and wrap-around arrows. */
function Pagination({
  page,
  pageCount,
  from,
  to,
  total,
  reduceMotion,
  onGoTo,
}: {
  page: number;
  pageCount: number;
  from: number;
  to: number;
  total: number;
  reduceMotion: boolean;
  onGoTo: (page: number) => void;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white";

  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-6">
      <p
        aria-live="polite"
        className="font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase"
      >
        Showing {pad(from)}–{pad(to)}{" "}
        <span className="text-faint">of {pad(total)} listings</span>
      </p>

      {pageCount > 1 && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onGoTo(page - 1)}
            aria-label="Previous page"
            className={arrow}
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: pageCount }, (_, i) => {
              const isActive = i === page;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onGoTo(i)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-3 py-1.5 font-mono text-[0.74rem] font-semibold transition-colors ${
                    isActive ? "text-white" : "text-muted hover:text-navy-800"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="page-pill"
                      className="absolute inset-0 rounded-full bg-navy-900"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 36 }
                      }
                    />
                  )}
                  <span className="relative z-[1]">{pad(i + 1)}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onGoTo(page + 1)}
            aria-label="Next page"
            className={arrow}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
