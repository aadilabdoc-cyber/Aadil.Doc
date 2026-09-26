import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

// Only these render in a browser. Anything else (HEIC/HEIF from iPhones,
// .DS_Store, Thumbs.db, etc.) is ignored rather than breaking the build.
export const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
export const UNSUPPORTED_IMAGE_EXTENSIONS = new Set([".heic", ".heif"]);

export type DiscoveredImage = {
  src: string;
  width: number;
  height: number;
};

export function isSupportedImage(filename: string): boolean {
  return IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

export function readDimensions(absPath: string): { width: number; height: number } | null {
  try {
    const { width, height } = imageSize(fs.readFileSync(absPath));
    if (!width || !height) return null;
    return { width, height };
  } catch (error) {
    console.warn(`[imageFiles] Could not read "${absPath}":`, error);
    return null;
  }
}

/**
 * Reads a flat folder of images (no subfolders): filters to supported
 * extensions, warns about unsupported ones (HEIC/HEIF), sorts by filename.
 * Missing folder just means no images yet, not an error.
 */
export function readImageFolder(absDir: string, publicBase: string): DiscoveredImage[] {
  let entries: string[];
  try {
    entries = fs.readdirSync(absDir);
  } catch {
    return [];
  }

  const heicFiles = entries.filter((name) =>
    UNSUPPORTED_IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()),
  );
  if (heicFiles.length > 0) {
    console.warn(
      `[imageFiles] ${absDir}: ignoring unsupported file(s) ${heicFiles.join(", ")} — ` +
        `HEIC/HEIF doesn't render in browsers. Export as JPG, PNG, or WebP instead.`,
    );
  }

  return entries
    .filter(isSupportedImage)
    .sort((a, b) => a.localeCompare(b))
    .map((name) => {
      const dimensions = readDimensions(path.join(absDir, name));
      if (!dimensions) return null;
      return { src: `${publicBase}/${encodeURIComponent(name)}`, ...dimensions };
    })
    .filter((image): image is DiscoveredImage => image !== null);
}
