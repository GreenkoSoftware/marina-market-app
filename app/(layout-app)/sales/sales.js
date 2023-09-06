/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import SaleList from '@/app/(layout-app)/sales/components/SalesList'
import { useDisclosure } from '@nextui-org/react'
import TableInventory from './components/tableProduct'
import PayPage from './payPage'
import useSalesStore from './store'
import PayDetailed from './components/payDetailed'
const SalesMenu = () => {
    const [payment, setPayment] = useState(null)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [searchInput, setSearchInput] = useState(null)
    const [goPay, setGoPay] = useState(false)
    const {
        paymentTarget, setPaymentTarget,
        voucherTarget, setVoucherTarget
    } = useSalesStore(({
        paymentTarget, setPaymentTarget,
        voucherTarget, setVoucherTarget
    }) => ({
        paymentTarget,
        setPaymentTarget,
        voucherTarget,
        setVoucherTarget
    }))
    useEffect(() => {
        if (goPay) {
            onOpen()
        }
    }, [goPay])
    return (
        <section className='h-full w-full flex md:flex-col'>
            <div className="flex h-full md:flex-wrap">
                <div className="w-full md:w-[70%] ">
                    {payment
                        ? <PayPage payment={payment} setPayment={setPayment} paymentTarget={paymentTarget} setPaymentTarget={setPaymentTarget}
                            voucherTarget={voucherTarget} setVoucherTarget={setVoucherTarget}/>
                        : <TableInventory setSearchInput={setSearchInput} searchInput={searchInput} />
                    }
                </div>
                <div className="w-full md:w-[30%]">
                    <SaleList payment={payment} setPayment={setPayment} setSearchInput={setSearchInput} paymentTarget={paymentTarget} voucherTarget={voucherTarget} setGoPay={setGoPay}/>
                </div>
                <PayDetailed isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            </div>
        </section>
    )
}

export default SalesMenu
