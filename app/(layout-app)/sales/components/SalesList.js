/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import SaleListItem from '../../../../components/ui/SalesListItem'
import { Divider, ScrollShadow, Button, Input } from '@nextui-org/react'
import SearchBar from '../../../../components/ui/SearchBar'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { motion } from 'framer-motion'

export default function SaleList ({ setPayment, payment }) {
    const { listSales, totalPrice, units, setUnits, clearList } = useSalesStore()
    const [inputValue, setInputValue] = useState(1)

    useEffect(() => {
        setInputValue(units)
    }, [units])

    return (
        <section className='flex flex-col rounded-[12px] h-[53rem] ' >
            <div className="h-full w-full flex-initial max-w-md rounded-[12px] bg-white border border-gray-200 dark:border-secondary-450 shadow   dark:bg-secondary-450">
                <section className='flex flex-row'>
                    <SearchBar></SearchBar>
                    <Input
                        className='pr-6 mt-3'
                        type="number"
                        label="Unidades"
                        value={inputValue}
                        placeholder={1}
                        labelPlacement="inside"
                        onValueChange={(value) => { setUnits(value) }}>
                    </Input>
                </section>

                {listSales.length > 0
                    ? <div className="flex items-center justify-between mb-4 h-[4rem] px-6">
                        <h5 className=" animation-fade-in text-2xl font-bold leading-none text-gray-900 dark:text-white pt-2">Productos</h5>
                        <Button className='w-[2rem] animation-fade-in' color="danger" variant="bordered" onClick={() => (clearList())}>
                        cancelar
                        </Button></div>

                    : <h5 className=" animation-fade-in m-5 text-2xl font-bold leading-none text-gray-900 dark:text-white pt-2">Escanee un producto para comenzar la venta...</h5>
                }
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
