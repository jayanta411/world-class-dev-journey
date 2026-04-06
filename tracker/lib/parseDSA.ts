export interface DSAProblem {
  number: number; problem: string; link: string; ncLink: string;
  pattern: string; difficulty: 'Easy'|'Medium'|'Hard'|''; date: string; notes: string;
  roadmapWeek?: number;
}
export interface DSAStats {
  problems: DSAProblem[]; total: number; easy: number; medium: number; hard: number;
  byPattern: Record<string,number>; targetTotal: number; completionPercent: number;
}
export interface DSAJsonData {
  meta: { title: string; target: number; updatedAt: string };
  problems: Array<{
    id: string; number: number; problem: string;
    lcLink: string; ncLink: string; pattern: string;
    difficulty: string; roadmapWeek: number;
    completed: boolean; date: string; notes: string;
  }>;
}
export const DSA_PATTERN_TARGETS: Record<string,number> = {
  'Arrays & Hashing': 9,
  'Two Pointers': 5,
  'Sliding Window': 6,
  'Stack': 7,
  'Binary Search': 7,
  'Linked List': 11,
  'Trees': 15,
  'Tries': 3,
  'Heap / Priority Queue': 7,
  'Backtracking': 9,
  'Graphs': 13,
  'Advanced Graphs': 6,
  '1D DP': 12,
  '2D DP': 11,
  'Greedy': 8,
  'Intervals': 6,
  'Math & Geometry': 8,
  'Bit Manipulation': 7,
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

export function parseDSAJson(json: string): DSAStats {
  const data: DSAJsonData = JSON.parse(json);
  const byPattern: Record<string,number> = {};
  let easy=0, medium=0, hard=0;
  const problems: DSAProblem[] = data.problems
    .filter(p => p.completed)
    .map(p => {
      const diff = p.difficulty as DSAProblem['difficulty'];
      const difficulty: DSAProblem['difficulty'] = ['Easy','Medium','Hard'].includes(diff) ? diff : '';
      byPattern[p.pattern] = (byPattern[p.pattern]||0)+1;
      if (difficulty==='Easy') easy++;
      else if (difficulty==='Medium') medium++;
      else if (difficulty==='Hard') hard++;
      return {
        number: p.number,
        problem: p.problem,
        link: p.lcLink,
        ncLink: p.ncLink,
        pattern: p.pattern,
        difficulty,
        date: p.date,
        notes: p.notes,
        roadmapWeek: p.roadmapWeek,
      };
    });
  const targetTotal = data.meta.target ?? 150;
  return {
    problems, total: problems.length, easy, medium, hard, byPattern,
    targetTotal, completionPercent: Math.round((problems.length/targetTotal)*100),
  };
}