import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Morni Escape | Plan Your Perfect Morni Hills Trip",
  description:
    "Discover scenic places, luxury & budget stays, local dhaba foods, camping sites, trekking adventures, and cab services in Morni Hills, Haryana.",
  keywords: [
    "Morni Hills",
    "Tikkar Taal",
    "Morni Fort",
    "Morni Escape",
    "Panchkula tourism",
    "Morni Hills camping",
    "Chandigarh weekend getaway",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-600 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}

