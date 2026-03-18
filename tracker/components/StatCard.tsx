type Color = 'green'|'blue'|'yellow'|'purple'|'orange'|'red';
interface Props { title:string; value:string|number; subtitle?:string; icon:string; color?:Color }

const S:Record<Color,{border:string;bg:string;iconBg:string;val:string}> = {
  green:  {border:'border-emerald-200', bg:'bg-gradient-to-br from-emerald-50 to-teal-50',    iconBg:'bg-emerald-100 text-emerald-700', val:'text-emerald-800'},
  blue:   {border:'border-sky-200',     bg:'bg-gradient-to-br from-sky-50 to-cyan-50',         iconBg:'bg-sky-100 text-sky-700',         val:'text-sky-800'},
  yellow: {border:'border-amber-200',   bg:'bg-gradient-to-br from-amber-50 to-yellow-50',    iconBg:'bg-amber-100 text-amber-700',     val:'text-amber-800'},
  purple: {border:'border-violet-200',  bg:'bg-gradient-to-br from-violet-50 to-indigo-50',   iconBg:'bg-violet-100 text-violet-700',   val:'text-violet-800'},
  orange: {border:'border-orange-200',  bg:'bg-gradient-to-br from-orange-50 to-amber-50',    iconBg:'bg-orange-100 text-orange-700',   val:'text-orange-800'},
  red:    {border:'border-rose-200',    bg:'bg-gradient-to-br from-rose-50 to-pink-50',        iconBg:'bg-rose-100 text-rose-700',       val:'text-rose-800'},
};

export default function StatCard({ title, value, subtitle, icon, color='green' }: Props) {
  const s = S[color];
  return (
    <div className={`${s.bg} border ${s.border} rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{title}</p>
          <p className={`text-3xl font-extrabold leading-none ${s.val}`}>{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-2 truncate">{subtitle}</p>}
        </div>
        <div className={`${s.iconBg} rounded-xl p-2.5 text-xl ml-3 shrink-0 shadow-sm`}>{icon}</div>
      </div>
    </div>
  );
}