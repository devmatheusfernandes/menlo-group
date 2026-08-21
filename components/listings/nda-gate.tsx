"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import {
  CheckIcon,
  CloseIcon,
  DocumentIcon,
  LockIcon,
  ShieldIcon,
} from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  CONFIDENTIALITY_AGREEMENT,
  FIRST_CONTACT_OPTIONS,
  HIPAA_AGREEMENT,
  PHONE_TYPES,
  PRIVACY_NOTE,
  SMS_CONSENT,
} from "@/lib/nda";
import { locationOf, type Listing } from "@/lib/listings";
import { btnGold, btnNavy, btnOutlineNavy, field, fieldLabel } from "@/lib/styles";

const STORAGE_KEY = "menlo:signed-ndas";
/** Fired after a signature so every gate on the page re-reads the store. */
const STORAGE_EVENT = "menlo:nda-signed";

function readSignedIds(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    // Private-mode storage failures just mean the visitor signs again.
    return [];
  }
}

function rememberSignature(id: string) {
  try {
    const ids = readSignedIds();
    if (!ids.includes(id)) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, id]));
    }
  } catch {
    // Non-fatal — the unlock still applies for this page view.
  }
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

/**
 * sessionStorage is an external store, so it is read through
 * `useSyncExternalStore` — the server snapshot is always "not signed", which
 * keeps the first paint identical on both sides of hydration.
 */
function useHasSigned(id: string): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener(STORAGE_EVENT, onChange);
    return () => window.removeEventListener(STORAGE_EVENT, onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => readSignedIds().includes(id),
    () => false,
  );
}

/** Listings offered in the "any other listings you're interested in" picker. */
export type NdaSibling = { id: string; ref: string; title: string };

type NdaGateProps = {
  listing: Listing;
  siblings: NdaSibling[];
};

/**
 * Wraps the confidential half of a listing. Real estate listings pass through
 * untouched; dental and business opportunities stay locked until the visitor
 * completes the NDA — and, for dental, the HIPAA Business Associate Agreement.
 */
export function NdaGate({ listing, siblings }: NdaGateProps) {
  const signed = useHasSigned(listing.id);
  const [open, setOpen] = useState(false);
  const [signerName, setSignerName] = useState("");

  const handleSigned = useCallback(
    (name: string) => {
      setSignerName(name);
      setOpen(false);
      rememberSignature(listing.id);
    },
    [listing.id],
  );

  if (!listing.requiresNda) {
    return <TourPanel listing={listing} />;
  }

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {signed ? (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.68, 0.2, 1] }}
          >
            <UnlockedPanel listing={listing} signerName={signerName} />
          </motion.div>
        ) : (
          <motion.div key="locked" exit={{ opacity: 0 }}>
            <LockedPanel listing={listing} onOpen={() => setOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <NdaDialog
            listing={listing}
            siblings={siblings}
            onClose={() => setOpen(false)}
            onSigned={handleSigned}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------- panels */

function LockedPanel({
  listing,
  onOpen,
}: {
  listing: Listing;
  onOpen: () => void;
}) {
  const keys = Object.keys(listing.confidential);

  return (
    <div className="overflow-hidden rounded-panel border border-line bg-white shadow-card">
      <div className="flex items-center gap-3 border-b border-line bg-cream-100 px-6 py-4">
        <LockIcon className="h-5 w-5 shrink-0 text-gold-600" />
        <div>
          <p className="font-display text-[1.05rem] font-semibold text-navy-900">
            Confidential details
          </p>
          <p className="text-[0.8rem] text-muted">
            {listing.requiresHipaa
              ? "NDA + HIPAA Business Associate Agreement required"
              : "NDA required"}
          </p>
        </div>
      </div>

      <div className="relative px-6 py-6">
        {/* The field names are public; only the values are withheld. */}
        <div
          aria-hidden="true"
          className="flex flex-col gap-3 select-none"
        >
          {keys.map((key) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <span className="text-[0.86rem] text-muted">{key}</span>
              <span className="h-3.5 w-24 rounded-full bg-cream-200 blur-[2px]" />
            </div>
          ))}
        </div>

        <p className="mt-6 text-[0.88rem] leading-[1.6] text-muted">
          {listing.requiresHipaa
            ? "Practice financials, patient counts and the seller’s reason for transitioning are released once the non-disclosure and HIPAA agreements are signed."
            : "Revenue, earnings, employee counts and the asking price are released once the non-disclosure agreement is signed."}
        </p>

        <button type="button" onClick={onOpen} className={`${btnGold} mt-5 w-full justify-center`}>
          <DocumentIcon className="h-4 w-4" />
          Sign the NDA to unlock
        </button>

        <p className="mt-3 text-center text-[0.74rem] text-faint">
          Takes about two minutes. Nothing is shared with the seller until you
          ask us to make an introduction.
        </p>
      </div>
    </div>
  );
}

function UnlockedPanel({
  listing,
  signerName,
}: {
  listing: Listing;
  signerName: string;
}) {
  return (
    <div className="overflow-hidden rounded-panel border border-line bg-white shadow-card">
      <div className="flex items-center gap-3 border-b border-line bg-gold-100 px-6 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-900">
          <CheckIcon className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="font-display text-[1.05rem] font-semibold text-navy-900">
            Agreements signed — details unlocked
          </p>
          <p className="text-[0.8rem] text-muted">
            {signerName ? `Signed by ${signerName}. ` : ""}
            {listing.requiresHipaa
              ? "NDA + HIPAA on file for this listing."
              : "NDA on file for this listing."}
          </p>
        </div>
      </div>

      <dl className="flex flex-col gap-3 px-6 py-6">
        {Object.entries(listing.confidential).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between gap-4 border-b border-line/60 pb-3 last:border-b-0 last:pb-0"
          >
            <dt className="text-[0.86rem] text-muted">{key}</dt>
            <dd className="text-right text-[0.88rem] font-semibold text-navy-900">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-line px-6 py-6">
        <TourPanel listing={listing} embedded />
      </div>
    </div>
  );
}

/** Date picker + confirmation. Standalone for public listings, embedded once unlocked. */
function TourPanel({
  listing,
  embedded = false,
}: {
  listing: Listing;
  embedded?: boolean;
}) {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(
    null,
  );
  const isProperty = listing.practice === "real-estate";
  const label = isProperty ? "Reserve a tour" : "Request a meeting";

  const submit = () => {
    if (!date) {
      setMessage({ text: `Please pick a date to ${label.toLowerCase()}.`, ok: false });
      return;
    }
    const formatted = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      dateStyle: "long",
    });
    setMessage({
      text: `${isProperty ? "Tour" : "Meeting"} requested for ${formatted}. A Menlo advisor will confirm by email.`,
      ok: true,
    });
  };

  const body = (
    <>
      <label htmlFor={`tour-${listing.id}`} className={`${fieldLabel} mb-1.5 block`}>
        {isProperty
          ? "Pick a date to walk the property"
          : "Pick a date to speak with the listing advisor"}
      </label>
      <input
        id={`tour-${listing.id}`}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={`${field} w-full`}
      />
      <button type="button" onClick={submit} className={`${btnNavy} mt-3 w-full justify-center`}>
        {label}
      </button>
      {message && (
        <p
          aria-live="polite"
          className={`mt-3 text-center text-[0.85rem] font-semibold ${
            message.ok ? "text-[#1F7A4C]" : "text-[#B4321F]"
          }`}
        >
          {message.text}
        </p>
      )}
      <p className="mt-3 text-center text-[0.74rem] text-faint">
        Demo only — nothing is submitted.
      </p>
    </>
  );

  if (embedded) return <div>{body}</div>;

  return (
    <div className="rounded-panel border border-line bg-white px-6 py-6 shadow-card">
      <p className="mb-4 font-display text-[1.05rem] font-semibold text-navy-900">
        {label}
      </p>
      {body}
    </div>
  );
}

/* ------------------------------------------------------------------- dialog */

type Step = 1 | 2 | 3;

type Details = {
  first: string;
  last: string;
  phone: string;
  phoneType: string;
  sms: boolean;
  email: string;
  newsletter: boolean;
  firstContact: string;
  background: string;
  financing: string;
  otherListings: string[];
};

const EMPTY_DETAILS: Details = {
  first: "",
  last: "",
  phone: "",
  phoneType: PHONE_TYPES[0],
  sms: false,
  email: "",
  newsletter: true,
  firstContact: "",
  background: "",
  financing: "",
  otherListings: [],
};

/** How many extra listings the visitor may attach to one NDA. */
const MAX_OTHER_LISTINGS = 3;

function NdaDialog({
  listing,
  siblings,
  onClose,
  onSigned,
}: {
  listing: Listing;
  siblings: NdaSibling[];
  onClose: () => void;
  onSigned: (name: string) => void;
}) {
  const [step, setStep] = useState<Step>(1);
  const [details, setDetails] = useState<Details>(EMPTY_DETAILS);
  const [agreedNda, setAgreedNda] = useState(false);
  const [agreedHipaa, setAgreedHipaa] = useState(false);
  const [signature, setSignature] = useState("");
  const [signatureError, setSignatureError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const today = useMemo(
    () => new Date().toLocaleDateString("en-US", { dateStyle: "long" }),
    [],
  );
  const fullName = `${details.first} ${details.last}`.trim();
  const steps: { n: Step; label: string }[] = [
    { n: 1, label: "Your details" },
    { n: 2, label: listing.requiresHipaa ? "Agreements" : "Agreement" },
    { n: 3, label: "Sign" },
  ];

  // Move focus into the dialog once the entrance animation has settled.
  useEffect(() => {
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 320);
    return () => clearTimeout(timer);
  }, []);

  /*
   * `showModal()` moves the element into the browser's top layer, which sits
   * above every stacking context and every z-index on the page. That is what
   * keeps the fixed header off it — no z-index arithmetic to get wrong.
   * Escape is handled natively and surfaces as the `cancel` event below.
   */
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  // The top layer does not stop the page behind from scrolling.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const set = <K extends keyof Details>(key: K, value: Details[K]) =>
    setDetails((prev) => ({ ...prev, [key]: value }));

  const toggleOther = (id: string) =>
    setDetails((prev) => {
      const has = prev.otherListings.includes(id);
      if (has) {
        return {
          ...prev,
          otherListings: prev.otherListings.filter((x) => x !== id),
        };
      }
      if (prev.otherListings.length >= MAX_OTHER_LISTINGS) return prev;
      return { ...prev, otherListings: [...prev.otherListings, id] };
    });

  const submitSignature = (e: FormEvent) => {
    e.preventDefault();
    // A typed signature only counts if it matches the name on the agreement.
    const normalize = (value: string) =>
      value.trim().toLowerCase().replace(/\s+/g, " ");
    if (normalize(signature) !== normalize(fullName)) {
      setSignatureError(
        `Type your name exactly as entered above: ${fullName}`,
      );
      return;
    }
    onSigned(fullName);
  };

  // Portalled out of the sticky aside as well, so nothing about the listing
  // page's layout can clip it.
  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="nda-title"
      // Escape fires `cancel`; let React own the unmount instead of the UA.
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="menlo-dialog m-auto max-h-none w-[calc(100%_-_2rem)] max-w-[620px] overflow-visible border-0 bg-transparent p-0"
    >
      <motion.div
        // Capped to the viewport so the header stays put and only the body
        // scrolls — one scroll region, and its scrollbar is hidden.
        className="relative flex max-h-[calc(100svh-2rem)] w-full flex-col overflow-hidden rounded-panel bg-white text-left shadow-[0_40px_80px_-30px_rgba(14,36,56,.5)]"
        initial={{ y: 18, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 18, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 0.68, 0.2, 1] }}
      >
        <header className="relative shrink-0 border-b border-line px-7 pt-7 pb-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-cream-100 text-muted transition-colors hover:bg-navy-900 hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          <Eyebrow>Non-Disclosure Agreement</Eyebrow>
          <h2 id="nda-title" className="mt-2.5 pr-10 text-[1.28rem]">
            {listing.ref} · {listing.title}
          </h2>
          <p className="mt-1 text-[0.85rem] text-muted">
            {locationOf(listing)} · {listing.kind}
          </p>

          <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
            {steps.map(({ n, label }, i) => (
              <li key={n} className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[0.7rem] font-semibold transition-colors ${
                    step === n
                      ? "bg-navy-900 text-white"
                      : step > n
                        ? "bg-gold-500 text-navy-900"
                        : "bg-cream-100 text-faint"
                  }`}
                >
                  {step > n ? "✓" : n}
                </span>
                <span
                  className={`text-[0.78rem] font-semibold ${
                    step === n ? "text-navy-900" : "text-faint"
                  }`}
                >
                  {label}
                </span>
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="mx-1 h-px w-5 bg-line" />
                )}
              </li>
            ))}
          </ol>
        </header>

        <div className="no-scrollbar flex-1 overflow-y-auto px-7 py-6">
          {step === 1 && (
            <form
              id="nda-step-1"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First name" htmlFor="nda-first" required>
                  <input
                    ref={firstFieldRef}
                    id="nda-first"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={details.first}
                    onChange={(e) => set("first", e.target.value)}
                    className={field}
                  />
                </Field>
                <Field label="Last name" htmlFor="nda-last" required>
                  <input
                    id="nda-last"
                    type="text"
                    required
                    autoComplete="family-name"
                    value={details.last}
                    onChange={(e) => set("last", e.target.value)}
                    className={field}
                  />
                </Field>
                <Field label="Phone" htmlFor="nda-phone" required>
                  <input
                    id="nda-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="(480) 555-0123"
                    value={details.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={field}
                  />
                </Field>
                <Field label="Phone type" htmlFor="nda-phone-type" required>
                  <select
                    id="nda-phone-type"
                    required
                    value={details.phoneType}
                    onChange={(e) => set("phoneType", e.target.value)}
                    className={field}
                  >
                    {PHONE_TYPES.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Checkbox
                checked={details.sms}
                onChange={(v) => set("sms", v)}
                id="nda-sms"
              >
                {SMS_CONSENT}
              </Checkbox>

              <Field label="Email" htmlFor="nda-email" required>
                <input
                  id="nda-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@practice.com"
                  value={details.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={field}
                />
              </Field>

              <Checkbox
                checked={details.newsletter}
                onChange={(v) => set("newsletter", v)}
                id="nda-newsletter"
              >
                Receive regular emails with our new listings and industry
                updates.
              </Checkbox>

              <Field label="This NDA is being signed for" htmlFor="nda-listing" required>
                <input
                  id="nda-listing"
                  type="text"
                  readOnly
                  value={`(${listing.ref}) ${listing.title}`}
                  className={`${field} bg-cream-100 text-muted`}
                />
              </Field>

              {siblings.length > 0 && (
                <fieldset className="flex flex-col gap-2">
                  <legend className={`${fieldLabel} mb-1.5`}>
                    Any other listings you&apos;re interested in (up to{" "}
                    {MAX_OTHER_LISTINGS})
                  </legend>
                  <div className="flex flex-col gap-1.5 rounded-lg border-[1.5px] border-line bg-white p-2.5">
                    {siblings.map((sibling) => {
                      const checked = details.otherListings.includes(sibling.id);
                      const atLimit =
                        !checked &&
                        details.otherListings.length >= MAX_OTHER_LISTINGS;
                      return (
                        <label
                          key={sibling.id}
                          className={`flex items-start gap-2.5 rounded-md px-2 py-1.5 text-[0.82rem] transition-colors ${
                            atLimit
                              ? "text-faint"
                              : "text-navy-800 hover:bg-cream-100"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={atLimit}
                            onChange={() => toggleOther(sibling.id)}
                            className="mt-[3px] h-4 w-4 shrink-0 accent-gold-600"
                          />
                          <span>
                            <span className="font-mono text-[0.74rem] text-muted">
                              {sibling.ref}
                            </span>{" "}
                            {sibling.title}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              <Field
                label="Is this your first time contacting Menlo?"
                htmlFor="nda-first-contact"
                required
              >
                <select
                  id="nda-first-contact"
                  required
                  value={details.firstContact}
                  onChange={(e) => set("firstContact", e.target.value)}
                  className={field}
                >
                  <option value="">Select one…</option>
                  {FIRST_CONTACT_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>

              <Field
                label={
                  listing.requiresHipaa
                    ? "Brief clinical summary, bio or practice preferences"
                    : "Brief background and acquisition criteria"
                }
                htmlFor="nda-background"
              >
                <textarea
                  id="nda-background"
                  rows={3}
                  value={details.background}
                  onChange={(e) => set("background", e.target.value)}
                  placeholder={
                    listing.requiresHipaa
                      ? "Years in practice, specialty, target markets…"
                      : "Industries of interest, budget range, timeline…"
                  }
                  className={`${field} resize-y`}
                />
              </Field>

              <Field
                label="Have you been prequalified by a lender? If so, who?"
                htmlFor="nda-financing"
                required
              >
                <input
                  id="nda-financing"
                  type="text"
                  required
                  value={details.financing}
                  onChange={(e) => set("financing", e.target.value)}
                  placeholder="Lender name and institution, or “not yet”"
                  className={field}
                />
              </Field>

              <div className="mt-2 flex justify-end">
                <button type="submit" className={btnNavy}>
                  Continue to {listing.requiresHipaa ? "agreements" : "agreement"}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(3);
              }}
              className="flex flex-col gap-6"
            >
              <AgreementBlock
                id="agreement-nda"
                icon={<ShieldIcon className="h-4.5 w-4.5 text-gold-600" />}
                title="Confidentiality Agreement"
                paragraphs={CONFIDENTIALITY_AGREEMENT}
                checked={agreedNda}
                onChange={setAgreedNda}
                consentLabel="I agree to the Confidentiality Agreement"
              />

              {listing.requiresHipaa && (
                <AgreementBlock
                  id="agreement-hipaa"
                  icon={<DocumentIcon className="h-4.5 w-4.5 text-gold-600" />}
                  title="HIPAA Business Associate Agreement"
                  note="Required for every dental practice listing, because the information you receive touches patient data."
                  paragraphs={HIPAA_AGREEMENT}
                  checked={agreedHipaa}
                  onChange={setAgreedHipaa}
                  consentLabel="I agree to the HIPAA Business Associate Agreement"
                />
              )}

              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={btnOutlineNavy}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!agreedNda || (listing.requiresHipaa && !agreedHipaa)}
                  className={`${btnNavy} disabled:pointer-events-none disabled:opacity-40`}
                >
                  Continue to signature
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={submitSignature} className="flex flex-col gap-4">
              <div className="rounded-card bg-cream-100 px-5 py-4">
                <p className="font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase">
                  Signing as
                </p>
                <p className="mt-1 text-[1.02rem] font-semibold text-navy-900">
                  {fullName}
                </p>
                <p className="text-[0.82rem] text-muted">{details.email}</p>
              </div>

              <Field label="Your name (electronic signature)" htmlFor="nda-signature" required>
                <input
                  id="nda-signature"
                  type="text"
                  required
                  autoComplete="off"
                  value={signature}
                  onChange={(e) => {
                    setSignature(e.target.value);
                    setSignatureError(null);
                  }}
                  placeholder="Type your full name"
                  className={`${field} font-display text-[1.1rem] italic`}
                />
              </Field>
              <p className="-mt-2 text-[0.76rem] text-faint">
                By entering your name you are electronically signing this
                document, agreeing to the Confidentiality
                {listing.requiresHipaa ? " and HIPAA agreements" : " Agreement"}.
              </p>

              <Field label="Date" htmlFor="nda-date" required>
                <input
                  id="nda-date"
                  type="text"
                  readOnly
                  value={today}
                  className={`${field} bg-cream-100 text-muted`}
                />
              </Field>

              {signatureError && (
                <p
                  aria-live="polite"
                  className="text-[0.84rem] font-semibold text-[#B4321F]"
                >
                  {signatureError}
                </p>
              )}

              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={btnOutlineNavy}
                >
                  Back
                </button>
                <button type="submit" className={btnGold}>
                  Sign &amp; unlock details
                </button>
              </div>

              <p className="mt-1 text-[0.74rem] leading-[1.5] text-faint">
                {PRIVACY_NOTE} Demo only — nothing is submitted. In production
                this generates a countersigned PDF and notifies the listing
                advisor.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </dialog>,
    document.body,
  );
}

/* -------------------------------------------------------------- form pieces */

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className={fieldLabel}>
        {label}
        {required && <span className="ml-1 text-gold-600">*</span>}
      </label>
      {children}
    </div>
  );
}

function Checkbox({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-2.5 text-[0.8rem] leading-[1.5] text-muted"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-[3px] h-4 w-4 shrink-0 accent-gold-600"
      />
      <span>{children}</span>
    </label>
  );
}

/** Scrollable agreement text with its own consent checkbox, as on the live form. */
function AgreementBlock({
  id,
  icon,
  title,
  note,
  paragraphs,
  checked,
  onChange,
  consentLabel,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  note?: string;
  paragraphs: string[];
  checked: boolean;
  onChange: (value: boolean) => void;
  consentLabel: string;
}) {
  return (
    <section>
      <h3 className="flex items-center gap-2 text-[1.02rem]">
        {icon}
        {title}
      </h3>
      {note && <p className="mt-1.5 text-[0.82rem] text-muted">{note}</p>}

      <div className="no-scrollbar mt-3 max-h-[190px] overflow-y-auto rounded-card border-[1.5px] border-line bg-cream-50 px-4 py-3.5">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="mb-3 text-[0.82rem] leading-[1.6] text-navy-800 last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <label
        htmlFor={id}
        className={`mt-3 flex items-start gap-2.5 rounded-card border-[1.5px] px-4 py-3 text-[0.86rem] font-semibold transition-colors ${
          checked
            ? "border-gold-600 bg-gold-100 text-navy-900"
            : "border-line bg-white text-navy-800 hover:border-navy-900/30"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-[3px] h-4 w-4 shrink-0 accent-gold-600"
        />
        <span>{consentLabel}</span>
      </label>
    </section>
  );
}
