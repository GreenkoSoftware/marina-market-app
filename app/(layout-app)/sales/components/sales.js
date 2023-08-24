'use client'
import React from 'react'
import SaleList from '@/components/ui/SalesList'
import Card from '../card'
const SalesMenu = () => {
  return (
    <section className='flex flex-col items-center'>
    <section className='flex flex-row items-end gap-5'>
        <Card/>
        <div className='flex h-full '>
        <SaleList/>
        </div>
    </section>
    </section>
  )
}

export default SalesMenu
