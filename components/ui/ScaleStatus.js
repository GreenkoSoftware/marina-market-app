'use client'
import React, { useState, useEffect } from 'react'
import { Badge, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { FaWeight } from 'react-icons/fa'

export default function ScaleStatus ({ scaleStatus }) {
    const [isOpen, setIsOpen] = useState(null)
    const [color, setColor] = useState('danger')

    useEffect(() => {
        if (isOpen && scaleStatus) {
            setTimeout(
                () => setIsOpen(false), 5000
            )
        }
    }, [isOpen, scaleStatus])

    useEffect(() => {
        setTimeout(
            () => setIsOpen(true), 1000
        )

        if (scaleStatus) {
            setColor('success')
        } else {
            setColor('danger')
        }
    }, [scaleStatus])

    const Message = ({ enabled }) => {
        return enabled
            ? <div className="">
                <div className="text-small text-white font-bold">Pesa conectada</div>
            </div>
            : <div className="">
                <div className="text-small font-bold">Pesa desconectada</div>
                <div className="text-tiny">Por favor abrir el archivo scaleConnector en escritorio.</div>
            </div>
    }

    return (
        <div className="flex items-center gap-4" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center gap-3">
                <Popover placement="top-end" offset={25} color={color} showArrow={true} isOpen={isOpen}>
                    <PopoverTrigger>
                        <Badge color={color} content={''} size = "lg" shape="circle">
                            <FaWeight size={35} />
                        </Badge>
                    </PopoverTrigger>
                    <PopoverContent className='mt-1' color={color}>
                        <Message enabled={scaleStatus}/>
                    </PopoverContent>

                </Popover>
            </div>
        </div>
    )
}
