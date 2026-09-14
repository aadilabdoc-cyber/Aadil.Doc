import Link from "next/link";

export default function Breadcrumbs({
  trail,
}: {
  trail: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.15em]">
      <ol className="flex flex-wrap items-center gap-2 text-aged-silver">
        {trail.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span className="text-weathered-silver">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-aged-ivory">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-aged-ivory">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
