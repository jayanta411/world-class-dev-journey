import ProgressBar from './ProgressBar';
type BarColor = 'blue'|'green'|'purple'|'orange';
interface Props { title:string; dateRange:string; theme?:string; phase:number; completedTasks:number; totalTasks:number; isCurrent?:boolean; isComplete?:boolean }
const PC:Record<number,{label:string;badge:string;bar:BarColor}> = {
  1:{label:'Phase 1',badge:'bg-blue-100 text-blue-700',  bar:'blue'},
  2:{label:'Phase 2',badge:'bg-green-100 text-green-700', bar:'green'},
  3:{label:'Phase 3',badge:'bg-purple-100 text-purple-700',bar:'purple'},
  4:{label:'Phase 4',badge:'bg-orange-100 text-orange-700',bar:'orange'},
};
export default function WeekCard({title,dateRange,theme,phase,completedTasks,totalTasks,isCurrent=false,isComplete=false}:Props) {
  const pct = totalTasks>0?Math.round((completedTasks/totalTasks)*100):0;
  const c = PC[phase]??PC[1];
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border-2 ${isCurrent?'border-green-500 shadow-green-100':isComplete?'border-slate-200':'border-slate-100'}`}>
      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-slate-800">{title}</h3>
            {isCurrent && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Current</span>}
            {isComplete && !isCurrent && <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">✓ Done</span>}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{dateRange}</p>
          {theme && <p className="text-xs text-slate-500 mt-0.5 italic truncate">{theme}</p>}
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ml-2 ${c.badge}`}>{c.label}</span>
      </div>
      <ProgressBar value={pct} color={isComplete?'green':c.bar} showPercent={false} size="sm"/>
      <p className="text-xs text-slate-400 mt-2">{completedTasks}/{totalTasks} tasks</p>
    </div>
  );
}