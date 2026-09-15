"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site";

export default function NavList({
  onNavigate,
  tabbable = true,
}: {
  onNavigate?: () => void;
  tabbable?: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex flex-col items-end gap-1 sm:gap-1.5">
      {nav.map((item, index) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            tabIndex={tabbable ? 0 : -1}
            aria-current={active ? "page" : undefined}
            className="group flex items-baseline gap-2"
          >
            <span
              className={`border-b pb-0.5 text-xs font-bold uppercase tracking-[0.08em] transition-colors sm:text-sm ${
                active
                  ? "border-aged-ivory text-aged-ivory"
                  : "border-transparent text-aged-silver group-hover:border-weathered-silver group-hover:text-aged-ivory"
              }`}
            >
              {item.label}
            </span>
            <span className="text-[10px] text-weathered-silver">
              {String(index + 1).padStart(2, "0")}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
