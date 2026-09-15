import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import SectionHeading from "@/components/SectionHeading";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Personal Project",
  description:
    "Independent photographic stories and experiments — the personal, ongoing work of Aadil.",
};

export default function PersonalProjectPage() {
  const projects = getProjectsByCategory("personal");

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10">
      <SectionHeading eyebrow="Independent Work" title="Personal Project" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-aged-silver">
        Slower, more contemplative work made without a client or a brief —
        stories returned to over months and years.
      </p>

      <ProjectGrid projects={projects} />
    </div>
  );
}
