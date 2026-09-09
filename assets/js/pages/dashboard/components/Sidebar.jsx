import SidebarItem from '@/pages/dashboard/components/SidebarItem';
import { tabs } from '@/pages/dashboard/tabs';

export default function Sidebar({ activeTabId, onSelectTab }) {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="px-6 py-5 text-lg font-bold tracking-tight">
        NoteHub
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {tabs.map((tab) => (
          <SidebarItem
            key={tab.id}
            label={tab.label}
            isActive={tab.id === activeTabId}
            onClick={() => onSelectTab(tab.id)}
          />
        ))}
      </nav>
    </aside>
  );
}
