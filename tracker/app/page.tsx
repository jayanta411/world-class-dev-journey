import { fetchFileContent } from '@/lib/github';
import { SubjectsData, computeStats } from '@/lib/subjects';
import { parseDSA } from '@/lib/parseDSA';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import WeekCard from '@/components/WeekCard';
import ChecklistItem from '@/components/ChecklistItem';

export const dynamic = 'force-dynamic';

const phaseColors: {[k:number]:'blue'|'green'|'purple'|'orange'} = {1:'blue',2:'green',3:'purple',4:'orange'};
const phaseNames: {[k:number]:string} = {1:'Phase 1: Core',2:'Phase 2: Full-Stack',3:'Phase 3: AI/ML',4:'Phase 4: Data Eng'};
const phaseBadge: {[k:number]:string} = {
  1:'bg-blue-100 text-blue-700', 2:'bg-green-100 text-green-700',
  3:'bg-purple-100 text-purple-700', 4:'bg-orange-100 text-orange-700',
};

export default async function DashboardPage() {
  try {
    const [subjectsRaw, dsaMd] = await Promise.all([
      fetchFileContent('notes/subjects.json'),
      fetchFileContent('notes/dsa.md'),
    ]);
    const subjectsData: SubjectsData = JSON.parse(subjectsRaw);
    const rd = computeStats(subjectsData);
    const dsa = parseDSA(dsaMd);
    const cw = rd.currentWeek;
    const pending = cw
      ? cw.tracks.flatMap(t => t.tasks).filter(t => !t.completed).slice(0, 8)
      : [];
    const doneWeeks = subjectsData.weeks.filter(w => rd.weekStats[w.id]?.completed > 0 && rd.weekStats[w.id]?.completed === rd.weekStats[w.id]?.total).length;
    const currentPhase = cw?.phase ?? 1;

    const journeyStartStr = subjectsData.weeks[0]?.dateRange?.split('→')[0]?.trim();
    const journeyStart = journeyStartStr ? new Date(journeyStartStr) : null;
    const daysElapsed = journeyStart
      ? Math.max(1, Math.floor((Date.now() - journeyStart.getTime()) / 86_400_000) + 1)
      : null;

    return (
      <div className="fade-up">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Progress Command Center</h1>
            <p className="text-slate-500 mt-2 text-sm flex items-center gap-2 flex-wrap">
              @jayanta411 · World-class developer curriculum · 2026
              {daysElapsed && (
                <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold">Day {daysElapsed}</span>
              )}
            </p>
          </div>
          <span className={`hidden sm:inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full self-start mt-1 ${phaseBadge[currentPhase]}`}>
            {phaseNames[currentPhase]}
          </span>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <StatCard title="Overall Progress" value={`${rd.completionPercent}%`} subtitle={`${rd.completedTasks} / ${rd.totalTasks} tasks`} icon="📈" color="green"/>
          <StatCard title="DSA Problems" value={`${dsa.total} / 150`} subtitle={`${dsa.easy}E · ${dsa.medium}M · ${dsa.hard}H`} icon="🧮" color="blue"/>
          <StatCard title="Current Week" value={cw ? `Week ${cw.number}` : '—'} subtitle={cw?.dateRange ?? ''} icon="📅" color="yellow"/>
          <StatCard title="Weeks Complete" value={doneWeeks} subtitle={`of ${subjectsData.weeks.length} weeks`} icon="✅" color="purple"/>
        </div>

        {/* Curriculum Progress */}
        <div className="panel p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-5">Curriculum Progress</h2>
          <ProgressBar value={rd.completionPercent} label="All phases" sublabel={`${rd.completedTasks} / ${rd.totalTasks}`} size="lg"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[1,2,3,4].map(p => (
              <ProgressBar key={p}
                value={rd.phaseStats[p].percent}
                label={phaseNames[p]}
                sublabel={`${rd.phaseStats[p].completed} / ${rd.phaseStats[p].total}`}
                color={phaseColors[p]}
              />
            ))}
          </div>
        </div>

        {/* This Week + Pending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="panel p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">This Week</h2>
            {cw ? (
              <>
                <p className="text-sm text-slate-500">{cw.dateRange}</p>
                {cw.theme && <p className="text-xs text-slate-400 mt-1 mb-4 italic">{cw.theme}</p>}
                <ProgressBar value={rd.weekStats[cw.id]?.percent ?? 0} label="Week progress" sublabel={`${rd.weekStats[cw.id]?.completed ?? 0} / ${rd.weekStats[cw.id]?.total ?? 0} tasks`}/>
                {rd.weekStats[cw.id]?.percent === 100 && (
                  <p className="text-xs text-emerald-600 font-semibold mt-3">✓ Week complete — push on to next!</p>
                )}
              </>
            ) : <p className="text-slate-400 text-sm">No active week found.</p>}
          </div>

          <div className="panel p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Pending Tasks</h2>
              {pending.length > 0 && (
                <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">{pending.length}</span>
              )}
            </div>
            {pending.length === 0
              ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-emerald-600 font-semibold text-sm">All done this week!</p>
                </div>
              )
              : <ul className="space-y-0.5">{pending.map((t, i) => <ChecklistItem key={i} text={t.text} completed={false}/>)}</ul>
            }
          </div>
        </div>

        {/* Recent Weeks */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Weeks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {subjectsData.weeks.slice(0, 6).map(w => {
              const ws = rd.weekStats[w.id] ?? { completed: 0, total: 0, percent: 0 };
              return (
                <WeekCard key={w.id} title={`Week ${w.number}`} dateRange={w.dateRange} theme={w.theme}
                  phase={w.phase} completedTasks={ws.completed} totalTasks={ws.total}
                  isCurrent={cw?.id === w.id} isComplete={ws.completed > 0 && ws.completed === ws.total}
                />
              );
            })}
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-10 text-center">
          Data source: <code className="bg-slate-100 px-1 rounded">notes/subjects.json</code> · Edit via Roadmap page or directly on GitHub
        </p>
      </div>
    );
  } catch (err) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Could not load data</h2>
        <p className="text-sm text-slate-500 mb-4">Make sure <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">GITHUB_TOKEN</code> is set in your Vercel environment variables.</p>
        <pre className="text-xs text-red-500 bg-red-50 p-4 rounded-lg mt-2 max-w-xl overflow-auto text-left">{String(err)}</pre>
      </div>
    );
  }
}