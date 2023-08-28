'use client'
import Auth from '@/app/auth'
import SalesMenu from './components/sales'
import { useEffect } from 'react'
import useSalesStore from './store'

export default function Sales () {
    useEffect(() => {
        console.log('Sales')
        useSalesStore.getState()?.enabledScanner()
    }, [])
    return (
        <section>
            <Auth/>
            <SalesMenu/>
        </section>
    )
}
