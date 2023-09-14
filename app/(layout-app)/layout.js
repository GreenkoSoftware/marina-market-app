'use client'
import { Navigation } from '@/components/navigation/Navigation'
import { Header } from './header'
import { motion } from 'framer-motion'
import ScannerDetection from '@/components/ScannerDetection/ScannerDetection'

export default function LayoutApp ({ children }) {
    return (

        <section className="min-h-full w-screen h-full bg-primary-200 dark:bg-secondary-500 overflow-x-hidden">
            <ScannerDetection/>
            <motion.div
                className='min-h-full flex flex-col'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0, 0.71, 0.2, 1.01]
                }}>

                <header className="sticky z-20 bg-primary-200 dark:bg-secondary-500 top-0 h-[3rem]">
                    <Header/>
                </header>
                <div className="flex-1 flex flex-row ">
                    <main className="flex-1 mx-[1rem] xl:mx-[1rem] xlg:mx-[1rem]">
                        {children}
                    </main>
                </div>
                <footer className="sticky z-20 bg-primary-200 dark:bg-secondary-500 bottom-0  pt-2 pb-2">
                    {<Navigation/>}
                </footer>
            </motion.div>
        </section>
    )
}
