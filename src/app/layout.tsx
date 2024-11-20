import Link from "next/link";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HP Maharaja",
  description: "Welcome to HP Maharaja website",
  icons: {
    icon: "/hp-favicon.ico", // Path to your custom favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-50 text-gray-800 font-sans">
        {/* Header */}
        <header className=" text-slate-700">
          <div className="container mx-auto flex justify-between items-center p-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo/HP-Maharaja-Horizontal-Logo.png" // Path to your logo file
                alt="HP Maharaja Logo"
                width={200} // Set the desired width
                height={60} // Set the desired height
              />
              <span className="sr-only">HP Maharaja</span>
            </Link>

            {/* Navigation */}
            <nav className="flex space-x-6">
              <Link
                href="/articles"
                className="text-sm font-medium hover:underline"
              >
                Articles
              </Link>
              <a
                href="tel:+9499039366"
                className="text-sm font-medium hover:underline"
              >
                Contact Me
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4 mt-12">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} HP Maharaja. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
