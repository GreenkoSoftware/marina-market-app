'use client'
import Auth from '@/app/auth'
import Cards from './card'
import ScannerDetection from '@/components/ScannerDetection/ScannerDetection'
import CreateProduct from './components/NewProduct/createProduct'

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
