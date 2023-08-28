'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { TicketIcon } from './TicketIcon'

export default function TicketButton ({ productId }) {
    const handleButton = () => {
        const sales = useSalesStore.getState().listSales
        useSalesStore.getState().removeProduct(sales, productId)
    }

    return (
        <div className="flex flex-col items-center  ">
            <Button size="lg" className="flex flex-col items-center h-full w-full mt-10 dark:bg-secondary-300 bg-primary-50" isIconOnly variant="shadow" aria-label=""
                onClick={handleButton}>
                <TicketIcon />
                <p className=" dark:text-white/60 text-black  uppercase  text-xl font-bold ">TICKET</p>
            </Button>
        </div>
    )
}
