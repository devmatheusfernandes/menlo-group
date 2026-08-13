"use client";

import { useState, type FormEvent } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { btnGold, field, fieldLabel, wrap } from "@/lib/styles";

const DIVISIONS = [
  {
    label: "Real Estate",
    phone: "(480) 525-5362",
    tel: "4805255362",
    email: "info@menlocre.com",
  },
  {
    label: "Dental Transitions",
    phone: "(480) 267-9530",
    tel: "4802679530",
    email: "info@menlotransitions.com",
  },
  {
    label: "Business Brokerage",
    phone: "(480) 290-7720",
    tel: "4802907720",
    email: "info@menlobusinessbrokers.com",
  },
];

const DEFAULT_HINT = "Demo only — no message is actually sent.";

export function Contact() {
  const [hint, setHint] = useState(DEFAULT_HINT);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHint(
      'Message "sent" — in production this would reach the selected division. Thanks for reaching out!',
    );
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-navy-900 py-26">
      <div className={`${wrap} grid items-start gap-12 lg:grid-cols-[1fr_.82fr] lg:gap-15`}>
        <div>
          <Reveal>
            <Eyebrow onDark>Let&apos;s talk</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 mb-4 max-w-[16ch] text-[clamp(1.8rem,3.2vw,2.4rem)] font-semibold text-white">
              Tell us what you&apos;re building — or selling.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-[480px] text-[1.06rem] text-white/70">
              Pick the right division below and your message goes straight to
              that team. Not sure? Just say so — we&apos;ll route it for you.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-8 flex flex-col gap-3.5">
            {DIVISIONS.map((division) => (
              <div
                key={division.label}
                className="flex flex-wrap items-center gap-4 rounded-card border border-white/12 bg-white/5 px-5 py-4"
              >
                <span className="basis-full font-mono text-[0.72rem] tracking-[0.05em] text-gold-500 sm:basis-[150px]">
                  {division.label}
                </span>
                <a
                  href={`tel:${division.tel}`}
                  className="text-[0.86rem] text-white/85 transition-colors hover:text-gold-500"
                >
                  {division.phone}
                </a>
                <a
                  href={`mailto:${division.email}`}
                  className="text-[0.86rem] text-white/85 transition-colors hover:text-gold-500"
                >
                  {division.email}
                </a>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-panel bg-cream-50 p-7 shadow-soft"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cName" className={fieldLabel}>
                Name
              </label>
              <input
                id="cName"
                type="text"
                required
                placeholder="Your full name"
                className={field}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cEmail" className={fieldLabel}>
                Email
              </label>
              <input
                id="cEmail"
                type="email"
                required
                placeholder="you@company.com"
                className={field}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cDivision" className={fieldLabel}>
                Division
              </label>
              <select id="cDivision" className={field} defaultValue="Real Estate">
                <option>Real Estate</option>
                <option>Dental Transitions</option>
                <option>Business Brokerage</option>
                <option>Not sure / more than one</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cMessage" className={fieldLabel}>
                Message
              </label>
              <textarea
                id="cMessage"
                rows={4}
                required
                placeholder="How can we help?"
                className={`${field} resize-y`}
              />
            </div>
            <button type="submit" className={`${btnGold} w-full justify-center`}>
              Send message
            </button>
            <p
              aria-live="polite"
              className={`text-center text-[0.74rem] ${
                sent ? "font-semibold text-[#1F7A4C]" : "text-faint"
              }`}
            >
              {hint}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
