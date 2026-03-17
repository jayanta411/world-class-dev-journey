import { fetchFileContent } from '@/lib/github';
export const revalidate = 60;

function parseLog(md: string) {
  const sections: {title:string;content:string}[] = [];
  let cur: {title:string;lines:string[]}|null = null;
  for (const line of md.split('\n')) {
    if (line.startsWith('## ')) {
      if (cur) sections.push({title:cur.title, content:cur.lines.join('\n').trim()});
      cur = { title: line.replace(/^##\s+/,'').trim(), lines: [] };
    } else if (cur) cur.lines.push(line);
  }
  if (cur) sections.push({title:cur.title, content:cur.lines.join('\n').trim()});
  return sections.filter(s => s.title !== '📓 Weekly Progress Log' && s.content.length > 0);
}

export default async function LogPage() {
  try {
    const md = await fetchFileContent('notes/weekly_log.md');
    const sections = parseLog(md);
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">📓 Weekly Log</h1>
          <p className="text-slate-500 mt-1">Progress entries from notes/weekly_log.md</p>
        </div>
        {sections.length===0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 text-center">
            <div className="text-5xl mb-4">📓</div>
            <h2 className="text-lg font-semibold text-slate-700 mb-2">No entries yet</h2>
            <p className="text-slate-400">Start writing in <code className="bg-slate-100 px-1.5 py-0.5 rounded">notes/weekly_log.md</code> and push to GitHub.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((s,i)=>(
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-base font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100">{s.title}</h2>
                <pre className="whitespace-pre-wrap text-sm text-slate-600 leading-relaxed font-sans">{s.content}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (err) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-lg">Error: {String(err)}</div>;
  }
}