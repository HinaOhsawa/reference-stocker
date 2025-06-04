import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reference Stocker",
  description: "学習に使った参考記事や動画のリンクを保存・共有するためのサイト",
  icons: {
    icon: "/R-logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Header />

          <main className="mx-auto max-w-5xl py-8 px-4 sm:px-6">
            {children}
          </main>
          <Toaster richColors closeButton position="top-center" />
        </SessionProvider>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
