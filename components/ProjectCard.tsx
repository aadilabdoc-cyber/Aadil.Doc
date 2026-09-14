import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { categoryLabel, projectHref } from "@/lib/projects";

export default function ProjectCard({
  project,
  priority,
  aspect = "aspect-[4/5]",
}: {
  project: Project;
  priority?: boolean;
  aspect?: string;
}) {
  return (
    <Link href={projectHref(project)} className="group block">
      <div className={`relative overflow-hidden bg-graphite ${aspect}`}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-weathered-silver">
            {categoryLabel[project.category]}
          </p>
          <h3 className="mt-1 text-base text-aged-ivory">{project.title}</h3>
        </div>
        <span className="shrink-0 text-xs text-aged-silver">{project.year}</span>
      </div>
    </Link>
  );
}
