export interface Note {
  id: number;
  title: string;
  description: string;
  image_urls: string;
  note_pages: Array<string>;
  author: string;
  saved_count: number;
}