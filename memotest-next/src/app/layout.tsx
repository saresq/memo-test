import type {Metadata} from "next";

import Link from "next/link"

import "./globals.css";

export const metadata: Metadata = {
  title: "memotest-next",
  description: "Memo Test UI",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
        <header className="text-xl font-bold leading-[4rem]">
          <Link href="/">memotest-next</Link>
        </header>
        <main className="py-8">{children}</main>
        <footer className="text-center leading-[4rem] opacity-70">
          © {new Date().getFullYear()} memotest-next
        </footer>
      </body>
    </html>
  );
}
