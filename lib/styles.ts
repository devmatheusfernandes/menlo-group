/** Shared class recipes so the same visual language is reused across sections. */

export const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";

export const btnBase =
  "inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[0.95rem] font-semibold whitespace-nowrap transition-colors";

export const btnGold = `${btnBase} bg-gold-500 text-navy-900 hover:bg-gold-600`;

export const btnNavy = `${btnBase} bg-navy-900 text-white hover:bg-navy-700`;

export const btnOutlineDark = `${btnBase} border-[1.5px] border-white/35 text-white hover:border-gold-500 hover:text-gold-500`;

export const btnOutlineNavy = `${btnBase} border-[1.5px] border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white`;

export const btnSm = "px-5 py-2.5 text-[0.85rem]";

export const textLink =
  "border-b-[1.5px] border-gold-500 pb-0.5 text-[0.9rem] font-semibold text-navy-800 transition-colors hover:text-gold-600";

export const field =
  "rounded-lg border-[1.5px] border-line bg-white px-3.5 py-2.5 text-base outline-none transition-colors focus:border-gold-600";

export const fieldLabel = "text-[0.8rem] font-semibold text-navy-800";

export const sectionHeading =
  "text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold text-navy-900";
