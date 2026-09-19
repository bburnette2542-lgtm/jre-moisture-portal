import { SampleTag } from "@/components/SampleTag";

export const metadata = {
  title: "Ops about",
};

export default function OpsAboutPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-teal uppercase">
          Internal desk
        </p>
        <h1 className="mt-1 font-serif text-3xl text-navy">How the ops view works</h1>
      </div>
      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-serif text-xl text-navy">JRE owns the loop</h2>
          <SampleTag />
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          Alerts hit this desk first. Acknowledge, decide, and dispatch a James
          River crew when needed. Owners see the same pins and that JRE was
          notified. They never get a Dispatch repair button.
        </p>
      </section>
      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl text-navy">SAMPLE ingest until vendor quotes land</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          Readings currently come from the JRE sample adapter in
          <code className="mx-1 rounded bg-paper px-1.5 py-0.5 text-xs">server/ingest/</code>
          . OmniSense, Detec, and SMT stubs are ready to implement. The portal
          and store do not change when a vendor pipe is plugged in.
        </p>
      </section>
    </div>
  );
}
