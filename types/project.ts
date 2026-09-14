export type ProjectCategory = "commercial" | "personal" | "archive";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  location?: string;
  description: string;
  note?: string;
  coverImage: string;
  coverWidth: number;
  coverHeight: number;
  images: string[];
  imageDimensions: Array<{ width: number; height: number }>;
  captions?: string[];
  featured?: boolean;
}
