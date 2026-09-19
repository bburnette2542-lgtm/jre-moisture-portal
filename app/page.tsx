import Link from "next/link";
import { ConceptBanner } from "@/components/ConceptBanner";
import { JreLogo } from "@/components/JreLogo";
import { SampleTag } from "@/components/SampleTag";
import { JOB } from "@/lib/sample-data";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col login-haze">
      <ConceptBanner />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-10 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-white">
            <JreLogo light />
            <p className="mt-8 inline-flex rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
              Owner / GC read-only
            </p>
            <h1 className="mt-5 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
              James River Exteriors
              <span className="block text-gold">Owner Portal</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/75">
              A James River view of last-wing moisture monitoring. Sensors sit in
              the wall. JRE hosts the portal and the data. This demo uses sample
              numbers only.
            </p>
            <dl className="mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <dt className="text-[11px] tracking-[0.14em] text-gold uppercase">Job</dt>
                <dd className="mt-1 font-medium text-white">{JOB.fullTitle}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <dt className="text-[11px] tracking-[0.14em] text-gold uppercase">Role</dt>
                <dd className="mt-1 font-medium text-white">{JOB.ownerView}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-teal uppercase">
                  Sample demo enter
                </p>
                <h2 className="mt-1 font-serif text-2xl text-navy">Continue without a real login</h2>
              </div>
              <SampleTag />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              No password. No vendor account. This button opens the owner
              read-only mock for Virginia Home 725-011.
            </p>
            <label className="mt-6 block text-xs font-semibold tracking-[0.12em] text-navy uppercase">
              Sample contact
              <input
                value="owner.review@sample.jre"
                readOnly
                className="mt-2 w-full rounded-xl border border-navy/10 bg-paper px-3 py-3 text-sm font-medium text-navy outline-none"
              />
            </label>
            <Link
              href="/portal"
              className="mt-5 flex w-full items-center justify-center rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-navy transition hover:bg-[#d4b56a]"
            >
              Enter sample portal
            </Link>
            <p className="mt-4 text-xs leading-5 text-muted">
              CONCEPT / SAMPLE DATA. JRE desk is notified first. This owner view
              does not dispatch repairs.
            </p>
          </div>
        </div>
      </main>
      <footer className="px-4 py-5 text-center text-xs text-white/50">
        James River Exteriors · JRE-owned portal · {JOB.domain} (concept)
      </footer>
    </div>
  );
}
