import NotesTab from '@/pages/dashboard/components/tabs/NotesTab';
import UploadsTab from '@/pages/dashboard/components/tabs/UploadsTab';
import SettingsTab from '@/pages/dashboard/components/tabs/SettingsTab';

// Single source of truth for the dashboard sidebar.
// Adding a tab = add one entry here + one component. The `id` is what
// DashboardPage tracks in state and what a future router would map to a URL.
export const tabs = [
  { id: 'notes', label: 'Notes', Component: NotesTab },
  { id: 'uploads', label: 'Uploads', Component: UploadsTab },
  { id: 'settings', label: 'Settings', Component: SettingsTab },
];

export const DEFAULT_TAB_ID = tabs[0].id;
