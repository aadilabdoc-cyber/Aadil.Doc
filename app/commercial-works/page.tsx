import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import SectionHeading from "@/components/SectionHeading";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Commissioned",
  description:
    "Commissioned photography — weddings and events documented by Aadil, presented as a curated collection.",
};

export default function CommercialWorksPage() {
  const projects = getProjectsByCategory("commercial");

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10">
      <SectionHeading eyebrow="Commissioned Work" title="Commissioned" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-aged-silver">
        Weddings and events, documented as they happened — commissioned work
        presented here as a curated collection.
      </p>

      <ProjectGrid projects={projects} />
    </div>
  );
}
