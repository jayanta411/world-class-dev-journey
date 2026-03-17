const OWNER = process.env.GITHUB_OWNER || 'jayanta411';
const REPO  = process.env.GITHUB_REPO  || 'world-class-dev-journey';
const TOKEN = process.env.GITHUB_TOKEN;

export async function fetchFileContent(path: string): Promise<string> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`;
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

  const res = await fetch(url, { headers, next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`GitHub API error for "${path}": ${res.status} ${res.statusText}`);

  const data = await res.json();
  return Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');
}