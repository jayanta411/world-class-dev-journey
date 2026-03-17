import { readFile } from 'node:fs/promises';
import path from 'node:path';

const OWNER = process.env.GITHUB_OWNER || 'jayanta411';
const REPO = process.env.GITHUB_REPO || 'world-class-dev-journey';
const TOKEN = process.env.GITHUB_TOKEN;

async function tryReadLocal(pathInRepo: string): Promise<string | null> {
  try {
    const localPath = path.join(process.cwd(), '..', pathInRepo);
    return await readFile(localPath, 'utf-8');
  } catch {
    return null;
  }
}

export async function fetchFileContent(path: string): Promise<string> {
  const normalizedPath = path.replace(/^\/+/, '');

  // Prefer local files when available (faster, no API/rate-limit dependency).
  const local = await tryReadLocal(normalizedPath);
  if (local !== null) return local;

  const encodedPath = normalizedPath
    .split('/')
    .map(p => encodeURIComponent(p))
    .join('/');
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodedPath}`;
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

  const res = await fetch(url, { headers, next: { revalidate: 60 } });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error for "${normalizedPath}": ${res.status} ${res.statusText} - ${body}`);
  }

  const data = await res.json();
  return Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');
}