import { SampleTag } from "@/components/SampleTag";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-teal uppercase">
          About this portal
        </p>
        <h1 className="mt-1 font-serif text-3xl text-navy">How the owner view works</h1>
      </div>

      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-serif text-xl text-navy">Sensors in the wall</h2>
          <SampleTag />
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          James River installs small sensors with the weather-resistive barrier
          and air-barrier work. On this last-wing pilot they sit at the details
          that usually leak first: window heads, the base of the wall,
          penetrations, and the roof-to-wall line. They report temperature,
          relative humidity, and moisture.
        </p>
      </section>

      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl text-navy">JRE hosts the portal and the data</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          Readings come into a James River gateway, then into this James River
          website. Owners and the GC stay on a JRE-branded page. There is no
          Sensocon, OmniSense, or Detec login. Hardware may be sourced from a
          manufacturer; the experience and the data stay with James River.
        </p>
      </section>

      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl text-navy">What this read-only view includes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
          <li>Live-looking pins, sample trends, and alert history for Virginia Home 725-011.</li>
          <li>Status chips: OK, Watch, and Alert.</li>
          <li>Notice when JRE has been notified. The JRE desk owns triage.</li>
          <li>No “Dispatch repair” control. That stays with James River operations.</li>
        </ul>
      </section>

      <p className="rounded-2xl bg-gold-soft px-5 py-4 text-sm text-navy">
        CONCEPT / SAMPLE DATA. Numbers on these screens are illustrative for the
        last-wing pilot conversation. They are not a bid, a guarantee, or live
        field readings.
      </p>
    </div>
  );
}
