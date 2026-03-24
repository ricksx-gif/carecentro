import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import { Toaster } from "sonner"; // 🔥 IMPORTAR SONNER
import AnimationProvider from "@/components/providers/AnimationProvider";
import PageTransition from "@/components/providers/PageTransition";


// 🔥 FUENTES
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareCentro",
  description: "Sistema de gestión CareCentro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <PageTransition>
        {children}
        </PageTransition>
      

        {/* 🔥 TOASTER GLOBAL (NECESARIO) */}
        <Toaster 
         position="top-right"
         toastOptions={{
         className: `
         bg-black/80 backdrop-blur-xl
         border border-white/10
         text-white
         shadow-xl
         `, 
         }}
         />
      </body>
    </html>
  );
}
