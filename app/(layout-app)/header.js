'use client'
import ThemeButton from '@/components/ui/ThemeButton'
import { HomeButton } from '@/components/ui/HomeButton'
import ScaleStatus from '@/components/ui/ScaleStatus'
import hubScale from './sales/components/store/connectionScale'

export function Header () {
    const { isConnected } = hubScale()
    return (
        <section className={'flex flex-row-reverse mr-[1rem] mt-[1rem] xl:mx-[13rem] xl:space-x-3'}>
            <ScaleStatus scaleStatus = {isConnected}/>
            <HomeButton/>
            <ThemeButton/>
        </section>
    )
}
