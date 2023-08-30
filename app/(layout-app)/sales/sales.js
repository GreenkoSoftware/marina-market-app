'use client'
import React, { useState } from 'react'
import SaleList from '@/components/ui/SalesList'
import TableInventory from './components/tableProduct'
import PayPage from './payPage'
const SalesMenu = () => {
    const [payment, setPayment] = useState(null)
    return (
        <section className='h-full flex flex-col items-center '>
            <section className='flex flex-row items-end gap-5'>
                {payment
                    ? <PayPage setPayment={setPayment}/>
                    : <TableInventory/>
                }
                <div className='flex'>
                    <SaleList setPayment={setPayment}/>
                </div>
            </section>
        </section>
    )
}

export default SalesMenu
