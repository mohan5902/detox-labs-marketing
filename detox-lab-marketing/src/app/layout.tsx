import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import DetoxAI from "@/components/ai/DetoxAI";
import LoadingScreen from "@/components/layout/LoadingScreen";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://detoxlabs.me"),
  title: {
    default: "Detox Labs — Transforming Ideas Into Digital Solutions",
    template: "%s | Detox Labs",
  },
  description:
    "Detox Labs is an AI Automation & Digital Solutions agency building n8n workflows, professional websites, web apps, and mobile apps for growing brands.",
  keywords: [
    "AI Automation",
    "n8n workflows",
    "website development",
    "web application development",
    "mobile app development",
    "Detox Labs",
    "n8n AI agent",
  ],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Detox Labs — Transforming Ideas Into Digital Solutions",
    description:
      "Automate, Scale & Grow Your Business with N8N AI Automation, Websites, and Mobile Apps.",
    url: "https://detoxlabs.me",
    siteName: "Detox Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Detox Labs — AI Automation & Digital Solutions Agency",
    description:
      "Automate, Scale & Grow Your Business with N8N AI Automation, Websites, and Mobile Apps.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased">
        <LoadingScreen />
        <Navbar />
        <main className="min-h-screen pt-[72px]">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <DetoxAI />
      </body>
    </html>
  );
}

