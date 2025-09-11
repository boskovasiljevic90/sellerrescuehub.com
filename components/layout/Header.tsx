import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
export async function Header() {
const session = await auth();
return (
2
<header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
<div className="mx-auto flex max-w-6xl items-center justify-between px-6
py-3">
<Link href="/" className="flex items-center gap-2">
<Image src="/images/logo-placeholder.svg" width={28} height={28}
alt="Logo" />
<span className="text-lg font-semibold">SellerRescueHub</span>
</Link>
<nav className="flex items-center gap-6 text-sm">
<Link href="/pricing">Pricing</Link>
<Link href="/privacy">Privacy</Link>
<Link href="/terms">Terms</Link>
{session ? (
<div className="flex items-center gap-3">
<span className="text-slate-600 hidden sm:inline">Hi,
{session.user?.name ?? "user"}</span>
<a href="/api/auth/signout" className="font-medium">Logout</a>
</div>
) : (
<a href="/api/auth/signin" className="font-medium">Login</a>
)}
</nav>
</div>
</header>
);
}
