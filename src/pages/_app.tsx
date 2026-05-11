import type { AppProps } from 'next/app';
import '@/app/globals.css';
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-body antialiased`}>
      <Component {...pageProps} />
      <Toaster />
    </main>
  );
}
