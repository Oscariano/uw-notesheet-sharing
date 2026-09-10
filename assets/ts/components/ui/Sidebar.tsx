import SidebarItem from '@/components/ui/SidebarItem';
import { tabs, type TabId } from '@/pages/dashboard/tabs';

interface SidebarProps {
  activeTabId: TabId;
  onSelectTab: (tabId: TabId) => void;
  expandSidebar?: boolean;
}

export default function Sidebar({ activeTabId, onSelectTab, expandSidebar }: SidebarProps) {
  if (expandSidebar !== true) return null;

  return (
    <aside className="px-2 flex w-60 flex-col gap  border-r-2">
      <h1 className="">
        NoteHub
      </h1>
      <nav className="flex flex-col">
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
