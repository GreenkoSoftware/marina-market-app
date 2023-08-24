'use client'
import Auth from '@/app/auth'
import Cards from './card'
import CreateProduct from './components/createProduct'
import ScannerDetection from '@/components/ScannerDetection/ScannerDetection'

export default function Inventory () {
    return (
        <section>
            <ScannerDetection/>
            <CreateProduct/>
            <Auth/>
            <Cards/>
        </section>
    )
}
