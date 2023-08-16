'use client';
import React  from 'react';
import { Card,Image,CardFooter,CardHeader, Button } from '@nextui-org/react';

export default function MainTittleCard (props) {
    const { title,footerMessage,imgSrc } = props
    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="col-span-12 sm:col-auto saturate-100 hover:saturate-140 h-[20rem] mt-12 sm:h-[40rem] "
        >
            <CardHeader className="absolute z-10 top-1 flex-col drop-shadow-6xl !items-start ">
                <p className="text-tiny text-white/60 uppercase font-bold ">MÓDULO</p>
                <h4 className="text-white/80 font-medium text-6xl">{title}</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                isZoomed
                src={imgSrc}
                
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] h-20 shadow-small ml-1 z-10">
                <p className="text-xl text-white/80">{footerMessage}</p>
            <Button className="text-xl text-white bg-sky-500/75" variant="flat" color="default" radius="md" size="lg">
                Ingresar
            </Button>
            </CardFooter>
        </Card>
    );
}




