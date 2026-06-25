import Footer from "@/composants/layout/Footer";
import Header from "@/composants/layout/Header";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import type { Metadata } from "next";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Next Formation",
    template: "%s | Next Formation",
  },
  description: "Découvrez et partagez vos avis sur les sites web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className={`flex flex-col min-h-dvh ${inter.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
