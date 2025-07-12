import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/components/DynamicProvider";
import Footer from "@/components/Footer";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The 12th Door",
  description: "The 12th Door",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alexandria.variable} antialiased bg-background mx-auto`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
