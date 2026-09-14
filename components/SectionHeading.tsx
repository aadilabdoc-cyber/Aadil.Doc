export default function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs uppercase tracking-[0.3em] text-weathered-silver">
        {eyebrow}
      </p>
      {title && (
        <h2 className="mt-3 text-2xl font-bold text-aged-ivory sm:text-3xl">
          {title}
        </h2>
      )}
    </div>
  );
}
