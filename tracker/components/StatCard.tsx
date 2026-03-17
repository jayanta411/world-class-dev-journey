type Color = 'green'|'blue'|'yellow'|'purple'|'orange'|'red';
interface Props { title:string; value:string|number; subtitle?:string; icon:string; color?:Color }

const S:Record<Color,{border:string;bg:string;iconBg:string}> = {
  green:  {border:'border-emerald-300',  bg:'bg-emerald-50/90',  iconBg:'bg-emerald-100'},
  blue:   {border:'border-sky-300',      bg:'bg-sky-50/90',      iconBg:'bg-sky-100'},
  yellow: {border:'border-amber-300',    bg:'bg-amber-50/90',    iconBg:'bg-amber-100'},
  purple: {border:'border-indigo-300',   bg:'bg-indigo-50/90',   iconBg:'bg-indigo-100'},
  orange: {border:'border-orange-300',   bg:'bg-orange-50/90',   iconBg:'bg-orange-100'},
  red:    {border:'border-rose-300',     bg:'bg-rose-50/90',     iconBg:'bg-rose-100'},
};

export default function StatCard({ title, value, subtitle, icon, color='green' }: Props) {
  const s = S[color];
  return (
    <div className={`${s.bg} border ${s.border} rounded-2xl p-5 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1.5 leading-none">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
        </div>
        <div className={`${s.iconBg} rounded-xl p-2.5 text-2xl ml-3`}>{icon}</div>
      </div>
    </div>
  );
}