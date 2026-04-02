'use client';

import { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { SubjectsData, SubjectWeek, SubjectTrack, SubjectTask, computeStats } from '@/lib/subjects';
import ProgressBar from '@/components/ProgressBar';

// ─── Types ───────────────────────────────────────────────────────────────────

const PHASE_META: Record<number, { name: string; color: 'blue' | 'green' | 'purple' | 'orange' }> = {
  1: { name: 'Phase 1 — Core Sharpening (Weeks 1–4)', color: 'blue' },
  2: { name: 'Phase 2 — Full-Stack + System Design (Weeks 5–8)', color: 'green' },
  3: { name: 'Phase 3 — AI/ML Deep Dive (Weeks 9–16)', color: 'purple' },
  4: { name: 'Phase 4 — Data Engineering + Production (Weeks 17–24)', color: 'orange' },
};

// ─── Small helpers ────────────────────────────────────────────────────────────

async function callApi(body: Record<string, unknown>) {
  const res = await fetch('/api/subjects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    const msg = err.error ?? res.statusText;
    if (res.status === 401) throw new Error('__UNAUTHORIZED__');
    throw new Error(`[${res.status}] ${msg}`);
  }
  return res.json();
}

function Spinner() {
  return (
    <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  );
}

function IconBtn({
  onClick, title, children, className = '',
}: { onClick: () => void; title: string; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Add-Week modal ───────────────────────────────────────────────────────────

function AddWeekModal({ onClose, onAdd }: {
  onClose: () => void;
  onAdd: (w: { phase: number; dateRange: string; theme: string }) => Promise<void>;
}) {
  const [phase, setPhase] = useState(1);
  const [dateRange, setDateRange] = useState('');
  const [theme, setTheme] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      await onAdd({ phase, dateRange, theme });
      onClose();
    } catch (ex) {
      setErr(String(ex));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <form
        onSubmit={submit}
        className="panel w-full max-w-md p-6 space-y-4"
      >
        <h3 className="text-lg font-bold text-slate-50">Add New Week</h3>

        <label className="block">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-[0.28em]">Phase</span>
          <select
            value={phase}
            onChange={e => setPhase(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {[1, 2, 3, 4].map(p => (
              <option key={p} value={p}>{PHASE_META[p].name}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-[0.28em]">Date Range</span>
          <input
            type="text"
            placeholder="e.g. 2026-04-20 → 2026-04-26"
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-[0.28em]">Theme</span>
          <input
            type="text"
            placeholder="e.g. Docker, CI/CD, ML deployment"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </label>

        {err && <p className="text-sm text-rose-200 bg-rose-500/10 border border-rose-400/20 rounded p-2">{err}</p>}

        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200">
            Cancel
          </button>
          <button type="submit" disabled={busy}
            className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 hover:from-sky-600 hover:to-cyan-600 disabled:opacity-60 flex items-center gap-2 font-semibold">
            {busy && <Spinner />} Add Week
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Add-Track modal ──────────────────────────────────────────────────────────

function AddTrackModal({ weekId, onClose, onAdd }: {
  weekId: string;
  onClose: () => void;
  onAdd: (trackId: string, track: { emoji: string; name: string }) => Promise<void>;
}) {
  const [emoji, setEmoji] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setErr('');
    try {
      await onAdd(weekId, { emoji, name: name.trim() });
      onClose();
    } catch (ex) {
      setErr(String(ex));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <form
        onSubmit={submit}
        className="panel w-full max-w-sm p-6 space-y-4"
      >
        <h3 className="text-lg font-bold text-slate-50">Add Track to Week</h3>

        <div className="flex gap-3">
          <label className="block w-16 flex-shrink-0">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-[0.28em]">Emoji</span>
            <input type="text" maxLength={4} value={emoji} onChange={e => setEmoji(e.target.value)}
              placeholder="⚛️"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 text-slate-100 px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-sky-400" />
          </label>
          <label className="block flex-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-[0.28em]">Track Name</span>
            <input type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder="React / Frontend"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
          </label>
        </div>

        {err && <p className="text-sm text-rose-200 bg-rose-500/10 border border-rose-400/20 rounded p-2">{err}</p>}

        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200">Cancel</button>
          <button type="submit" disabled={busy}
            className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 hover:from-sky-600 hover:to-cyan-600 disabled:opacity-60 flex items-center gap-2 font-semibold">
            {busy && <Spinner />} Add Track
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Task row ─────────────────────────────────────────────────────────────────

function TaskRow({
  task, weekId, trackId, isAuthed, onToggle, onDelete,
}: {
  task: SubjectTask;
  weekId: string;
  trackId: string;
  isAuthed: boolean;
  onToggle: (weekId: string, trackId: string, taskId: string) => void;
  onDelete: (weekId: string, trackId: string, taskId: string) => void;
}) {
  return (
    <li
      className="flex items-start gap-2 py-1 group"
      style={{ paddingLeft: `${task.indent * 12}px` }}
    >
      <button
        type="button"
        onClick={() => isAuthed && onToggle(weekId, trackId, task.id)}
        disabled={!isAuthed}
        className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center text-xs font-bold transition-colors
          ${task.completed
            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
            : isAuthed
              ? 'border-slate-700 bg-slate-900 hover:border-emerald-400'
              : 'border-slate-700 bg-slate-900 cursor-not-allowed'}`}
      >
        {task.completed ? '✓' : ''}
      </button>
      <span className={`text-sm leading-relaxed flex-1 ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
        {task.text}
      </span>
      {(task.lcLink || task.ncLink) && (
        <span className="flex gap-1 flex-shrink-0 ml-1">
          {task.lcLink && <a href={task.lcLink} target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5 rounded text-xs font-semibold bg-orange-500/15 text-orange-200 border border-orange-300/20 hover:bg-orange-500/25">LC</a>}
          {task.ncLink && <a href={task.ncLink} target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/15 text-emerald-200 border border-emerald-300/20 hover:bg-emerald-500/25">NC</a>}
        </span>
      )}
      {isAuthed && (
        <IconBtn
          onClick={() => onDelete(weekId, trackId, task.id)}
          title="Delete task"
          className="opacity-0 group-hover:opacity-100 flex-shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </IconBtn>
      )}
    </li>
  );
}

// ─── Add-task inline input ────────────────────────────────────────────────────

function AddTaskInput({
  weekId, trackId, onAdd,
}: {
  weekId: string;
  trackId: string;
  onAdd: (weekId: string, trackId: string, text: string) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setBusy(true);
    try {
      await onAdd(weekId, trackId, text.trim());
      setText('');
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-1 flex items-center gap-1 text-xs text-slate-500 hover:text-sky-300 transition-colors"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add task
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="mt-1.5 flex items-center gap-2">
      <input
        autoFocus
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New task text…"
        className="flex-1 text-xs rounded border border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <button type="submit" disabled={busy || !text.trim()}
        className="text-xs px-2 py-1 rounded bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 hover:from-sky-600 hover:to-cyan-600 disabled:opacity-50 flex items-center gap-1 font-semibold">
        {busy ? <Spinner /> : 'Add'}
      </button>
      <button type="button" onClick={() => { setOpen(false); setText(''); }}
        className="text-xs text-slate-400 hover:text-slate-200">
        Cancel
      </button>
    </form>
  );
}

// ─── Track section ────────────────────────────────────────────────────────────

function TrackSection({
  track, week, isAuthed, onToggle, onDeleteTask, onAddTask, onDeleteTrack,
}: {
  track: SubjectTrack;
  week: SubjectWeek;
  isAuthed: boolean;
  onToggle: (weekId: string, trackId: string, taskId: string) => void;
  onDeleteTask: (weekId: string, trackId: string, taskId: string) => void;
  onAddTask: (weekId: string, trackId: string, text: string) => Promise<void>;
  onDeleteTrack: (weekId: string, trackId: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mb-3">
      <div className="flex items-center gap-1 mb-1 group">
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-[0.28em] hover:text-slate-200 flex-1 text-left"
        >
          <svg
            className={`w-3 h-3 transition-transform ${collapsed ? '-rotate-90' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {track.emoji} {track.name}
          <span className="font-normal text-slate-500 ml-1">
            ({track.tasks.filter(t => t.completed).length}/{track.tasks.length})
          </span>
        </button>
        {isAuthed && (
          <IconBtn
            onClick={() => onDeleteTrack(week.id, track.id)}
            title="Delete track"
            className="opacity-0 group-hover:opacity-100"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </IconBtn>
        )}
      </div>
      {!collapsed && (
        <>
          <ul className="space-y-0.5">
            {track.tasks.map(task => (
              <TaskRow
                key={task.id}
                task={task}
                weekId={week.id}
                trackId={track.id}
                isAuthed={isAuthed}
                onToggle={onToggle}
                onDelete={onDeleteTask}
              />
            ))}
          </ul>
          {isAuthed && <AddTaskInput weekId={week.id} trackId={track.id} onAdd={onAddTask} />}
        </>
      )}
    </div>
  );
}

// ─── Week card ────────────────────────────────────────────────────────────────

function WeekCard({
  week,
  isCurrent,
  weekStats,
  phaseColor,
  isAuthed,
  onToggle,
  onDeleteTask,
  onAddTask,
  onDeleteTrack,
  onDeleteWeek,
  onAddTrack,
}: {
  week: SubjectWeek;
  isCurrent: boolean;
  weekStats: { total: number; completed: number; percent: number };
  phaseColor: 'blue' | 'green' | 'purple' | 'orange';
  isAuthed: boolean;
  onToggle: (weekId: string, trackId: string, taskId: string) => void;
  onDeleteTask: (weekId: string, trackId: string, taskId: string) => void;
  onAddTask: (weekId: string, trackId: string, text: string) => Promise<void>;
  onDeleteTrack: (weekId: string, trackId: string) => void;
  onDeleteWeek: (weekId: string) => void;
  onAddTrack: (weekId: string, track: { emoji: string; name: string }) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(isCurrent);
  const [showAddTrack, setShowAddTrack] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const colorBorder = {
    blue: 'border-l-blue-400',
    green: 'border-l-green-500',
    purple: 'border-l-purple-400',
    orange: 'border-l-orange-400',
  }[phaseColor];

  return (
    <>
      {showAddTrack && (
        <AddTrackModal
          weekId={week.id}
          onClose={() => setShowAddTrack(false)}
          onAdd={async (wId, track) => {
            await onAddTrack(wId, track);
          }}
        />
      )}

      <div className={`panel border-l-4 mb-4 ${isCurrent ? 'border-l-emerald-400 ring-1 ring-emerald-400/35' : colorBorder}`}>
        {/* Header */}
        <div
          className="flex items-start justify-between p-4 cursor-pointer select-none"
          onClick={() => setExpanded(e => !e)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-slate-100">Week {week.number}</h3>
              {isCurrent && (
                <span className="text-xs bg-emerald-500/20 text-emerald-200 border border-emerald-400/20 px-2 py-0.5 rounded-full">Current</span>
              )}
              {weekStats.percent === 100 && (
                <span className="text-xs bg-sky-500/20 text-sky-200 border border-sky-400/20 px-2 py-0.5 rounded-full">Done</span>
              )}
              <span className="text-xs text-slate-400 font-mono">{weekStats.completed}/{weekStats.total}</span>
            </div>
            <p className="text-xs text-slate-400">{week.dateRange}</p>
            {week.theme && <p className="text-xs text-slate-500 italic mt-0.5 truncate">{week.theme}</p>}
          </div>
          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
            <span className="text-sm font-bold text-slate-300">{weekStats.percent}%</span>
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform ${expanded ? '' : '-rotate-90'}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-2" onClick={() => setExpanded(e => !e)}>
          <ProgressBar value={weekStats.percent} color={weekStats.percent === 100 ? 'green' : phaseColor} showPercent={false} size="sm" />
        </div>

        {/* Body */}
        {expanded && (
          <div className="px-4 pb-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              {week.tracks.map(track => (
                <TrackSection
                  key={track.id}
                  track={track}
                  week={week}
                  isAuthed={isAuthed}
                  onToggle={onToggle}
                  onDeleteTask={onDeleteTask}
                  onAddTask={onAddTask}
                  onDeleteTrack={onDeleteTrack}
                />
              ))}
            </div>
            {/* Actions footer — only shown when authenticated */}
            {isAuthed && (
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddTrack(true)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-300 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Track
                </button>
                <span className="flex-1" />
                {!confirmDelete ? (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Week
                  </button>
                ) : (
                  <span className="flex items-center gap-2 text-xs">
                    <span className="text-rose-300 font-semibold">Delete Week {week.number}?</span>
                    <button
                      type="button"
                      onClick={() => onDeleteWeek(week.id)}
                      className="px-2 py-0.5 bg-rose-500 text-white rounded text-xs hover:bg-rose-600"
                    >
                      Yes
                    </button>
                    <button type="button" onClick={() => setConfirmDelete(false)}
                      className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs hover:bg-slate-700">
                      No
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ─── Main client component ────────────────────────────────────────────────────

export default function RoadmapClient({ initial }: { initial: SubjectsData }) {
  const { data: session, status: authStatus } = useSession();
  const isAuthed = !!session;

  const [data, setData] = useState<SubjectsData>(initial);
  const confirmedRef = useRef<SubjectsData>(initial); // last successfully saved state
  const [showAddWeek, setShowAddWeek] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const stats = computeStats(data);

  function showToast(msg: string, type: 'ok' | 'err' = 'ok') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function mutate(
    optimistic: (draft: SubjectsData) => void,
    apiBody: Record<string, unknown>,
    errMsg: string,
  ) {
    const snapshot = confirmedRef.current;
    // Optimistic update
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev)) as SubjectsData;
      optimistic(next);
      return next;
    });

    // Persist to GitHub via API
    try {
      await callApi(apiBody);
      // Commit snapshot after successful save
      setData(prev => {
        confirmedRef.current = prev;
        return prev;
      });
    } catch (ex) {
      // Revert to last confirmed state
      setData(snapshot);
      if (ex instanceof Error && ex.message === '__UNAUTHORIZED__') {
        showToast('Not signed in — please sign in with GitHub', 'err');
        signIn('github', { callbackUrl: '/roadmap' });
      } else {
        showToast(`${errMsg}: ${ex instanceof Error ? ex.message : String(ex)}`, 'err');
      }
    }
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleToggle(weekId: string, trackId: string, taskId: string) {
    mutate(
      draft => {
        const t = draft.weeks.find(w => w.id === weekId)
          ?.tracks.find(t => t.id === trackId)
          ?.tasks.find(t => t.id === taskId);
        if (t) t.completed = !t.completed;
      },
      { action: 'toggle_task', weekId, trackId, taskId },
      'Failed to save task toggle',
    );
  }

  function handleDeleteTask(weekId: string, trackId: string, taskId: string) {
    mutate(
      draft => {
        const track = draft.weeks.find(w => w.id === weekId)?.tracks.find(t => t.id === trackId);
        if (track) track.tasks = track.tasks.filter(t => t.id !== taskId);
      },
      { action: 'delete_task', weekId, trackId, taskId },
      'Failed to delete task',
    );
  }

  async function handleAddTask(weekId: string, trackId: string, text: string) {
    const tempId = `t_tmp_${Date.now()}`;
    const newTask: SubjectTask = { id: tempId, text, completed: false, indent: 0 };
    const snapshot = confirmedRef.current;

    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev)) as SubjectsData;
      next.weeks.find(w => w.id === weekId)?.tracks.find(t => t.id === trackId)?.tasks.push(newTask);
      return next;
    });

    try {
      const res = await callApi({ action: 'add_task', weekId, trackId, text });
      // Replace temp ID with real ID from server
      setData(prev => {
        const next = JSON.parse(JSON.stringify(prev)) as SubjectsData;
        const track = next.weeks.find(w => w.id === weekId)?.tracks.find(t => t.id === trackId);
        if (track) {
          const tempTask = track.tasks.find(t => t.id === tempId);
          if (tempTask && res.task?.id) tempTask.id = res.task.id;
        }
        confirmedRef.current = next;
        return next;
      });
    } catch (ex) {
      setData(snapshot);
      showToast(String(ex), 'err');
      throw ex;
    }
  }

  function handleDeleteTrack(weekId: string, trackId: string) {
    mutate(
      draft => {
        const week = draft.weeks.find(w => w.id === weekId);
        if (week) week.tracks = week.tracks.filter(t => t.id !== trackId);
      },
      { action: 'delete_track', weekId, trackId },
      'Failed to delete track',
    );
  }

  function handleDeleteWeek(weekId: string) {
    mutate(
      draft => { draft.weeks = draft.weeks.filter(w => w.id !== weekId); },
      { action: 'delete_week', weekId },
      'Failed to delete week',
    );
  }

  async function handleAddWeek(fields: { phase: number; dateRange: string; theme: string }) {
    const res = await callApi({ action: 'add_week', ...fields });
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev)) as SubjectsData;
      next.weeks.push(res.week as SubjectWeek);
      next.weeks.sort((a: SubjectWeek, b: SubjectWeek) => a.number - b.number);
      return next;
    });
  }

  async function handleAddTrack(weekId: string, track: { emoji: string; name: string }) {
    const res = await callApi({ action: 'add_track', weekId, ...track });
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev)) as SubjectsData;
      next.weeks.find(w => w.id === weekId)?.tracks.push(res.track as SubjectTrack);
      return next;
    });
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Toast */}
      {(toast?.msg||authStatus==='loading') && (
        <div className={`fixed top-0 right-0 m-4 px-4 py-3 rounded-2xl shadow-lg text-sm font-medium z-50 ${
          toast?.type === 'err' ? 'bg-rose-500 text-white' : 'bg-slate-700/95 text-slate-100'
        }`}>
          {authStatus === 'loading' ? '⏳ Loading…' : toast?.msg || ''}
        </div>
      )}

      {/* Auth banner — shown when not signed in */}
      {authStatus !== 'loading' && !isAuthed && (
        <div className="mb-6 flex items-center gap-4 panel border border-slate-700 px-5 py-3">
          <span className="text-sky-400 text-2xl">🔒</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-100">Read-only mode</p>
            <p className="text-xs text-slate-400">Sign in with GitHub to toggle tasks and edit the roadmap.</p>
          </div>
          <button
            type="button"
            onClick={() => signIn('github', { callbackUrl: '/roadmap' })}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 text-xs font-semibold px-3 py-2 rounded-lg hover:from-sky-600 hover:to-cyan-600 transition-colors whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Sign in with GitHub
          </button>
        </div>
      )}

      {showAddWeek && (
        <AddWeekModal
          onClose={() => setShowAddWeek(false)}
          onAdd={handleAddWeek}
        />
      )}

      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-50 tracking-tight">🗺️ Full Roadmap</h1>
          <p className="text-slate-400 mt-2 text-sm">
            {stats.completedTasks}/{stats.totalTasks} tasks · {stats.completionPercent}% complete
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isAuthed && (
            <>
              <button
                type="button"
                onClick={() => setShowAddWeek(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 rounded-xl text-sm font-semibold hover:from-sky-600 hover:to-cyan-600 transition-colors shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Week
              </button>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/roadmap' })}
                title="Sign out"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm font-medium hover:bg-rose-500/20 hover:text-rose-300 border border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overall progress */}
      <div className="panel p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-50 tracking-tight">📊 Curriculum Progress</h2>
          <p className="text-xs text-slate-400 mt-1">Overall journey completion across all phases</p>
        </div>
        <ProgressBar
          value={stats.completionPercent}
          label={`${stats.completedTasks} of ${stats.totalTasks} tasks completed`}
          sublabel={`${stats.completionPercent}% overall`}
          size="lg"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {[1, 2, 3, 4].map(p => {
            const ps = stats.phaseStats[p];
            const meta = PHASE_META[p];
            const badgeClass = [
              'phase-badge-1', 'phase-badge-2', 'phase-badge-3', 'phase-badge-4'
            ][p - 1];
            const rangeLabel = ['Weeks 1–4','Weeks 5–8','Weeks 9–16','Weeks 17–24'][p - 1];
            return ps ? (
              <div key={p} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-100">{meta.name.replace(/ \(Weeks.*\)/, '')}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${badgeClass}`}>{rangeLabel}</span>
                </div>
                <ProgressBar value={ps.percent} color={meta.color}
                  label={`${ps.completed} of ${ps.total} tasks`}
                  sublabel={`${ps.percent}% complete`}
                  showPercent={false} size="sm" />
              </div>
            ) : null;
          })}
        </div>
      </div>

      {/* Phases */}
      {[1, 2, 3, 4].map(phase => {
        const pw = data.weeks.filter(w => w.phase === phase);
        if (!pw.length) return null;
        const ps = stats.phaseStats[phase];
        const meta = PHASE_META[phase];
        const badgeClass = [
          'phase-badge-1', 'phase-badge-2', 'phase-badge-3', 'phase-badge-4'
        ][phase - 1];
        return (
          <section key={phase} className="mb-10">
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-50 tracking-tight">{meta.name}</h2>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${badgeClass}`}>
                {ps.completed}/{ps.total} · {ps.percent}%
              </span>
            </div>
            <div className="mb-4">
              <ProgressBar value={ps.percent} color={meta.color} showPercent={false} size="sm" />
            </div>
            {pw.map(week => (
              <WeekCard
                key={week.id}
                week={week}
                isCurrent={stats.currentWeek?.id === week.id}
                weekStats={stats.weekStats[week.id]}
                phaseColor={meta.color}
                isAuthed={isAuthed}
                onToggle={handleToggle}
                onDeleteTask={handleDeleteTask}
                onAddTask={handleAddTask}
                onDeleteTrack={handleDeleteTrack}
                onDeleteWeek={handleDeleteWeek}
                onAddTrack={handleAddTrack}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}
