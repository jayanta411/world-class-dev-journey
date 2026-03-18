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
    <aside className="fixed top-0 left-0 right-0 z-50 bg-slate-950 text-white lg:inset-y-0 lg:right-auto lg:w-72 lg:border-r lg:border-slate-800/80">
      {/* Gradient accent line */}
      <div className="h-0.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400" />

      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-7 lg:block">
        <div className="lg:mb-8">
          <div className="text-xl lg:text-3xl mb-0.5 lg:mb-2">🚀</div>
          <h1 className="text-sm lg:text-lg font-bold text-cyan-300 tracking-wide leading-tight">World-Class Dev</h1>
          <p className="text-[11px] lg:text-xs text-slate-500 mt-0.5">@jayanta411 · journey tracker</p>
        </div>
      </div>

      <nav className="flex gap-1.5 overflow-x-auto px-3 pb-3 lg:px-4 lg:pb-0 lg:flex-col lg:overflow-visible lg:flex-1">
        {nav.map(item => (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap
              ${pathname === item.href
                ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'}`}>
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex flex-col gap-1 mt-auto pt-5 border-t border-slate-800 px-6 pb-6">
        <p className="text-xs text-slate-600">Auto-refreshes every 60s</p>
        <a href="https://github.com/jayanta411/world-class-dev-journey"
          target="_blank" rel="noopener noreferrer"
          className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">
          View on GitHub ↗
        </a>
      </div>
    </aside>
  );
}