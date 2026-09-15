import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/project";

export const categoryPath: Record<ProjectCategory, string> = {
  commercial: "commercial-works",
  personal: "personal-project",
  archive: "archives",
};

export const categoryLabel: Record<ProjectCategory, string> = {
  commercial: "Commissioned",
  personal: "Personal Project",
  archive: "Archive",
};

export function projectHref(project: Pick<Project, "category" | "slug">): string {
  return `/${categoryPath[project.category]}/${project.slug}`;
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getProjectBySlug(
  category: ProjectCategory,
  slug: string,
): Project | undefined {
  return projects.find(
    (project) => project.category === category && project.slug === slug,
  );
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

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
