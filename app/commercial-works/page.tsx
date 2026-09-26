import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { getProjectsByCategory } from "@/lib/projects";
import { CONTENT_PADDING_X } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Commissioned",
  description:
    "Commissioned photography — weddings and events documented by Aadil, presented as a curated collection.",
};

export default function CommercialWorksPage() {
  const projects = getProjectsByCategory("commercial");

  return (
    <div className={`py-4 ${CONTENT_PADDING_X}`}>
      <ProjectGrid projects={projects} />
    </div>
  );
}
