import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { getProjectsByCategory, projectHref } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Archives",
  description:
    "A visual record of older work and photographic collections — the Aadil.Doc archive.",
};

export default function ArchivesPage() {
  const projects = getProjectsByCategory("archive");

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-10">
      <SectionHeading eyebrow="The Archive" title="Archives" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-aged-silver">
        Older collections, kept as a record — browsed here as an index rather
        than a gallery.
      </p>

      <ul className="mt-14 divide-y divide-weathered-silver/25 border-t border-b border-weathered-silver/25">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Link
              href={projectHref(project)}
              className="group flex items-center gap-6 py-6"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-graphite sm:h-24 sm:w-24">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.15em] text-weathered-silver">
                  Archive {String(index + 1).padStart(3, "0")}
                </p>
                <h2 className="mt-1 truncate text-base text-aged-ivory sm:text-lg">
                  {project.title}
                </h2>
                <p className="mt-1 text-xs text-aged-silver">
                  {project.year}
                  {project.location ? ` · ${project.location}` : ""}
                </p>
              </div>
              <span
                aria-hidden
                className="hidden shrink-0 text-2xl text-weathered-silver sm:block"
              >
                &#8250;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
