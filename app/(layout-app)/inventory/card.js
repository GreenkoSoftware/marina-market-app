'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure } from '@nextui-org/react'
import DetailedProduct from './components/detailedProduct'
import useInventoryStore from './store'
export default function Card () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selected, setSelected] = useState(1)
    const [listInventory, setListInventory] = useState([])
    const { listCategories, listInventory: list, getCategories, getListInventory } = useInventoryStore(
        ({ listCategories, listInventory, getCategories, getListInventory }) => (
            { listCategories, listInventory, getCategories, getListInventory }))
    useEffect(() => {
        if (selected) {
            setListInventory(list.filter((item) => item.productCategoryId === parseInt(selected)))
        }
    }, [selected, list])
    useEffect(() => {
        if (targeProduct) {
            onOpen()
        }
    }, [targeProduct])

    useEffect(() => {
        /* Add in the future refreshToken in this useEffect */
        getCategories()
        getListInventory()
    }, [])
    return (
        <section>
            <section className="z-10 h-[3rem] w-[260px] top-[0px]  rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">
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
            <section className="p-[1rem] w-auto shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]">
                <section className=' h-[32rem] overflow-y-scroll p-[1rem] '>
                    <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
                        {listInventory?.map((item, index) => (
                            <CardUi key={index} item={item} index={index} setTargetProduct={setTargetProduct}/>
                        ))}
                    </div>
                </section>

            </section>
            {/* Modal with detailed product */}
            <DetailedProduct targeProduct={targeProduct} isOpen={isOpen} onClose={onClose} setTargetProduct={setTargetProduct}/>
        </section>
    )
}
