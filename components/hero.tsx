"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { btnGold, btnOutlineDark, wrap } from "@/lib/styles";

const TAGS = ["Real Estate", "Dental Transitions", "Business Brokerage"];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 0.68, 0.2, 1] as const },
    },
  };

  return (
    <section id="top" className="relative overflow-hidden bg-navy-900 pt-[150px] pb-[90px] max-sm:pt-[120px] max-sm:pb-[60px]">
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

      <motion.div
        className={`${wrap} relative z-[1] grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14`}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div>
          <motion.div variants={item} className="mb-6 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.04em] text-white/80"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={item}
            className="mb-6 text-[clamp(2.1rem,4.2vw,3.35rem)] text-white"
          >
            One team. Three ways to{" "}
            <em className="text-gold-500 not-italic">illuminate</em> the path
            forward.
          </motion.h1>

          <motion.p
            variants={item}
            className="mb-8 max-w-[520px] text-[1.06rem] text-white/70"
          >
            Menlo Group brings together three specialties that used to live on
            separate websites — <strong className="font-semibold text-white">Real Estate</strong>,{" "}
            <strong className="font-semibold text-white">Dental Transitions</strong> and{" "}
            <strong className="font-semibold text-white">Business Brokerage</strong>. Same trusted
            team, same standard of service, now under one roof.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3.5">
            <a href="#divisions" className={`${btnGold} group`}>
              Explore the divisions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
            </a>
            <a href="#properties" className={btnOutlineDark}>
              Search properties &amp; listings
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          aria-hidden="true"
          className="relative mx-auto h-[280px] w-full max-w-[340px] sm:h-[320px] lg:mr-0 lg:ml-auto lg:h-[420px] lg:max-w-[440px]"
        >
          <CollageCard
            className="top-0 left-0 z-[1] h-[64%] w-[76%] -rotate-3"
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=70"
            tag="REAL ESTATE"
            sizes="(max-width: 1024px) 260px, 340px"
            priority
          />
          <CollageCard
            className="right-0 bottom-0 z-[2] h-[48%] w-[54%] rotate-3"
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=70"
            tag="DENTAL TRANSITIONS"
            sizes="(max-width: 1024px) 190px, 240px"
          />
          <div className="absolute top-[4%] right-0 z-[3] flex rotate-3 flex-col gap-0.5 rounded-[14px] bg-white px-3.5 py-2.5 shadow-[0_18px_36px_-14px_rgba(4,13,22,.5)] lg:top-[8%] lg:-right-1.5 lg:px-[18px] lg:py-3.5">
            <span className="font-mono text-[1.15rem] font-semibold text-navy-900">
              2008
            </span>
            <span className="max-w-[11ch] text-[0.66rem] leading-[1.3] text-muted">
              Illuminating the path since
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Curved transition into the cream section below */}
      <div aria-hidden="true" className="absolute -bottom-px left-0 right-0 z-[1] leading-[0]">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="block h-10 w-full sm:h-16">
          <path
            d="M0,64 L0,32 C 240,4 480,-2 720,10 C 960,22 1200,4 1440,32 L1440,64 Z"
            fill="var(--color-cream-50)"
          />
        </svg>
      </div>
    </section>
  );
}

function CollageCard({
  className,
  src,
  tag,
  sizes,
  priority,
}: {
  className: string;
  src: string;
  tag: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[18px] border-[5px] border-white/8 shadow-collage ${className}`}
    >
      <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
      <span className="absolute bottom-3 left-3 rounded-full bg-navy-900/85 px-2.5 py-[5px] font-mono text-[0.62rem] font-semibold tracking-[0.06em] text-white">
        {tag}
      </span>
    </div>
  );
}
