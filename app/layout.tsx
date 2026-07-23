import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Potato Tarot Reading — Pembacaan Tarot Pribadi",
  description:
    "Potato Tarot Reading adalah pengalaman pembacaan tarot pribadi — modern, minimalis, dan rahasia. Papan informasi realtime untuk antrean dan status hari ini.",
  themeColor: "#090909",
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='11' fill='%23090909'/%3E%3Ccircle cx='12' cy='12' r='9' fill='none' stroke='%23D4AF37' stroke-width='1.1'/%3E%3Ccircle cx='14.8' cy='9' r='2.1' fill='%23D4AF37'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">
        <div className="noise-layer" aria-hidden />
        {children}
      </body>
    </html>
  );
}
