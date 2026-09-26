import path from "node:path";
import { readImageFolder, type DiscoveredImage } from "./imageFiles";

// Independent of project data on purpose — the homepage hero shows
// whatever is dropped in public/images/slider/, nothing more.
const SLIDER_DIR = "slider";

export function getSliderImages(): DiscoveredImage[] {
  const absDir = path.join(process.cwd(), "public", "images", SLIDER_DIR);
  const images = readImageFolder(absDir, `/images/${SLIDER_DIR}`);

  if (images.length === 0) {
    console.warn(
      `[sliderImages] No images found in public/images/${SLIDER_DIR}/ — the homepage hero will be empty.`,
    );
  }

  return images;
}
