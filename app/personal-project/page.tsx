import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Personal Project",
  description:
    "Independent photographic stories and experiments — the personal, ongoing work of Aadil.",
};

export default function PersonalProjectPage() {
  const projects = getProjectsByCategory("personal");

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-10">
      <ProjectGrid projects={projects} />
    </div>
  );
}
