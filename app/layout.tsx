import "./global.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { DM_Sans, Roboto_Slab } from "next/font/google";
import { Sidebar } from "../components";
import { Analytics } from "@vercel/analytics/react";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

const dmSans = DM_Sans({
  weight: ["500", "700", "400"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itunulamina.com"),
  title: {
    default: "Itunu Lamina",
    template: "%s | Itunu Lamina",
  },
  description: "Developer, writer, and builder.",
  openGraph: {
    title: "Itunu Lamina",
    description: "Developer, writer, and builder.",
    url: "https://itunulamina.com",
    siteName: "Itunu Lamina",
    images: [
      {
        url: "https://itunulamina.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Itunu Lamina",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "min-h-screen bg-white text-black transition-colors dark:bg-[#111010] dark:text-white",
        robotoSlab.variable,
        dmSans.variable
      )}
    >
      <body className="flex h-full max-w-4xl flex-col px-4 pt-8 text-neutral-800 antialiased transition-colors dark:text-neutral-200 md:flex-row md:pt-20 lg:mx-auto lg:pt-32">
        <div className="fixed left-0 top-0 -z-10 h-screen w-screen bg-gradient-to-b from-white from-0% via-70% to-slate-200 to-100% transition-colors dark:from-[#111010]/90 dark:to-black " />
        <Sidebar />
        <main className="flex min-w-0 flex-auto flex-col px-2 pt-6 md:px-0 md:pt-0">
          {children}
          <Analytics />
          <footer className="pb-8 pt-20 text-center text-sm font-medium">
            {" "}
            &copy; {new Date().getFullYear()}
          </footer>
        </main>
      </body>
    </html>
  );
}
