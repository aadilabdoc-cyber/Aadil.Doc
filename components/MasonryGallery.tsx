"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox, { type LightboxImage } from "./Lightbox";
import Spinner from "./Spinner";

export default function MasonryGallery({
  images,
  alt,
  hideCaptions = false,
}: {
  images: LightboxImage[];
  alt: string;
  hideCaptions?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative mb-4 block w-full break-inside-avoid text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-aged-ivory"
          >
            <Image
              src={image.src}
              alt={image.caption ?? `${alt}, image ${index + 1}`}
              width={image.width}
              height={image.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full"
              onLoad={() =>
                setLoadedImages((prev) => new Set(prev).add(index))
              }
            />
            {!loadedImages.has(index) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {!hideCaptions && image.caption && (
              <p className="mt-2 text-xs text-aged-silver">{image.caption}</p>
            )}
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      )}
    </>
  );
}
