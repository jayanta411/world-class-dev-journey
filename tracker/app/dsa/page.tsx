import { fetchFileContent } from '@/lib/github';
import { parseDSA, DSA_PATTERN_ORDER, DSA_PATTERN_TARGETS } from '@/lib/parseDSA';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
export const revalidate = 60;

export default async function DSAPage() {
  try {
    const md = await fetchFileContent('notes/dsa.md');
    const dsa = parseDSA(md);
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-50">🧮 DSA Tracker</h1>
          <p className="text-slate-400 mt-2 text-sm">Pattern-based progression to 150 problems</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Solved" value={dsa.total} subtitle={`/ ${dsa.targetTotal} target`} icon="✅" color="green"/>
          <StatCard title="Easy" value={dsa.easy} icon="🟢" color="green"/>
          <StatCard title="Medium" value={dsa.medium} icon="🟡" color="yellow"/>
          <StatCard title="Hard" value={dsa.hard} icon="🔴" color="red"/>
        </div>
        <div className="panel p-6 mb-8">
          <ProgressBar value={dsa.completionPercent} label={`${dsa.total} / ${dsa.targetTotal} problems solved`} size="lg"/>
        </div>
        <div className="panel p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-50 mb-5">📊 By Pattern</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {DSA_PATTERN_ORDER.map(p=>{
              const solved = dsa.byPattern[p]||0;
              const target = DSA_PATTERN_TARGETS[p]||5;
              const pct = Math.min(Math.round((solved/target)*100),100);
              return <ProgressBar key={p} value={pct} label={p} sublabel={`${solved}/${target}`} color={pct===100?'green':'blue'} size="sm"/>;
            })}
          </div>
        </div>
        <div className="panel p-6">
          <h2 className="text-lg font-bold text-slate-50 mb-4">📋 Problem Log <span className="text-sm font-normal text-slate-500">({dsa.total})</span></h2>
          {dsa.problems.length===0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🧮</div>
              <p className="text-slate-400">No problems logged yet. Add to <code className="bg-slate-900/80 border border-slate-800 px-1.5 py-0.5 rounded text-xs">notes/dsa.md</code></p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-800 text-left">
                  <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-[0.28em]">#</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-[0.28em]">Problem</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-[0.28em]">Links</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-[0.28em]">Pattern</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-[0.28em]">Difficulty</th>
                  <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-[0.28em]">Date</th>
                </tr></thead>
                <tbody>
                  {dsa.problems.map((p,i)=>(
                    <tr key={i} className="border-b border-slate-900 hover:bg-slate-800/40">
                      <td className="py-2.5 pr-4 text-slate-500 font-mono text-xs">{p.number}</td>
                      <td className="py-2.5 pr-4">
                        <span className="font-medium text-slate-100">{p.problem}</span>
                      </td>
                      <td className="py-2.5 pr-4">
                        <div className="flex gap-1.5">
                          {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5 rounded text-xs font-semibold bg-orange-500/15 text-orange-200 border border-orange-300/20 hover:bg-orange-500/25">LC</a>}
                          {p.ncLink && <a href={p.ncLink} target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/15 text-emerald-200 border border-emerald-300/20 hover:bg-emerald-500/25">NC</a>}
                        </div>
                      </td>
                      <td className="py-2.5 pr-4 text-slate-400">{p.pattern}</td>
                      <td className="py-2.5 pr-4">
                        {p.difficulty && <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${p.difficulty==='Easy'?'bg-emerald-500/15 text-emerald-200 border-emerald-300/20':p.difficulty==='Medium'?'bg-amber-500/15 text-amber-100 border-amber-300/20':'bg-rose-500/15 text-rose-200 border-rose-300/20'}`}>{p.difficulty}</span>}
                      </td>
                      <td className="py-2.5 text-slate-500 text-xs">{p.date||'—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  } catch (err) {
    return <div className="text-rose-200 bg-rose-500/10 border border-rose-400/20 p-4 rounded-2xl">Error: {String(err)}</div>;
  }
}