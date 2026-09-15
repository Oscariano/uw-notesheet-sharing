import type { ComponentType } from 'react';
import NotesTab from '@/components/ui/tabs/NotesTab';
import UploadsTab from '@/components/ui/tabs/UploadsTab';
import SettingsTab from '@/components/ui/tabs/SettingsTab';
import ViewGridIcon from '~icons/dinkie-icons/view-grid';
import UploadIcon from '~icons/icomoon-free/upload';
import StarIcon from '~icons/akar-icons/star';

export interface Tab {
  id: string;
  label: string;
  Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & {
    title?: string;
  }>;
  Component: ComponentType;
}

// Single source of truth for the dashboard sidebar.
// Adding a tab = add one entry here + one component. The `id` is what
// DashboardPage tracks in state and what a future router would map to a URL.
// `as const satisfies` keeps the ids as literal types so `TabId` below stays
// in sync automatically while still checking each entry against `Tab`.
export const tabs = [
  { id: 'browse', label: 'Browse', Icon: ViewGridIcon, Component: NotesTab },
  { id: 'uploads', label: 'Uploads', Icon: UploadIcon, Component: UploadsTab },
  { id: 'saved', label: 'Saved Notes', Icon: StarIcon, Component: SettingsTab },
] as const satisfies readonly Tab[];

export type TabId = (typeof tabs)[number]['id'];

export const DEFAULT_TAB_ID: TabId = tabs[0].id;
