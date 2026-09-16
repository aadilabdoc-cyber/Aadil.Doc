import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "A visual record of older work and photographic collections — the Aadil.Doc archive.",
};

export default function ArchivesPage() {
  const projects = getProjectsByCategory("archive");

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-10">
      <ProjectGrid projects={projects} />
    </div>
  );
}
