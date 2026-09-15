import Link from "next/link";
import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-10"
    >
      <SectionHeading eyebrow="01 — About the Author" />
      <h2
        id="about-heading"
        className="mt-4 text-2xl font-bold text-aged-ivory sm:text-3xl"
      >
        {site.about.heading}
      </h2>
      <div className="mx-auto mt-6 flex max-w-xl flex-col gap-4 text-sm leading-relaxed text-aged-silver">
        {site.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-md text-sm italic text-aged-ivory">
        {site.about.philosophy}
      </p>
      <Link
        href="/contacts"
        className="mt-8 inline-block text-xs uppercase tracking-[0.2em] text-aged-ivory underline decoration-weathered-silver underline-offset-4 hover:decoration-aged-ivory"
      >
        Get in Touch
      </Link>
    </section>
  );
}
