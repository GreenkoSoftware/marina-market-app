/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import toast, { Toaster } from 'react-hot-toast'
import { formatter } from '@/utils/number'
export default function PayDetailed ({ loadingSale, setPayment, isOpen, onClose, setGoPay, totalPay, payDetailed, setPayDetailed, listSales, createSale, paymentTarget, voucherTarget, clearList }) {
    const notify = (text) => toast(text)
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                className={' bg-primary-50 text-primary-500 dark:bg-primary-200 dark:text-primary-500'}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 10000,
                    // style: {
                    //    background: '#363636',
                    //    color: '#fff'
                    // },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black'
                        }
                    }
                }} />
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
                            <h1 className='text-2xl'>{'Pago Total: ' + formatter.format(totalPay) }</h1>
                            <h1 className='text-2xl'>{((totalPay - payDetailed) < 0 ? 'Vuelto: ' : 'Faltan: ') + formatter.format(totalPay - payDetailed < 0 ? -(totalPay - payDetailed) : (totalPay - payDetailed)) }</h1>

                        </div>

                    </ModalBody>
                    <ModalFooter>

                        <Button className =" bg-green-500 text-primary-50"
                            onClick={
                                (totalPay - payDetailed) <= 0
                                    ? () => {
                                        setPayDetailed(null)
                                        createSale(paymentTarget, voucherTarget, listSales, notify, setPayment, onClose, setGoPay, clearList)
                                    }
                                    : () => {
                                        setPayDetailed(null)
                                    }
                            }
                            isLoading={loadingSale}>
                            {((totalPay - payDetailed) <= 0 ? 'Pagar' : 'Verificar pago')}
                        </Button>
                        <Button color="danger" variant="flat"
                            onClick={() => {
                                setPayDetailed(null)
                                onClose()
                                setGoPay(false)
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
