"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/types/project";
import { categoryLabel, projectHref } from "@/lib/projects";

const AUTOPLAY_MS = 1000;

export default function HeroCarousel({ slides }: { slides: Project[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, previous]);

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured work"
      className="relative h-[85vh] min-h-[520px] w-full overflow-hidden bg-graphite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) {
          if (delta > 0) previous();
          else next();
        }
        touchStartX.current = null;
      }}
    >
      {slides.map((project, i) => (
        <div
          key={project.slug}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={project.coverImage}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-deep-shadow/85 via-deep-shadow/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
            <div className="mx-auto max-w-6xl">
              <p className="text-xs uppercase tracking-[0.2em] text-aged-silver">
                {categoryLabel[project.category]} — {project.year}
              </p>
              <h1 className="mt-3 max-w-xl text-3xl font-bold text-aged-ivory sm:text-4xl lg:text-5xl">
                <Link
                  href={projectHref(project)}
                  className="transition-colors hover:text-paper"
                  tabIndex={i === index ? 0 : -1}
                >
                  {project.title}
                </Link>
              </h1>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={previous}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-2xl text-aged-ivory sm:left-6"
      >
        &#8249;
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-2xl text-aged-ivory sm:right-6"
      >
        &#8250;
      </button>

      <div className="absolute bottom-6 right-4 flex items-center gap-3 text-xs text-aged-silver sm:right-10">
        <span>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5">
          {slides.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 w-6 transition-colors ${
                i === index ? "bg-aged-ivory" : "bg-weathered-silver/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
