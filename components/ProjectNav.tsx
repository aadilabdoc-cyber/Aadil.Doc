import Link from "next/link";
import type { Project, ProjectCategory } from "@/types/project";
import { categoryPath, projectHref } from "@/lib/projects";

export default function ProjectNav({
  previous,
  next,
  category,
}: {
  previous: Project | null;
  next: Project | null;
  category: ProjectCategory;
}) {
  return (
    <nav
      aria-label="Project navigation"
      className="mt-16 flex flex-col gap-6 border-t border-weathered-silver/30 pt-8 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="sm:min-w-0 sm:flex-1">
        {previous && (
          <Link href={projectHref(previous)} className="group flex flex-col">
            <span className="text-xs uppercase tracking-[0.15em] text-weathered-silver">
              Previous
            </span>
            <span className="mt-1 text-sm text-aged-silver group-hover:text-aged-ivory">
              {previous.title}
            </span>
          </Link>
        )}
      </div>

      <Link
        href={`/${categoryPath[category]}`}
        className="shrink-0 text-xs uppercase tracking-[0.15em] text-aged-silver hover:text-aged-ivory"
      >
        Back to Collection
      </Link>

      <div className="sm:min-w-0 sm:flex-1 sm:text-right">
        {next && (
          <Link href={projectHref(next)} className="group flex flex-col sm:items-end">
            <span className="text-xs uppercase tracking-[0.15em] text-weathered-silver">
              Next
            </span>
            <span className="mt-1 text-sm text-aged-silver group-hover:text-aged-ivory">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
