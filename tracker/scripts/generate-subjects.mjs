/**
 * One-time script: parses notes/roadmap.md → notes/subjects.json
 * Run from tracker/: node scripts/generate-subjects.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function stripEmoji(str) {
  return str.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+/u, '').trim();
}

function extractEmoji(str) {
  const m = str.match(/^([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)/u);
  return m ? m[1] : '';
}

function parseRoadmapToSubjects(markdown) {
  const lines = markdown.split('\n');
  const weeks = [];
  let currentWeek = null;
  let currentTrack = null;
  let currentPhase = 1;
  let taskSeq = 0;

  const SKIP_SECTIONS = ['🔁', '📓', 'Rolled Over', 'Weekly Retrospective', 'Phase 1 Retrospective', 'Phase 2 Retrospective', 'Phase 3 Retrospective', 'Phase 4 Retrospective'];

  function flushTrack() {
    if (currentTrack && currentTrack.tasks.length > 0 && currentWeek) {
      currentWeek.tracks.push(currentTrack);
    }
    currentTrack = null;
  }

  function flushWeek() {
    flushTrack();
    if (currentWeek) weeks.push(currentWeek);
    currentWeek = null;
  }

  for (const line of lines) {
    // Phase header
    if (/^#\s+PHASE\s+(\d+)/i.test(line)) {
      const m = line.match(/PHASE\s+(\d+)/i);
      if (m) currentPhase = parseInt(m[1]);
      continue;
    }

    // Week header: ## ✅ Week 1 (2026-...) or ## 📅 Week 2 (...)
    const weekMatch = line.match(/^##\s+[^\w]*Week\s+(\d+)\s*\(([^)]+)\)/i);
    if (weekMatch) {
      flushWeek();
      const wNum = parseInt(weekMatch[1]);
      currentWeek = {
        id: `week-${wNum}`,
        number: wNum,
        phase: currentPhase,
        dateRange: weekMatch[2].trim(),
        theme: '',
        tracks: [],
      };
      continue;
    }

    if (!currentWeek) continue;

    // Theme line
    if (line.includes('**Theme:**')) {
      currentWeek.theme = line.replace(/.*\*\*Theme:\*\*\s*/, '').trim();
      continue;
    }

    // Track header (###)
    if (line.startsWith('### ')) {
      const raw = line.replace(/^###\s+/, '').trim();
      if (SKIP_SECTIONS.some(s => raw.includes(s))) {
        flushTrack();
        continue;
      }
      flushTrack();
      const emoji = extractEmoji(raw);
      const name = stripEmoji(raw);
      const trackId = `${currentWeek.id}-${slugify(name) || 'track'}`;
      currentTrack = { id: trackId, emoji, name, tasks: [] };
      continue;
    }

    // Task line
    const taskMatch = line.match(/^(\s*)-\s+\[([ xX])\]\s+(.+)/);
    if (taskMatch && currentTrack) {
      taskSeq++;
      currentTrack.tasks.push({
        id: `t${taskSeq}`,
        text: taskMatch[3].trim(),
        completed: taskMatch[2].toLowerCase() === 'x',
        indent: taskMatch[1].length,
      });
    }
  }
  flushWeek();

  return {
    meta: {
      title: 'World-Class Developer Roadmap',
      owner: 'jayanta411',
      startDate: '2026-03-17',
      goal: 'World-class React + Full-Stack engineer, AI/ML & Data Engineering proficiency, top-tier job ready',
      updatedAt: new Date().toISOString(),
    },
    phases: [
      { id: 'phase-1', number: 1, name: 'Core Sharpening', weeksLabel: '1–4', color: 'blue' },
      { id: 'phase-2', number: 2, name: 'Full-Stack + System Design', weeksLabel: '5–8', color: 'green' },
      { id: 'phase-3', number: 3, name: 'AI/ML Deep Dive', weeksLabel: '9–16', color: 'purple' },
      { id: 'phase-4', number: 4, name: 'Data Engineering + Production', weeksLabel: '17–24', color: 'orange' },
    ],
    weeks,
  };
}

const roadmapPath = path.join(__dirname, '..', '..', 'notes', 'roadmap.md');
const outputPath  = path.join(__dirname, '..', '..', 'notes', 'subjects.json');

const markdown = await readFile(roadmapPath, 'utf-8');
const subjects  = parseRoadmapToSubjects(markdown);

await writeFile(outputPath, JSON.stringify(subjects, null, 2), 'utf-8');

const totalTasks = subjects.weeks.reduce((s, w) => s + w.tracks.reduce((ts, t) => ts + t.tasks.length, 0), 0);
console.log(`✅ Generated notes/subjects.json`);
console.log(`   ${subjects.weeks.length} weeks · ${totalTasks} tasks across ${subjects.phases.length} phases`);
