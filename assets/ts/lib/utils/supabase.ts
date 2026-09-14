// utils/supabase.js
const SUPABASE_PROJECT_URL = "https://xdwsquhrfweiskyppqop.supabase.co";
const BUCKET_NAME = "notesheets";

export function getNoteImageUrl(path: String) {
  if (!path) return null;
  // In case the path already starts with a slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${BUCKET_NAME}/${cleanPath}`;
}