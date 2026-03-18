import { fetchFileContent } from '@/lib/github';
import { parseRoadmap, WeekSection } from '@/lib/parseRoadmap';
import ChecklistItem from '@/components/ChecklistItem';
import ProgressBar from '@/components/ProgressBar';
export const revalidate = 60;

const PI:{[k:number]:{name:string;bar:'blue'|'green'|'purple'|'orange'}} = {
  1:{name:'Phase 1 — Core Sharpening (Weeks 1–4)',bar:'blue'},
  2:{name:'Phase 2 — Full-Stack + System Design (Weeks 5–8)',bar:'green'},
  3:{name:'Phase 3 — AI/ML Deep Dive (Weeks 9–16)',bar:'purple'},
  4:{name:'Phase 4 — Data Engineering + Production (Weeks 17–24)',bar:'orange'},
};

function WeekDetail({week,isCurrent}:{week:WeekSection;isCurrent:boolean}) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 mb-4 ${isCurrent?'border-l-green-500':'border-l-slate-200'}`}>
      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-slate-800">{week.title}</h3>
            {isCurrent && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Current</span>}
            {week.completionPercent===100 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">✓ Complete</span>}
          </div>
          <p className="text-xs text-slate-400">{week.dateRange}</p>
          {week.theme && <p className="text-xs text-slate-500 italic mt-0.5">{week.theme}</p>}
        </div>
        <span className="text-sm font-bold text-slate-400">{week.completionPercent}%</span>
      </div>
      <ProgressBar value={week.completionPercent} color={week.completionPercent===100?'green':PI[week.phase].bar} showPercent={false} size="sm"/>
      {week.tracks.length>0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          {week.tracks.map((track,i)=>(
            <div key={i}>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{track.emoji} {track.name}</h4>
              <ul className="space-y-0.5">
                {track.tasks.map((t,j)=><ChecklistItem key={j} text={t.text} completed={t.completed} indent={t.indent>0?1:0}/>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function RoadmapPage() {
  try {
    const md = await fetchFileContent('notes/roadmap.md');
    const rd = parseRoadmap(md);
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">🗺️ Full Roadmap</h1>
          <p className="text-slate-500 mt-1">{rd.completedTasks}/{rd.totalTasks} tasks · {rd.completionPercent}% complete</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <ProgressBar value={rd.completionPercent} label="Overall curriculum" sublabel={`${rd.completedTasks}/${rd.totalTasks}`} size="lg"/>
        </div>
        {[1,2,3,4].map(phase=>{
          const pw = rd.weeks.filter(w=>w.phase===phase);
          if (!pw.length) return null;
          const s = rd.phaseStats[phase];
          return (
            <section key={phase} className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-slate-700">{PI[phase].name}</h2>
                <span className="text-sm text-slate-400">{s.completed}/{s.total} · {s.percent}%</span>
              </div>
              <div className="mb-4"><ProgressBar value={s.percent} color={PI[phase].bar} showPercent={false} size="sm"/></div>
              {pw.map(w=><WeekDetail key={w.id} week={w} isCurrent={rd.currentWeek?.id===w.id}/>)}
            </section>
          );
        })}
      </div>
    );
  } catch (err) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-lg">Error: {String(err)}</div>;
  }
}