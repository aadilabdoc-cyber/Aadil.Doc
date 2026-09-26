export type ProjectCategory = "commercial" | "personal" | "archive";

/** Fully resolved project — text (from project.json) merged with its images. */
export interface Project {
  slug: string;
  category: ProjectCategory;
  title: string;
  description: string;
  coverImage: string;
  coverWidth: number;
  coverHeight: number;
  images: string[];
  imageDimensions: Array<{ width: number; height: number }>;
}
