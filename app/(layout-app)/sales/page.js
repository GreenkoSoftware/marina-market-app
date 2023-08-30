'use client'
import Auth from '@/app/auth'
import SalesMenu from './sales'
import { useEffect } from 'react'
import useSalesStore from './store'

export default function Sales () {
    useEffect(() => {
        console.log('Sales')
        useSalesStore.getState()?.enabledScanner()
    }, [])
    return (
        <section className='h-full'>
            <Auth/>
            <div className='h-full'>
                <SalesMenu/>
            </div>
        </section>
    )
}
