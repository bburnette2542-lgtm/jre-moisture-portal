"use client";

import Link from "next/link";
import { useLiveSnapshot } from "@/hooks/useLiveSnapshot";
import type { Role } from "@/lib/types";
import { SampleTag } from "../SampleTag";
import { StatusChip } from "../StatusChip";
import { WingPlan } from "../WingPlan";

export function MapLive({ role }: { role: Role }) {
  const snapshot = useLiveSnapshot();
  const hrefBase = role === "ops" ? "/ops/sensors" : "/portal/sensors";

  if (!snapshot) {
    return <p className="text-sm text-muted">Loading wing plan…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-teal uppercase">
            Wing plan map
          </p>
          <h1 className="mt-1 font-serif text-3xl text-navy">Last wing · labeled pins</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Hover a pin for live SAMPLE readings. Alert pins pulse. This is still
            JRE sample ingest — not a vendor portal.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip status="ok" count={snapshot.counts.ok} />
          <StatusChip status="watch" count={snapshot.counts.watch} />
          <StatusChip status="alert" count={snapshot.counts.alert} />
          <SampleTag />
        </div>
      </div>
      <WingPlan sensors={snapshot.sensors} hrefBase={hrefBase} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {snapshot.sensors.map((sensor) => (
          <Link
            key={sensor.id}
            href={`${hrefBase}/${sensor.id}`}
            className="rounded-2xl border border-navy/8 bg-white p-4 shadow-sm transition hover:border-teal/40"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-sm font-semibold text-navy">{sensor.id}</p>
              <StatusChip status={sensor.status} />
            </div>
            <p className="mt-2 text-sm text-muted">
              {sensor.location} · {sensor.detail}
            </p>
            <p className="mt-3 font-mono text-xs text-navy">
              {sensor.tempF.toFixed(1)}°F · {sensor.rh}% · {sensor.moisture.toFixed(1)}%
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
