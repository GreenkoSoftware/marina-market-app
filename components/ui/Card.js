'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
import { Badge, Card as CardUI, CardBody, CardFooter } from '@nextui-org/react'
import { ConvertBytesToImage } from '@/utils/image'
import Image from 'next/image'
export default function Card (props) {
    const { item, index, setTargetProduct, isFromSales } = props
    return (
        isFromSales
            ? <CardUI className='animation-fade-in' shadow="sm" key={index} isPressable onPress={() => { setTargetProduct(item) }}>
                <CardBody className="p-0">
                    <Image
                        shadow="none"
                        radius="lg"
                        width="100"
                        height="100"
                        alt={item?.name}
                        className="w-full object-cover h-[7rem] bg-white"
                        // src={'https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg'}
                        src={ConvertBytesToImage({ imageBytes: item?.image })}
                    />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b>{item?.name}</b>
                    <p className="text-default-500">{item?.netPrice * 1.19}</p>
                </CardFooter>
            </CardUI>
            : <CardUI shadow="sm" className='w-full' key={index} isPressable onPress={() => { setTargetProduct(item) }}>
                <CardBody className="overflow-visible p-0">
                    <Badge content={item?.stock >= 100 ? '+99' : item?.stock} shape="circle"
                        className={`${item?.stock >= 100 ? 'right-[1.5rem]' : 'right-[1.2rem]'} z-[15] top-5  bg-red-500 dark:bg-secondary-300 text-primary-50`}
                    />
                    <Image
                        shadow="lg"
                        radius="lg"
                        width="100"
                        height="100"
                        alt={item?.name}
                        className="w-full object-cover h-[10rem] bg-white  shadow-md rounded-2xl"
                        // src={'https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg'}
                        src={ConvertBytesToImage({ imageBytes: item?.image })}
                    />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b>{item?.name}</b>
                    <p className="text-default-500">{item?.netPrice * 1.19}</p>
                </CardFooter>
            </CardUI>
    )
}
