'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5">
        <div className="w-7 h-7 rounded-full bg-slate-800 animate-pulse" />
        <div className="h-3 w-20 bg-slate-800 rounded animate-pulse" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? 'avatar'}
            width={28}
            height={28}
            className="rounded-full ring-2 ring-cyan-500/40"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-200 truncate">
            {(session as { githubLogin?: string }).githubLogin ?? session.user?.name}
          </p>
          <p className="text-[10px] text-slate-500">Signed in</p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          title="Sign out"
          className="text-slate-500 hover:text-rose-300 transition-colors p-1 rounded"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn('github', { callbackUrl: '/roadmap' })}
      className="w-full flex items-center justify-center gap-2 border border-sky-400/15 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-sky-500/20 hover:to-emerald-500/10 text-slate-200 hover:text-white text-xs font-medium py-2.5 px-3 rounded-2xl transition-colors"
    >
      {/* GitHub mark */}
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
      Sign in to edit
    </button>
  );
}
