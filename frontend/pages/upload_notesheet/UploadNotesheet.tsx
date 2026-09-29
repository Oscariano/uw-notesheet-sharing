import { useEffect, useState, type SubmitEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Carousel } from 'flowbite-react';
import { useAuth } from '@/lib/context/AuthContext';

const QUARTER_PATTERN = /^(autumn|winter|spring|summer)\s+(\d{4})$/i;

function parseTerm(term: string): { year: number; quarter: string } | null {
  const match = term.trim().match(QUARTER_PATTERN);
  if (!match) return null;
  const quarterName = match[1].toLowerCase();
  const quarter = quarterName.charAt(0).toUpperCase() + quarterName.slice(1);
  return { quarter, year: Number(match[2]) };
}

async function readError(response: Response): Promise<string> {
  try {
    const data: unknown = await response.json();
    if (typeof data === 'string') return data;
    if (data && typeof data === 'object' && 'detail' in data) {
      return String(data.detail);
    }
    if (data && typeof data === 'object') {
      return Object.entries(data)
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(' ') : String(value)}`)
        .join(' ');
    }
  } catch {
    // Response body was not JSON.
  }
  return 'Could not publish notesheet.';
}

interface UploadNotesheetState {
  files?: File[];
}

const NO_FILES: File[] = [];

const inputClassName =
  'w-full border-2 border-border bg-background px-2 py-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors';

const labelClassName = 'text-sm text-muted-foreground';

export default function UploadNotesheet() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const files = (location.state as UploadNotesheetState | null)?.files ?? NO_FILES;
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  async function publishNotesheet(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPublishing) return;

    if (!token) {
      setError('Sign in to publish a notesheet.');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get('title') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();
    const course = String(formData.get('course') ?? '').trim();
    const examType = String(formData.get('exam_type') ?? '').trim();
    const term = String(formData.get('term') ?? '').trim();
    const parsedTerm = term ? parseTerm(term) : null;

    if (term && !parsedTerm) {
      setError('Term should look like "Autumn 2025".');
      return;
    }

    setError(null);
    setIsPublishing(true);

    try {
      const response = await fetch('/api/notesheet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          course,
          exam_type: examType,
          ...(parsedTerm ?? {}),
        }),
      });

      if (!response.ok) {
        setError(await readError(response));
        return;
      }

      navigate('/');
    } catch {
      setError('Could not publish notesheet.');
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <main className="flex flex-col w-full">
      <section className="w-full border-b-2 border-border p-3 bg-card">
        <h1 className="text-2xl text-foreground">Upload Notesheet</h1>
        <p className="font-extralight text-muted-foreground">Add details so others can find your notes</p>
      </section>

      <form className="px-4 py-4 flex flex-col gap-4 w-full" onSubmit={publishNotesheet}>
        <div className="flex flex-col gap-1">
          <span className={labelClassName}>Notesheet</span>
          <div className="border-2 border-border w-full h-100 aspect-square bg-card overflow-hidden">
          {previewUrls.length > 0 ? (
            <Carousel
              slide={false}
              theme={{ item: { base: "relative h-full w-full" } }}
              clearTheme={{ item: { base: true } }}
            >
              {previewUrls.map((url, index) => (
                  <img src={url} alt={files[index]?.name ?? `Page ${index + 1}`} className="w-full h-full object-cover" />
                ))}
            </Carousel>
          ) : (
            <div className="border-2 border-border w-full aspect-square bg-card flex items-center justify-center">
              <p className="text-muted-foreground">No image selected</p>
            </div>
          )}
          </div>
        </div>

        <div className="border-2 border-border bg-card p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className={labelClassName}>Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. CSE 311 Midterm Cheatsheet"
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className={labelClassName}>Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="What topics does this notesheet cover?"
              className={`${inputClassName} resize-none`}
            />
          </div>

          <hr className="border-0 h-[0.1rem] bg-border" />

          <div className="flex flex-col gap-1">
            <label htmlFor="course" className={labelClassName}>Course</label>
            <input
              id="course"
              name="course"
              type="text"
              placeholder="e.g. CSE 311"
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="exam_type" className={labelClassName}>Exam Type</label>
            <select
              id="exam_type"
              name="exam_type"
              defaultValue=""
              className={inputClassName}
            >
              <option value="" disabled>Select exam type</option>
              <option value="midterm">Midterm</option>
              <option value="final">Final</option>
              <option value="quiz">Quiz</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="term" className={labelClassName}>Term</label>
            <input
              id="term"
              name="term"
              type="text"
              placeholder="e.g. Autumn 2025"
              className={inputClassName}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <div className="flex gap-2">
          <button
            type="button"
            className="w-full border-2 border-border bg-card text-foreground py-2"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-accent text-accent-foreground py-2 disabled:opacity-60"
            disabled={isPublishing}
          >
            {isPublishing ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </form>
    </main>
  );
}
