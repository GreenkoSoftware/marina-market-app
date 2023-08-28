'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import { CashIcon } from './CashIcon'
import useSalesStore from '@/app/(layout-app)/sales/store'

export default function CashButton ({ productId }) {
    const handleButton = () => {
        const sales = useSalesStore.getState().listSales
        useSalesStore.getState().removeProduct(sales, productId)
    }

    return (
        <div className="flex flex-col items-center h-auto w-auto">
            <Button size="lg" className="flex flex-col items-center h-full w-full mt-10 dark:bg-secondary-300 bg-primary-50" isIconOnly variant="shadow" aria-label=""
                onClick={handleButton}>
                <CashIcon />
                <p className="dark:text-white/60 text-black  uppercase  text-xl font-bold ">EFECTIVO</p>
            </Button>
        </div>
    )
}