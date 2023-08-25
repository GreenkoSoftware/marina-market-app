'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
import { Badge, Card as CardUI, CardBody, CardFooter, Image } from '@nextui-org/react'
import { ConvertBytesToImage } from '@/utils/image'
export default function Card (props) {
    const { item, index, setTargetProduct, isFromSales } = props
    return (
        isFromSales
            ? <CardUI className='animation-fade-in' shadow="sm" key={index} isPressable onPress={() => { setTargetProduct(item) }}>
                <CardBody className="">
                    <Image
                        shadow="none"
                        radius="lg"
                        width="100%"
                        alt={item?.name}
                        className="object-cover  h-[5rem] w-[5rem]"
                        // src={'https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg'}
                        src={ConvertBytesToImage({ imageBytes: item?.image })}
                    />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b>{item?.name}</b>
                    <p className="text-default-500">{item?.netPrice * 1.19}</p>
                </CardFooter>
            </CardUI>
            : <CardUI shadow="sm" key={index} isPressable onPress={() => { setTargetProduct(item) }}>
                <CardBody className="overflow-visible">
                    <Badge content={item?.stock >= 100 ? '+99' : item?.stock} shape="circle"
                        className={`${item?.stock >= 100 ? 'right-[1.5rem]' : 'right-[1.2rem]'} z-[15] top-5  bg-red-500 dark:bg-secondary-300 text-primary-50`}
                    />
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={item?.name}
                        className="w-full object-cover  h-[14rem] "
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
