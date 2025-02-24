import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';
import Head from "next/head";

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className='min-h-[calc(100vh_-_280px)]'>
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
