import SidebarItem from '@/components/ui/SidebarItem';
import { tabs, type TabId } from '@/pages/home/types/tabs';
import CrossIcon from '~icons/at-icons/cross';

interface SidebarProps {
  activeTabId: TabId;
  onSelectTab: (tabId: TabId) => void;
  expandSidebar?: boolean;
  onCloseSidebar: (expandSidebar: boolean) => void;
}

export default function Sidebar({ activeTabId, onSelectTab, expandSidebar, onCloseSidebar }: SidebarProps) {
  if (expandSidebar !== true) return null;

  return (
    <aside className="px-4 py-4 flex w-80 h-screen flex-col border-r-4 border-[#ccbc96] fixed bg-[#efe8d6] justify-between">
      <section className="flex flex-col">
        <CrossIcon onClick={()=> onCloseSidebar(false)} style={{color: "#3b362f", fontSize: "0.6em"}} className='self-end'/>
        <h1 className='font-bold text-3xl mb-4'>
          NoteHub
        </h1>
        <nav className="flex flex-col gap-1">
          {tabs.map((tab) => (
            <SidebarItem
              key={tab.id}
              label={tab.label}
              Icon={tab.Icon}
              isActive={tab.id === activeTabId}
              onClick={() => onSelectTab(tab.id)}
            />
          ))}
        </nav>
      </section>
      <section className="border-t-4 border-[#ccbc96]">
        <div>
          <img src="" alt="" />
          Oscar Song
        </div>
      </section>
    </aside>
  );
}
