import { fetchFileContent } from '@/lib/github';
import { parseRoadmap } from '@/lib/parseRoadmap';
import { parseDSA } from '@/lib/parseDSA';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import WeekCard from '@/components/WeekCard';
import ChecklistItem from '@/components/ChecklistItem';

export const revalidate = 60;

export default async function DashboardPage() {
  try {
    const [roadmapMd, dsaMd] = await Promise.all([
      fetchFileContent('notes/roadmap.md'),
      fetchFileContent('notes/dsa.md'),
    ]);
    const rd = parseRoadmap(roadmapMd);
    const dsa = parseDSA(dsaMd);
    const cw = rd.currentWeek;
    const pending = cw?.tracks.flatMap(t=>t.tasks).filter(t=>!t.completed).slice(0,8)??[];
    const doneWeeks = rd.weeks.filter(w=>w.completedTasks>0&&w.completedTasks===w.totalTasks).length;
    const phaseColors:{[k:number]:'blue'|'green'|'purple'|'orange'} = {1:'blue',2:'green',3:'purple',4:'orange'};
    const phaseNames:{[k:number]:string} = {1:'Phase 1: Core',2:'Phase 2: Full-Stack',3:'Phase 3: AI/ML',4:'Phase 4: Data Eng'};

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">📊 Dashboard</h1>
          <p className="text-slate-500 mt-1">@jayanta411 · World-class developer curriculum · 2026</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <StatCard title="Overall Progress" value={`${rd.completionPercent}%`} subtitle={`${rd.completedTasks}/${rd.totalTasks} tasks`} icon="📈" color="green"/>
          <StatCard title="DSA Problems" value={`${dsa.total}/150`} subtitle={`${dsa.easy}E · ${dsa.medium}M · ${dsa.hard}H`} icon="🧮" color="blue"/>
          <StatCard title="Current Week" value={cw?.title??'—'} subtitle={cw?.dateRange??''} icon="📅" color="yellow"/>
          <StatCard title="Weeks Complete" value={doneWeeks} subtitle={`of ${rd.weeks.length} weeks`} icon="✅" color="purple"/>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-5">📈 Curriculum Progress</h2>
          <ProgressBar value={rd.completionPercent} label="All phases" sublabel={`${rd.completedTasks}/${rd.totalTasks}`} size="lg"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[1,2,3,4].map(p=>(
              <ProgressBar key={p} value={rd.phaseStats[p].percent} label={phaseNames[p]}
                sublabel={`${rd.phaseStats[p].completed}/${rd.phaseStats[p].total}`} color={phaseColors[p]}/>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-3">📅 This Week</h2>
            {cw ? (
              <>
                <p className="text-sm text-slate-500">{cw.dateRange}</p>
                {cw.theme && <p className="text-xs text-slate-400 mt-1 mb-4 italic">{cw.theme}</p>}
                <ProgressBar value={cw.completionPercent} label="Progress" sublabel={`${cw.completedTasks}/${cw.totalTasks}`}/>
              </>
            ) : <p className="text-slate-400">No active week.</p>}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">🎯 Pending Tasks</h2>
            {pending.length===0
              ? <div className="text-center py-6"><div className="text-4xl mb-2">🎉</div><p className="text-green-600 font-semibold">All done this week!</p></div>
              : <ul className="space-y-0.5">{pending.map((t,i)=><ChecklistItem key={i} text={t.text} completed={false}/>)}</ul>
            }
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">🗓️ Recent Weeks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {rd.weeks.slice(0,6).map(w=>(
              <WeekCard key={w.id} title={w.title} dateRange={w.dateRange} theme={w.theme}
                phase={w.phase} completedTasks={w.completedTasks} totalTasks={w.totalTasks}
                isCurrent={cw?.id===w.id} isComplete={w.completedTasks>0&&w.completedTasks===w.totalTasks}/>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-10 text-center">🔄 Auto-refreshes every 60s · Edit notes/roadmap.md checkboxes → push → see live updates</p>
      </div>
    );
  } catch (err) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Could not load data</h2>
        <pre className="text-xs text-red-500 bg-red-50 p-4 rounded-lg mt-4 max-w-xl overflow-auto">{String(err)}</pre>
      </div>
    );
  }
}