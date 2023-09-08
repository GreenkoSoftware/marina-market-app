'use client'
/* eslint-disable */
import React,{useState,useEffect} from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Image } from '@nextui-org/react'
import { ConvertBytesToImage, DefaultImageMarinaMarket } from '@/utils/image'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import useAuthStore from '@/stores/user'
import { getIdUser } from '@/services/user'
import hubScale from './store/connectionScale'

const onSubmitHandler = (product, value, setIsAcepted, setUnits,setTargetProduct,setSelectedKL) => {
    product.price = Math.round(product?.price * value)
    setUnits(value)
    setIsAcepted(true)
    setTargetProduct(null)
}

export default function WeighingScaleModal ({ isOpen, onClose, product, setIsAcepted, setUnits, setTargetProduct,setSelectedKL }) {
    const [handShake,setHandShake] = useState(false)
    const [ url, setUrl ] = useState(null)
    const {setIsConnected} = hubScale()
    const[value,setValue] = useState(1)
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

    /* Last message ws from fleet status */
    useEffect(() => {
        if (lastMessage) {
            const message = lastMessage?.data.substring(0,5)
            const data =parseFloat(message)
            setValue(data)
        }
      }, [lastMessage])  

  useEffect(()=>{
    console.log(connectionStatus)
    if(connectionStatus === 'Closed'){
        setIsConnected(false)
    }else if(connectionStatus === 'Open'){
        setIsConnected(true)
    }
  },[readyState])
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
    useEffect(()=>{
        setUrl('ws://localhost:8080/food-scale/' + getIdUser())
    },[])
    
    useEffect(()=>{
        if(!isOpen){
            setTargetProduct(null)
        }
    },[isOpen])
    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalContent className=''>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1  text-primary-500 dark:text-primary-200 ">Pesa de productos</ModalHeader>
                            <ModalBody>
                                <Card
                                    isBlurred
                                    className="border-none w-full"
                                    shadow="sm"
                                >
                                    <CardBody>
                                        <div className="flex flex-row gap-10 items-center justify-center content-between">
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
                                                            <h1 className="text-lg text-lime-500 ">${product?.netPrice}</h1>
                                                        </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col col-span-6 md:col-span-8 h-full">
                                                <div className="flex  items-start h-full">
                                                    <div className="flex flex-col gap-5 h-full">
                                                        <div className='flex flex-col  gap-2 h-full'>
                                                            <h1 className="text-large font-medium mt-2">PESO</h1>
                                                            <div className='flex flex-row gap-1 justify-center items-end'>
                                                                <h1 className="text-8xl text-teal-500 font-medium ">{value}</h1>
                                                                <h1 className="text-lg text-zinc-400 font-medium ">KG</h1>
                                                            </div>
                                                        </div>
                                                        
                                                     
                                                            <div className='flex flex-row w-full gap-4 items-center px-5 py-3 border-3 mt-6 rounded-xl border-green-500'>
                                                                <h1 className="text-4xl  text-green-500 font-bold">TOTAL</h1>
                                                                <h1 className="text-4xl font-xl font-bold text-green-500">$ {Math.floor((product?.netPrice * value) / 10) *10}</h1>
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
                                    <Button className ="dark w-full" onClick = {() => onSubmitHandler(product, value, setIsAcepted, setUnits,setTargetProduct,setSelectedKL)} onPressEnd={onClose}>
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
