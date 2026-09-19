import Link from "next/link";
import { MetricTile } from "@/components/MetricTile";
import { SampleTag } from "@/components/SampleTag";
import { StatusChip } from "@/components/StatusChip";
import { WingPlan } from "@/components/WingPlan";
import { ALERTS, JOB, SENSORS, statusCounts } from "@/lib/sample-data";

export const metadata = {
  title: "Job overview",
};

export default function OverviewPage() {
  const counts = statusCounts();
  const openAlert = ALERTS.find((alert) => alert.status === "Open");
  const headline = SENSORS.find((sensor) => sensor.id === "S6")!;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-navy px-5 py-6 text-white sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
              Job overview · sample
            </p>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{JOB.name}</h1>
            <p className="mt-1 text-white/75">
              {JOB.wing} {JOB.phase} · {JOB.ownerView}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusChip status="ok" count={counts.ok} onDark />
            <StatusChip status="watch" count={counts.watch} onDark />
            <StatusChip status="alert" count={counts.alert} onDark />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white/10 px-3 py-1">
            Last updated {JOB.lastUpdated} · SAMPLE
          </span>
          <span className="rounded-full bg-teal px-3 py-1">Gateway {JOB.gateway}</span>
          <span className="rounded-full bg-gold px-3 py-1 text-navy">{JOB.hosting}</span>
        </div>
      </section>

      {openAlert ? (
        <section className="rounded-2xl border border-alert/20 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-alert uppercase">
                Open sample alert
              </p>
              <h2 className="mt-1 font-serif text-2xl text-navy">
                {openAlert.sensorId} · {SENSORS.find((s) => s.id === openAlert.sensorId)?.detail}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{openAlert.summary}</p>
            </div>
            <SampleTag />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <StatusChip status="alert" />
            <span className="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal">
              JRE notified
            </span>
            <span className="text-xs text-muted">
              Owner view — JRE desk owns triage. No dispatch control here.
            </span>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        <MetricTile label="Temperature" value={headline.tempF.toFixed(1)} unit="°F" hint="S6 current sample" />
        <MetricTile label="Relative humidity" value={`${headline.rh}`} unit="%" hint="S6 current sample" accent="gold" />
        <MetricTile
          label="Moisture"
          value={headline.moisture.toFixed(1)}
          unit="%"
          hint="S6 current sample · threshold 16%"
          accent="alert"
        />
      </section>

      <WingPlan compact />

      <section className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-navy/8 px-4 py-3">
          <h2 className="font-serif text-lg text-navy">Sensors S1–S12</h2>
          <SampleTag />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-paper text-[11px] tracking-[0.12em] text-muted uppercase">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Pin</th>
                <th className="px-4 py-2.5 font-semibold">Location</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold">Temp</th>
                <th className="px-4 py-2.5 font-semibold">RH</th>
                <th className="px-4 py-2.5 font-semibold">Moisture</th>
              </tr>
            </thead>
            <tbody>
              {SENSORS.map((sensor) => (
                <tr key={sensor.id} className="border-t border-navy/6">
                  <td className="px-4 py-3">
                    <Link href={`/portal/sensors/${sensor.id}`} className="font-mono font-semibold text-teal hover:underline">
                      {sensor.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-navy">
                    {sensor.location} · {sensor.detail}
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={sensor.status} />
                  </td>
                  <td className="px-4 py-3 text-muted">{sensor.tempF.toFixed(1)} °F</td>
                  <td className="px-4 py-3 text-muted">{sensor.rh}%</td>
                  <td className="px-4 py-3 text-muted">{sensor.moisture.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
