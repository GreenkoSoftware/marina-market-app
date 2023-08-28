'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import PaymentButton from '@/components/ui/PaymentButton'
import { CashIcon } from '@/components/ui/CashIcon'
import { CreditIcon } from '@/components/ui/CreditIcon'
import { InvoiceIcon } from '@/components/ui/InvoiceIcon'
import { TicketIcon } from '@/components/ui/TicketIcon'
import { BillIcon } from '@/components/ui/BillIcon'

export default function PayPage (props) {
    const { setPayment } = props
    return (
        <section>
            <section className="z-10 h-[3rem] w-[80px] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">
                <Button size="lg" className="flex flex-col items-center h-full w-full " isIconOnly variant="ligth" aria-label="" onClick={() => { setPayment(false) } }>volver</Button>
            </section>
            <section className="h-[42rem] w-[48rem] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450 flex flex-col">
                <div className='flex flex-col  w-full h-full mt-16 items-center'>
                    <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white flex-initial">Seleccione el medio de pago</h5>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row  gap-16 mt-10 item-center'>
                            <PaymentButton icon = { <CashIcon/>} title={'EFECTIVO'}/>
                            <PaymentButton icon = { <CreditIcon/>} title={'CREDITO/DEBITO'}/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full h-full items-center'>
                    <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">Seleccione Boleta, factura o Ticket</h5>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row mt-10 gap-12 items-center '>
                            <PaymentButton icon = {<InvoiceIcon/>} title={'FACTURA'}/>
                            <PaymentButton icon = {<BillIcon/>} title={'BOLETA'}/>
                            <PaymentButton icon = {<TicketIcon/>} title={'BOLETA'}/>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}
