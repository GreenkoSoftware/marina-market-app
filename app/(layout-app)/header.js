'use client'
import ThemeButton from '@/components/ui/ThemeButton'
import { HomeButton } from '@/components/ui/HomeButton'
export function Header () {
    return (
        <section className={'flex flex-row-reverse my-[1rem] mx-[1rem] xl:mx-[6rem] xlg:mx-[6rem]'}>
            <HomeButton/>
            <ThemeButton/>
        </section>
    )
}
