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
          <h1 className="text-3xl font-bold text-slate-800">🧮 DSA Tracker</h1>
          <p className="text-slate-500 mt-1">Pattern-based progression to 150 problems</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Solved" value={dsa.total} subtitle={`/ ${dsa.targetTotal} target`} icon="✅" color="green"/>
          <StatCard title="Easy" value={dsa.easy} icon="🟢" color="green"/>
          <StatCard title="Medium" value={dsa.medium} icon="🟡" color="yellow"/>
          <StatCard title="Hard" value={dsa.hard} icon="🔴" color="red"/>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <ProgressBar value={dsa.completionPercent} label={`${dsa.total} / ${dsa.targetTotal} problems solved`} size="lg"/>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-5">📊 By Pattern</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {DSA_PATTERN_ORDER.map(p=>{
              const solved = dsa.byPattern[p]||0;
              const target = DSA_PATTERN_TARGETS[p]||5;
              const pct = Math.min(Math.round((solved/target)*100),100);
              return <ProgressBar key={p} value={pct} label={p} sublabel={`${solved}/${target}`} color={pct===100?'green':'blue'} size="sm"/>;
            })}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">📋 Problem Log <span className="text-sm font-normal text-slate-400">({dsa.total})</span></h2>
          {dsa.problems.length===0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🧮</div>
              <p className="text-slate-500">No problems logged yet. Add to <code className="bg-slate-100 px-1 rounded">notes/dsa.md</code></p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-100 text-left">
                  <th className="pb-3 pr-4 text-xs font-semibold text-slate-400 uppercase">#</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-slate-400 uppercase">Problem</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-slate-400 uppercase">Pattern</th>
                  <th className="pb-3 pr-4 text-xs font-semibold text-slate-400 uppercase">Difficulty</th>
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase">Date</th>
                </tr></thead>
                <tbody>
                  {dsa.problems.map((p,i)=>(
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-2.5 pr-4 text-slate-400 font-mono text-xs">{p.number}</td>
                      <td className="py-2.5 pr-4">
                        {p.link
                          ? <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">{p.problem}</a>
                          : <span className="font-medium text-slate-700">{p.problem}</span>}
                      </td>
                      <td className="py-2.5 pr-4 text-slate-500">{p.pattern}</td>
                      <td className="py-2.5 pr-4">
                        {p.difficulty && <span className={`px-2 py-0.5 rounded text-xs font-semibold ${p.difficulty==='Easy'?'bg-green-100 text-green-700':p.difficulty==='Medium'?'bg-yellow-100 text-yellow-700':'bg-red-100 text-red-700'}`}>{p.difficulty}</span>}
                      </td>
                      <td className="py-2.5 text-slate-400 text-xs">{p.date||'—'}</td>
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
    return <div className="text-red-500 bg-red-50 p-4 rounded-lg">Error: {String(err)}</div>;
  }
}