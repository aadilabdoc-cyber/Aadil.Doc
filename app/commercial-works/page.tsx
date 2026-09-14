import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Commercial Works",
  description:
    "Commissioned photography — weddings and events documented by Aadil, presented as a curated collection rather than a catalog.",
};

export default function CommercialWorksPage() {
  const projects = getProjectsByCategory("commercial");

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10">
      <SectionHeading eyebrow="Commissioned Work" title="Commercial Works" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-aged-silver">
        Weddings and events, documented as they happened — commissioned work
        presented here as a curated collection rather than a catalog.
      </p>

      <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2">
        {projects.map((project, index) => (
          <div key={project.slug} className={index % 3 === 0 ? "sm:col-span-2" : ""}>
            <ProjectCard
              project={project}
              priority={index === 0}
              aspect={index % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
