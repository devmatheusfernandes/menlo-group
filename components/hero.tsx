"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BuildingIcon,
  StorefrontIcon,
  ToothIcon,
} from "@/components/icons";
import { btnGold, wrap } from "@/lib/styles";

const DIVISIONS = [
  {
    num: "01",
    label: "Real Estate",
    href: "#real-estate",
    icon: BuildingIcon,
    fact: "GREATER PHOENIX",
    caption: "Industrial, retail, child care and medical/dental office.",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=70",
    alt: "Modern commercial office building exterior",
  },
  {
    num: "02",
    label: "Dental Transitions",
    href: "#dental",
    icon: ToothIcon,
    fact: "NATIONWIDE",
    caption: "Sales, purchases, certified appraisals and new-practice startups.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=70",
    alt: "Modern dental office treatment room",
  },
  {
    num: "03",
    label: "Business Brokerage",
    href: "#brokerage",
    icon: StorefrontIcon,
    fact: "100% CONFIDENTIAL",
    caption: "Valuation, confidential sale and post-sale transition planning.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=70",
    alt: "Business partners shaking hands after a deal",
  },
];

/** Deterministic 0..1 from an integer — keeps server and client markup identical. */
function noise(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function Hero() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const division = DIVISIONS[active];

  return (
    <section id="top" className="relative overflow-hidden bg-navy-900 pt-28 lg:pt-32">
      {/* Blueprint grid, masked to the upper-left quadrant */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[length:40px_40px] sm:bg-[length:58px_58px] [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_55%_60%_at_28%_35%,black_25%,transparent_78%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(ellipse_60%_55%_at_25%_20%,rgba(29,90,130,.32),transparent_68%),radial-gradient(ellipse_130%_60%_at_50%_108%,rgba(4,13,22,.92),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(420px_300px_at_22%_10%,rgba(245,185,20,.14),transparent_74%)]"
      />

      <div className={`${wrap} relative z-[1]`}>
        <MetaRow />

        <div className="grid items-center gap-12 pt-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:pt-16">
          <Headline reduceMotion={!!reduceMotion} />
          <DivisionVisual division={division} reduceMotion={!!reduceMotion} />
        </div>

        <DivisionSelector active={active} onSelect={setActive} />
      </div>

      <BlockEdge />
    </section>
  );
}

function MetaRow() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/Phoenix",
          timeZoneName: "short",
        }).format(new Date()),
      );
    // Deferred so the first paint matches the server markup exactly.
    const initial = setTimeout(update, 0);
    const interval = setInterval(update, 30_000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/10 pb-4 font-mono text-[0.68rem] tracking-[0.14em] text-white/45 uppercase">
      <span className="text-white/70">Tempe, Arizona</span>
      <span className="tabular-nums">{time ?? "—"}</span>
      <span className="ml-auto">Est. 2008</span>
    </div>
  );
}

function Headline({ reduceMotion }: { reduceMotion: boolean }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 0.68, 0.2, 1] as const },
    },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.h1
        variants={item}
        className="text-[clamp(2rem,5vw,4rem)] leading-[1.06] tracking-[-0.03em] text-balance text-white sm:leading-[1.02]"
      >
        <span className="mr-3.5 inline-block h-3 w-3 -translate-y-[0.12em] rounded-full bg-gold-500 align-middle" />
        One team.
        {/* Fixed breaks only once there is room; below that the text wraps. */}
        <br className="hidden sm:inline" />{" "}
        Three ways to{" "}
        <span className="relative inline-block text-gold-500">
          illuminate
          <svg
            viewBox="0 0 300 22"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute -bottom-[0.11em] left-0 h-[0.3em] w-full overflow-visible"
          >
            {/* Two offset passes read as a hand-drawn underline rather than a rule. */}
            <motion.path
              d="M4,13 C58,5 112,18 166,10 C214,3 258,15 296,7"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: reduceMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeInOut" }}
            />
            <motion.path
              d="M10,20 C70,13 118,24 174,17 C220,11 262,21 292,15"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.55"
              initial={{ pathLength: reduceMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.86, ease: "easeInOut" }}
            />
          </svg>
        </span>
        <br className="hidden sm:inline" /> the path forward.
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-7 max-w-[46ch] text-[1.06rem] text-white/70"
      >
        Commercial real estate, dental practice transitions and business sales —
        three specialties that used to live on separate websites, now under one
        roof. Same trusted team, same standard of service.
      </motion.p>

      <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-6">
        <a href="#contact" className={`${btnGold} group`}>
          Talk to Menlo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
        </a>
        <a
          href="#properties"
          className="font-mono text-[0.78rem] font-semibold tracking-[0.12em] text-gold-500 uppercase transition-colors hover:text-white"
        >
          [ Search listings ]
        </a>
      </motion.div>
    </motion.div>
  );
}

function DivisionVisual({
  division,
  reduceMotion,
}: {
  division: (typeof DIVISIONS)[number];
  reduceMotion: boolean;
}) {
  return (
    <div className="relative">
      <div className="relative aspect-[4/3.4] w-full overflow-hidden rounded-panel border border-white/10 sm:aspect-[4/3]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={division.href}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={division.img}
              alt={division.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 480px"
              priority
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 [background:linear-gradient(180deg,rgba(14,36,56,.10)_0%,rgba(14,36,56,.38)_45%,rgba(14,36,56,.94)_100%)]"
            />
            {!reduceMotion && <BlockWipe seed={division.num.charCodeAt(1)} />}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 z-[2] p-5 sm:p-6">
          <p className="font-mono text-[0.68rem] font-semibold tracking-[0.14em] text-gold-500">
            [{division.num}] {division.fact}
          </p>
          <p className="mt-2 max-w-[34ch] text-[0.9rem] text-white/80">
            {division.caption}
          </p>
          <a
            href={division.href}
            className="group mt-3 inline-flex items-center gap-2 border-b border-white/25 pb-0.5 text-[0.82rem] font-semibold text-white transition-colors hover:border-gold-500 hover:text-gold-500"
          >
            Explore {division.label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
          </a>
        </div>
      </div>
    </div>
  );
}

/** Pixel curtain that clears to reveal the photo underneath. */
function BlockWipe({ seed }: { seed: number }) {
  const COLS = 7;
  const ROWS = 5;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[1] grid"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => (
        <motion.span
          key={i}
          className="bg-navy-900"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: 0.45,
            delay: noise(i + seed) * 0.45,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function DivisionSelector({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-14 grid grid-cols-1 border-t border-white/10 sm:grid-cols-3">
      {DIVISIONS.map((division, i) => {
        const Icon = division.icon;
        const isActive = active === i;
        return (
          <button
            key={division.href}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(i)}
            onMouseEnter={() => onSelect(i)}
            className="group relative flex items-center gap-3.5 border-b border-white/10 px-1 py-5 text-left sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0"
          >
            {isActive && (
              <motion.span
                layoutId="hero-division-underline"
                className="absolute -top-px left-0 h-0.5 w-full bg-gold-500"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            <Icon
              className={`h-5 w-5 shrink-0 transition-colors ${
                isActive ? "text-gold-500" : "text-white/35"
              }`}
            />
            <span>
              <span
                className={`block font-mono text-[0.66rem] tracking-[0.14em] transition-colors ${
                  isActive ? "text-gold-500" : "text-white/35"
                }`}
              >
                [{division.num}]
              </span>
              <span
                className={`block text-[0.95rem] font-semibold transition-colors ${
                  isActive ? "text-white" : "text-white/60 group-hover:text-white"
                }`}
              >
                {division.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Pixelated dissolve from the navy hero into the cream section below. */
function BlockEdge() {
  const COLS = 24;
  const ROWS = 5;

  return (
    <div
      aria-hidden="true"
      className="relative z-[1] mt-12 grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
    >
      {Array.from({ length: ROWS }, (_, row) =>
        Array.from({ length: COLS }, (_, col) => {
          // Squared ramp keeps the top row nearly empty so the dissolve reads as
          // a gradient instead of scattered floating blocks.
          const density = ((row + 1) / ROWS) ** 2;
          const filled =
            row === ROWS - 1 || noise(col * 31 + row * 17) < density;
          return (
            <span
              key={`${row}-${col}`}
              className={`h-[16px] sm:h-[26px] ${filled ? "bg-cream-50" : "bg-transparent"}`}
            />
          );
        }),
      )}
    </div>
  );
}
