import { SubjectsData } from '@/lib/subjects';

export interface DSAProblem {
  number: number; problem: string; link: string; ncLink: string;
  pattern: string; difficulty: 'Easy'|'Medium'|'Hard'|''; date: string; notes: string;
  completed?: boolean;
}
export interface DSAStats {
  problems: DSAProblem[]; total: number; easy: number; medium: number; hard: number;
  byPattern: Record<string,number>; targetTotal: number; completionPercent: number;
}
export const DSA_PATTERN_TARGETS: Record<string,number> = {
  'Hash Set':3,'Char Freq Map':2,'Complement Map':1,'Hash Map':3,'Bucket Sort':1,
  'Prefix/Suffix':2,'Sliding Min':1,'String Encoding':1,
  'Two Pointers':5,'Sliding Window':6,
  'Stack':7,'Binary Search':7,'Linked List':11,
  'Trees':15,'Tries':3,'Heap':7,'Backtracking':9,
  'Graphs':13,'Advanced Graphs':6,
  'Dynamic Programming':23,'Greedy':8,'Intervals':6,'Math & Geometry':8,'Bit Manipulation':7,
};
export const DSA_PATTERN_ORDER = Object.keys(DSA_PATTERN_TARGETS);

export function parseDSA(markdown: string): DSAStats {
  const problems: DSAProblem[] = [];
  const lines = markdown.split('\n');
  let inTable = false, headerSeen = false, sepSeen = false;

  for (const line of lines) {
    const t = line.trim();
    if (!inTable && t.startsWith('|') && t.includes('Problem') && t.includes('Pattern')) {
      inTable = true; headerSeen = true; sepSeen = false; continue;
    }
    if (!inTable) continue;
    if (headerSeen && !sepSeen && t.includes('---')) { sepSeen = true; continue; }
    if (sepSeen && t.startsWith('|')) {
      const cols = t.split('|').map(c => c.trim()).slice(1);
      if (cols[cols.length-1]==='') cols.pop();
      if (cols.length >= 6 && parseInt(cols[0]) > 0 && cols[1]) {
        const problem = cols[1];
        // cols[2] = LeetCode link (markdown), cols[3] = NeetCode link
        const lm = cols[2].match(/\[([^\]]+)\]\(([^)]+)\)/);
        const link = lm ? lm[2] : (cols[2]||'');
        const nm = cols[3]?.match(/\[([^\]]+)\]\(([^)]+)\)/);
        const ncLink = nm ? nm[2] : (cols[3]||'');
        const diff = cols[5] as DSAProblem['difficulty'];
        problems.push({
          number: parseInt(cols[0]), problem, link, ncLink, pattern: cols[4]||'',
          difficulty: ['Easy','Medium','Hard'].includes(diff) ? diff : '',
          date: cols[6]||'', notes: cols[9]||'',
        });
      }
    } else if (sepSeen && !t.startsWith('|') && t) {
      inTable = false; headerSeen = false; sepSeen = false;
    }
  }

  const valid = problems.filter(p => p.problem);
  const byPattern: Record<string,number> = {};
  let easy=0, medium=0, hard=0;
  for (const p of valid) {
    byPattern[p.pattern] = (byPattern[p.pattern]||0)+1;
    if (p.difficulty==='Easy') easy++;
    else if (p.difficulty==='Medium') medium++;
    else if (p.difficulty==='Hard') hard++;
  }
  return {
    problems: valid, total: valid.length, easy, medium, hard, byPattern,
    targetTotal: 150, completionPercent: Math.round((valid.length/150)*100),
  };
}

export function extractDSAFromSubjects(data: SubjectsData): DSAStats {
  const problems: DSAProblem[] = [];
  let idx = 0;

  for (const week of data.weeks) {
    for (const track of week.tracks) {
      if (!track.id.endsWith('-dsa')) continue;
      for (const task of track.tasks) {
        const m = task.text.match(/^(.+?)\s+·\s+Pattern:\s+(.+?)(?:\s+·\s+(.+))?$/);
        if (!m) continue;
        const diff = m[3]?.trim() ?? '';
        problems.push({
          number: ++idx,
          problem: m[1].trim(),
          link: task.lcLink ?? '',
          ncLink: task.ncLink ?? '',
          pattern: m[2].trim(),
          difficulty: (['Easy','Medium','Hard'].includes(diff) ? diff : '') as DSAProblem['difficulty'],
          date: '',
          notes: '',
          completed: task.completed,
        });
      }
    }
  }

  const completed = problems.filter(p => p.completed);
  const byPattern: Record<string,number> = {};
  let easy=0, medium=0, hard=0;
  for (const p of completed) {
    byPattern[p.pattern] = (byPattern[p.pattern]||0)+1;
    if (p.difficulty==='Easy') easy++;
    else if (p.difficulty==='Medium') medium++;
    else if (p.difficulty==='Hard') hard++;
  }
  const total = completed.length;
  return {
    problems, total, easy, medium, hard, byPattern,
    targetTotal: 150, completionPercent: Math.round((total/150)*100),
  };
}