import Footer from "@/composants/layout/Footer";
import Header from "@/composants/layout/Header";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import type { Metadata } from "next";

const inter = Inter({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: {
    default: "offres d'emploi",
    template: "%s | offres d'emploi",
  },
  description: "Découvrez les dernières offres d'emploi et trouvez votre prochaine opportunité professionnelle. Explorez notre sélection d'annonces et postulez dès aujourd'hui.",
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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
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
