'use client'
import ThemeButton from '@/components/ui/ThemeButton'
import { HomeButton } from '@/components/ui/HomeButton';
export function Header () {
  return (
    <header className={'sticky z-20 bg-primary-200 top-0 flex  flex-row-reverse mt-[1rem] mx-[9.5rem] mb-[1rem] space-x-3'}>
      <HomeButton/>
      <ThemeButton/>   
    </header>
  );
}
