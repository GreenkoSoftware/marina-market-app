'use client'
import Auth from '@/app/auth'
import SalesMenu from './sales'
import ScannerDetection from '@/components/ScannerDetection/ScannerDetection'

export default function Sales () {
    return (
        <section>
            <Auth/>
            <ScannerDetection/>
            <SalesMenu/>
        </section>
    )
}
