type Color = 'green'|'blue'|'yellow'|'purple'|'orange'|'red';
interface Props { title:string; value:string|number; subtitle?:string; icon:string; color?:Color }

const S:Record<Color,{ring:string;iconBg:string;val:string}> = {
  green:  {ring:'shadow-[inset_0_1px_0_rgba(78,222,163,0.14)]', iconBg:'bg-emerald-500/15 text-emerald-200', val:'text-emerald-200'},
  blue:   {ring:'shadow-[inset_0_1px_0_rgba(137,206,255,0.16)]', iconBg:'bg-sky-500/15 text-sky-200', val:'text-sky-100'},
  yellow: {ring:'shadow-[inset_0_1px_0_rgba(210,198,166,0.18)]', iconBg:'bg-amber-500/15 text-amber-100', val:'text-amber-100'},
  purple: {ring:'shadow-[inset_0_1px_0_rgba(167,139,250,0.18)]', iconBg:'bg-violet-500/15 text-violet-200', val:'text-violet-100'},
  orange: {ring:'shadow-[inset_0_1px_0_rgba(251,146,60,0.18)]', iconBg:'bg-orange-500/15 text-orange-200', val:'text-orange-100'},
  red:    {ring:'shadow-[inset_0_1px_0_rgba(251,113,133,0.18)]', iconBg:'bg-rose-500/15 text-rose-200', val:'text-rose-100'},
};

export default function StatCard({ title, value, subtitle, icon, color='green' }: Props) {
  const s = S[color];
  return (
    <div className={`panel p-5 transition-transform duration-200 hover:-translate-y-0.5 ${s.ring}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.28em] mb-2">{title}</p>
          <p className={`text-3xl font-extrabold leading-none ${s.val}`}>{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-2 truncate">{subtitle}</p>}
        </div>
        <div className={`${s.iconBg} rounded-2xl p-2.5 text-xl ml-3 shrink-0 border border-white/5`}>{icon}</div>
      </div>
    </div>
  );
}