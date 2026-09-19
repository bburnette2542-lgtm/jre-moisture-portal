import { SampleTag } from "./SampleTag";

type Props = {
  values: number[];
  threshold?: number;
  max?: number;
  label: string;
  unit: string;
  accent?: string;
};

function buildPath(values: number[], width: number, height: number, pad: number, max: number) {
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const step = values.length > 1 ? innerW / (values.length - 1) : innerW;

  const points = values.map((value, index) => {
    const x = pad + index * step;
    const y = pad + innerH - (Math.min(value, max) / max) * innerH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const line = `M ${points.join(" L ")}`;
  const area = `${line} L ${(pad + innerW).toFixed(1)},${(pad + innerH).toFixed(1)} L ${pad},${(pad + innerH).toFixed(1)} Z`;
  return { line, area };
}

export function TrendChart({
  values,
  threshold,
  max = 25,
  label,
  unit,
  accent = "#1A6B6B",
}: Props) {
  const width = 640;
  const height = 220;
  const pad = 28;
  const { line, area } = buildPath(values, width, height, pad, max);
  const thresholdY =
    threshold === undefined
      ? null
      : pad + (height - pad * 2) - (threshold / max) * (height - pad * 2);

  return (
    <div className="rounded-2xl border border-navy/8 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-serif text-lg text-navy">{label}</p>
          <p className="text-xs text-muted">
            30-day SAMPLE trend · last point tracks the live ingest tick
          </p>
        </div>
        <SampleTag />
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${label} 30-day sample chart`}
      >
        {[0.25, 0.5, 0.75, 1].map((tick) => {
          const y = pad + (height - pad * 2) * (1 - tick);
          return (
            <g key={tick}>
              <line
                x1={pad}
                x2={width - pad}
                y1={y}
                y2={y}
                stroke="#0B2C4A"
                strokeOpacity="0.08"
              />
              <text x={8} y={y + 4} fill="#5B6774" fontSize="10">
                {Math.round(max * tick)}
                {unit}
              </text>
            </g>
          );
        })}
        <path d={area} fill={accent} fillOpacity="0.12" />
        <path d={line} fill="none" stroke={accent} strokeWidth="2.5" />
        {values.length > 0 ? (
          <circle
            cx={pad + (values.length - 1) * ((width - pad * 2) / Math.max(values.length - 1, 1))}
            cy={pad + (height - pad * 2) - (Math.min(values.at(-1) ?? 0, max) / max) * (height - pad * 2)}
            r="4.5"
            fill={accent}
          />
        ) : null}
        {thresholdY !== null ? (
          <>
            <line
              x1={pad}
              x2={width - pad}
              y1={thresholdY}
              y2={thresholdY}
              stroke="#B42318"
              strokeDasharray="5 4"
              strokeWidth="1.5"
            />
            <text x={width - pad - 78} y={thresholdY - 6} fill="#B42318" fontSize="10">
              Threshold {threshold}
              {unit}
            </text>
          </>
        ) : null}
        <text x={pad} y={height - 6} fill="#5B6774" fontSize="10">
          Day 1
        </text>
        <text x={width - pad - 32} y={height - 6} fill="#5B6774" fontSize="10">
          Day 30
        </text>
      </svg>
    </div>
  );
}
