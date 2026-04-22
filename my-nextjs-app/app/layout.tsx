import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "My Next.js Lab App",
  description: "BSSE Lab 08 - Next.js Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        
        {/* Global Header - har page pe dikhega */}
        <Header />

        {/* Main Content - page ka content yahan aata hai */}
        <main className="flex-grow container mx-auto p-6">
          {children}
        </main>

        {/* Global Footer - har page pe dikhega */}
        <Footer />
        
      </body>
    </html>
  );
}