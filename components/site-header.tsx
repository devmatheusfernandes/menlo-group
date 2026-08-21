"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/icons";
import { NAV_LINKS, PHONE } from "@/lib/nav";
import { btnGold, btnSm, wrap } from "@/lib/styles";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  /** A route link is active on its own page and on anything nested under it. */
  const isActive = (href: string) =>
    !href.startsWith("/#") &&
    (pathname === href || pathname.startsWith(`${href}/`));

  // Hover wins over the current route, matching the original interaction.
  const highlighted =
    hovered ?? NAV_LINKS.find((link) => isActive(link.href))?.href ?? null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[500] border-b border-navy-900/8 backdrop-blur-[14px] backdrop-saturate-150 transition-[background-color,box-shadow] duration-500 ${
        scrolled
          ? "bg-cream-50/95 shadow-[0_8px_24px_-18px_rgba(14,36,56,0.4)]"
          : "bg-cream-50/70"
      }`}
    >
      <div
        className={`${wrap} flex items-center gap-7 transition-[padding] duration-500 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Menlo Group — home"
        >
          <LogoMark className="h-7 w-[22px]" />
          <span className="font-display text-[1.02rem] font-normal tracking-[0.03em] text-navy-900">
            MENLO <b className="font-bold">GROUP</b>
          </span>
        </Link>

        <nav
          className="relative ml-3 hidden flex-1 items-center gap-6 lg:flex"
          aria-label="Main navigation"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onMouseEnter={() => setHovered(link.href)}
              className="relative py-1.5 text-[0.87rem] font-semibold whitespace-nowrap text-navy-800"
            >
              {link.label}
              {highlighted === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-gold-500"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 34 }
                  }
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-[18px] lg:flex">
          <a
            href={`tel:${PHONE.tel}`}
            className="font-mono text-[0.85rem] font-medium text-navy-800 transition-colors hover:text-gold-600"
          >
            {PHONE.label}
          </a>
          <Link href="/#contact" className={`${btnGold} ${btnSm}`}>
            Talk to Menlo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="ml-auto flex w-[26px] shrink-0 flex-col gap-[5px] lg:hidden"
        >
          <motion.span
            className="h-0.5 rounded-sm bg-navy-900"
            animate={menuOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="h-0.5 rounded-sm bg-navy-900"
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="h-0.5 rounded-sm bg-navy-900"
            animate={menuOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="overflow-hidden border-t border-navy-900/8 bg-cream-50 lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.68, 0.2, 1] }}
          >
            <div className="flex flex-col">
              {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-navy-900/6 px-5 py-3.5 text-[0.95rem] font-semibold"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${PHONE.tel}`}
                onClick={() => setMenuOpen(false)}
                className="border-b border-navy-900/6 px-5 py-3.5 font-mono text-[0.95rem] font-semibold text-gold-600"
              >
                {PHONE.label}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
