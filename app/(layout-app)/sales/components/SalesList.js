/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import SaleListItem from '../../../../components/ui/SalesListItem'
import { Divider, ScrollShadow, Button, Input, Skeleton } from '@nextui-org/react'
import SearchBar from '../../../../components/ui/SearchBar'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { motion } from 'framer-motion'
import useInventoryStore from '../../inventory/store'
import { formatter } from '@/utils/number'
import useScannerStore from '@/stores/scanner'
export default function SaleList (props) {
    const {
        setPayment, payment, setSearchInput,
        paymentTarget,
        voucherTarget, setGoPay, keyFocus, setKeyFocus,
        setPageTarget, loadingSale
    } = props
    const { listSales, totalPrice, units, setUnits, clearList } = useSalesStore()
    const { loading } = useInventoryStore()
    const [inputValue, setInputValue] = useState(1)
    useEffect(() => {
        setInputValue(units)
    }, [units])

    const onChange = (event) => {
        setSearchInput(event.target.value)
        console.log(event.target.value)
    }

    const onClear = () => {
        setSearchInput('')
    }

    const handleButton = () => {
        clearList()
        setPayment(false)
    }
    useEffect(() => {
        if (keyFocus) {
            const focusKey = document.getElementById(keyFocus)
            focusKey?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [keyFocus])
    return (
        <section className='flex flex-col items-center h-full w-full pt-[3.5rem] '>
            <section className='w-full h-full rounded-[14px] bg-primary-50 border border-gray-200 dark:border-secondary-450 shadow  dark:bg-secondary-450 '>
                <section className='flex flex-row px-1'>
                    <SearchBar onChange={onChange} onClear={onClear}/>
                    <Input
                        className='w-auto mt-3 px-2'
                        type="number"
                        label="Unidades"
                        value={inputValue}
                        min={1}
                        onFocusChange={(value) => {
                            if (value) {
                                useScannerStore.getState().setScanFromInputUnits(true)
                            } else {
                                useScannerStore.getState().setScanFromInputUnits(false)
                            }
                        }}
                        onPaste={(e) => { e.preventDefault() }}
                        placeholder={1}
                        defaultValue={1}
                        labelPlacement="inside"
                        onValueChange={(value) => {
                            setTimeout(() => {
                                if (useScannerStore.getState().enabledSetUnits) {
                                    setUnits(value)
                                }
                            }, 100)
                        }}>
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
                        {loading
                            ? <section className="pt-3 pl-3 pr-3 ">
                                <div className="max-w-full w-full flex items-center gap-3">
                                    <div className="w-full flex flex-col gap-5">
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                        <Skeleton className="h-7 w-full rounded-lg"/>
                                    </div>
                                </div>
                            </section>

                            : <ScrollShadow className="w-full h-[31rem] pr-1 ">
                                {listSales?.map((product, index) =>
                                    <section key={index} id={product?.product?.code}>
                                        <Divider orientation="horizontal" />
                                        <SaleListItem product={product} />
                                        <Divider orientation="horizontal" />
                                    </section>
                                )}
                            </ScrollShadow>
                        }

                    </ul>
                </section>

            </section>
            <section className='w-full'>
                {totalPrice
                    ? <Button color="success" variant="shadow" className='text-white mt-2 mb-2 h-[5rem] w-full font-bold text-2xl'
                        onClick={() => {
                            if (!payment) {
                                setPayment(true)
                            } else if (paymentTarget === 1 && voucherTarget) {
                                setGoPay(true)
                            } else if (paymentTarget === 2 && voucherTarget) {
                                // Create sale
                                setPageTarget(true)
                            } else {
                                setGoPay(false)
                            }
                        } }>
                        <div className="text-2xl font-bol flex flex-row gap-4 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}>
                                {loadingSale ? 'Cargando pago ... ' : paymentTarget && voucherTarget ? 'PAGAR  ' : 'TOTAL '}{ formatter.format(totalPrice)}
                                {}
                            </motion.div>
                        </div>

                    </Button>
                    : <></>}
            </section>
        </section>
    )
}
