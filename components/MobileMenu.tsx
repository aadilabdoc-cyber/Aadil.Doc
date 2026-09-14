"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { nav, site } from "@/data/site";

function subscribe() {
  return () => {};
}
function getClientSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

export default function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      className={`fixed inset-0 z-50 bg-obsidian transition-opacity duration-300 md:hidden ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <span className="text-sm tracking-[0.2em] text-aged-ivory">
          {site.name.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center text-2xl leading-none text-aged-ivory"
        >
          &times;
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pt-8 sm:px-6">
        {nav.map((item, index) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              aria-current={active ? "page" : undefined}
              className={`flex items-baseline gap-3 border-b border-weathered-silver/20 py-4 text-lg ${
                active ? "text-aged-ivory" : "text-aged-silver"
              }`}
            >
              <span className="text-xs text-weathered-silver">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>,
    document.body,
  );
}
