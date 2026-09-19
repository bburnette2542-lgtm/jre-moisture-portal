import { ConceptBanner } from "@/components/ConceptBanner";
import { EnterRoleButton } from "@/components/EnterRoleButton";
import { JreLogo } from "@/components/JreLogo";
import { SampleTag } from "@/components/SampleTag";
import { JOB } from "@/lib/sample-data";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col login-haze">
      <ConceptBanner />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-10 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="text-white">
            <JreLogo light />
            <p className="mt-8 inline-flex rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
              JRE-owned moisture monitor
            </p>
            <h1 className="mt-5 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
              James River Exteriors
              <span className="block text-gold">Owner portal + ops desk</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/75">
              Sensors sit in the wall. A James River server stores the SAMPLE
              readings. Owners stay read-only. The ops desk owns triage and
              dispatch. No vendor login.
            </p>
            <dl className="mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <dt className="text-[11px] tracking-[0.14em] text-gold uppercase">Job</dt>
                <dd className="mt-1 font-medium text-white">{JOB.fullTitle}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <dt className="text-[11px] tracking-[0.14em] text-gold uppercase">Ingest</dt>
                <dd className="mt-1 font-medium text-white">SAMPLE adapter · JRE store</dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-teal uppercase">
                    Owner / GC
                  </p>
                  <h2 className="mt-1 font-serif text-2xl text-navy">Read-only sample portal</h2>
                </div>
                <SampleTag />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">
                Pins, trends, and “JRE notified.” No dispatch. For Gilbane / owner review.
              </p>
              <EnterRoleButton
                role="owner"
                href="/portal"
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-navy transition hover:bg-[#d4b56a] disabled:opacity-70"
              >
                Enter owner portal
              </EnterRoleButton>
            </div>

            <div className="rounded-3xl border border-white/10 bg-navy-mid/40 p-6 text-white shadow-2xl ring-1 ring-gold/30 sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
                    Internal · JRE desk
                  </p>
                  <h2 className="mt-1 font-serif text-2xl">Ops desk</h2>
                </div>
                <SampleTag tone="light" />
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Alert queue, who was notified, Ack & triage, and Dispatch repair.
                Owners never see this control.
              </p>
              <EnterRoleButton
                role="ops"
                href="/ops"
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-teal px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f7d7d] disabled:opacity-70"
              >
                Enter ops desk
              </EnterRoleButton>
            </div>
          </div>
        </div>
      </main>
      <footer className="px-4 py-5 text-center text-xs text-white/50">
        James River Exteriors · JRE-owned portal · {JOB.domain} (concept)
      </footer>
    </div>
  );
}
