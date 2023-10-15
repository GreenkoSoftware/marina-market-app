'use client'
import MainTittleCard from '@/components/ui/MainCard'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Auth from '../auth'
import UserAvatar from '../../components/ui/UserAvatar'
import inventory from '@/assets/images/inventory.webp'
import reports from '@/assets/images/report.jpeg'
import sales from '@/assets/images/sales.jpeg'
import { isMobileDevice } from '@/utils/agent'

export default function Home () {
    const [salesDisabled, setSalesDisabled] = useState(true)
    useEffect(() => {
        if (navigator) {
            const isMobile = isMobileDevice()
            setSalesDisabled(isMobile)
        }
    }, [])
    return (
        <section className="h-full w-full  flex flex-col bg-primary-300 dark:bg-secondary-500" >
            <Auth/>
            <div className="sm:flex-row sm:mt-36 sm:ml-5 sm:mr-5 sm:mb-0 ">
                <main>
                    <div className="flex flex-col items-end sm:mr-0 mr-5 sm:ml-0 ml-5 sm:mt-0 mt-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className="gap-5 grid grid-cols-3 grid-rows-[auto_minmax(auto,_1fr)_auto] "
                        >
                            <MainTittleCard
                                disabled={salesDisabled}
                                route ="/sales"
                                title="Ventas"
                                imgSrc={sales}
                                footerMessage="Gestión eficiente para tu minimarket."
                            />
                            <MainTittleCard
                                route="/inventory"
                                title="Inventario"
                                imgSrc={inventory}
                                footerMessage="Optimiza existencias en tiempo real."
                            />
                            <MainTittleCard
                                route ="/reports"
                                title="Reportes"
                                imgSrc={reports}
                                footerMessage="Datos clave para decisiones informadas y estratégicas."
                            />
                        </motion.div>
                        <div className="flex sm:flex-row-reverse sm:items-end sm:m-0 m-5 justify-end ">
                            <UserAvatar />
                        </div>
                    </div>
                </main>
            </div>
        </section>

    )
}
