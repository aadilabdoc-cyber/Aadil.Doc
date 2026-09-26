"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import NavList from "./NavList";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { CONTENT_PADDING_X } from "@/lib/layout";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Publish the header's real rendered height as a CSS variable so other
  // sections (the hero) can size themselves against "the screen minus the
  // header" instead of a guessed, hardcoded height.
  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const publishHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${node.offsetHeight}px`,
      );
    };

    publishHeight();
    const observer = new ResizeObserver(publishHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-weathered-silver/30 bg-obsidian/95 backdrop-blur-sm"
    >
      <div
        className={`flex items-center justify-between py-4 sm:py-5 lg:py-6 ${CONTENT_PADDING_X}`}
      >
        <Link
          href="/"
          className="text-1xl font-normal uppercase tracking-widest text-aged-ivory sm:text-2xl"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <ThemeToggle />

          <div className="hidden md:block">
            <NavList />
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-label="Open menu"
            className="group flex items-center gap-3 text-aged-ivory md:hidden"
          >
            {/* <span className="text-xs uppercase tracking-[0.3em]">Menu</span> */}
            <span className="flex h-11 w-11 flex-col items-center justify-center gap-1.5">
              <span className="block h-px w-6 bg-aged-ivory transition-transform group-hover:translate-x-0.5" />
              <span className="block h-px w-6 bg-aged-ivory transition-transform group-hover:-translate-x-0.5" />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
