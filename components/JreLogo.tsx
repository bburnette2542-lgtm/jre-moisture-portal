export function JreLogo({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  const ink = light ? "text-white" : "text-navy";
  const sub = light ? "text-gold-soft/80" : "text-teal";

  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 40 40"
        className={compact ? "h-8 w-8" : "h-10 w-10"}
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="8" fill="#0B2C4A" />
        <path d="M20 6L32 12V20C32 27 26.8 32.8 20 34.6C13.2 32.8 8 27 8 20V12L20 6Z" fill="#1A6B6B" />
        <path
          d="M20 9.2L29.2 13.6V20.1C29.2 25.6 25.1 30.2 20 31.7C14.9 30.2 10.8 25.6 10.8 20.1V13.6L20 9.2Z"
          fill="#0B2C4A"
        />
        <path d="M14 21.2L20 14.8L26 21.2H22.6V26H17.4V21.2H14Z" fill="#C4A35A" />
      </svg>
      <div className="leading-tight">
        <p className={`font-serif text-[15px] font-semibold tracking-tight ${ink}`}>
          James River Exteriors
        </p>
        <p className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${sub}`}>
          {compact ? "Owner portal" : "Owner portal · Moisture monitor"}
        </p>
      </div>
    </div>
  );
}
