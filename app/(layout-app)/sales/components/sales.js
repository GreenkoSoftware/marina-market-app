'use client'
import React from 'react'
import SaleList from '@/components/ui/SalesList'
import TableInventory from '../tableProduct'
const SalesMenu = () => {
    return (
        <section className='flex flex-col items-center '>
            <section className='flex flex-row items-end gap-5'>
                <TableInventory/>
                <div className='flex'>
                    <SaleList/>
                </div>
            </section>
        </section>
    )
}

export default SalesMenu
