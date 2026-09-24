
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import { tabs, DEFAULT_TAB_ID, type TabId } from '@/pages/home/types/tabs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Note } from '../home/types/note';

export default function NotesheetView() {
    const [expandSidebar, _setExpandSidebar] = useState<boolean>(false);
    const [activeTabId, setActiveTabId] = useState<TabId>(DEFAULT_TAB_ID);
    const [notesheet, setNotesheet] = useState<Note>();
    const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
    const { notesheet_id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/api/notesheet/${notesheet_id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load note');
                return res.json();
            })
            .then((data)=>{setNotesheet(data)})
            .catch((err) => {
                console.error(err)
            });
    }, [])

    return (
        <main className="flex flex-col min-h-screen">
            <Header expandSidebar={expandSidebar} onCloseSidebar={_setExpandSidebar}/>
            <Sidebar activeTabId={activeTabId} onSelectTab={setActiveTabId} expandSidebar={expandSidebar} onCloseSidebar={_setExpandSidebar}/>
            
            <section className="px-4 mt-20 flex flex-col gap-4">
                <img src={notesheet?.image_urls[0]} className='b-1'>
                </img>
                <h1 className='text-3xl'>
                    {notesheet?.title}
                </h1>
                <p className='text-gray-500'>By: {notesheet?.author}</p>
                <p className='text-gray-500'>{notesheet?.description}</p>
                <p className='text-gray-500'>{notesheet?.saved_count}</p>
            </section>
        </main>
    )
}