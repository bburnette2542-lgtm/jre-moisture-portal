import { SampleTag } from "./SampleTag";

export function MetricTile({
  label,
  value,
  unit,
  hint,
  accent = "teal",
}: {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
  accent?: "teal" | "gold" | "alert";
}) {
  const bar =
    accent === "alert" ? "bg-alert" : accent === "gold" ? "bg-gold" : "bg-teal";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-navy/8 bg-white p-4 shadow-sm">
      <div className={`absolute inset-y-0 left-0 w-1 ${bar}`} />
      <div className="flex items-start justify-between gap-3 pl-2">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            {label}
          </p>
          <p className="mt-1 font-serif text-3xl text-navy">
            {value}
            {unit ? <span className="ml-1 text-lg text-muted">{unit}</span> : null}
          </p>
          {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
        </div>
        <SampleTag />
      </div>
    </div>
  );
}
