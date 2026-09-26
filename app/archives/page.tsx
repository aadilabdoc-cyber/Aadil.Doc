import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { getProjectsByCategory } from "@/lib/projects";
import { CONTENT_PADDING_X } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "A visual record of older work and photographic collections — the Aadil.Doc archive.",
};

export default function ArchivesPage() {
  const projects = getProjectsByCategory("archive");

  return (
    <div className={`py-4 ${CONTENT_PADDING_X}`}>
      <ProjectGrid projects={projects} />
    </div>
  );
}
