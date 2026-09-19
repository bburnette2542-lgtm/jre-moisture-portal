import Link from "next/link";
import { SampleTag } from "@/components/SampleTag";
import { StatusChip } from "@/components/StatusChip";
import { WingPlan } from "@/components/WingPlan";
import { SENSORS, statusCounts } from "@/lib/sample-data";

export const metadata = {
  title: "Wing plan",
};

export default function MapPage() {
  const counts = statusCounts();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-teal uppercase">
            Wing plan map
          </p>
          <h1 className="mt-1 font-serif text-3xl text-navy">Last wing · labeled pins</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Sample as-built plan for Virginia Home 725-011. Green is OK, gold is
            Watch, red is Alert. Select a pin to open the owner sensor view.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip status="ok" count={counts.ok} />
          <StatusChip status="watch" count={counts.watch} />
          <StatusChip status="alert" count={counts.alert} />
          <SampleTag />
        </div>
      </div>
      <WingPlan />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SENSORS.map((sensor) => (
          <Link
            key={sensor.id}
            href={`/portal/sensors/${sensor.id}`}
            className="rounded-2xl border border-navy/8 bg-white p-4 shadow-sm transition hover:border-teal/40"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-sm font-semibold text-navy">{sensor.id}</p>
              <StatusChip status={sensor.status} />
            </div>
            <p className="mt-2 text-sm text-muted">
              {sensor.location} · {sensor.detail}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
