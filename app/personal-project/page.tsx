import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { getProjectsByCategory } from "@/lib/projects";
import { CONTENT_PADDING_X } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Personal Project",
  description:
    "Independent photographic stories and experiments — the personal, ongoing work of Aadil.",
};

export default function PersonalProjectPage() {
  const projects = [
    ...getProjectsByCategory("personal"),
    ...getProjectsByCategory("commercial"),
  ];

  return (
    <div className={`py-4 ${CONTENT_PADDING_X}`}>
      <ProjectGrid projects={projects} />
    </div>
  );
}
