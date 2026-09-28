import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { getProjectsByCategory } from "@/lib/projects";
import { CONTENT_PADDING_X } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Weddings",
  description:
    "Weddings — commissioned ceremonies and personal documentary work, photographed by Aadil.",
};

export default function WeddingsPage() {
  const projects = getProjectsByCategory("weddings");

  return (
    <div className={`py-4 ${CONTENT_PADDING_X}`}>
      <ProjectGrid projects={projects} />
    </div>
  );
}
