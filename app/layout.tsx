import './globals.css';
import type { Metadata } from 'next';
import { Zen_Kaku_Gothic_New, Shippori_Mincho } from 'next/font/google';

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const shippori = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Claude Code Enterprise Docs',
    template: '%s | Claude Code Enterprise Docs',
  },
  description: 'Claude Code の法人向けドキュメント・ハンズオン研修資料を集約したリポジトリ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${zenKaku.variable} ${shippori.variable}`}>
      <body className="bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
