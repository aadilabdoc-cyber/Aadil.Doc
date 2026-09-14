import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { getFeaturedProjects, getProjectsByCategory } from "@/lib/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const selected = [
    getProjectsByCategory("commercial")[0],
    getProjectsByCategory("personal")[0],
    getProjectsByCategory("archive")[0],
  ].filter(Boolean);

  return (
    <>
      <HeroCarousel slides={featured} />

      <AboutSection />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="02 — Selected Works" title="From the Archive" />
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-t border-weathered-silver/30 px-4 py-24 text-center sm:px-6 lg:px-10">
        <p className="mx-auto max-w-2xl text-lg text-aged-ivory sm:text-xl">
          Every photograph is a small record — of light, of people, of time
          passing. This is an ongoing archive.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs uppercase tracking-[0.15em]">
          <Link href="/commercial-works" className="text-aged-silver hover:text-aged-ivory">
            Commercial Works
          </Link>
          <Link href="/personal-project" className="text-aged-silver hover:text-aged-ivory">
            Personal Project
          </Link>
          <Link href="/archives" className="text-aged-silver hover:text-aged-ivory">
            Archives
          </Link>
        </div>
      </section>
    </>
  );
}
