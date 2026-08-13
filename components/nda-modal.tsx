"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Listing } from "@/lib/listings";
import { btnGold, btnNavy, field, fieldLabel } from "@/lib/styles";

type NdaModalProps = {
  listing: Listing | null;
  onClose: () => void;
};

export function NdaModal({ listing, onClose }: NdaModalProps) {
  return (
    <AnimatePresence>
      {listing && (
        /* Keyed on the listing so every open starts the flow from scratch. */
        <NdaDialog key={listing.id} listing={listing} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}

function NdaDialog({
  listing,
  onClose,
}: {
  listing: Listing;
  onClose: () => void;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [tourDate, setTourDate] = useState("");
  const [reserveMsg, setReserveMsg] = useState<{
    text: string;
    ok: boolean;
  } | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Move focus into the dialog once the entrance animation has settled.
  useEffect(() => {
    const timer = setTimeout(() => nameRef.current?.focus(), 350);
    return () => clearTimeout(timer);
  }, []);

  // Lock background scroll and close on Escape while the dialog is mounted.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleSign = (e: FormEvent) => {
    e.preventDefault();
    setUnlocked(true);
  };

  const handleReserve = () => {
    if (!tourDate) {
      setReserveMsg({
        text: "Please select a date to reserve your tour.",
        ok: false,
      });
      return;
    }
    const formatted = new Date(`${tourDate}T00:00:00`).toLocaleDateString(
      "en-US",
    );
    setReserveMsg({
      text: `Tour reserved for ${formatted}. A broker will confirm by email.`,
      ok: true,
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-[900] flex items-center justify-center bg-navy-900/55 p-4 backdrop-blur-[4px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nda-title"
        className="relative max-h-[90vh] w-full max-w-[460px] overflow-y-auto rounded-panel bg-white px-7 py-8 shadow-[0_40px_80px_-30px_rgba(14,36,56,.5)]"
        initial={{ y: 18, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 18, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 0.68, 0.2, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-cream-100 text-muted transition-colors hover:bg-navy-900 hover:text-white"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        {!unlocked ? (
          <div>
            <Eyebrow>
              {listing.catLabel.toUpperCase()} · {listing.title}
            </Eyebrow>
            <h3 id="nda-title" className="mt-2.5 mb-3 text-[1.32rem]">
              Sign the NDA to unlock the details
            </h3>
            <p className="mb-5 text-[0.92rem] text-muted">
              This opportunity is confidential. Before you can see the address,
              financials and reserve a tour, we need your signed non-disclosure
              agreement.
            </p>

            <form onSubmit={handleSign} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ndaName" className={fieldLabel}>
                  Full name
                </label>
                <input
                  ref={nameRef}
                  id="ndaName"
                  type="text"
                  required
                  placeholder="Your name"
                  className={field}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ndaEmail" className={fieldLabel}>
                  Email
                </label>
                <input
                  id="ndaEmail"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={field}
                />
              </div>
              <label className="flex items-start gap-2.5 text-[0.82rem] text-muted">
                <input
                  type="checkbox"
                  required
                  className="mt-[3px] h-4 w-4 shrink-0 accent-gold-600"
                />
                <span>
                  I have read and agree to the terms of Menlo Group&apos;s
                  Non-Disclosure Agreement for this opportunity.
                </span>
              </label>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ndaSign" className={fieldLabel}>
                  Signature (type your full name)
                </label>
                <input
                  id="ndaSign"
                  type="text"
                  required
                  placeholder="Type your name as your signature"
                  className={field}
                />
              </div>
              <button
                type="submit"
                className={`${btnGold} w-full justify-center`}
              >
                Sign &amp; unlock details
              </button>
              <p className="mt-0.5 text-center text-[0.74rem] text-faint">
                Demo only — nothing is submitted. In production this would
                generate a signed PDF NDA and notify the listing broker.
              </p>
            </form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-full bg-gold-100 text-gold-600">
              <CheckIcon className="h-6 w-6" />
            </div>
            <h3 id="nda-title">NDA signed — details unlocked</h3>
            <div className="my-4 flex flex-col gap-2.5 rounded-card bg-cream-100 px-5 py-4">
              {Object.entries(listing.details).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between gap-3 text-[0.86rem]"
                >
                  <span className="text-muted">{key}</span>
                  <span className="text-right font-semibold text-navy-900">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="tourDate" className={`${fieldLabel} mb-1.5 block`}>
                Pick a date for your tour
              </label>
              <input
                id="tourDate"
                type="date"
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                className={`${field} w-full`}
              />
              <button
                type="button"
                onClick={handleReserve}
                className={`${btnNavy} mt-3 w-full justify-center`}
              >
                Reserve tour
              </button>
              {reserveMsg && (
                <p
                  aria-live="polite"
                  className={`mt-3 text-center text-[0.85rem] font-semibold ${
                    reserveMsg.ok ? "text-[#1F7A4C]" : "text-[#B4321F]"
                  }`}
                >
                  {reserveMsg.text}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
