export function ConceptBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div className="border-b border-gold/30 bg-navy text-gold-soft">
      <div
        className={`mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 ${compact ? "py-2" : "py-2.5"}`}
      >
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase">
          Concept / sample data
        </p>
        <p className="text-[11px] text-gold-soft/80">
          Not live field readings · Owner / GC read-only view · JRE-owned portal
        </p>
      </div>
    </div>
  );
}
