import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: '🚀 Dev Journey Tracker — @jayanta411',
  description: 'World-class developer curriculum progress tracker',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className}`}>
        <div className="min-h-screen">
          <Sidebar />
          <main className="lg:ml-72 pt-28 lg:pt-10 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}