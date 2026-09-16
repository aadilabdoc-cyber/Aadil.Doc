import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.photographer} — ${site.name}.`,
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-4 text-center sm:px-6 lg:px-10">
      <SectionHeading eyebrow="Get in Touch" title="Contact" />
      <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-aged-silver">
        For commissions, print inquiries, or simply to say hello —{" "}
        {site.photographer} reads every message.
      </p>

      {/* <div className="mt-8 flex flex-col items-center gap-4">
        <a
          href={`mailto:${site.email}`}
          className="text-lg text-aged-ivory underline decoration-weathered-silver underline-offset-4 hover:decoration-aged-ivory"
        >
          {site.email}
        </a>
        <div className="flex gap-4">
          {site.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
            >
              <Image
                src={s.icon}
                alt=""
                width={18}
                height={18}
                className="opacity-60 transition-opacity hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div> */}

      <div className="mt-14 text-left">
        <ContactForm />
      </div>
    </div>
  );
}
