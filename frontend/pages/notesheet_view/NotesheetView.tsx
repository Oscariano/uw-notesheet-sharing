
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import { tabs, DEFAULT_TAB_ID, type TabId } from '@/pages/home/types/tabs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Note } from '../home/types/note';
import StarIcon from '~icons/akar-icons/star';
import DownloadOutlinedIcon from '~icons/ant-design/download-outlined';
import ShareIcon from '~icons/cil/share';
import { Carousel } from "flowbite-react";
import BackIcon from '~icons/entypo/back';
import { useNavigate } from 'react-router';


export default function NotesheetView() {
    const [expandSidebar, _setExpandSidebar] = useState<boolean>(false);
    const [activeTabId, setActiveTabId] = useState<TabId>(DEFAULT_TAB_ID);
    const [notesheet, setNotesheet] = useState<Note>();
    const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
    const { notesheet_id } = useParams();
    const navigate = useNavigate();
    
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
                <button className='text-muted-foreground w-fit flex items-center gap-2 bg-muted px-3 py-1' onClick={() => navigate(-1)}> 
                    <BackIcon style={{fontSize: "0.8rem"}}/>
                    <p>Back</p>
                </button>
                <div className='h-80'>
                    <Carousel
                        slide={false}
                        theme={{ item: { base: "relative h-full w-full" } }}
                        clearTheme={{ item: { base: true } }}
                    >
                        {notesheet?.image_urls?.map((url) => (
                            <img
                                key={url}
                                src={url}
                                alt="Notesheet slide"
                                className="h-full w-full object-cover"
                            />
                        ))}
                    </Carousel>
                </div>
                <div className='flex gap-2 justify-between w-full'>
                    <button className='flex border-2 px-2 gap-1 items-center'>
                        <StarIcon style={{fontSize: "0.8rem"}}/>
                        Save
                    </button>
                    <div className='flex gap-2'>
                        <button className='flex border-2 px-2 gap-1 items-center'>
                            <ShareIcon style={{fontSize: "0.9rem"}}/>
                            Share
                        </button>
                        <button className='flex border-2 px-2 gap-1 items-center'>
                            <DownloadOutlinedIcon style={{fontSize: "0.9rem"}}/>
                            Download
                        </button>
                    </div>
                </div>
                <div>
                    <h1 className='text-3xl'>
                        {notesheet?.title}
                    </h1>
                    <p className='text-muted-foreground'>By: {notesheet?.author}</p>
                    <p className='mt-2 text-lg'>{notesheet?.description}</p>
                </div>
                <div className='flex flex-col gap-2 text-muted-foreground w-full'>
                    <hr className='w-full'/>
                    <div className='flex items-center gap-2 px-2'>
                        <div className='flex flex-col items-center'>
                            <p className='text-2xl'>{notesheet?.view_count}</p>
                            <p className='text-sm'>views</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='text-2xl'>{notesheet?.download_count}</p>
                            <p className='text-sm'>downloads</p>
                        </div>
                    </div>
                    <hr className='w-full'/>
                </div>
            </section>
        </main>
    )
}