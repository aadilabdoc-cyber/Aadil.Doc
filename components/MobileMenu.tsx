"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/site";
import NavList from "./NavList";

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
}: {
  open: boolean;
  onClose: () => void;
}) {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      className={`fixed inset-0 z-50 bg-obsidian transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5">
        <span className="text-2xl font-bold tracking-[0.1em] text-aged-ivory sm:text-3xl">
          {site.name}
        </span>
        <button
          type="button"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center text-3xl leading-none text-aged-ivory"
        >
          &times;
        </button>
      </div>

      <div className="flex justify-end px-6 pt-3 sm:px-8">
        <NavList onNavigate={onClose} tabbable={open} />
      </div>

      <div className="flex flex-col items-end gap-4 px-6 pt-8 sm:px-8">
        <a
          href={`mailto:${site.email}`}
          tabIndex={open ? 0 : -1}
          className="text-xs text-aged-silver underline decoration-weathered-silver underline-offset-4 hover:text-aged-ivory hover:decoration-aged-ivory"
        >
          {site.email}
        </a>
        <div className="flex gap-4">
          {site.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="text-[11px] uppercase tracking-[0.15em] text-aged-silver hover:text-aged-ivory"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
