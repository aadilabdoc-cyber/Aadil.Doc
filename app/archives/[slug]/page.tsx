import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getProjectsByCategory,
} from "@/lib/projects";

export function generateStaticParams() {
  return getProjectsByCategory("archive").map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/archives/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug("archive", slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

export default async function ArchiveProjectPage({
  params,
}: PageProps<"/archives/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug("archive", slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects("archive", slug);

  return <ProjectDetail project={project} previous={previous} next={next} />;
}
