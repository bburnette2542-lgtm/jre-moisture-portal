export function LiveDot({ label = "Live SAMPLE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-teal uppercase">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
      </span>
      {label}
    </span>
  );
}
