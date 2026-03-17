type Color = 'green'|'blue'|'yellow'|'purple'|'orange';
type Size  = 'sm'|'md'|'lg';
interface Props { value:number; label?:string; sublabel?:string; color?:Color; showPercent?:boolean; size?:Size }

const C:Record<Color,string> = { green:'bg-green-500',blue:'bg-blue-500',yellow:'bg-yellow-400',purple:'bg-purple-500',orange:'bg-orange-500' };
const S:Record<Size,string>  = { sm:'h-1.5', md:'h-2.5', lg:'h-4' };

export default function ProgressBar({ value, label, sublabel, color='green', showPercent=true, size='md' }: Props) {
  const v = Math.min(Math.max(value,0),100);
  return (
    <div className="w-full">
      {(label||showPercent) && (
        <div className="flex items-center justify-between mb-1.5">
          <div>
            {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
            {sublabel && <span className="text-xs text-slate-400 ml-2">{sublabel}</span>}
          </div>
          {showPercent && <span className="text-sm font-semibold text-slate-600">{v}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full ${S[size]} overflow-hidden`}>
        <div className={`${C[color]} ${S[size]} rounded-full transition-all duration-700`} style={{width:`${v}%`}}/>
      </div>
    </div>
  );
}