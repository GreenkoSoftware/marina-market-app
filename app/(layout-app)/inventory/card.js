'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure } from '@nextui-org/react'
import DetailedProduct from './components/detailedProduct'
export default function Card ({ listInventory: list, listCategories }) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selected, setSelected] = useState(1)
    const [listInventory, setListInventory] = useState([])

    useEffect(() => {
        if (selected) {
            setListInventory(list.filter((item) => item.productCategoryId === parseInt(selected)))
        }
    }, [selected])
    useEffect(() => {
        if (targeProduct) {
            onOpen()
        }
    }, [targeProduct])
    useEffect(() => {
        console.log(listInventory)
    }, [listInventory])
    return (
        <section>
            <section className="z-10 h-[3rem] w-[260px] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">
                <Tabs
                    disabledKeys={['reports']}
                    aria-label="Options"
                    items={listCategories}
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
                    {listInventory?.map((item, index) => (
                        <CardUi key={index} item={item} index={index} setTargetProduct={setTargetProduct}/>
                    ))}
                </div>
            </section>
            {/* Modal with detailed product */}
            <DetailedProduct targeProduct={targeProduct} isOpen={isOpen} onClose={onClose} setTargetProduct={setTargetProduct}/>
        </section>
    )
}
