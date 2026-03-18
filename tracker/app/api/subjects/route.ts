import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchFileContent, writeFileContent } from '@/lib/github';
import {
  SubjectsData, SubjectWeek, SubjectTrack, SubjectTask,
  newWeekId, newTrackId, newTaskId,
} from '@/lib/subjects';

const FILE_PATH = 'notes/subjects.json';

async function readSubjects(): Promise<SubjectsData> {
  const raw = await fetchFileContent(FILE_PATH);
  return JSON.parse(raw) as SubjectsData;
}

async function saveSubjects(data: SubjectsData, message: string): Promise<void> {
  data.meta.updatedAt = new Date().toISOString();
  await writeFileContent(FILE_PATH, JSON.stringify(data, null, 2), message);
}

// ─── GET /api/subjects ───────────────────────────────────────────────────────
export async function GET() {
  try {
    const data = await readSubjects();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ─── POST /api/subjects ───────────────────────────────────────────────────────
// Body determines the operation via `action` field:
//
//  { action: 'toggle_task',  weekId, trackId, taskId }
//  { action: 'add_week',     phase, number, dateRange, theme }
//  { action: 'delete_week',  weekId }
//  { action: 'add_track',    weekId, emoji, name }
//  { action: 'delete_track', weekId, trackId }
//  { action: 'add_task',     weekId, trackId, text }
//  { action: 'delete_task',  weekId, trackId, taskId }
export async function POST(req: NextRequest) {
  // Require an authenticated session for all write operations.
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized — please sign in with GitHub to edit the roadmap.' },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const { action } = body as { action: string };
    const data = await readSubjects();

    switch (action) {
      // ── toggle task completed ──────────────────────────────────────────────
      case 'toggle_task': {
        const week = data.weeks.find(w => w.id === body.weekId);
        const track = week?.tracks.find(t => t.id === body.trackId);
        const task = track?.tasks.find(t => t.id === body.taskId);
        if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        task.completed = !task.completed;
        await saveSubjects(data, `tracker: toggle task ${body.taskId}`);
        return NextResponse.json({ ok: true, completed: task.completed });
      }

      // ── add week ───────────────────────────────────────────────────────────
      case 'add_week': {
        const weekNum: number = body.number ?? data.weeks.reduce((m, w) => Math.max(m, w.number), 0) + 1;
        const newWeek: SubjectWeek = {
          id: newWeekId(data.weeks),
          number: weekNum,
          phase: Number(body.phase) || 1,
          dateRange: String(body.dateRange || ''),
          theme: String(body.theme || ''),
          tracks: [],
        };
        data.weeks.push(newWeek);
        data.weeks.sort((a, b) => a.number - b.number);
        await saveSubjects(data, `tracker: add week ${newWeek.id}`);
        return NextResponse.json({ ok: true, week: newWeek });
      }

      // ── delete week ────────────────────────────────────────────────────────
      case 'delete_week': {
        const idx = data.weeks.findIndex(w => w.id === body.weekId);
        if (idx === -1) return NextResponse.json({ error: 'Week not found' }, { status: 404 });
        data.weeks.splice(idx, 1);
        await saveSubjects(data, `tracker: delete week ${body.weekId}`);
        return NextResponse.json({ ok: true });
      }

      // ── add track ──────────────────────────────────────────────────────────
      case 'add_track': {
        const week = data.weeks.find(w => w.id === body.weekId);
        if (!week) return NextResponse.json({ error: 'Week not found' }, { status: 404 });
        const name = String(body.name || 'New Track');
        const newTrack: SubjectTrack = {
          id: newTrackId(week, name),
          emoji: String(body.emoji || ''),
          name,
          tasks: [],
        };
        week.tracks.push(newTrack);
        await saveSubjects(data, `tracker: add track "${name}" to ${body.weekId}`);
        return NextResponse.json({ ok: true, track: newTrack });
      }

      // ── delete track ───────────────────────────────────────────────────────
      case 'delete_track': {
        const week = data.weeks.find(w => w.id === body.weekId);
        if (!week) return NextResponse.json({ error: 'Week not found' }, { status: 404 });
        const tIdx = week.tracks.findIndex(t => t.id === body.trackId);
        if (tIdx === -1) return NextResponse.json({ error: 'Track not found' }, { status: 404 });
        week.tracks.splice(tIdx, 1);
        await saveSubjects(data, `tracker: delete track ${body.trackId}`);
        return NextResponse.json({ ok: true });
      }

      // ── add task ───────────────────────────────────────────────────────────
      case 'add_task': {
        const week = data.weeks.find(w => w.id === body.weekId);
        const track = week?.tracks.find(t => t.id === body.trackId);
        if (!track) return NextResponse.json({ error: 'Track not found' }, { status: 404 });
        const newTask: SubjectTask = {
          id: newTaskId(data),
          text: String(body.text || ''),
          completed: false,
          indent: 0,
        };
        track.tasks.push(newTask);
        await saveSubjects(data, `tracker: add task to ${body.trackId}`);
        return NextResponse.json({ ok: true, task: newTask });
      }

      // ── delete task ────────────────────────────────────────────────────────
      case 'delete_task': {
        const week = data.weeks.find(w => w.id === body.weekId);
        const track = week?.tracks.find(t => t.id === body.trackId);
        if (!track) return NextResponse.json({ error: 'Track not found' }, { status: 404 });
        const taskIdx = track.tasks.findIndex(t => t.id === body.taskId);
        if (taskIdx === -1) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        track.tasks.splice(taskIdx, 1);
        await saveSubjects(data, `tracker: delete task ${body.taskId}`);
        return NextResponse.json({ ok: true });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
