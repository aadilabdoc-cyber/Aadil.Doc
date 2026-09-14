import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getProjectsByCategory,
} from "@/lib/projects";

export function generateStaticParams() {
  return getProjectsByCategory("personal").map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/personal-project/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug("personal", slug);
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

export default async function PersonalProjectDetailPage({
  params,
}: PageProps<"/personal-project/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug("personal", slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects("personal", slug);

  return <ProjectDetail project={project} previous={previous} next={next} />;
}
