/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import SaleListItem from './SalesListItem'
import { Divider, ScrollShadow, Button } from '@nextui-org/react'
import SearchBar from './SearchBar'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { motion } from 'framer-motion'

export default function SaleList ({ setPayment, payment }) {
    const { listSales, totalPrice } = useSalesStore()

    return (
        <section className='flex flex-col rounded-[12px] h-[48rem] ' >
            <div className="h-full w-full flex-initial max-w-md rounded-[12px] bg-white border border-gray-200 dark:border-secondary-450 shadow   dark:bg-secondary-450">
                <section >
                    <SearchBar></SearchBar>
                </section>
                <div className="flex items-center justify-between mb-4 px-8">
                    <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white pt-2">Productos</h5>
                </div>
                <div className="flow-root max-h-[44rem] w-full">
                    <ul role="list" className="divide-y  divide-gray-200 dark:divide-white pr-8 pl-8">
                        <ScrollShadow className="w-[420px] h-[28rem] pr-6">
                            {listSales?.map((product, index) =>
                                <section key={index}>
                                    <Divider orientation="horizontal" />
                                    <SaleListItem product={product} />
                                    <Divider orientation="horizontal" />
                                </section>
                            )}
                        </ScrollShadow>

                    </ul>
                </div>
            </div>

            {totalPrice
                ? <Button color="success" variant="shadow" className='text-white mt-3 h-[8rem] w-auto font-bold text-2xl'
                    onClick={() => { setPayment(true) }}>
                    <div className="text-2xl font-bol flex flex-row gap-4 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}>
                            <a>TOTAL  $ {totalPrice }</a>
                        </motion.div>
                    </div>

                </Button>
                : <></>}
        </section>
    )
}
