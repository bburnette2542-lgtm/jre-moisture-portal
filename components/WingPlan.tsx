"use client";

import { useState } from "react";
import { statusLabel } from "@/lib/sample-data";
import type { Sensor, SensorStatus } from "@/lib/types";
import { SampleTag } from "./SampleTag";

const pinFill: Record<SensorStatus, string> = {
  ok: "#1F7A4D",
  watch: "#C4A35A",
  alert: "#B42318",
};

export function WingPlan({
  sensors,
  selectedId,
  hrefBase = "/portal/sensors",
  compact = false,
}: {
  sensors: Sensor[];
  selectedId?: string;
  hrefBase?: string;
  compact?: boolean;
}) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const hovered = sensors.find((sensor) => sensor.id === hoverId);

  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/8 px-4 py-3">
        <div>
          <p className="font-serif text-lg text-navy">Last wing · sensor plan</p>
          <p className="text-xs text-muted">
            As-built sample map · pins S1–S12 · live SAMPLE readings on hover
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Legend />
          <SampleTag />
        </div>
      </div>
      <div className={`drawing-grid relative ${compact ? "p-3" : "p-4 sm:p-5"}`}>
        {hovered ? (
          <div className="pointer-events-none absolute top-4 right-4 z-10 w-52 rounded-xl border border-navy/10 bg-white/95 p-3 shadow-lg">
            <p className="font-mono text-sm font-semibold text-navy">{hovered.id}</p>
            <p className="text-xs text-muted">
              {hovered.location} · {hovered.detail}
            </p>
            <p className="mt-2 text-xs text-navy">
              {hovered.tempF.toFixed(1)}°F · {hovered.rh}% RH · {hovered.moisture.toFixed(1)}% moisture
            </p>
          </div>
        ) : null}
        <div className="overflow-x-auto">
          <svg
            viewBox="0 0 1000 560"
            className={`mx-auto ${compact ? "min-w-[640px]" : "min-w-[720px]"} h-auto w-full`}
            role="img"
            aria-label="Last wing sample floor plan with moisture sensor pins S1 through S12"
          >
            <defs>
              <filter id="pin-shadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.4" floodColor="#0B2C4A" floodOpacity="0.25" />
              </filter>
            </defs>
            <rect x="40" y="36" width="920" height="488" rx="18" fill="#F8F5EE" stroke="#0B2C4A" strokeWidth="2" />
            <rect x="70" y="56" width="860" height="80" rx="8" fill="#E8F2F2" stroke="#1A6B6B" strokeWidth="1.5" />
            <text x="88" y="86" fill="#1A6B6B" fontSize="13" fontWeight="700" letterSpacing="1.4">
              ROOF-TO-WALL
            </text>
            <text x="88" y="108" fill="#5B6774" fontSize="11">
              North elevation · adjacent wing connection
            </text>
            <rect x="70" y="150" width="860" height="90" rx="8" fill="#FFFFFF" stroke="#0B2C4A" strokeOpacity="0.25" />
            <text x="88" y="180" fill="#0B2C4A" fontSize="13" fontWeight="700" letterSpacing="1.4">
              CORRIDOR
            </text>
            <text x="88" y="200" fill="#5B6774" fontSize="11">
              Interior circulation · last wing
            </text>
            <rect x="70" y="260" width="80" height="200" rx="10" fill="#F6EEDC" stroke="#C4A35A" />
            <text x="86" y="290" fill="#0B2C4A" fontSize="12" fontWeight="700">
              P
            </text>
            <text x="80" y="308" fill="#5B6774" fontSize="10">
              West
            </text>
            <Bay x={170} label="Window bay 1" />
            <Bay x={410} label="Window bay 2" />
            <Bay x={650} label="Window bay 3" />
            <rect x="890" y="260" width="80" height="200" rx="10" fill="#F6EEDC" stroke="#C4A35A" />
            <text x="906" y="290" fill="#0B2C4A" fontSize="12" fontWeight="700">
              P
            </text>
            <text x="900" y="308" fill="#5B6774" fontSize="10">
              East
            </text>
            <text x="70" y="500" fill="#5B6774" fontSize="11">
              SOUTH ELEVATION · WINDOW HEADS + BASE OF WALL
            </text>
            <text x="748" y="500" fill="#0B2C4A" fontSize="11">
              N ↑ · SAMPLE SHEET
            </text>

            {sensors.map((sensor) => {
              const selected = selectedId?.toUpperCase() === sensor.id;
              return (
                <a
                  key={sensor.id}
                  href={`${hrefBase}/${sensor.id}`}
                  aria-label={`${sensor.id} ${sensor.detail}`}
                  onMouseEnter={() => setHoverId(sensor.id)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  {sensor.status === "alert" ? (
                    <circle
                      cx={sensor.x}
                      cy={sensor.y}
                      r="22"
                      fill={pinFill.alert}
                      className="pin-pulse"
                    />
                  ) : null}
                  <circle
                    cx={sensor.x}
                    cy={sensor.y}
                    r={selected ? 18 : 15}
                    fill={pinFill[sensor.status]}
                    stroke={selected ? "#0B2C4A" : "white"}
                    strokeWidth={selected ? 4 : 2.5}
                    filter="url(#pin-shadow)"
                  />
                  <text
                    x={sensor.x}
                    y={sensor.y + 4}
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

function Bay({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <rect x={x} y="260" width="220" height="200" rx="10" fill="#FFFFFF" stroke="#0B2C4A" strokeWidth="1.5" />
      <rect x={x + 16} y="278" width="188" height="48" rx="6" fill="#EAF3F7" stroke="#0B2C4A" strokeOpacity="0.2" />
      <text x={x + 28} y="308" fill="#0B2C4A" fontSize="13" fontWeight="600">
        {label}
      </text>
      <text x={x + 28} y="440" fill="#5B6774" fontSize="11">
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
