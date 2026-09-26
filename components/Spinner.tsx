export default function Spinner({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading image"
      className={`animate-spin rounded-full border-2 border-weathered-silver/40 border-t-aged-ivory ${className}`}
    />
  );
}
