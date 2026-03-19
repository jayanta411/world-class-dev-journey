import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OWNER = process.env.GITHUB_OWNER || 'jayanta411';
const REPO = process.env.GITHUB_REPO || 'world-class-dev-journey';
const TOKEN = process.env.GITHUB_TOKEN;

function absLocalPath(pathInRepo: string): string {
  return path.join(process.cwd(), '..', pathInRepo);
}

async function tryReadLocal(pathInRepo: string): Promise<string | null> {
  try {
    return await readFile(absLocalPath(pathInRepo), 'utf-8');
  } catch {
    return null;
  }
}

async function tryWriteLocal(pathInRepo: string, content: string): Promise<void> {
  try {
    await writeFile(absLocalPath(pathInRepo), content, 'utf-8');
  } catch {
    // silently ignore — local write is best-effort for dev sync
  }
}

export async function fetchFileContent(filePath: string): Promise<string> {
  const normalizedPath = filePath.replace(/^\/+/, '');

  // In development, prefer the local file so changes on any branch are reflected immediately.
  if (process.env.NODE_ENV !== 'production') {
    const local = await tryReadLocal(normalizedPath);
    if (local !== null) return local;
  }

  const encodedPath = normalizedPath
    .split('/')
    .map(p => encodeURIComponent(p))
    .join('/');
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodedPath}`;
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

  // No caching — always fetch fresh so reads reflect the latest write.
  const res = await fetch(url, { headers, cache: 'no-store' });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error for "${normalizedPath}": ${res.status} ${res.statusText} - ${body}`);
  }

  const data = await res.json();
  return Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');
}

/**
 * Write (create or update) a file in the GitHub repo via the Contents API.
 * Requires GITHUB_TOKEN with repo write access.
 * Also updates the local file (when it exists) so local dev stays in sync.
 */
export async function writeFileContent(
  filePath: string,
  content: string,
  commitMessage: string,
): Promise<void> {
  if (!TOKEN) throw new Error('GITHUB_TOKEN is required for write operations');

  const normalizedPath = filePath.replace(/^\/+/, '');
  const encodedPath = normalizedPath
    .split('/')
    .map(p => encodeURIComponent(p))
    .join('/');
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodedPath}`;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  };

  // Fetch current SHA (required by GitHub API to update an existing file).
  let sha: string | undefined;
  const getRes = await fetch(url, { headers });
  if (getRes.ok) {
    const existing = await getRes.json();
    sha = existing.sha as string;
  }

  const encodedContent = Buffer.from(content).toString('base64');
  const body: Record<string, string> = { message: commitMessage, content: encodedContent };
  if (sha) body.sha = sha;

  const putRes = await fetch(url, { method: 'PUT', headers, body: JSON.stringify(body) });
  if (!putRes.ok) {
    const errBody = await putRes.text();
    throw new Error(`GitHub write error for "${normalizedPath}": ${putRes.status} - ${errBody}`);
  }

  // Keep local file in sync so local dev reads reflect the change immediately.
  await tryWriteLocal(normalizedPath, content);
}