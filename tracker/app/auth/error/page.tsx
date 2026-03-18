'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const MESSAGES: Record<string, string> = {
  AccessDenied: 'Access denied — your GitHub account is not authorised to edit this tracker.',
  Configuration: 'Server configuration error. Check GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.',
  Verification: 'Sign-in link expired. Please try again.',
  Default: 'An error occurred during sign-in. Please try again.',
};

function ErrorContent() {
  const params = useSearchParams();
  const error = params.get('error') ?? 'Default';
  const message = MESSAGES[error] ?? MESSAGES.Default;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-red-900/50 rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl">
        <div className="text-5xl mb-4">⛔</div>
        <h1 className="text-xl font-bold text-white mb-3">Sign-in Error</h1>
        <p className="text-sm text-slate-400 mb-8">{message}</p>
        <Link href="/auth/signin"
          className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm hover:bg-slate-700 transition-colors">
          ← Try again
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}
