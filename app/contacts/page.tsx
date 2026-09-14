import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacts",
  description: `Get in touch with ${site.photographer} — ${site.name}.`,
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-10">
      <SectionHeading eyebrow="Get in Touch" title="Contacts" />
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-aged-silver">
        For commissions, print inquiries, or simply to say hello —{" "}
        {site.photographer} reads every message.
      </p>

      <div className="mt-14 grid md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-weathered-silver">
            Email
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-block text-lg text-aged-ivory underline decoration-weathered-silver underline-offset-4 hover:decoration-aged-ivory"
          >
            {site.email}
          </a>

          <p className="mt-10 text-xs uppercase tracking-[0.15em] text-weathered-silver">
            Follow
          </p>
          <div className="mt-3 flex gap-4">
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
        </div>
        <div className="col-span-2 mt-10 md:mt-0">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
