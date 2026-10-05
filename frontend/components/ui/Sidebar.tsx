import SidebarItem from '@/components/ui/SidebarItem';
import { tabs, type TabId } from '@/pages/home/types/tabs';
import CrossIcon from '~icons/at-icons/cross';
import { useAuth } from '@/lib/context/AuthContext';
import { useNavigate } from 'react-router';
import UserOutlinedIcon from '~icons/ant-design/user-outlined';

interface SidebarProps {
  activeTabId: TabId;
  onSelectTab: (tabId: TabId) => void;
  expandSidebar?: boolean;
  onCloseSidebar: (expandSidebar: boolean) => void;
}


export default function Sidebar({ activeTabId, onSelectTab, expandSidebar, onCloseSidebar }: SidebarProps) {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className={`px-4 py-4 flex h-screen flex-col fixed bg-[#efe8d6] justify-between transition-all duration-300 ease-in-out z-10 text-xl ${
        expandSidebar ? 'w-70 opacity-100' : 'w-0 px-0 opacity-0 pointer-events-none'
      }`}>
      <section className="flex flex-col">
        <CrossIcon onClick={()=> onCloseSidebar(false)} style={{color: "#3b362f", fontSize: "0.6em"}} className='self-end my-3'/>
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
      <section onClick={() => navigate('/login')} className="border-t-3 border-border py-4">
        { isAuthenticated ? (
          <div className='flex items-center gap-1 border-1 border-border px-4 py-2 w-full bg-primary-foreground'>
            <img src={user?.avatarUrl ?? ''} alt="" className='w-10 h-10 rounded-full'/>
            <p className='text-lg font-bold'>{user?.username}</p>
          </div>
        ) : (
          <button className='flex items-center gap-1 border-1 border-border px-4 py-2 w-full bg-primary-foreground' onClick={() => navigate('/login')}> 
            <UserOutlinedIcon style={{fontSize: "1.2em", color: "var(--muted-foreground)"}}/>
            <p className='text-muted-foreground px-2 py-1'>Login / Sign Up</p>
          </button>
        )}
      </section>
    </aside>
  );
}
