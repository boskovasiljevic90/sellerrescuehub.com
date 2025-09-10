export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <p className="mt-2 text-slate-600">Simple plans for every stage.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {["Free", "Monthly", "Yearly"].map((tier, i) => (
          <div key={tier} className="rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{tier}</h3>
            <p className="mt-2 text-sm text-slate-600">Coming soon.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
