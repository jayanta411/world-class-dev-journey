type Color = 'green'|'blue'|'yellow'|'purple'|'orange'|'red';
interface Props { title:string; value:string|number; subtitle?:string; icon:string; color?:Color }

const S:Record<Color,{border:string;bg:string;iconBg:string}> = {
  green:  {border:'border-green-400',  bg:'bg-green-50',  iconBg:'bg-green-100'},
  blue:   {border:'border-blue-400',   bg:'bg-blue-50',   iconBg:'bg-blue-100'},
  yellow: {border:'border-yellow-400', bg:'bg-yellow-50', iconBg:'bg-yellow-100'},
  purple: {border:'border-purple-400', bg:'bg-purple-50', iconBg:'bg-purple-100'},
  orange: {border:'border-orange-400', bg:'bg-orange-50', iconBg:'bg-orange-100'},
  red:    {border:'border-red-400',    bg:'bg-red-50',    iconBg:'bg-red-100'},
};

export default function StatCard({ title, value, subtitle, icon, color='green' }: Props) {
  const s = S[color];
  return (
    <div className={`${s.bg} border ${s.border} rounded-xl p-5 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1 leading-none">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1.5">{subtitle}</p>}
        </div>
        <div className={`${s.iconBg} rounded-xl p-2.5 text-2xl ml-3`}>{icon}</div>
      </div>
    </div>
  );
}