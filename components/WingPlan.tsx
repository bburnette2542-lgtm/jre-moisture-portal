import { SENSORS, statusLabel } from "@/lib/sample-data";
import type { SensorStatus } from "@/lib/types";
import { SampleTag } from "./SampleTag";

const pinFill: Record<SensorStatus, string> = {
  ok: "#1F7A4D",
  watch: "#C4A35A",
  alert: "#B42318",
};

export function WingPlan({
  selectedId,
  compact = false,
}: {
  selectedId?: string;
  compact?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/8 px-4 py-3">
        <div>
          <p className="font-serif text-lg text-navy">Last wing · sensor plan</p>
          <p className="text-xs text-muted">
            As-built sample map · pins S1–S12 · click a pin for readings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Legend />
          <SampleTag />
        </div>
      </div>
      <div className={`drawing-grid ${compact ? "p-3" : "p-4 sm:p-5"}`}>
        <div className="overflow-x-auto">
          <svg
            viewBox="0 0 1000 560"
            className={`mx-auto ${compact ? "min-w-[640px]" : "min-w-[720px]"} h-auto w-full`}
            role="img"
            aria-label="Last wing sample floor plan with moisture sensor pins S1 through S12"
          >
            <rect x="40" y="36" width="920" height="488" rx="18" fill="#F8F5EE" stroke="#0B2C4A" strokeWidth="2" />
            <rect x="62" y="56" width="876" height="70" rx="8" fill="#E8F2F2" stroke="#1A6B6B" strokeWidth="1.5" />
            <text x="80" y="86" fill="#1A6B6B" fontSize="13" fontWeight="700" letterSpacing="1.5">
              ROOF-TO-WALL
            </text>
            <text x="80" y="106" fill="#5B6774" fontSize="11">
              North elevation · adjacent wing connection
            </text>

            <rect x="62" y="148" width="876" height="96" rx="8" fill="#FFFFFF" stroke="#0B2C4A" strokeOpacity="0.25" />
            <text x="80" y="180" fill="#0B2C4A" fontSize="13" fontWeight="700" letterSpacing="1.5">
              CORRIDOR
            </text>
            <text x="80" y="200" fill="#5B6774" fontSize="11">
              Interior circulation · last wing
            </text>
            <line x1="80" y1="220" x2="910" y2="220" stroke="#0B2C4A" strokeOpacity="0.12" strokeDasharray="6 6" />

            <Bay x={90} label="Window bay 1" />
            <Bay x={390} label="Window bay 2" />
            <Bay x={690} label="Window bay 3" />

            <rect x="62" y="388" width="70" height="92" rx="8" fill="#F6EEDC" stroke="#C4A35A" />
            <text x="74" y="424" fill="#0B2C4A" fontSize="11" fontWeight="700">
              P
            </text>
            <text x="74" y="442" fill="#5B6774" fontSize="10">
              West
            </text>

            <rect x="868" y="388" width="70" height="92" rx="8" fill="#F6EEDC" stroke="#C4A35A" />
            <text x="880" y="424" fill="#0B2C4A" fontSize="11" fontWeight="700">
              P
            </text>
            <text x="880" y="442" fill="#5B6774" fontSize="10">
              East
            </text>

            <text x="80" y="508" fill="#5B6774" fontSize="11">
              SOUTH ELEVATION · WINDOW HEADS + BASE OF WALL
            </text>
            <text x="720" y="508" fill="#0B2C4A" fontSize="11">
              N ↑ · SAMPLE SHEET
            </text>

            {SENSORS.map((sensor) => {
              const cx = 40 + (sensor.x / 100) * 920;
              const cy = 36 + (sensor.y / 100) * 488;
              const selected = selectedId?.toUpperCase() === sensor.id;
              return (
                <a
                  key={sensor.id}
                  href={`/portal/sensors/${sensor.id}`}
                  aria-label={`${sensor.id} ${sensor.detail}`}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={selected ? 18 : 15}
                    fill={pinFill[sensor.status]}
                    stroke={selected ? "#0B2C4A" : "white"}
                    strokeWidth={selected ? 4 : 2.5}
                  />
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="700"
                  >
                    {sensor.id}
                  </text>
                </a>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

function Bay({ x, label }: { x: number; y?: number; label: string }) {
  return (
    <g>
      <rect x={x} y="276" width="220" height="168" rx="10" fill="#FFFFFF" stroke="#0B2C4A" strokeWidth="1.5" />
      <rect x={x + 18} y="294" width="184" height="54" rx="6" fill="#EAF3F7" stroke="#0B2C4A" strokeOpacity="0.2" />
      <text x={x + 30} y="326" fill="#0B2C4A" fontSize="13" fontWeight="600">
        {label}
      </text>
      <text x={x + 30} y="414" fill="#5B6774" fontSize="11">
        Head · base pins
      </text>
    </g>
  );
}

function Legend() {
  const items: { status: SensorStatus; color: string }[] = [
    { status: "ok", color: "#1F7A4D" },
    { status: "watch", color: "#C4A35A" },
    { status: "alert", color: "#B42318" },
  ];

  return (
    <div className="flex items-center gap-3 text-[11px] text-muted">
      {items.map((item) => (
        <span key={item.status} className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
          {statusLabel(item.status)}
        </span>
      ))}
    </div>
  );
}
