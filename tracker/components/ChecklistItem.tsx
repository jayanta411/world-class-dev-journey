interface Props { text:string; completed:boolean; indent?:number }
export default function ChecklistItem({text,completed,indent=0}:Props) {
  return (
    <li className="flex items-start gap-2 py-0.5" style={{paddingLeft:`${indent*12}px`}}>
      <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center text-xs font-bold
        ${completed?'bg-emerald-500 border-emerald-500 text-slate-950':'border-slate-700 bg-slate-900/70 text-transparent'}`}>
        {completed?'✓':''}
      </span>
      <span className={`text-sm leading-relaxed ${completed?'line-through text-slate-500':'text-slate-200'}`}>{text}</span>
    </li>
  );
}