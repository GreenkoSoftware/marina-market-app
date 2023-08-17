'use client'
import ThemeButton from '@/components/ui/ThemeButton'
import { HomeButton } from '@/components/ui/HomeButton';
export function Header () {
  return (
    <section className={'flex flex-row-reverse mt-[1rem] mx-[13rem] space-x-3'}>
      <HomeButton/>
      <ThemeButton/>   
    </section>
  );
}
