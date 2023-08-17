'use client'
import { useRouter } from 'next/navigation'
import { AiFillHome } from 'react-icons/ai';

export function HomeButton () {
  const router = useRouter()
  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700'
      onClick={()=>{router.push('/home')}}
    >
        <AiFillHome className="w-10 h-10 cursor-pointer fill-primary-500"/>
    </button>
  );
}
