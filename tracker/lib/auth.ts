import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

// Comma-separated list of GitHub usernames allowed to make edits.
// Defaults to the repo owner. Set ALLOWED_GITHUB_LOGINS in env to override.
const ALLOWED = (process.env.ALLOWED_GITHUB_LOGINS ?? 'jayanta411')
  .split(',')
  .map(s => s.trim().toLowerCase())
  .filter(Boolean);

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // Only request the minimum scopes we need (read user profile).
      // Writes go through the service GITHUB_TOKEN, not the user token.
      authorization: { params: { scope: 'read:user' } },
    }),
  ],

  callbacks: {
    // Block sign-in if the GitHub username is not in the allow-list.
    async signIn({ profile }) {
      const login = (profile as { login?: string }).login?.toLowerCase() ?? '';
      return ALLOWED.includes(login);
    },

    // Attach the GitHub username to the JWT so we can read it later.
    async jwt({ token, profile }) {
      if (profile) {
        token.githubLogin = (profile as { login?: string }).login ?? '';
      }
      return token;
    },

    // Expose the GitHub username on the session object.
    async session({ session, token }) {
      (session as { githubLogin?: string }).githubLogin =
        (token.githubLogin as string) ?? '';
      return session;
    },
  },

  pages: {
    // Use our custom sign-in page (shows a single "Sign in with GitHub" button).
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  // In production NEXTAUTH_SECRET must be set in env vars.
  secret: process.env.NEXTAUTH_SECRET,
};
