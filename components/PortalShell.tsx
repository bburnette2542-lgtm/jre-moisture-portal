"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { JOB } from "@/lib/sample-data";
import { ConceptBanner } from "./ConceptBanner";
import { JreLogo } from "./JreLogo";

const NAV = [
  { href: "/portal", label: "Overview" },
  { href: "/portal/map", label: "Wing plan" },
  { href: "/portal/alerts", label: "Alerts" },
  { href: "/portal/about", label: "About" },
];

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-full bg-paper">
      <ConceptBanner compact />
      <header className="sticky top-0 z-20 border-b border-navy/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/portal" className="shrink-0" aria-label="JRE owner portal home">
            <JreLogo compact />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active =
                item.href === "/portal"
                  ? pathname === "/portal"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                    active ? "bg-navy text-white" : "text-navy/75 hover:bg-navy/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <span className="rounded-full border border-gold/40 bg-gold-soft px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-navy uppercase">
              Concept preview
            </span>
            <span className="rounded-full border border-teal/30 bg-teal-soft px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-teal uppercase">
              JRE-owned
            </span>
          </div>
          <button
            type="button"
            className="rounded-lg border border-navy/15 px-3 py-1.5 text-sm text-navy md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Open navigation"
          >
            Menu
          </button>
        </div>
        {open ? (
          <div className="border-t border-navy/10 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-navy hover:bg-navy/5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>
      <div className="border-b border-navy/8 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5">
          <p className="text-sm text-navy">
            <span className="font-semibold">{JOB.fullTitle}</span>
            <span className="text-muted"> · {JOB.phase} · {JOB.ownerView}</span>
          </p>
          <p className="text-xs text-muted">Last updated {JOB.lastUpdated} · SAMPLE</p>
        </div>
      </div>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">{children}</main>
      <footer className="border-t border-navy/10 bg-navy text-gold-soft">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs">
          <p>James River Exteriors · Owner portal · CONCEPT / SAMPLE DATA</p>
          <p>JRE hosts the portal and the data. No vendor login.</p>
        </div>
      </footer>
    </div>
  );
}
