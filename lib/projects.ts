import type { Project, ProjectCategory } from "@/types/project";
import { allCategories, categoryLabel, categoryPath, projectHref } from "./categories";
import { listProjectSlugs, readProjectFolder, type ProjectFolder } from "./projectData";

export { categoryPath, categoryLabel, projectHref };

function toProject(category: ProjectCategory, folder: ProjectFolder): Project {
  return {
    slug: folder.slug,
    category,
    title: folder.title,
    description: folder.description,
    coverImage: folder.cover.src,
    coverWidth: folder.cover.width,
    coverHeight: folder.cover.height,
    images: folder.gallery.map((image) => image.src),
    imageDimensions: folder.gallery.map(({ width, height }) => ({ width, height })),
  };
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  // listProjectSlugs is already alphabetical by folder name — with no
  // date field left in project.json, that's the deterministic order.
  return listProjectSlugs(category)
    .map((slug) => readProjectFolder(category, slug))
    .filter((folder): folder is ProjectFolder => folder !== null)
    .map((folder) => toProject(category, folder));
}

export function getAllProjects(): Project[] {
  return allCategories.flatMap((category) => getProjectsByCategory(category));
}

export function getProjectBySlug(
  category: ProjectCategory,
  slug: string,
): Project | undefined {
  const folder = readProjectFolder(category, slug);
  return folder ? toProject(category, folder) : undefined;
}

export function getAdjacentProjects(
  category: ProjectCategory,
  slug: string,
): { previous: Project | null; next: Project | null } {
  const list = getProjectsByCategory(category);
  const index = list.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  const previous = index > 0 ? list[index - 1] : null;
  const next = index < list.length - 1 ? list[index + 1] : null;

  return { previous, next };
}
