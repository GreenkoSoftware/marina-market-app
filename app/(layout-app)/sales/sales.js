'use client'
import React, { useState } from 'react'
import SaleList from '@/app/(layout-app)/sales/components/SalesList'
import TableInventory from './components/tableProduct'
import PayPage from './payPage'
const SalesMenu = () => {
    const [payment, setPayment] = useState(null)
    const [searchInput, setSearchInput] = useState(null)
    return (
        <section className='h-full w-full flex flex-col '>
            <section className='flex flex-row items-end gap-5 h-full w-full'>
                {payment
                    ? <PayPage setPayment={setPayment}/>
                    : <TableInventory setSearchInput={setSearchInput} searchInput={searchInput} />
                }
                <div className='flex'>
                    <SaleList setPayment={setPayment} setSearchInput={setSearchInput}/>
                </div>
            </section>
        </section>
    )
}

export default SalesMenu
