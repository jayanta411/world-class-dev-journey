'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/',         label: 'Dashboard',   icon: '📊' },
  { href: '/roadmap',  label: 'Roadmap',     icon: '🗺️' },
  { href: '/dsa',      label: 'DSA Tracker', icon: '🧮' },
  { href: '/log',      label: 'Weekly Log',  icon: '📓' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 min-h-screen bg-slate-900 text-white flex flex-col py-8 px-4 fixed left-0 top-0 z-50">
      <div className="mb-8 px-2">
        <div className="text-2xl mb-1">🚀</div>
        <h1 className="text-base font-bold text-green-400">Dev Journey</h1>
        <p className="text-xs text-slate-400 mt-0.5">@jayanta411</p>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {nav.map(item => (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
              ${pathname === item.href ? 'bg-green-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <span>{item.icon}</span><span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-slate-700 px-2">
        <p className="text-xs text-slate-500">🔄 Refreshes every 60s</p>
        <a href="https://github.com/jayanta411/world-class-dev-journey"
          target="_blank" rel="noopener noreferrer"
          className="text-xs text-slate-500 hover:text-slate-300 mt-1 block">
          View on GitHub ↗
        </a>
      </div>
    </aside>
  );
}