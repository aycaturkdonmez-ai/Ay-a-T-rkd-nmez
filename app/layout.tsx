import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Atatürk ile Tarih Yolculuğu',
  description: 'Kurtuluş Savaşı dönemini Mustafa Kemal Atatürk\'ten dinleyin.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#0a0a0c] text-slate-200 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
