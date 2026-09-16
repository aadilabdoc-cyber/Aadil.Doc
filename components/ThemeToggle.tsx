"use client";

import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "theme";
type Theme = "light" | "dark";

function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore write failures (private browsing, storage disabled, etc).
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? "light");

  // The blocking inline script in the root layout already sets the correct
  // data-theme before paint. This only re-applies it after a React Strict
  // Mode dev remount clears the attribute — a no-op in production.
  useLayoutEffect(() => {
    const stored = readStoredTheme();
    if (stored) {
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "light"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="text-xs uppercase tracking-[0.15em] text-aged-silver transition-colors hover:text-aged-ivory"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
