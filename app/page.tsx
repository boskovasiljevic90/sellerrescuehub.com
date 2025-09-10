import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Rescue. Recover. Grow.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Restora is your AI engine for Amazon seller account recovery and
              performance. Upload PDFs/CSVs/XLSX for instant analysis. No storage.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Button asChild className="px-5 py-6 text-base">
                <Link href="/pricing">
                  Get started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Link className="text-slate-600 hover:text-slate-900" href="#features">
                Learn more
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border p-6 shadow-sm">
            <div className="aspect-video w-full rounded-xl bg-gradient-to-tr from-slate-50 to-slate-100" />
            <p className="mt-3 text-sm text-slate-500">New logo coming soon.</p>
          </div>
        </div>

        <div id="features" className="mt-24 grid gap-6 md:grid-cols-3">
          {["Instant file analysis", "Guided recovery letters", "Traffic & performance insights"].map((f) => (
            <div key={f} className="rounded-2xl border p-6 shadow-sm">
              <h3 className="font-semibold">{f}</h3>
              <p className="mt-2 text-sm text-slate-600">
                Powered by Restora. Multi-language. Privacy-first.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
