// Main note-sharing view. Placeholder data for now — wire to a Django JSON
// endpoint via `@/lib/api` once the backend exposes notesheets.
const SAMPLE_NOTES = [
  { id: 1, title: 'CS 240 - Data Structures', author: 'alice', course: 'CS 240' },
  { id: 2, title: 'MATH 239 - Combinatorics', author: 'bob', course: 'MATH 239' },
  { id: 3, title: 'STAT 230 - Probability', author: 'carol', course: 'STAT 230' },
];

export default function NotesTab() {
  return (
    <section>
      <p className="mb-4 text-sm text-slate-500">
        Browse and share notesheets from your courses.
      </p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLE_NOTES.map((note) => (
          <li
            key={note.id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <h3 className="font-semibold">{note.title}</h3>
            <p className="mt-1 text-xs text-slate-500">
              {note.course} · shared by {note.author}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
