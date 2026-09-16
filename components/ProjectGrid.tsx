import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/project";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} priority={index < 3} />
      ))}
    </div>
  );
}
