'use client'
import ThemeButton from '@/components/ui/ThemeButton'
import { HomeButton } from '@/components/ui/HomeButton';
export function Header () {
  return (
    <section className={'flex flex-row-reverse mr-[1rem] mt-[1rem] xl:mx-[13rem] xl:space-x-3'}>
      <HomeButton/>
      <ThemeButton/>   
    </section>
  );
}
