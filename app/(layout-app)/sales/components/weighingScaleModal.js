/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Image, Input } from '@nextui-org/react'
import { ConvertBytesToImage, DefaultImageMarinaMarket } from '@/utils/image'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { getIdUser } from '@/services/user'
import hubScale from './store/connectionScale'
import useSalesStore from '../store'

export default function WeighingScaleModal ({ isOpen, onClose, product }) {
    const [handShake, setHandShake] = useState(false)
    const [url, setUrl] = useState(null)
    const [manualMode, setManualMode] = useState(false)
    const [valueKg, setValueKg] = useState(1)
    const { setIsConnected } = hubScale()

    const { listSales, addFromNewSales, offers } = useSalesStore()

    const {
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket
    } = useWebSocket(url, {
        onOpen: () => {
            setHandShake(true)
        },
        // Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true
    })
    const handleOnClose = () => {
        onClose()
    }

    const onSubmitHandler = (product, unitsKg) => {
        addFromNewSales(listSales, product, unitsKg, offers)
    }
    /* Last message ws from fleet status */
    useEffect(() => {
        if (lastMessage) {
            const message = lastMessage?.data.substring(0, 5)
            const data = parseFloat(message)
            setValueKg(data)
        }
    }, [lastMessage])

    useEffect(() => {
        if (isOpen) {
            setValueKg(1)
            setManualMode(false)
            useSalesStore.getState()?.disabledScanner()
        } else {
            useSalesStore.getState()?.enabledScanner()
        }
    }, [isOpen])

    useEffect(() => {
        if (manualMode) {
            setValueKg(1)
        }
    }, [manualMode])

    useEffect(() => {
        console.log(connectionStatus)
        if (connectionStatus === 'Closed') {
            setIsConnected(false)
        } else if (connectionStatus === 'Open') {
            setIsConnected(true)
        }
    }, [readyState])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
    }[readyState]
    useEffect(() => {
        setUrl('ws://localhost:8080/food-scale/' + getIdUser())
    }, [])

    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalContent className=''>

                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200 ">Pesa de productos
                        <Button color="success" variant="ghost" className='w-full'
                            onClick={() => { setManualMode(!manualMode) }}
                        >
                            {manualMode
                                ? 'MODO MANUAL'
                                : 'MODO AUTOMATICO'}
                        </Button>
                    </ModalHeader>
                    <ModalBody className='flex flex-col '>
                        <Card
                            isBlurred
                            className="border-none w-full"
                            shadow="sm"
                        >
                            <CardBody>
                                <div className="flex flex-row gap-10   content-between">
                                    <div className="col-span-6 md:col-span-4 dark:bg-default-100/50 bg-default-100/70 rounded-xl">
                                        <Image
                                            shadow="none"
                                            radius="lg"
                                            width="100"
                                            height="100"
                                            alt={product?.name}
                                            className="w-full object-cover h-[10rem] bg-slate-100 dark:bg-white"
                                            src={product?.image?.length ? ConvertBytesToImage({ imageBytes: product?.image }) : DefaultImageMarinaMarket()}
                                        />
                                        <div className='m-5'>
                                            <h3 className="text-2xl font-semibold text-foreground/90">{product?.name.toUpperCase()}</h3>
                                            <p className="text-small text-foreground/80">{product?.code}</p>
                                            <div className='flex felx-row gap-5'>
                                                <h1 className="text-lg font-medium">PRECIO KILO</h1>
                                                <h1 className="text-lg text-lime-500 ">${product?.price}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    {!manualMode
                                        ? <div className="flex flex-col items-center justify-center content-between gap-2 h-full">
                                            <div className="flex  items-start h-full w-full">
                                                <div className="flex flex-col gap-5 h-full">
                                                    <div className='flex flex-col items-center gap-2 h-full'>
                                                        <h1 className="text-large font-medium mt-2">PESO REGISTRADO</h1>
                                                        <div className='flex flex-row gap-1 justify-center items-end'>
                                                            <h1 className="text-8xl text-teal-500 font-medium ">{valueKg}</h1>
                                                            <h1 className="text-lg text-zinc-400 font-medium ">KG</h1>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-row w-[20rem] gap-4 items-center px-5 py-3 border-3 mt-6 rounded-xl border-green-500'>
                                                        <h1 className="text-4xl  text-green-500 font-bold">TOTAL</h1>
                                                        <h1 className="text-4xl font-xl font-bold text-green-500">$ {Math.floor((product?.price * valueKg) / 10) * 10}</h1>
                                                    </div>
                                                </div>
                                            </div>:
                                            <section className="flex flex-col items-center justify-center content-between gap-2 h-full">
                                                <div key="flat" className="flex w-[20rem] h-[4rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Input type="number" variant={"flat"} label="kg" placeholder="Ingresa manualmente los kg" className='text-sm'
                                                        onValueChange={(value)=>setValue(value)}
                                                    />
                                                </div>
                                                <Button className=' w-[20rem] h-[3rem] bg-green-600 text-white font-bold text-lg'
                                                            onClick = {() => onSubmitHandler(product, 1, setIsAcepted, setUnits,setTargetProduct,setSelectedKL)} onPressEnd={onClose}>
                                                    1KG
                                                </Button>
                                                <Button className=' w-[20rem] h-[3rem]  bg-green-600 text-white font-bold text-lg'
                                                    onClick = {() => onSubmitHandler(product, 2, setIsAcepted, setUnits,setTargetProduct,setSelectedKL)} onPressEnd={onClose}
                                                >
                                                    2KG
                                                </Button>
                                                <div className='flex flex-row w-[20rem] gap-4 items-center px-5 py-3 border-3 rounded-xl border-green-500'>
                                                    <h1 className="text-4xl  text-green-500 font-bold">TOTAL</h1>
                                                    <h1 className="text-4xl font-xl font-bold text-green-500">$ {Math.floor((product?.netPrice * value) / 10) *10}</h1>
                                                </div>
                                            </section>
                                            }
                                        </div>
                                        : <section className="flex flex-col items-center justify-center content-between gap-2 h-full">
                                            <div key="flat" className="flex w-[20rem] h-[4rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Input type="email" variant={'flat'} label="KG" placeholder="Ingresa manualmente los KG." className='text-sm'
                                                    onValueChange={(value) => setValueKg(value)} value={valueKg}
                                                />
                                            </div>
                                            <Button className=' w-[20rem] h-[3rem] bg-green-600 text-white font-bold text-lg'
                                                onClick={() => setValueKg(1) }>
                                                    1KG
                                            </Button>
                                            <Button className=' w-[20rem] h-[3rem]  bg-green-600 text-white font-bold text-lg'
                                                onClick={() => setValueKg(2) }>
                                                    2KG
                                            </Button>
                                            <div className='flex flex-row w-[20rem] gap-4 items-center px-5 py-3 border-3 rounded-xl border-green-500'>
                                                <h1 className="text-4xl  text-green-500 font-bold">TOTAL</h1>
                                                <h1 className="text-4xl font-xl font-bold text-green-500">$ {Math.floor((product?.price * valueKg) / 10) * 10}</h1>
                                            </div>
                                        </section>
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </ModalBody>
                    <ModalFooter>
                        <section className='flex flex-row w-full justify-center'>
                            <Button className ="dark w-full" onClick = {() => onSubmitHandler(product, valueKg)} onPressEnd={onClose}>
                                    Aceptar
                            </Button>
                            <Button className='w-full' color="danger" variant="light" onClick={() => { handleOnClose() }}>
                                    Cancelar
                            </Button>
                        </section>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
