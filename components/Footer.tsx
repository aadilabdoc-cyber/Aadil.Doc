import Link from "next/link";
import { nav, site } from "@/data/site";
import { FacebookIcon, InstagramIcon } from "./icons/SocialIcons";

const socialIcons: Record<string, typeof FacebookIcon> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-weathered-silver/30 px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="text-sm tracking-[0.2em] text-aged-ivory">
            {site.name.toUpperCase()}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-aged-silver">
            {site.footerStatement}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block text-sm text-aged-ivory underline decoration-weathered-silver underline-offset-4 hover:decoration-aged-ivory"
          >
            {site.email}
          </a>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav aria-label="Footer" className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-weathered-silver">
              Index
            </span>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-aged-silver hover:text-aged-ivory"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-weathered-silver">
              Follow
            </span>
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
                    <Icon className="h-4 w-4 text-aged-silver transition-colors hover:text-aged-ivory" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-weathered-silver/20 pt-6 text-xs text-weathered-silver">
        &copy; {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
