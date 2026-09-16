import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Commissioned",
  description:
    "Commissioned photography — weddings and events documented by Aadil, presented as a curated collection.",
};

export default function CommercialWorksPage() {
  const projects = getProjectsByCategory("commercial");

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-10">
      <ProjectGrid projects={projects} />
    </div>
  );
}
