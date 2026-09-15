import { useEffect, useState } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/pages/home/components/Header';
import Card from '@/pages/home/components/Card';
import { tabs, DEFAULT_TAB_ID, type TabId } from '@/pages/home/types/tabs';
import { type Note } from './types/note';

export default function Home() {
  const [activeTabId, setActiveTabId] = useState<TabId>(DEFAULT_TAB_ID);
  const [expandSidebar, _setExpandSidebar] = useState<boolean>(false);
  const [note, setNote] = useState<Note[]>();

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  useEffect(() => {
    fetch('http://localhost:8000/api/notesheets/?format=json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load note');
        return res.json();
      })
      .then((data)=>{setNote(data)})
      .catch((err) => {
        console.error(err)
      });
  });

  return (
    <main className="flex flex-col min-h-screen">
      <Header expandSidebar={expandSidebar} onCloseSidebar={_setExpandSidebar}/>
      <Sidebar activeTabId={activeTabId} onSelectTab={setActiveTabId} expandSidebar={expandSidebar} onCloseSidebar={_setExpandSidebar}/>
      <div className={`fixed transition-all duration-300 w-full h-[100vh] pointer-events-none ${expandSidebar ? 'bg-black/10 backdrop-blur-sm' : 'w-0 h-0'}`}></div>
      <section className="px-4 mt-20 flex flex-col gap-4">
        { note && (
          note.map((note) => (
            <Card note={note}/>
          ))
        )}
      </section>
    </main>
  );
}

//https://www.youtube.com/watch?v=TmsD8QExZ84