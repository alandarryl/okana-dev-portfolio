import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Jonathan | Développeur Full-Stack",
    template: "%s | MonPortfolio" // Permettra d'avoir "Projets | MonPortfolio" automatiquement
  },
  description: "Développeur Full-Stack spécialisé en architectures web modernes avec Next.js et Supabase. Découvrez mes projets et mes compétences.",
  keywords: ["Développeur Web", "Full-Stack", "Next.js", "Supabase", "React", "Portfolio"],
  authors: [{ name: "[Ton Prénom] [Ton Nom]" }],
  creator: "[Ton Prénom]",
  openGraph: {
    title: "MonPortfolio | Développeur Full-Stack",
    description: "Découvrez mes réalisations et mes compétences techniques.",
    url: "https://ton-portfolio.vercel.app", // Tu changeras ça quand tu auras ton lien Vercel
    siteName: "MonPortfolio",
    images: [
      {
        url: "/og-image.png", // Une image de capture de ton site dans ton dossier /public
        width: 1200,
        height: 630,
        alt: "Aperçu de mon portfolio",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MonPortfolio | Développeur Full-Stack",
    description: "Découvrez mes réalisations et mes compétences techniques.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true, // Autorise Google à référencer le site
    follow: true, // Autorise Google à suivre les liens du site
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="w-full flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
