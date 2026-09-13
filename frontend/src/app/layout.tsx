import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "LUMEA — Skincare made simple",
  description:
    "Thoughtful formulas for healthy, glowing skin. Discover LUMEA's 4 simple steps to healthier-looking skin.",
  openGraph: {
    title: "LUMEA — Skincare made simple",
    description:
      "Thoughtful formulas for healthy, glowing skin. Discover LUMEA's 4 simple steps to healthier-looking skin.",
    images: ["/images/hero/woman.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
