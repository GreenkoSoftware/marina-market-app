'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Image } from '@nextui-org/react'
import { ConvertBytesToImage, DefaultImageMarinaMarket } from '@/utils/image'

const onSubmitHandler = (product, value, setIsAcepted, setUnits) => {
    product.price = Math.round(product?.price * value)
    setUnits(value)
    setIsAcepted(true)
}
export default function WeighingScaleModal ({ isOpen, onClose, product, value, setIsAcepted, setUnits }) {
    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} >
                <ModalContent className=''>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1  text-primary-500 dark:text-primary-200">Pesa de productos</ModalHeader>
                            <ModalBody>
                                <Card
                                    isBlurred
                                    className="border-none bg-background/60 dark:bg-default-100/50 w-full"
                                    shadow="sm"
                                >
                                    <CardBody>
                                        <div className="flex flex-row gap-10 items-center justify-center">
                                            <div className="relative col-span-6 md:col-span-4">
                                                <h3 className="text-2xl font-semibold text-foreground/90">{product?.name.toUpperCase()}</h3>
                                                <p className="text-small text-foreground/80">{product?.code}</p>
                                                <Image
                                                    shadow="none"
                                                    radius="lg"
                                                    width="100"
                                                    height="100"
                                                    alt={product?.name}
                                                    className="w-full object-cover h-[7rem] mt-2 bg-slate-100 dark:bg-white"
                                                    src={product?.image?.length ? ConvertBytesToImage({ imageBytes: product?.image }) : DefaultImageMarinaMarket()}
                                                />
                                            </div>

                                            <div className="flex flex-col col-span-6 md:col-span-8">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex flex-col gap-0">
                                                        <div className='flex justify-between gap-2'>
                                                            <h1 className="text-large font-medium mt-2">PESO</h1>
                                                            <div className='flex flex-row gap-1'>
                                                                <h1 className="text-large text-teal-500 font-medium mt-2">{value}</h1>
                                                                <h1 className="text-xs text-zinc-400 font-medium mt-4">kg</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex felx-row gap-5'>
                                                            <h1 className="text-sm font-medium mt-2">PRECIO POR KILO</h1>
                                                            <h1 className="text-lg text-lime-500 font-medium mt-2">${product?.netPrice}</h1>
                                                        </div>
                                                        <div className='flex felx-row gap-5 mt-8'>
                                                            <Button color="success" variant="bordered" className='w-full'>
                                                                <h1 className="text-large font-medium ">TOTAL</h1>
                                                                <h1 className="text-large font-xl">$ {product?.netPrice * value}</h1>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </ModalBody>
                            <ModalFooter>
                                <section className='flex flex-row w-full justify-center'>
                                    <Button className ="dark w-full" onClick = {() => onSubmitHandler(product, value, setIsAcepted, setUnits)} onPressEnd={onClose}>
                                    Aceptar
                                    </Button>
                                    <Button className='w-full' color="danger" variant="light" onClick={onClose}>
                                    Cancelar
                                    </Button>
                                </section>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
