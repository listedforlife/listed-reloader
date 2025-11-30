import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cabin = Cabin({
  subsets: ["latin"],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cabin'
});

export const metadata: Metadata = {
  title: "Listed Productions",
  description: "SF based initiative showcasing cutting-edge EDM and creating unforgettable experiences.",
  keywords: "electronic music, EDM, San Francisco, events, artist agency, house music, techno",
  openGraph: {
    title: "Listed Productions",
    description: "SF based initiative showcasing cutting-edge EDM",
    url: "https://listedproductions.com",
    siteName: "Listed Productions",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cabin.variable} suppressHydrationWarning>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main style={{ flexGrow: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
