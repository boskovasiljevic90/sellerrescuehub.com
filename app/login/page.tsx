export default function LoginPage() {
return (
<div className="mx-auto max-w-xl px-6 py-16">
<h1 className="text-3xl font-bold">Sign in</h1>
<p className="mt-2 text-slate-600">Use your Google account to continue.</
p>
<div className="mt-6">
<a className="inline-flex rounded-2xl border bg-brand px-4 py-2 textwhite" href="/api/auth/signin/google">
Continue with Google
</a>
</div>
</div>
  );
}
