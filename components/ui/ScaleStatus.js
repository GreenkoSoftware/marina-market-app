'use client'
import React, { useState, useEffect } from 'react'
import { Badge, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { FaWeight } from 'react-icons/fa'

export default function ScaleStatus ({ scaleStatus }) {
    const [isOpen, setIsOpen] = useState(null)
    useEffect(() => {
        if (isOpen) {
            setTimeout(
                () => setIsOpen(false), 5000
            )
        }
    }, [isOpen])

    useEffect(() => {
        setTimeout(
            () => setIsOpen(true), 1000
        )
    }, [scaleStatus])

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
                {scaleStatus
                    ? <Popover placement="top-end" offset={25} color="success" showArrow={true} isOpen={isOpen}>
                        <PopoverTrigger>
                            <Badge color="success" content={''} size = "lg" shape="circle">
                                <FaWeight size={35} />
                            </Badge>
                        </PopoverTrigger>
                        <PopoverContent color="danger">
                            <div className="">
                                <div className="text-small text-white font-bold">Pesa conectada</div>
                            </div>
                        </PopoverContent>

                    </Popover>
                    : <Popover placement="top-end" offset={25} color="danger" showArrow={true} defaultOpen={true}>
                        <PopoverTrigger>
                            <Badge color="danger" content={''} size = "lg" shape="circle">
                                <FaWeight size={30} />
                            </Badge>
                        </PopoverTrigger>
                        <PopoverContent color="danger">
                            <div className="">
                                <div className="text-small font-bold">Pesa desconectada</div>
                                <div className="text-tiny">por favor abrir el archivo, scaleConnector en escritorio.</div>
                            </div>
                        </PopoverContent>

                    </Popover>
                }
            </div>
        </div>
    )
}
