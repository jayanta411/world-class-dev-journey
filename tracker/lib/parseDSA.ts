export interface DSAProblem {
  number: number; problem: string; link: string;
  pattern: string; difficulty: 'Easy'|'Medium'|'Hard'|''; date: string; notes: string;
}
export interface DSAStats {
  problems: DSAProblem[]; total: number; easy: number; medium: number; hard: number;
  byPattern: Record<string,number>; targetTotal: number; completionPercent: number;
}
export const DSA_PATTERN_TARGETS: Record<string,number> = {
  'Arrays':4,'Strings':4,'Hash Maps':4,'Two Pointers':6,'Sliding Window':6,
  'Trees':5,'Recursion':4,'BFS/DFS':4,'Binary Search':5,'Heap':4,
  'Linked Lists':4,'Stack':3,'Queue':3,'Backtracking':4,'Greedy':4,
  'Dynamic Programming':18,'Graphs':10,'Tries':5,
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
      if (cols.length >= 4 && parseInt(cols[0]) > 0 && cols[1]) {
        let problem = cols[1], link = cols[2]||'';
        const lm = cols[1].match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (lm) { problem = lm[1]; link = lm[2]; }
        const diff = cols[4] as DSAProblem['difficulty'];
        problems.push({
          number: parseInt(cols[0]), problem, link, pattern: cols[3]||'',
          difficulty: ['Easy','Medium','Hard'].includes(diff) ? diff : '',
          date: cols[5]||'', notes: cols[7]||'',
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