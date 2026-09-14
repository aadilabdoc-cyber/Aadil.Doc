import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10"
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-graphite">
          <Image
            src="/images/02.jpg"
            alt={`${site.photographer}, portrait`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeading eyebrow="01 — About the Author" />
          <h2
            id="about-heading"
            className="mt-4 text-2xl font-bold text-aged-ivory sm:text-3xl"
          >
            {site.about.heading}
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-aged-silver">
            {site.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-6 border-l border-weathered-silver pl-4 text-sm italic text-aged-ivory">
            {site.about.philosophy}
          </p>
          <Link
            href="/contacts"
            className="mt-8 inline-block w-fit text-xs uppercase tracking-[0.2em] text-aged-ivory underline decoration-weathered-silver underline-offset-4 hover:decoration-aged-ivory"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
