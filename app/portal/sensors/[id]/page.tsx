import Link from "next/link";
import { notFound } from "next/navigation";
import { MetricTile } from "@/components/MetricTile";
import { SampleTag } from "@/components/SampleTag";
import { StatusChip } from "@/components/StatusChip";
import { TrendChart } from "@/components/TrendChart";
import { WingPlan } from "@/components/WingPlan";
import {
  ALERTS,
  getSensor,
  MOISTURE_THRESHOLD,
  SENSORS,
  statusLabel,
} from "@/lib/sample-data";

export function generateStaticParams() {
  return SENSORS.map((sensor) => ({ id: sensor.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sensor = getSensor(id);
  return {
    title: sensor ? `Sensor ${sensor.id}` : "Sensor",
  };
}

export default async function SensorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sensor = getSensor(id);
  if (!sensor) notFound();

  const related = ALERTS.filter((alert) => alert.sensorId === sensor.id);
  const moistureAccent = sensor.status === "alert" ? "#B42318" : "#1A6B6B";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/portal/map" className="text-xs font-semibold text-teal hover:underline">
            ← Wing plan
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="font-serif text-3xl text-navy">
              {sensor.id} · {sensor.detail}
            </h1>
            <StatusChip status={sensor.status} />
            <SampleTag />
          </div>
          <p className="mt-2 text-sm text-muted">
            {sensor.location} · {sensor.zone} · Last reading {sensor.lastReading} · SAMPLE
          </p>
        </div>
        <p className="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal">
          {sensor.status === "ok" ? "Within sample range" : `JRE notified · ${statusLabel(sensor.status)}`}
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricTile label="Temperature" value={sensor.tempF.toFixed(1)} unit="°F" />
        <MetricTile label="Relative humidity" value={`${sensor.rh}`} unit="%" accent="gold" />
        <MetricTile
          label="Moisture"
          value={sensor.moisture.toFixed(1)}
          unit="%"
          hint={`Sample threshold ${MOISTURE_THRESHOLD}%`}
          accent={sensor.status === "alert" ? "alert" : "teal"}
        />
      </section>

      <TrendChart
        values={sensor.moistureTrend}
        threshold={MOISTURE_THRESHOLD}
        label="30-day moisture trend"
        unit="%"
        accent={moistureAccent}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <TrendChart values={sensor.tempTrend} max={90} label="30-day temperature" unit="°F" accent="#0B2C4A" />
        <TrendChart values={sensor.rhTrend} max={80} label="30-day relative humidity" unit="%" accent="#C4A35A" />
      </div>

      <WingPlan selectedId={sensor.id} compact />

      <section className="rounded-2xl border border-navy/8 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-serif text-lg text-navy">Sample events for {sensor.id}</h2>
          <SampleTag />
        </div>
        {related.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No sample alerts on this pin.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {related.map((alert) => (
              <li key={alert.id} className="rounded-xl border border-navy/8 px-4 py-3">
                <p className="text-sm font-medium text-navy">
                  {alert.timeEt} · {alert.type} {alert.value}
                </p>
                <p className="mt-1 text-sm text-muted">{alert.summary}</p>
                <p className="mt-2 text-xs font-semibold text-teal">{alert.deskNote}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
