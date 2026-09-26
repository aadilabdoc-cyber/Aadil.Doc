import fs from "node:fs";
import path from "node:path";
import type { ProjectCategory } from "@/types/project";
import { categoryPath } from "./categories";
import {
  isSupportedImage,
  readDimensions,
  UNSUPPORTED_IMAGE_EXTENSIONS,
  type DiscoveredImage,
} from "./imageFiles";

// Fallback when project.json doesn't specify captionImage: a filename
// containing "cover" or "caption" (case-insensitive).
const COVER_FILENAME_HINT = /cover|caption/i;

const PROJECT_JSON_FILENAME = "project.json";

export type ProjectFolder = {
  slug: string;
  title: string;
  description: string;
  cover: DiscoveredImage;
  gallery: DiscoveredImage[];
};

type ProjectJson = {
  title?: string;
  description?: string;
  captionImage?: string;
};

function imagesRoot(): string {
  return path.join(process.cwd(), "public", "images");
}

function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function readProjectJson(dir: string): ProjectJson {
  const jsonPath = path.join(dir, PROJECT_JSON_FILENAME);
  let raw: string;
  try {
    raw = fs.readFileSync(jsonPath, "utf-8");
  } catch {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      title: typeof parsed.title === "string" ? parsed.title : undefined,
      description:
        typeof parsed.description === "string" ? parsed.description : undefined,
      captionImage:
        typeof parsed.captionImage === "string"
          ? parsed.captionImage
          : undefined,
    };
  } catch (error) {
    console.warn(
      `[projectData] ${jsonPath}: invalid JSON, ignoring it (${error}).`,
    );
    return {};
  }
}

/**
 * Lists every project folder (slug) that exists under a category, e.g.
 * public/images/commercial-works/*. Missing category folders just mean no
 * projects yet, not an error.
 */
export function listProjectSlugs(category: ProjectCategory): string[] {
  const dir = path.join(imagesRoot(), categoryPath[category]);
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Reads public/images/<category>/<slug>/ in full: its project.json (title,
 * description, captionImage — all optional) plus its image files. Returns
 * null (and logs why) if the folder is missing or has no usable images, so
 * callers can skip the project instead of crashing the build.
 */
export function readProjectFolder(
  category: ProjectCategory,
  slug: string,
): ProjectFolder | null {
  const dir = path.join(imagesRoot(), categoryPath[category], slug);

  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return null;
  }

  const heicFiles = entries.filter((name) =>
    UNSUPPORTED_IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()),
  );
  if (heicFiles.length > 0) {
    console.warn(
      `[projectData] ${dir}: ignoring unsupported file(s) ${heicFiles.join(", ")} — ` +
        `HEIC/HEIF doesn't render in browsers. Export as JPG, PNG, or WebP instead.`,
    );
  }

  const imageFiles = entries
    .filter(isSupportedImage)
    .sort((a, b) => a.localeCompare(b));
  if (imageFiles.length === 0) {
    console.warn(
      `[projectData] ${dir}: no usable images found, skipping this project.`,
    );
    return null;
  }

  const meta = readProjectJson(dir);

  let coverFile: string | undefined;
  if (meta.captionImage) {
    coverFile = imageFiles.find(
      (name) => name.toLowerCase() === meta.captionImage!.toLowerCase(),
    );
    if (!coverFile) {
      console.warn(
        `[projectData] ${dir}: project.json's captionImage "${meta.captionImage}" ` +
          `wasn't found among this folder's images.`,
      );
    }
  }
  if (!coverFile) {
    coverFile = imageFiles.find((name) => COVER_FILENAME_HINT.test(name));
  }
  if (!coverFile) {
    coverFile = imageFiles[0];
    console.warn(
      `[projectData] ${dir}: no captionImage in project.json and no file named ` +
        `"cover"/"caption" — using "${coverFile}" (the first file alphabetically).`,
    );
  }

  const publicBase = `/images/${categoryPath[category]}/${slug}`;

  const coverDimensions = readDimensions(path.join(dir, coverFile));
  if (!coverDimensions) {
    console.warn(
      `[projectData] ${dir}: could not read the cover image, skipping this project.`,
    );
    return null;
  }
  const cover: DiscoveredImage = {
    src: `${publicBase}/${encodeURIComponent(coverFile)}`,
    ...coverDimensions,
  };

  const gallery = imageFiles
    .filter((name) => name !== coverFile)
    .map((name) => {
      const dimensions = readDimensions(path.join(dir, name));
      if (!dimensions) return null;
      return {
        src: `${publicBase}/${encodeURIComponent(name)}`,
        ...dimensions,
      };
    })
    .filter((image): image is DiscoveredImage => image !== null);

  return {
    slug,
    title: meta.title ?? humanizeSlug(slug),
    description: meta.description ?? "",
    cover,
    // A folder with only a cover image still needs something to show in
    // the gallery, so fall back to just the cover rather than an empty grid.
    gallery: gallery.length > 0 ? gallery : [cover],
  };
}
