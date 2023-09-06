'use client'
import ThemeButton from '@/components/ui/ThemeButton'
import { HomeButton } from '@/components/ui/HomeButton'
import ScaleStatus from '@/components/ui/ScaleStatus'
import hubScale from './sales/components/store/connectionScale'

export function Header () {
    const { isConnected } = hubScale()
    return (
        <section className={'flex flex-row-reverse my-[1rem] mx-[1rem] xl:mx-[6rem] xlg:mx-[6rem]'}>
            <ScaleStatus scaleStatus = {isConnected}/>
            <HomeButton/>
            <ThemeButton/>
        </section>
    )
}
