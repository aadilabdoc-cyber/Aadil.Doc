"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DiscoveredImage } from "@/lib/imageFiles";
import Spinner from "./Spinner";

const AUTOPLAY_MS = 3000;

export default function HeroCarousel({ slides }: { slides: DiscoveredImage[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set());
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
      className="relative h-[calc((100dvh-var(--header-height,4.75rem))*0.42)] w-full overflow-hidden bg-graphite sm:h-[85vh] sm:min-h-130"
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
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            onLoad={() =>
              setLoadedSlides((prev) => new Set(prev).add(i))
            }
          />
          {!loadedSlides.has(i) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          )}
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
    </section>
  );
}
