// Thin fetch wrapper for talking to future Django JSON endpoints.
// Reads Django's CSRF cookie so non-GET requests pass CsrfViewMiddleware.

type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp('(^|;\\s*)' + name + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[2]) : null;
}

// The response shape is decided by the endpoint, so callers name the type they
// expect and take responsibility for it — nothing is validated at runtime.
async function request<T>(
  method: HttpMethod,
  url: string,
  body?: unknown
): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  const options: RequestInit = { method, headers, credentials: 'same-origin' };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  if (method !== 'GET' && method !== 'HEAD') {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) headers['X-CSRFToken'] = csrfToken;
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('Content-Type') ?? '';
  return contentType.includes('application/json')
    ? ((await response.json()) as T)
    : ((await response.text()) as T);
}

export const api = {
  get: <T>(url: string) => request<T>('GET', url),
  post: <T>(url: string, body?: unknown) => request<T>('POST', url, body),
  put: <T>(url: string, body?: unknown) => request<T>('PUT', url, body),
  patch: <T>(url: string, body?: unknown) => request<T>('PATCH', url, body),
  delete: <T>(url: string) => request<T>('DELETE', url),
};
