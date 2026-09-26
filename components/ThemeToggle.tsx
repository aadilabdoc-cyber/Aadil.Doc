"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./icons/ThemeIcons";

const STORAGE_KEY = "theme";
const CHANGE_EVENT = "theme-change";
type Theme = "light" | "dark";

function readStoredTheme(): Theme {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

// localStorage.setItem doesn't fire a "storage" event in the same tab that
// wrote it, so the toggle button also dispatches this to notify itself.
function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

// Matches the SSR default exactly, so the first client render agrees with
// the server and hydration never mismatches — useSyncExternalStore then
// swaps in the real stored value right after, without an error.
function getServerSnapshot(): Theme {
  return "light";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    readStoredTheme,
    getServerSnapshot,
  );

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore write failures (private browsing, storage disabled, etc).
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const Icon = theme === "dark" ? SunIcon : MoonIcon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "light"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="flex items-center text-aged-silver transition-colors hover:text-aged-ivory sm:-mt-0.75"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
