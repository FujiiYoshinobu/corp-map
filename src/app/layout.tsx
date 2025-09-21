import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'CorpMap – e-Stat 企業統計ビジュアライゼーション',
  description: '企業統計データを視覚的に探索するデモアプリケーション'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
