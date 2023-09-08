/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'

export default function PayDetailed ({ isOpen, onClose, setGoPay, totalPay, payDetailed, setPayDetailed, listSales, createSale, paymentTarget, voucherTarget }) {
    const [payValue, setPayValue] = useState(0)
    return (
        <>
            <div className="flex flex-wrap gap-3">
            </div>
            <Modal size={'2xl'}
                isOpen={isOpen}
                backdrop='opaque'
                onClose={() => {
                    onClose()
                    setGoPay()
                }}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent>

                    <ModalHeader className="flex flex-col gap-3 text-primary-500 dark:text-primary-200 gap-y-7">
                        <h1 className='text-4xl font-bold'>CALCULAR PAGO EN EFECTIVO</h1>
                        <section className="flex flex-row items-center justify-center content-between gap-5">
                            <Button className=' w-[8rem] h-[4rem] bg-green-600 text-white font-bold text-lg'
                                onClick={() => setPayValue(1000) }>
                                $1.000
                            </Button>
                            <Button className=' w-[8rem] h-[4rem] bg-indigo-600 text-white font-bold text-lg'
                                onClick={() => setPayValue(2000) }>
                                $2.000
                            </Button>
                            <Button className=' w-[8rem] h-[4rem] bg-red-600 text-white  font-bold text-lg'
                                onClick={() => setPayValue(5000) }>
                                $5.000
                            </Button>
                            <Button className=' w-[8rem] h-[4rem] bg-blue-600 text-white  font-bold text-lg'
                                onClick={() => setPayValue(10000) }>
                                $10.000
                            </Button>
                            <Button className=' w-[8rem] h-[4rem] bg-orange-600 text-white  font-bold text-lg'
                                onClick={() => setPayValue(20000) }>
                                $20.000
                            </Button>
                        </section>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col space-y-6 items-start justify-start content-between">

                            <Input
                                size='lg'
                                autoFocus={true}
                                type="number"
                                variant={'underlined'}
                                label={ <h1 className='text-2xl'>Monto en efectivo</h1>}
                                labelPlacement={'outside'}
                                placeholder={payValue === 0 ? 'Ingrese monto de pago' : payValue}
                                endContent={<div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>}
                                min={totalPay}
                                className='text-2xl'
                                onValueChange={(value) => { setPayValue(value) }}
                            />
                            <div className='grid grid-rows-2 grid-flow-col gap-4 '>
                                <h1 className='text-2xl font-bold'>{'Pago total:'}</h1>
                                <h1 className='text-2xl font-bold text-green-700'>{((totalPay - payValue) < 0 ? 'Vuelto:' : 'Saldo pendiente:')}</h1>
                                <h1 className='text-2xl font-bold '>{ '$' + totalPay}</h1>
                                <h1 className='text-2xl font-bold text-green-700'>{((totalPay - payValue) < 0 ? '$' + (payValue - totalPay) : '$' + (totalPay - payValue))}</h1>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>

                        <Button className =" bg-green-500 text-primary-50"
                            onClick={() => {
                                onClose()
                                setGoPay(false)
                                createSale(paymentTarget, voucherTarget, listSales)
                            }}
                            isLoading={false}>
                            Pagar
                        </Button>
                        <Button color="danger" variant="flat"
                            onClick={() => {
                                onClose()
                                setGoPay(false)
                                // clearStore()
                            }}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </>
    )
}
