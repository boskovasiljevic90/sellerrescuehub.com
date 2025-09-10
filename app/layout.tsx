import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import GA from "@/components/analytics/GA";

export const metadata: Metadata = {
  title: "SellerRescueHub – AI for Amazon Sellers",
  description: "Restora: your AI co-pilot for account recovery, performance, and growth.",
  metadataBase: new URL("https://sellerrescuehub.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col">
        <GA />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
