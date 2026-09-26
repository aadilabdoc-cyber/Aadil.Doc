"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/site";
import NavList from "./NavList";
import { CONTENT_PADDING_X } from "@/lib/layout";

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
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      className={`fixed inset-0 z-70 bg-obsidian transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`flex items-center justify-between py-4 sm:py-5 ${CONTENT_PADDING_X}`}
      >
        <span className="text-2xl font-normal uppercase tracking-[0.1em] text-aged-ivory sm:text-3xl">
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

      <div className={`flex justify-end pt-3 ${CONTENT_PADDING_X}`}>
        <NavList onNavigate={onClose} tabbable={open} isMobile={true} />
      </div>
    </div>,
    document.body,
  );
}
