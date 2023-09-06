/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import SaleListItem from '../../../../components/ui/SalesListItem'
import { Divider, ScrollShadow, Button, Input } from '@nextui-org/react'
import SearchBar from '../../../../components/ui/SearchBar'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { motion } from 'framer-motion'
import useInventoryStore from '../../inventory/store'

export default function SaleList (props) {
    const {
        setPayment, payment, setSearchInput,
        paymentTarget,
        voucherTarget, setGoPay
    } = props
    const { listSales, totalPrice, units, setUnits, clearList } = useSalesStore()
    const { loading } = useInventoryStore()
    const [inputValue, setInputValue] = useState(1)

    useEffect(() => {
        setInputValue(units)
    }, [units])

    const onChange = (event) => {
        setSearchInput(event.target.value)
    }

    const handleButton = () => {
        clearList()
        setPayment(false)
    }

    return (
        <section className='flex flex-col items-center h-full w-full px-3 pt-[3rem] pb-[0.5rem]'>
            <section className='w-full h-full rounded-[14px] bg-primary-50 border border-gray-200 dark:border-secondary-450 shadow  dark:bg-secondary-450 '>
                <section className='flex flex-row px-1'>
                    <SearchBar onChange={onChange}/>
                    <Input
                        className='w-auto mt-3 px-2'
                        type="number"
                        label="Unidades"
                        value={inputValue}
                        placeholder={1}
                        labelPlacement="inside"
                        onValueChange={(value) => { setUnits(value) }}>
                    </Input>
                </section>
                <section className='mb-4'>
                    {listSales.length > 0
                        ? <div className="flex items-center justify-between px-3">
                            <h5 className=" animation-fade-in text-2xl font-bold leading-none text-gray-900 dark:text-white pt-2">Productos</h5>
                            <Button className='animation-fade-in' color="danger" variant="bordered" onClick={() => (handleButton())}>
                                cancelar
                            </Button>
                        </div>

                        : <h5 className="animation-fade-in m-5 text-2xl font-bold leading-none text-gray-900 dark:text-white">{loading ? 'Espere un momento...' : 'Escanee un producto para comenzar la venta...'}</h5>
                    }
                </section>

                <section className="flow-root px-3 max-h-[44rem]">
                    <ul className="divide-y divide-gray-200 dark:divide-white">
                        <ScrollShadow className="w-full h-[31rem] pr-1 ">
                            {listSales?.map((product, index) =>
                                <section key={index}>
                                    <Divider orientation="horizontal" />
                                    <SaleListItem product={product} />
                                    <Divider orientation="horizontal" />
                                </section>
                            )}
                        </ScrollShadow>

                    </ul>
                </section>

            </section>
            <section className='w-full'>
                {totalPrice
                    ? <Button color="success" variant="shadow" className='text-white mt-3 h-[5rem] w-full font-bold text-2xl'
                        onClick={() => { paymentTarget && voucherTarget ? setGoPay(true) : setPayment(true) }}>
                        <div className="text-2xl font-bol flex flex-row gap-4 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}>
                                {paymentTarget && voucherTarget ? 'PAGAR  $ ' : 'TOTAL  $ '}{Math.floor((totalPrice / 10)) * 10}
                            </motion.div>
                        </div>

                    </Button>
                    : <></>}
            </section>
        </section>
    )
}
