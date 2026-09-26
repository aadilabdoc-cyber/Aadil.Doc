import Link from "next/link";
import { site } from "@/data/site";
import { InstagramIcon, WhatsAppIcon } from "./icons/SocialIcons";
import { CONTENT_PADDING_X } from "@/lib/layout";

const socialIcons: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  WhatsApp: WhatsAppIcon,
};

function SocialRow() {
  return (
    <div className="flex gap-4">
      {site.social.map((s) => {
        const Icon = socialIcons[s.label];
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
          >
            <Icon className="h-5 w-5 text-aged-silver transition-colors hover:text-aged-ivory" />
          </a>
        );
      })}
    </div>
  );
}

function EmailLink() {
  return (
    <a
      href={`mailto:${site.email}`}
      className="text-sm text-aged-ivory underline decoration-weathered-silver underline-offset-4 hover:decoration-aged-ivory"
    >
      {site.email}
    </a>
  );
}

function PhoneLink() {
  return (
    <a
      href={`tel:${site.phone.replace(/\s+/g, "")}`}
      className="text-sm text-aged-ivory underline decoration-weathered-silver underline-offset-4 hover:decoration-aged-ivory"
    >
      {site.phone}
    </a>
  );
}

export function GetInTouchLink() {
  return (
    <Link
      href="/contacts"
      className="text-xs uppercase tracking-[0.2em] text-aged-ivory underline decoration-weathered-silver underline-offset-4 hover:decoration-aged-ivory"
    >
      Get In Touch
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`border-t border-weathered-silver/30 py-16 ${CONTENT_PADDING_X}`}
    >
      {/* Mobile: single left-aligned column — icons, then email, then phone. */}
      <div className="flex flex-col items-start gap-4 md:hidden">
        <SocialRow />
        <PhoneLink />
        <EmailLink />
      </div>

      {/* Desktop: email/phone on the left, Get In Touch centered, icons on the right. */}
      <div className="hidden grid-cols-3 items-center md:grid">
        <div className="flex flex-col items-start gap-2">
          <EmailLink />
          <PhoneLink />
        </div>
        <div className="flex justify-center">
          <GetInTouchLink />
        </div>
        <div className="flex justify-end">
          <SocialRow />
        </div>
      </div>

      <div className="mt-12 border-t border-weathered-silver/20 pt-6 text-xs text-weathered-silver">
        &copy; {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
