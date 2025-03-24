import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/layout/NavBar";
import { Toaster } from "sonner";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatButton from "@/components/shared/WhatsAppFloatButton";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoyalEcho Academy",
  description:
    "Gain valuable skills while earning through real-world projects. Our flexible schedules allow you to learn at your own pace, fitting education into your busy life.",
  icons: {
    icon: "https://reacademy.vercel.app/icons/logo.jpeg",
  },
  openGraph: {
    images: [
      {
        url: 'https://reacademy.vercel.app/graph.png',
        width: 1200,
        height: 630,
        alt: 'RE Academy thumbnail',
      },
    ],
    type: 'website',
    url: 'https://reacademy.vercel.app/',
    title: 'RoyalEcho Academy',
    description: 'Gain valuable skills while earning through real-world projects. Our flexible schedules allow you to learn at your own pace, fitting education into your busy life.',
  },
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'RoyalEcho Academy',
    description: 'Gain valuable skills while earning through real-world projects. Our flexible schedules allow you to learn at your own pace, fitting education into your busy life.',
    images: ['/graph.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/logo.jpeg" />
      </head>
      <body
        className={cn(
          "relative h-full font-sans antialiased bg-gradient-to-r from-[#eefaed] to-[#f2f7fb]",
          sora.className
        )}
      >
        <main className="relative flex flex-col min-h-screen z-30">
          <NavBar />
          <div className="flex-grow flex-1 mb-6">{children}</div>
          <Footer />
        </main>

        <Toaster position="top-center" richColors />

        <WhatsAppFloatButton phoneNumber="+234 901 418 7438" />
      </body>
    </html>
  );
}
