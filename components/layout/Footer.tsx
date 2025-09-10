export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} SellerRescueHub. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="mailto:hello@sellerrescuehub.com">Contact</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}
