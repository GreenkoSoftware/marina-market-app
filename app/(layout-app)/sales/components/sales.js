'use client'
import React, { useState } from 'react'
import SaleList from '@/components/ui/SalesList'
import TableInventory from './tableProduct'
const SalesMenu = () => {
    const [searchInput, setSearchInput] = useState(null)
    const [filteredList, setFilteredList] = useState([])
    return (
        <section className='flex flex-col items-center '>
            <section className='flex flex-row items-end gap-5'>
                <TableInventory filteredList={filteredList}/>
                <div className='flex'>
                    <SaleList setFilteredList={setFilteredList} searchInput={searchInput} setSearchInput={setSearchInput}/>
                </div>
            </section>
        </section>
    )
}

export default SalesMenu
