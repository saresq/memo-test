import type {Metadata} from "next";

import Link from "next/link"
import Image from "next/image";

import "./globals.css";

export const metadata: Metadata = {
  title: "Memotest",
  description: "Made by Saresq 2024",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="dark geometric-background m-auto grid min-h-screen grid-rows-[auto,1fr,auto] font-sans antialiased">
        <header className="text-3xl font-mono font-bold leading-[4rem] flex items-center justify-center glass-red">
          <Image className="header-icon mr-4" src="/favicon.ico" width={32} height={32} alt="icon"/>
          <Link href="/">Memotest</Link>
        </header>
        <main className="py-8 container">{children}</main>
        <footer className="text-center leading-[4rem] opacity-70 font-mono">
          © {new Date().getFullYear()} saresq
        </footer>
      </body>
    </html>
  );
}
