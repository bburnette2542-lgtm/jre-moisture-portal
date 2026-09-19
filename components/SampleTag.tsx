export function SampleTag({
  className = "",
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "light";
}) {
  const styles =
    tone === "light"
      ? "border-white/25 bg-white/10 text-white"
      : "border-gold/40 bg-gold-soft text-navy";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase ${styles} ${className}`}
    >
      Sample
    </span>
  );
}
