export interface Note {
  id: number;
  title: string;
  description: string;
  image_urls: string[];
  note_pages: Array<string>;
  author: string;
  saved_count: number;
  view_count: number;
  download_count: number;
  created_at: Date;
  updated_at: Date;
  is_public: boolean;
  is_approved: boolean;
}