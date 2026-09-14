import Breadcrumbs from "./Breadcrumbs";
import MasonryGallery from "./MasonryGallery";
import ProjectNav from "./ProjectNav";
import type { Project } from "@/types/project";
import { categoryLabel, categoryPath } from "@/lib/projects";

export default function ProjectDetail({
  project,
  previous,
  next,
}: {
  project: Project;
  previous: Project | null;
  next: Project | null;
}) {
  const images = project.images.map((src, i) => ({
    src,
    width: project.imageDimensions[i].width,
    height: project.imageDimensions[i].height,
    caption: project.captions?.[i],
  }));

  return (
    <article className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10">
      <Breadcrumbs
        trail={[
          { label: categoryLabel[project.category], href: `/${categoryPath[project.category]}` },
          { label: project.title },
        ]}
      />

      <header className="mt-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-weathered-silver">
          {project.year}
          {project.location ? ` — ${project.location}` : ""}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-aged-ivory sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-aged-silver">
          {project.description}
        </p>
        {project.note && (
          <p className="mt-4 border-l border-weathered-silver pl-4 text-sm italic text-aged-silver">
            {project.note}
          </p>
        )}
      </header>

      <div className="mt-14">
        <MasonryGallery images={images} alt={project.title} />
      </div>

      <ProjectNav previous={previous} next={next} category={project.category} />
    </article>
  );
}
