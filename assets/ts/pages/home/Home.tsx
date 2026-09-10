import { useState } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import { tabs, DEFAULT_TAB_ID, type TabId } from '@/pages/dashboard/tabs';
import MenuIcon from '~icons/boxicons/menu';

export default function Home() {
  const [activeTabId, setActiveTabId] = useState<TabId>(DEFAULT_TAB_ID);
  // Nothing toggles the sidebar yet; the menu icon is not wired up.
  const [expandSidebar, _setExpandSidebar] = useState(false);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const ActiveComponent = activeTab.Component;

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <MenuIcon />
      <Sidebar activeTabId={activeTabId} onSelectTab={setActiveTabId} expandSidebar={expandSidebar}/>
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">{activeTab.label}</h1>
        </header>
        <ActiveComponent />
      </main>
    </div>
  );
}
