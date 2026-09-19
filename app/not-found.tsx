import Link from "next/link";
import { ConceptBanner } from "@/components/ConceptBanner";
import { JreLogo } from "@/components/JreLogo";

export default function NotFound() {
  return (
    <div className="min-h-full bg-paper">
      <ConceptBanner />
      <div className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-16">
        <JreLogo />
        <h1 className="mt-8 font-serif text-3xl text-navy">Page not found</h1>
        <p className="mt-2 text-sm text-muted">
          CONCEPT / SAMPLE DATA — that path is not part of this owner portal mock.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white"
        >
          Back to landing
        </Link>
      </div>
    </div>
  );
}
