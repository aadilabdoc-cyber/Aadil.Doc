import Breadcrumbs from "./Breadcrumbs";
import MasonryGallery from "./MasonryGallery";
import ProjectNav from "./ProjectNav";
import type { Project } from "@/types/project";
import { categoryLabel, categoryPath } from "@/lib/projects";
import { CONTENT_PADDING_X } from "@/lib/layout";

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
  }));

  return (
    <article className={`py-4 ${CONTENT_PADDING_X}`}>
      {/* <Breadcrumbs
        trail={[
          { label: categoryLabel[project.category], href: `/${categoryPath[project.category]}` },
          { label: project.title },
        ]}
      /> */}

      <header className="mt-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-weathered-silver">
          {/* {project.year} */}
          {/* {project.location ? ` — ${project.location}` : ""} */}
          {project.category === "personal"
            ? "Personal Project"
            : project.category === "commercial"
              ? "Commissioned"
              : ""}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-aged-ivory sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-aged-silver">
          {project.description}
        </p>
        {/* {project.note && (
          <p className="mt-4 border-l border-weathered-silver pl-4 text-sm italic text-aged-silver">
            {project.note}
          </p>
        )} */}
      </header>

      <div className="mt-14">
        <MasonryGallery
          images={images}
          alt={project.title}
          hideCaptions={true}
        />
      </div>

      <ProjectNav previous={previous} next={next} category={project.category} />
    </article>
  );
}
