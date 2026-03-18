import { fetchFileContent } from '@/lib/github';
import { SubjectsData } from '@/lib/subjects';
import RoadmapClient from './RoadmapClient';

// Always fetch fresh data — subjects.json is updated in-place via GitHub API.
export const dynamic = 'force-dynamic';

export default async function RoadmapPage() {
  try {
    const raw = await fetchFileContent('notes/subjects.json');
    const data: SubjectsData = JSON.parse(raw);
    return <RoadmapClient initial={data} />;
  } catch (err) {
    return (
      <div className="text-red-500 bg-red-50 p-4 rounded-lg">
        Error loading roadmap data: {String(err)}
      </div>
    );
  }
}