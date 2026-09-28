import type { Project, ProjectCategory } from "@/types/project";

// Also the folder name under public/images/<here>/<slug>/.
export const categoryPath: Record<ProjectCategory, string> = {
  weddings: "weddings",
  archive: "archives",
};

export const categoryLabel: Record<ProjectCategory, string> = {
  weddings: "Weddings",
  archive: "Archive",
};

export const allCategories: ProjectCategory[] = ["weddings", "archive"];

// Fs-free on purpose: safe to import from Client Components (e.g.
// ProjectCard) without dragging the filesystem-scanning project data
// modules (which use node:fs) into the browser bundle.
export function projectHref(project: Pick<Project, "category" | "slug">): string {
  return `/${categoryPath[project.category]}/${project.slug}`;
}
