/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'

export default function PayDetailed ({ isOpen, onClose, setGoPay, totalPay, payDetailed, setPayDetailed, listSales, createSale, paymentTarget, voucherTarget }) {
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

                    <ModalHeader className="flex flex-col gap-3 text-primary-500 dark:text-primary-200">
                        <h1 className='text-4xl'>Calcular pago en efectivo</h1>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col space-y-6">

                            <Input
                                autoFocus={true}
                                type="number"
                                variant={'underlined'}
                                label={ <h1 className='text-2xl'>Monto efectivo</h1>}
                                labelPlacement={'outside'}
                                placeholder={'Ingrese monto de pago'}
                                endContent={<div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>}
                                min={totalPay}
                                className='text-2xl'
                                onValueChange={(value) => { setPayDetailed(value) }}
                            />
                            <h1 className='text-2xl'>{'Pago Total: $' + totalPay}</h1>
                            <h1 className='text-2xl'>{((totalPay - payDetailed) < 0 ? 'Vuelto: $' : 'Faltan: $') + (totalPay - payDetailed) }</h1>

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
