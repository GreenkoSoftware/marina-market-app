'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure } from '@nextui-org/react'
import DetailedProduct from './components/detailedProduct'
export default function Card () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selected, setSelected] = useState('fruts')
    const [listInventory, setListInventory] = useState([])
    const list = [
        {
            title: 'Naranja',
            img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
            price: '$5.000',
            stock: 100,
            type: 'fruts'
        },
        {
            title: 'Mandarina',
            img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
            price: '$6.000',
            stock: 100,
            type: 'fruts'
        },
        {
            title: 'Cerezas',
            img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
            price: '$1.000',
            stock: 100,
            type: 'fruts'
        },
        {
            title: 'Limón',
            img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
            price: '$5.300',
            stock: 100,
            type: 'vegetables'
        },
        {
            title: 'Palta',
            img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
            price: '$15.700',
            stock: 100,
            type: 'vegetables'
        },
        {
            title: 'Espinaca',
            img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
            price: '$8.000',
            stock: 100,
            type: 'vegetables'
        },
        {
            title: 'Platano',
            img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
            price: '$7.500',
            stock: 10,
            type: 'fruts'
        },
        {
            title: 'Melón',
            img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
            price: '$12.200',
            stock: 50,
            type: 'fruts'
        }
    ]
    const category = [
        {
            id: 'fruts',
            label: 'Frutas',
            route: '/sales'
        },
        {
            id: 'vegetables',
            label: 'Verduras',
            route: '/inventory'
        },
        {
            id: 'other',
            label: 'Otros',
            route: '/reports'
        }
    ]

    useEffect(() => {
        if (selected) {
            setListInventory(list.filter((item) => item.type === selected))
        }
    }, [selected])
    useEffect(() => {
        if (targeProduct) {
            onOpen()
        }
    }, [targeProduct])
    return (
        <section>
            <section className="z-10 h-[3rem] w-[260px] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">
                <Tabs
                    disabledKeys={['reports']}
                    aria-label="Options"
                    items={category}
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                    variant={'light'}
                    className="pt-3 pl-3"
                >
                    {(item) => (
                        <Tab key={item.id} size={'lg'} title={item.label}>
                        </Tab>
                    )}
                </Tabs>
            </section>
            <section className="p-[3rem] w-auto shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]">
                <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
                    {listInventory.map((item, index) => (
                        <CardUi key={index} item={item} index={index} setTargetProduct={setTargetProduct}/>
                    ))}
                </div>
            </section>
            {/* Modal with detailed product */}
            <DetailedProduct targeProduct={targeProduct} isOpen={isOpen} onClose={onClose} setTargetProduct={setTargetProduct}/>
        </section>
    )
}
