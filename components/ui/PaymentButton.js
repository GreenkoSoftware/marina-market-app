'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import useSalesStore from '@/app/(layout-app)/sales/store'

export default function PaymentButton ({ productId, icon, title }) {
    const handleButton = () => {
        const sales = useSalesStore.getState().listSales
        useSalesStore.getState().removeProduct(sales, productId)
    }

    return (
        <div>
            <Button size="lg" className="flex flex-col border border-primary-200 dark:border-secondary-200  w-44 h-44  dark:bg-secondary-300 bg-primary-50" isIconOnly variant="shadow" aria-label=""
                onClick={handleButton}>
                {icon}
                <p className="dark:text-white/60 text-black uppercase  text-xl font-bold ">{title}</p>
            </Button>
        </div>
    )
}
