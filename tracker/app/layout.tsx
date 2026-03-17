import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: '🚀 Dev Journey Tracker — @jayanta411',
  description: 'World-class developer curriculum progress tracker',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="ml-56 flex-1"><div className="max-w-6xl mx-auto p-8">{children}</div></main>
        </div>
      </body>
    </html>
  );
}