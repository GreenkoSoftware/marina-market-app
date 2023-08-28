'use client'
import BillButton from '@/components/ui/BillButton'
import CashButton from '@/components/ui/CashButton'
import CreditButton from '@/components/ui/CreditButton'
import InvoiceButton from '@/components/ui/InvoiceButton'
import TicketButton from '@/components/ui/TicketButton'
import React from 'react'
import { Button } from '@nextui-org/react'

export default function PayPage (props) {
    const { setPayment } = props
    return (
        <section>
            <section className="z-10 h-[3rem] w-[80px] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">

                <Button size="lg" className="flex flex-col items-center h-full w-full " isIconOnly variant="ligth" aria-label="" onClick={() => { setPayment(false) } }>volver</Button>

            </section>

            <section className="z-10 h-[42rem] w-[48rem] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450 flex flex-col items-center ">
                <div className='items-center'>
                    <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white pt-10 pl-5 flex-initial">Seleccione el medio de pago</h5>
                    <div className='flex flex-row h-[10rem] w-[260px] ml-14 gap-28 '>
                        <CashButton></CashButton>
                        <CreditButton></CreditButton>
                    </div>
                </div>
                <div className='items-center mt-10'>
                    <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white pt-10 pl-5">Seleccione Boleta, factura o Ticket</h5>
                    <div className='flex flex-row h-[10rem] w-[260px] ml-14  gap-28'>
                        <InvoiceButton></InvoiceButton>
                        <BillButton></BillButton>
                        <TicketButton></TicketButton>
                    </div>
                </div>

            </section>
        </section>
    )
}
