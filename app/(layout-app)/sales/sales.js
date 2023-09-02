/* eslint-disable no-unused-vars */
'use client'
import React, { useState } from 'react'
import SaleList from '@/app/(layout-app)/sales/components/SalesList'
import TableInventory from './components/tableProduct'
import PayPage from './payPage'
const SalesMenu = () => {
    const [payment, setPayment] = useState(null)
    const [searchInput, setSearchInput] = useState(null)
    return (
        <section className='h-full w-full flex md:flex-col'>
            <div className="flex h-full md:flex-wrap">
                <div className="w-full md:w-[70%] ">
                    {payment
                        ? <PayPage setPayment={setPayment}/>
                        : <TableInventory setSearchInput={setSearchInput} searchInput={searchInput} />
                    }
                </div>
                <div className="w-full md:w-[30%]">
                    <SaleList setPayment={setPayment} setSearchInput={setSearchInput}/>
                </div>
            </div>
        </section>
    )
}

export default SalesMenu
