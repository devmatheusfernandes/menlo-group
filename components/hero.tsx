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
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=72",
    alt: "Modern commercial office building exterior",
  },
  {
    num: "02",
    label: "Dental Transitions",
    href: "#dental",
    icon: ToothIcon,
    fact: "NATIONWIDE",
    caption: "Sales, purchases, certified appraisals and new-practice startups.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1800&q=72",
    alt: "Modern dental office treatment room",
  },
  {
    num: "03",
    label: "Business Brokerage",
    href: "#brokerage",
    icon: StorefrontIcon,
    fact: "100% CONFIDENTIAL",
    caption: "Valuation, confidential sale and post-sale transition planning.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=72",
    alt: "Business partners shaking hands after a deal",
  },
];

/** How long each division holds before the hero advances on its own. */
const AUTOPLAY_MS = 5200;

export function Hero() {
  const [active, setActive] = useState(0);
  // Cleared for good once the visitor picks a division themselves.
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const division = DIVISIONS[active];
  const playing = autoplay && !hovered && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % DIVISIONS.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [playing]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-900 pt-28 lg:pt-32"
    >
      <Backdrop active={active} reduceMotion={!!reduceMotion} />

      <div className={`${wrap} relative z-[1] flex flex-1 flex-col`}>
        <MetaRow division={division} />

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 lg:py-16">
          <Headline reduceMotion={!!reduceMotion} />
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <DivisionPanel division={division} />
          </div>
        </div>

        <DivisionSelector
          active={active}
          playing={playing}
          onSelect={(i) => {
            setActive(i);
            setAutoplay(false);
          }}
          onHover={(i) => {
            setHovered(true);
            setActive(i);
          }}
          onHoverEnd={() => setHovered(false)}
        />
      </div>
    </section>
  );
}

/**
 * Full-bleed division photography. All three stay mounted so switching is a
 * crossfade of already-decoded images rather than a fresh network request.
 */
function Backdrop({
  active,
  reduceMotion,
}: {
  active: number;
  reduceMotion: boolean;
}) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      {DIVISIONS.map((division, i) => (
        <motion.div
          key={division.href}
          className="absolute inset-0"
          initial={{ opacity: i === 0 ? 1 : 0, scale: 1 }}
          animate={{
            opacity: active === i ? 1 : 0,
            // Slow drift so a held frame never feels like a still.
            scale: reduceMotion ? 1 : active === i ? 1.06 : 1,
          }}
          transition={{
            opacity: { duration: 1.1, ease: "easeInOut" },
            scale: { duration: AUTOPLAY_MS / 1000 + 2, ease: "linear" },
          }}
        >
          <Image
            src={division.img}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover"
          />
        </motion.div>
      ))}

      {/* Legibility stack: dark from the left for the copy, solid at the very
          bottom so the section meets the cream band below on a clean edge. */}
      <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(8,22,36,.95)_0%,rgba(8,22,36,.82)_38%,rgba(8,22,36,.42)_72%,rgba(8,22,36,.55)_100%)]" />
      <div className="absolute inset-0 [background:linear-gradient(180deg,rgba(8,22,36,.9)_0%,rgba(8,22,36,.25)_28%,rgba(8,22,36,.6)_72%,var(--color-navy-900)_100%)]" />
      <div className="absolute inset-0 bg-[length:40px_40px] opacity-70 sm:bg-[length:58px_58px] [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_55%_60%_at_28%_35%,black_25%,transparent_78%)]" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(460px_320px_at_20%_12%,rgba(245,185,20,.16),transparent_74%)]" />
    </div>
  );
}

function MetaRow({ division }: { division: (typeof DIVISIONS)[number] }) {
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
      <span className="ml-auto flex items-center gap-2 text-white/60">
        <span className="hidden sm:inline">Now viewing</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={division.href}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
            className="text-gold-500"
          >
            [{division.num}] {division.label}
          </motion.span>
        </AnimatePresence>
      </span>
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
        className="text-[clamp(2.1rem,5.2vw,4.15rem)] leading-[1.05] tracking-[-0.03em] text-balance text-white sm:leading-[1.01]"
      >
        <span className="mr-3.5 inline-block h-3 w-3 -translate-y-[0.12em] rounded-full bg-gold-500 align-middle" />
        Three specialties.
        {/* Fixed break only once there is room; below that the text wraps. */}
        <br className="hidden sm:inline" />{" "}
        One{" "}
        <span className="relative inline-block text-gold-500">
          standard
          <svg
            viewBox="0 0 300 22"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute -bottom-[0.11em] left-0 h-[0.3em] w-full overflow-visible"
          >
          </svg>
        </span>{" "}
        of service.
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-7 max-w-[44ch] text-[1.06rem] leading-[1.6] text-white/75"
      >
        Commercial real estate, dental practice transitions and business sales —
        three teams that used to live on separate websites, now working under one
        roof in Tempe.
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

/** The card that used to hold the photo — now a spec panel over the backdrop. */
function DivisionPanel({ division }: { division: (typeof DIVISIONS)[number] }) {
  const Icon = division.icon;

  return (
    <div className="relative overflow-hidden rounded-panel border border-white/15 bg-navy-900/45 p-6 backdrop-blur-md sm:p-7 lg:ml-auto lg:max-w-[400px]">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] bg-gold-500"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={division.href}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 shrink-0 text-gold-500" />
            <p className="font-mono text-[0.68rem] font-semibold tracking-[0.14em] text-gold-500">
              [{division.num}] {division.fact}
            </p>
          </div>

          <p className="mt-4 text-[1.35rem] leading-[1.2] font-semibold text-white">
            {division.label}
          </p>
          <p className="mt-2.5 max-w-[34ch] text-[0.92rem] leading-[1.55] text-white/70">
            {division.caption}
          </p>

          <a
            href={division.href}
            className="group mt-5 inline-flex items-center gap-2 border-b border-white/25 pb-0.5 text-[0.85rem] font-semibold text-white transition-colors hover:border-gold-500 hover:text-gold-500"
          >
            Explore {division.label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DivisionSelector({
  active,
  playing,
  onSelect,
  onHover,
  onHoverEnd,
}: {
  active: number;
  playing: boolean;
  onSelect: (index: number) => void;
  onHover: (index: number) => void;
  onHoverEnd: () => void;
}) {
  return (
    <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-3">
      {DIVISIONS.map((division, i) => {
        const Icon = division.icon;
        const isActive = active === i;
        return (
          <button
            key={division.href}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(i)}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={onHoverEnd}
            onFocus={() => onHover(i)}
            onBlur={onHoverEnd}
            className="group relative flex items-center gap-3.5 border-b border-white/10 px-1 py-5 text-left sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0"
          >
            {isActive && (
              <motion.span
                layoutId="hero-division-underline"
                className={`absolute -top-px left-0 h-0.5 w-full overflow-hidden ${
                  playing ? "bg-gold-500/25" : "bg-gold-500"
                }`}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              >
                {/* While autoplaying, the underline fills to time the next change. */}
                {playing && (
                  <motion.span
                    key={active}
                    className="block h-full w-full origin-left bg-gold-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
              </motion.span>
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
