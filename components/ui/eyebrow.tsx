import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
};

export function Eyebrow({ children, onDark, className = "" }: EyebrowProps) {
  const tone = onDark ? "text-gold-500" : "text-gold-600";
  const rule = onDark ? "bg-gold-500" : "bg-gold-600";

  return (
    <p
      className={`inline-flex items-center gap-2.5 font-mono text-[0.72rem] font-semibold tracking-[0.16em] uppercase ${tone} ${className}`}
    >
      <span className={`h-[1.5px] w-[22px] ${rule}`} aria-hidden="true" />
      {children}
    </p>
  );
}
