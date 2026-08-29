import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReturnOps AI — Autonomous E-Commerce Return & Quality Intelligence Agent",
  description: "ReturnOps doesn't just process returns. It learns from them and prevents the next one. Autonomous multimodal defect triage, return intelligence memory, and live tool execution.",
  keywords: ["AI Agent", "Ecommerce Returns", "Multimodal Vision", "Reverse Logistics", "Catalog Intelligence"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#070a13] text-gray-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
