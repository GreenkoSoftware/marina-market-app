/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import { Button } from '@nextui-org/react'

export default function PaymentButton ({ key, id, icon, title, paymentTarget, setPaymentTarget, voucherTarget, setVoucherTarget }) {
    const handleButton = () => {
        if (setPaymentTarget) {
            setPaymentTarget(id)
        } else if (voucherTarget) {
            setVoucherTarget(id)
        }
    }

    return (
        <div>
            {paymentTarget === id || voucherTarget === id
                ? <Button color="success" size="lg" className="flex flex-col border border-primary-200 dark:border-secondary-200  w-44 h-44  dark:bg-green-600 bg-green-500" isIconOnly variant="shadow" aria-label=""
                    onClick={handleButton}>
                    {icon}
                    <p className="dark:text-white/60 text-black uppercase  text-xl font-bold ">{title}</p>
                </Button>
                : <Button size="lg" className="flex flex-col border border-primary-200 dark:border-secondary-200  w-44 h-44  dark:bg-secondary-500 bg-primary-50" isIconOnly variant="shadow" aria-label=""
                    onClick={handleButton}>
                    {icon}
                    <p className="dark:text-white/60 text-black uppercase  text-xl font-bold ">{title}</p>
                </Button>}
        </div>
    )
}
