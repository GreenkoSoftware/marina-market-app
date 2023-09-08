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
    const [payDetailed, setPayDetailed] = useState(null)
    const [pageTarget, setPageTarget] = useState(null)
    const [keyFocus, setKeyFocus] = useState(null)
    const { totalPrice, clearList, listSales, createSale, loadingSale } = useSalesStore((
        { totalPrice, clearList, listSales, createSale, loadingSale }) => (
        { totalPrice, clearList, listSales, createSale, loadingSale }))
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
                        : <TableInventory setSearchInput={setSearchInput} searchInput={searchInput} setKeyFocus={setKeyFocus}/>
                    }
                </div>
                <div className="w-full md:w-[30%]">
                    <SaleList
                        loadingSale={loadingSale}
                        setPageTarget={setPageTarget}
                        payment={payment} setPayment={setPayment}
                        setSearchInput={setSearchInput}
                        paymentTarget={paymentTarget}
                        voucherTarget={voucherTarget}
                        setGoPay={setGoPay}
                        setKeyFocus={setKeyFocus}
                        keyFocus={keyFocus}
                    />
                </div>
                <PayDetailed isOpen={isOpen}
                    onClose={onClose} onOpen={onOpen}
                    totalPay={totalPrice}
                    setGoPay={setGoPay}
                    setPayDetailed={setPayDetailed}
                    payDetailed={payDetailed}
                    clearList={clearList}
                    listSales={listSales}
                    createSale={createSale}
                    paymentTarget={paymentTarget}
                    voucherTarget={voucherTarget}
                    setPayment={setPayment}
                    loadingSale={loadingSale}
                    pageTarget={pageTarget}
                    setPageTarget={setPageTarget}
                />
            </div>
        </section>
    )
}

export default SalesMenu
