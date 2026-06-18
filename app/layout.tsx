import type { Metadata } from "next";
import { BloomNav } from "./components/BloomNav";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollReveal } from "./components/ScrollReveal";
import "./globals.css";

export const metadata: Metadata = {
  title: "pr15ha | portfolio",
  description:
    "A personal portfolio for pr15ha, built around a watercolor peony motif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="sr-only" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" className="site-main">
          {children}
        </main>
        <Footer />
        <BloomNav />
        <CustomCursor />
        <ScrollReveal />
      </body>
    </html>
  );
}
