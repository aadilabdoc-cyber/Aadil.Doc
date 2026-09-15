import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import SectionHeading from "@/components/SectionHeading";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "A visual record of older work and photographic collections — the Aadil.Doc archive.",
};

export default function ArchivesPage() {
  const projects = getProjectsByCategory("archive");

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10">
      <SectionHeading eyebrow="The Archive" title="Archive" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-aged-silver">
        Older collections, kept as a record — browsed here as a single
        archive.
      </p>

      <ProjectGrid projects={projects} />
    </div>
  );
}
