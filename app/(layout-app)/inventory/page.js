/* eslint-disable no-unused-vars */
'use client'
import Auth from '@/app/auth'
import TableProducs from './card'

export default async function Inventory () {
    return (
        <section className='h-full'>
            <Auth/>
            <section className='h-full'>
                <TableProducs />
            </section>
        </section>
    )
}
