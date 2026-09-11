import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { LangProvider } from "@/components/providers/LangProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { az } from "@/locales/az";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: az.meta.title,
  description: az.meta.description,
  icons: { icon: "/logos/asc-transparent.png" },
  openGraph: {
    title: az.meta.title,
    description: az.meta.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="font-sans antialiased selection:bg-brand-cyan selection:text-white">
        <LangProvider>
          <ModalProvider>{children}</ModalProvider>
        </LangProvider>
      </body>
    </html>
  );
}
