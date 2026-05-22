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
    default: 'Claude Code Personal Docs',
    template: '%s | Claude Code Personal Docs',
  },
  description: 'Claude Code 個人向け 1Day 研修資料（claude-code-personal-docs）',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${zenKaku.variable} ${shippori.variable}`}>
      <body className="bg-orange-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
