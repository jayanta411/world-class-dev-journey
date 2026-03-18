export interface Task        { text: string; completed: boolean; indent: number }
export interface TrackSection { name: string; emoji: string; tasks: Task[] }
export interface WeekSection  {
  id: string; weekNumber: number; title: string; dateRange: string;
  theme: string; phase: number; tracks: TrackSection[];
  totalTasks: number; completedTasks: number; completionPercent: number;
}
export interface RoadmapData {
  weeks: WeekSection[];
  totalTasks: number; completedTasks: number; completionPercent: number;
  currentWeek: WeekSection | null;
  phaseStats: Record<number, { total: number; completed: number; percent: number }>;
}

export function parseRoadmap(markdown: string): RoadmapData {
  const lines = markdown.split('\n');
  const weeks: WeekSection[] = [];
  let currentWeek: WeekSection | null = null;
  let currentTrack: TrackSection | null = null;
  let currentPhase = 1;

  const SKIP = ['🔁', '📓', 'Rolled Over', 'Weekly Retrospective'];

  for (const line of lines) {
    if (/^#\s+PHASE\s+(\d+)/i.test(line)) {
      const m = line.match(/PHASE\s+(\d+)/i);
      if (m) currentPhase = parseInt(m[1]);
      continue;
    }
    const weekMatch = line.match(/^##\s+[^\w]*Week\s+(\d+)\s*\(([^)]+)\)/i);
    if (weekMatch) {
      if (currentWeek) {
        if (currentTrack?.tasks.length) currentWeek.tracks.push(currentTrack);
        finalize(currentWeek); weeks.push(currentWeek);
      }
      currentTrack = null;
      currentWeek = {
        id: `week-${parseInt(weekMatch[1])}`, weekNumber: parseInt(weekMatch[1]),
        title: `Week ${parseInt(weekMatch[1])}`, dateRange: weekMatch[2].trim(),
        theme: '', phase: currentPhase, tracks: [],
        totalTasks: 0, completedTasks: 0, completionPercent: 0,
      };
      continue;
    }
    if (!currentWeek) continue;

    if (line.includes('**Theme:**')) {
      currentWeek.theme = line.replace(/.*\*\*Theme:\*\*\s*/, '').trim();
      continue;
    }
    if (line.startsWith('### ')) {
      const t = line.replace(/^###\s+/, '').trim();
      if (SKIP.some(s => t.includes(s))) continue;
      if (currentTrack?.tasks.length) currentWeek.tracks.push(currentTrack);
      const emojiMatch = t.match(/^([\p{Emoji}]+)\s*/u);
      currentTrack = {
        emoji: emojiMatch?.[1] ?? '',
        name: t.replace(/^[\p{Emoji}\s]+/u, '').trim(),
        tasks: [],
      };
      continue;
    }
    const taskMatch = line.match(/^(\s*)-\s+\[([ xX])\]\s+(.+)/);
    if (taskMatch && currentTrack) {
      const completed = taskMatch[2].toLowerCase() === 'x';
      currentTrack.tasks.push({ text: taskMatch[3].trim(), completed, indent: taskMatch[1].length });
      currentWeek.totalTasks++;
      if (completed) currentWeek.completedTasks++;
    }
  }
  if (currentWeek) {
    if (currentTrack?.tasks.length) currentWeek.tracks.push(currentTrack);
    finalize(currentWeek); weeks.push(currentWeek);
  }

  const totalTasks     = weeks.reduce((s, w) => s + w.totalTasks, 0);
  const completedTasks = weeks.reduce((s, w) => s + w.completedTasks, 0);
  const phaseStats: RoadmapData['phaseStats'] = {};
  for (let p = 1; p <= 4; p++) {
    const pw = weeks.filter(w => w.phase === p);
    const t = pw.reduce((s, w) => s + w.totalTasks, 0);
    const c = pw.reduce((s, w) => s + w.completedTasks, 0);
    phaseStats[p] = { total: t, completed: c, percent: t > 0 ? Math.round((c / t) * 100) : 0 };
  }
  return {
    weeks, totalTasks, completedTasks,
    completionPercent: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    currentWeek: weeks.find(w => w.completedTasks < w.totalTasks) ?? weeks[0] ?? null,
    phaseStats,
  };
}
function finalize(w: WeekSection) {
  w.completionPercent = w.totalTasks > 0 ? Math.round((w.completedTasks / w.totalTasks) * 100) : 0;
}