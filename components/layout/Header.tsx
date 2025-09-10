import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo-placeholder.svg" width={28} height={28} alt="Logo" />
          <span className="text-lg font-semibold">SellerRescueHub</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/pricing">Pricing</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/login" className="font-medium">Login</Link>
        </nav>
      </div>
    </header>
  );
}
