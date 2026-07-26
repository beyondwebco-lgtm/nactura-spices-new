import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "NACTURA | Luxury Spices & Dry Fruits",
  description: "Purity in Every Pinch. Premium luxury spices and dry fruits from the hills of Idukki. 100% natural, handpicked with care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-brand-bg text-brand-white">
        {children}
      </body>
    </html>
  );
}
