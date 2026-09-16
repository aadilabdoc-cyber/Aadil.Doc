"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

export type LightboxImage = {
  src: string;
  width: number;
  height: number;
  caption?: string;
};

export default function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const count = images.length;
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => onChange((index + 1) % count),
    [index, count, onChange],
  );
  const previous = useCallback(
    () => onChange((index - 1 + count) % count),
    [index, count, onChange],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [next, previous, onClose]);

  const image = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-deep-shadow/95 p-4 sm:p-10"
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
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-3xl leading-none text-viewer-ink sm:right-8 sm:top-8"
      >
        &times;
      </button>

      <button
        type="button"
        onClick={previous}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-2xl text-viewer-ink sm:left-6"
      >
        &#8249;
      </button>

      <div className="relative max-h-full max-w-full">
        <Image
          key={image.src}
          src={image.src}
          alt={image.caption ?? `Image ${index + 1} of ${count}`}
          width={image.width}
          height={image.height}
          sizes="100vw"
          className="max-h-[80vh] w-auto max-w-full object-contain"
          priority
        />
        {image.caption && (
          <p className="mt-3 text-center text-xs text-viewer-muted">{image.caption}</p>
        )}
      </div>

      <button
        type="button"
        onClick={next}
        aria-label="Next image"
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-2xl text-viewer-ink sm:right-6"
      >
        &#8250;
      </button>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-viewer-muted">
        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </p>
    </div>
  );
}
