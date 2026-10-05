import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/lib/context/AuthContext';
import CrossIcon from '~icons/at-icons/cross';

type AuthTab = 'login' | 'signup';

const authTabs: { id: AuthTab; label: string }[] = [
  { id: 'login', label: 'Login' },
  { id: 'signup', label: 'Sign Up' },
];

const inputClassName =
  'w-full border-2 border-border bg-background px-2 py-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors';

const labelClassName = 'text-sm text-muted-foreground';

async function readError(response: Response, fallback: string): Promise<string> {
  try {
    const data: unknown = await response.json();
    if (typeof data === 'string') return data;
    if (data && typeof data === 'object' && 'detail' in data) {
      return String(data.detail);
    }
    if (data && typeof data === 'object') {
      return Object.values(data)
        .map((value) => (Array.isArray(value) ? value.join(' ') : String(value)))
        .join(' ');
    }
  } catch {
    // Response body was not JSON.
  }
  return fallback;
}

async function requestToken(username: string, password: string): Promise<string> {
  const response = await fetch('/api/account/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error(await readError(response, 'Could not log in.'));
  const data: { token: string } = await response.json();
  return data.token;
}

export default function LoginSignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function selectTab(tab: AuthTab) {
    setActiveTab(tab);
    setError(null);
  }

  async function submitLogin(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (!username || !password) {
      setError('Enter your username and password.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      login(await requestToken(username, password));
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not log in.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitSignUp(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirm_password') ?? '');

    if (!username || !email || !password) {
      setError('Fill out every field to create an account.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/account/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        setError(await readError(response, 'Could not create account.'));
        return;
      }
      login(await requestToken(username, password));
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create account.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-col w-full min-h-screen">
      <section className="w-full border-b-2 border-border p-3 bg-card flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-foreground">
            {activeTab === 'login' ? 'Welcome back' : 'Join NoteHub'}
          </h1>
          <p className="font-extralight text-muted-foreground">
            {activeTab === 'login'
              ? 'Log in to share and save notesheets'
              : 'Create an account to start sharing notes'}
          </p>
        </div>
        <button type="button" aria-label="Close" onClick={() => navigate('/')} className="p-2">
          <CrossIcon style={{ color: '#3b362f', fontSize: '0.9rem' }} />
        </button>
      </section>

      <div className="px-4 py-4 flex flex-col gap-4 w-full">
        <div role="tablist" className="flex border-2 border-border bg-card">
          {authTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectTab(tab.id)}
                className={`w-full py-2 text-lg transition-colors border-b-4 ${
                  isActive
                    ? 'bg-primary-foreground text-foreground border-primary'
                    : 'text-muted-foreground border-transparent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'login' ? (
          <form key="login" className="flex flex-col gap-4" onSubmit={submitLogin}>
            <div className="border-2 border-border bg-card p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="login-username" className={labelClassName}>Username</label>
                <input
                  id="login-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="e.g. husky123"
                  className={inputClassName}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="login-password" className={labelClassName}>Password</label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="*****"
                  className={inputClassName}
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground py-2 disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in…' : 'Login'}
            </button>
            <p className="text-center text-muted-foreground">
              Don't have an account?{' '}
              <button type="button" className="text-primary font-bold" onClick={() => selectTab('signup')}>
                Sign up
              </button>
            </p>
          </form>
        ) : (
          <form key="signup" className="flex flex-col gap-4" onSubmit={submitSignUp}>
            <div className="border-2 border-border bg-card p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="signup-username" className={labelClassName}>Username</label>
                <input
                  id="signup-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="e.g. husky123"
                  className={inputClassName}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="signup-email" className={labelClassName}>Email</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="e.g. husky@uw.edu"
                  className={inputClassName}
                />
              </div>

              <hr className="border-0 h-[0.1rem] bg-border" />

              <div className="flex flex-col gap-1">
                <label htmlFor="signup-password" className={labelClassName}>Password</label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={inputClassName}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="signup-confirm-password" className={labelClassName}>Confirm Password</label>
                <input
                  id="signup-confirm-password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={inputClassName}
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground py-2 disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account…' : 'Create Account'}
            </button>
            <p className="text-center text-muted-foreground">
              Already have an account?{' '}
              <button type="button" className="text-primary font-bold" onClick={() => selectTab('login')}>
                Log in
              </button>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
