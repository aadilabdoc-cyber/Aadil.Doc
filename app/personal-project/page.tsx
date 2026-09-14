import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { getProjectsByCategory, projectHref } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Personal Project",
  description:
    "Independent photographic stories and experiments — the personal, ongoing work of Aadil.",
};

export default function PersonalProjectPage() {
  const [featured, ...rest] = getProjectsByCategory("personal");

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10">
      <SectionHeading eyebrow="Independent Work" title="Personal Project" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-aged-silver">
        Slower, more contemplative work made without a client or a brief —
        stories returned to over months and years.
      </p>

      {featured && (
        <Link
          href={projectHref(featured)}
          className="group mt-16 grid gap-8 md:grid-cols-2 md:items-center md:gap-16"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-weathered-silver">
              {featured.year}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-aged-ivory sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-aged-silver">
              {featured.description}
            </p>
          </div>
        </Link>
      )}

      <div className="mt-24 flex flex-col gap-20">
        {rest.map((project, index) => (
          <Link
            key={project.slug}
            href={projectHref(project)}
            className="group grid gap-8 md:grid-cols-2 md:gap-16"
          >
            <div
              className={`relative aspect-[4/5] overflow-hidden bg-graphite ${
                index % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.15em] text-weathered-silver">
                {project.year}
              </p>
              <h3 className="mt-3 text-xl font-bold text-aged-ivory">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-aged-silver">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
