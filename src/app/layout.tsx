import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NACTURA | Luxury Spices & Dry Fruits",
  description: "Purity in Every Pinch. Premium luxury spices and dry fruits from the hills of Idukki. 100% natural, handpicked with care.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cinzel.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-brand-bg text-brand-secondary">
        {children}
      </body>
    </html>
  );
}
