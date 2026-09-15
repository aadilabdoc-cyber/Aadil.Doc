import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <HeroCarousel slides={featured} />

      <AboutSection />

      <section className="border-t border-weathered-silver/30 px-4 py-24 text-center sm:px-6 lg:px-10">
        <p className="mx-auto max-w-2xl text-lg text-aged-ivory sm:text-xl">
          Every photograph is a small record — of light, of people, of time
          passing. This is an ongoing archive.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs uppercase tracking-[0.15em]">
          <Link href="/personal-project" className="text-aged-silver hover:text-aged-ivory">
            Personal Project
          </Link>
          <Link href="/commercial-works" className="text-aged-silver hover:text-aged-ivory">
            Commissioned
          </Link>
          <Link href="/archives" className="text-aged-silver hover:text-aged-ivory">
            Archive
          </Link>
        </div>
      </section>
    </>
  );
}
