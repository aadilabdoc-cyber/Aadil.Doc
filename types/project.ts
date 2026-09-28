export type ProjectCategory = "weddings" | "archive";

// Only meaningful when category is "weddings" — distinguishes a personal
// documentary project from commissioned (client) work within that one
// combined collection.
export type WeddingType = "project" | "commissioned";

/** Fully resolved project — text (from project.json) merged with its images. */
export interface Project {
  slug: string;
  category: ProjectCategory;
  weddingType?: WeddingType;
  title: string;
  description: string;
  order?: number;
  coverImage: string;
  coverWidth: number;
  coverHeight: number;
  images: string[];
  imageDimensions: Array<{ width: number; height: number }>;
}
