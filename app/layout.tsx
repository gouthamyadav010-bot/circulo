import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Circulo | AI-powered C&D Waste Management Platform",
  description: "Transform construction and demolition waste from an environmental liability into a traceable, tradable resource.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-base-bg text-base-fg antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
