export interface DSAProblem {
  number: number; problem: string; link: string; ncLink: string;
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

export const PATTERN_NORMALIZE: Record<string, string> = {
  // Arrays / Strings / Hash Maps group
  'Hash Set':        'Arrays',
  'Char Freq Map':   'Strings',
  'Complement Map':  'Hash Maps',
  'Hash Map':        'Hash Maps',
  'Bucket Sort':     'Arrays',
  'Prefix/Suffix':   'Arrays',
  'Sliding Min':     'Arrays',
  'String Encoding': 'Strings',
  // Two Pointers / Sliding Window (already match)
  'Two Pointers':    'Two Pointers',
  'Sliding Window':  'Sliding Window',
  // Greedy
  'Greedy':          'Greedy',
};

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
    const normalizedPattern = PATTERN_NORMALIZE[p.pattern] || p.pattern;
    byPattern[normalizedPattern] = (byPattern[normalizedPattern]||0)+1;
    if (p.difficulty==='Easy') easy++;
    else if (p.difficulty==='Medium') medium++;
    else if (p.difficulty==='Hard') hard++;
  }
  return {
    problems: valid, total: valid.length, easy, medium, hard, byPattern,
    targetTotal: 150, completionPercent: Math.round((valid.length/150)*100),
  };
}