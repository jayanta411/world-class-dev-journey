'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButton from './AuthButton';
import { IconHome, IconMapPin, IconBrain, IconBook } from '@/lib/icons';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: string; color?: string; className?: string }>;
}

const nav: NavItem[] = [
  { href: '/',         label: 'Dashboard',   icon: IconHome },
  { href: '/roadmap',  label: 'Roadmap',     icon: IconMapPin },
  { href: '/dsa',      label: 'DSA Tracker', icon: IconBrain },
  { href: '/log',      label: 'Weekly Log',  icon: IconBook },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = nav.map(item => {
    const Icon = item.icon;
    const active = pathname === item.href;
    return (
      <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all border border-transparent
          ${ active
            ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/20 border-sky-300/10'
            : 'text-slate-400 hover:bg-slate-900 hover:border-slate-800 hover:text-white'}`}>
        <Icon size="sm" className="flex-shrink-0" />
        <span>{item.label}</span>
      </Link>
    );
  });

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────────────── */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-slate-800/80 bg-slate-950/95 text-white backdrop-blur-xl">
        <div className="h-0.5 bg-gradient-to-r from-sky-300 via-sky-500 to-emerald-400 flex-shrink-0" />
        <div className="px-6 py-7">
          <div className="text-3xl mb-2">🚀</div>
          <h1 className="text-lg font-bold text-sky-200 tracking-[0.18em] uppercase leading-tight">World-Class Dev</h1>
          <p className="text-xs text-slate-500 mt-1">@jayanta411 · journey tracker</p>
        </div>
        <nav className="flex flex-col gap-1 px-4 flex-1">
          {navLinks}
        </nav>
        <div className="flex flex-col gap-1 mt-auto pt-5 border-t border-slate-800 px-6 pb-6">
          <div className="mb-4"><AuthButton /></div>
          <p className="text-xs text-slate-600">Auto-refreshes every 60s</p>
          <a href="https://github.com/jayanta411/world-class-dev-journey"
            target="_blank" rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-sky-300 transition-colors">
            View on GitHub ↗
          </a>
        </div>
      </aside>

      {/* ── Mobile top bar ───────────────────────────────────────── */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80">
        <div className="h-0.5 bg-gradient-to-r from-sky-300 via-sky-500 to-emerald-400" />
        <div className="flex items-center gap-3 px-4 h-14">
          {/* Hamburger on the LEFT */}
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="flex flex-col justify-center items-start w-9 h-9 gap-[5px] rounded-xl hover:bg-slate-800 transition-colors flex-shrink-0">
            <span className="block w-5 h-0.5 bg-slate-300 rounded-full" />
            <span className="block w-5 h-0.5 bg-slate-300 rounded-full" />
            <span className="block w-3.5 h-0.5 bg-slate-300 rounded-full" />
          </button>
          {/* Logo + title */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <div>
              <p className="text-sm font-bold text-sky-200 tracking-wide leading-none">World-Class Dev</p>
              <p className="text-[10px] text-slate-500 mt-0.5">@jayanta411</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer overlay (always mounted for animation) ─── */}
      <div
        className={`lg:hidden fixed inset-0 z-50 flex transition-all duration-300 ${open ? 'visible' : 'invisible pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        {/* Drawer slides in from left */}
        <aside className={`relative flex flex-col w-72 max-w-[85vw] bg-slate-950 border-r border-slate-800 shadow-2xl transition-transform duration-300 ease-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-0.5 bg-gradient-to-r from-sky-300 via-sky-500 to-emerald-400 flex-shrink-0" />
          <div className="flex items-center justify-between px-5 py-5">
            <div>
              <div className="text-2xl mb-1">🚀</div>
              <h1 className="text-base font-bold text-sky-200 tracking-[0.18em] uppercase leading-tight">World-Class Dev</h1>
              <p className="text-xs text-slate-500 mt-0.5">@jayanta411 · journey tracker</p>
            </div>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors self-start">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 flex-1">
              {navLinks}
            </nav>
            <div className="mt-auto pt-5 border-t border-slate-800 px-5 pb-6">
              <div className="mb-4"><AuthButton /></div>
              <a href="https://github.com/jayanta411/world-class-dev-journey"
                target="_blank" rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-sky-300 transition-colors">
                View on GitHub ↗
              </a>
            </div>
          </aside>
        </div>
    </>
  );
}
