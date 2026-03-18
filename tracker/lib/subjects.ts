// ─── Types ──────────────────────────────────────────────────────────────────

export interface SubjectTask {
  id: string;
  text: string;
  completed: boolean;
  indent: number;
}

export interface SubjectTrack {
  id: string;
  emoji: string;
  name: string;
  tasks: SubjectTask[];
}

export interface SubjectWeek {
  id: string;
  number: number;
  phase: number;
  dateRange: string;
  theme: string;
  tracks: SubjectTrack[];
}

export interface SubjectPhase {
  id: string;
  number: number;
  name: string;
  weeksLabel: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export interface SubjectsMeta {
  title: string;
  owner: string;
  startDate: string;
  goal: string;
  updatedAt: string;
}

export interface SubjectsData {
  meta: SubjectsMeta;
  phases: SubjectPhase[];
  weeks: SubjectWeek[];
}

// ─── Derived stats ───────────────────────────────────────────────────────────

export interface WeekStats {
  total: number;
  completed: number;
  percent: number;
}

export interface PhaseStats {
  total: number;
  completed: number;
  percent: number;
}

export interface SubjectsStats {
  totalTasks: number;
  completedTasks: number;
  completionPercent: number;
  currentWeek: SubjectWeek | null;
  weekStats: Record<string, WeekStats>;
  phaseStats: Record<number, PhaseStats>;
}

export function computeStats(data: SubjectsData): SubjectsStats {
  const weekStats: Record<string, WeekStats> = {};
  let totalTasks = 0;
  let completedTasks = 0;

  for (const week of data.weeks) {
    let wTotal = 0, wCompleted = 0;
    for (const track of week.tracks) {
      wTotal += track.tasks.length;
      wCompleted += track.tasks.filter(t => t.completed).length;
    }
    weekStats[week.id] = {
      total: wTotal,
      completed: wCompleted,
      percent: wTotal > 0 ? Math.round((wCompleted / wTotal) * 100) : 0,
    };
    totalTasks += wTotal;
    completedTasks += wCompleted;
  }

  const phaseStats: Record<number, PhaseStats> = {};
  for (let p = 1; p <= 4; p++) {
    const pw = data.weeks.filter(w => w.phase === p);
    const t = pw.reduce((s, w) => s + weekStats[w.id].total, 0);
    const c = pw.reduce((s, w) => s + weekStats[w.id].completed, 0);
    phaseStats[p] = { total: t, completed: c, percent: t > 0 ? Math.round((c / t) * 100) : 0 };
  }

  const currentWeek = data.weeks.find(w => {
    const s = weekStats[w.id];
    return s.total > 0 && s.completed < s.total;
  }) ?? data.weeks[0] ?? null;

  return {
    totalTasks,
    completedTasks,
    completionPercent: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    currentWeek,
    weekStats,
    phaseStats,
  };
}

// ─── ID helpers ──────────────────────────────────────────────────────────────

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function newWeekId(weeks: SubjectWeek[]): string {
  const maxNum = weeks.reduce((m, w) => Math.max(m, w.number), 0);
  return `week-${maxNum + 1}`;
}

export function newTrackId(week: SubjectWeek, name: string): string {
  return `${week.id}-${slugify(name) || 'track'}`;
}

export function newTaskId(data: SubjectsData): string {
  // Collect all existing numeric suffixes to ensure uniqueness.
  const ids = new Set<number>();
  for (const w of data.weeks) {
    for (const tr of w.tracks) {
      for (const t of tr.tasks) {
        const m = t.id.match(/^t(\d+)$/);
        if (m) ids.add(parseInt(m[1]));
      }
    }
  }
  let n = 1;
  while (ids.has(n)) n++;
  return `t${n}`;
}
