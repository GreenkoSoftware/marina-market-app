'use client'
import { Navigation } from '@/components/navigation/Navigation'
import { Header } from './header'
import { motion } from 'framer-motion'

export default function LayoutApp ({ children }) {
    return (

        <section className="min-h-full w-screen h-full bg-primary-200 dark:bg-secondary-500 overflow-x-hidden">
            <motion.div
                className='min-h-full flex flex-col'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0, 0.71, 0.2, 1.01]
                }}>

                <header className="sticky z-20 bg-primary-200 dark:bg-secondary-500 top-0 h-[4rem]">
                    <Header/>
                </header>
                <div className="flex-1 flex flex-col sm:flex-row  pt-[1rem]">
                    <main className="flex-1 mx-[1rem] xl:mx-[6rem] xlg:mx-[10rem]">
                        {children}
                    </main>
                </div>
                <footer className="sticky z-20 bg-primary-200 dark:bg-secondary-500 bottom-0 h-[6rem] pt-[1rem]">
                    {<Navigation/>}
                </footer>
            </motion.div>
        </section>
    )
}
