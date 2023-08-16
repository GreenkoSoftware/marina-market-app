'use client'
import { useRouter } from 'next/navigation'
import { AiFillSetting } from 'react-icons/ai';
export function Header () {
  const router = useRouter()
  return (
    <header className={'flex  flex-row-reverse mt-[1rem] mx-[5rem]'}>   
         <AiFillSetting className="w-10 h-10 cursor-pointer fill-primary-500" onClick={()=>{router.push('/application')}}/>
    </header>
  );
}