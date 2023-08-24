/* eslint-disable no-unused-vars */
'use client'
import Auth from '@/app/auth'
import TableProducs from './card'
import CreateProduct from './components/NewProduct/createProduct'
import ScannerDetection from '@/components/ScannerDetection/ScannerDetection'

export default async function Inventory () {
    return (
        <section>
            <ScannerDetection/>
            <CreateProduct/>
            <Auth/>
            <TableProducs />
        </section>
    )
}
