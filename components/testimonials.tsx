"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { sectionHeading } from "@/lib/styles";

const QUOTES = [
  {
    quote:
      "The team handled the sale of our commercial space with a clarity I didn't expect — every step was explained before it happened.",
    who: "Real Estate client",
    detail: "Industrial lease · Phoenix, AZ",
  },
  {
    quote:
      "Selling my practice after 20 years felt impossible to do calmly. Menlo Dental Transitions made the process predictable from start to finish.",
    who: "Dental Transitions client",
    detail: "Practice sale · Scottsdale, AZ",
  },
  {
    quote:
      "What I valued most was the discretion — my employees only found out about the sale once the new owner was already in place.",
    who: "Business Brokerage client",
    detail: "Business sale · Mesa, AZ",
  },
  {
    quote:
      "We needed to buy the location and value an acquisition at the same time — having both under one team saved us weeks.",
    who: "Multi-division client",
    detail: "Real Estate + Business Brokerage",
  },
];

/** Percent of the doubled track travelled per second (one full loop ≈ 42s). */
const SPEED = 50 / 42;

export function Testimonials() {
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const x = useTransform(progress, (value) => `${value}%`);

  useAnimationFrame((_, delta) => {
    if (paused || reduceMotion) return;
    let next = progress.get() - (delta / 1000) * SPEED;
    // The track holds two identical sets, so -50% is a seamless wrap point.
    if (next <= -50) next += 50;
    progress.set(next);
  });

  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Clients across all three divisions</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className={`${sectionHeading} mt-4 mb-11 max-w-[20ch]`}>
            Trust is the thread that connects us.
          </h2>
        </Reveal>
      </div>

      <Reveal
        delay={0.16}
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <motion.div
          style={{ x }}
          className="flex w-max gap-8 sm:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {[...QUOTES, ...QUOTES].map((item, i) => (
            <blockquote
              key={`${item.who}-${i}`}
              className="m-0 w-[300px] shrink-0 rounded-panel border border-line bg-white px-6 py-7 sm:w-[380px] sm:px-8 sm:py-9"
            >
              <p className="mb-5 font-display text-[1.02rem] leading-[1.5] font-medium text-navy-900 italic sm:text-[1.14rem]">
                {item.quote}
              </p>
              <footer className="flex flex-col gap-1">
                <strong className="text-[0.9rem] text-navy-800">
                  {item.who}
                </strong>
                <span className="text-[0.8rem] text-muted">{item.detail}</span>
              </footer>
            </blockquote>
          ))}
        </motion.div>
      </Reveal>

      <p className="mt-8 px-8 text-center text-[0.75rem] text-faint">
        * Illustrative quotes for this presentation — swap in real testimonials
        from all three divisions before publishing.
      </p>
    </section>
  );
}
