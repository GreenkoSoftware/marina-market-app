'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import PaymentButton from '@/components/ui/PaymentButton'
import { CashIcon } from '@/components/ui/CashIcon'
import { CreditIcon } from '@/components/ui/CreditIcon'
import { InvoiceIcon } from '@/components/ui/InvoiceIcon'
import { TicketIcon } from '@/components/ui/TicketIcon'
import { BillIcon } from '@/components/ui/BillIcon'

export default function PayPage (props) {
    const { setPayment } = props
    const [isSelectedBill, setIsSelectedBill] = useState(true)
    const [isSelectedTicket, setIsSelectedTicket] = useState(false)
    const [isSelectedInvoice, setIsSelectedInvoice] = useState(false)

    useEffect(() => {
        if (isSelectedBill) {
            setIsSelectedTicket(false)
            setIsSelectedInvoice(false)
        }
    }, [isSelectedBill])

    useEffect(() => {
        if (isSelectedTicket) {
            setIsSelectedBill(false)
            setIsSelectedInvoice(false)
        }
    }, [isSelectedTicket])

    useEffect(() => {
        if (isSelectedInvoice) {
            setIsSelectedBill(false)
            setIsSelectedTicket(false)
        }
    }, [isSelectedInvoice])

    return (
        <section className='animation-fade-in h-full w-full'>
            <section className="z-10 h-[6%] w-[7rem] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">
                <Button size="lg" className="flex flex-col items-center h-full w-full " isIconOnly variant="ligth" aria-label="" onClick={() => { setPayment(false) } }>volver</Button>
            </section>
            <section className='flex flex-col h-3/4  sm:h-[93%] items-center px-5 py-[1rem] shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]'>
                <div className='flex flex-col  w-full h-full mt-16 items-center'>
                    <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white flex-initial">Seleccione el medio de pago</h5>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row  gap-16 mt-10 item-center'>
                            <PaymentButton icon = { <CashIcon/>} title={'EFECTIVO'} onOpen={true}/>
                            <PaymentButton icon = { <CreditIcon/>} title={'CREDITO/DEBITO'}/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full h-full items-center'>
                    <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">Seleccione Boleta, factura o Ticket</h5>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row mt-10 gap-12 items-center '>
                            <PaymentButton icon = {<BillIcon/>} title={'BOLETA'} isSelected={isSelectedBill} setIsSelected = {setIsSelectedBill} />
                            <PaymentButton icon = {<InvoiceIcon/>} title={'FACTURA'} isSelected={isSelectedInvoice} setIsSelected = {setIsSelectedInvoice}/>
                            <PaymentButton icon = {<TicketIcon/>} title={'TICKET'} isSelected={isSelectedTicket} setIsSelected = {setIsSelectedTicket}/>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}
