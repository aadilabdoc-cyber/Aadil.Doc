"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50 border-b border-weathered-silver/30 bg-obsidian/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="text-sm tracking-[0.2em] text-aged-ivory"
        >
          {site.name.toUpperCase()}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex md:items-center md:gap-8"
        >
          {nav.map((item, index) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="group flex items-center gap-2 text-xs uppercase tracking-[0.15em]"
              >
                <span className="text-[10px] text-weathered-silver">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`border-b pb-0.5 transition-colors ${
                    active
                      ? "border-aged-ivory text-aged-ivory"
                      : "border-transparent text-aged-silver group-hover:border-weathered-silver group-hover:text-aged-ivory"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label="Open menu"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="block h-px w-6 bg-aged-ivory" />
          <span className="block h-px w-6 bg-aged-ivory" />
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </header>
  );
}
