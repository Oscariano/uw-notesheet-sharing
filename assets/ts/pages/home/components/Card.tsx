import { type Note } from '@/pages/home/types/note';
import { useState } from 'react';
import StarIcon from '~icons/akar-icons/star';

export default function Card({note}:{note: Note}) {
  
  const [savedCount, setSavedCount] = useState(note.saved_count)

  function addSavedCount() {
    setSavedCount(savedCount + 1);

  }

  return (
    <>
      <article className="border-2 border-border w-full aspect-square flex flex-col bg-card text-foreground">
        <img src={note.image_urls[0]} alt={note.title} className='w-full h-full object-cover border-border border-b-2' />
        <div className='p-4'>
          <h3 className='text-2xl'>{note.title}</h3>
          <p className='font-extralight text-muted-foreground'>by {note.author}</p>
          <div className='mt-2'>
            <span className='border-2 px-2 text-sm bg-lilac text-lilac-foreground border-lilac-foreground/30'>Midterm</span>
          </div>
          <hr className='my-2 border-0 h-[0.1rem] bg-border'/>
          <div className='flex justify-between text-muted-foreground items-center'>
            <p>Autumn 2025</p>
            <button className='flex border-2 px-2 gap-1 items-center' onClick={addSavedCount}>
              <StarIcon style={{fontSize: "0.8rem"}}/>
              {savedCount}
            </button>
          </div>
        </div>
      </article>
    </>    
  );
}