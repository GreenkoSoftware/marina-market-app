'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure, ScrollShadow } from '@nextui-org/react'
import DetailedProduct from './components/detailedProduct'
import useSalesStore from './store'
import useInventoryStore from '../inventory/store'
export default function tableProducts () {
    const { isOpen, onClose } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selected, setSelected] = useState(1)
    const [listInventory, setListInventory] = useState([])
    const { listCategories, listInventory: list, getCategories, getListInventory } = useInventoryStore()

    const { listSales, addFromNewSales, setTotalPrice } = useSalesStore()

    useEffect(() => {
        if (selected) {
            setListInventory(list.filter((item) => item.productCategoryId === parseInt(selected)))
        }
    }, [selected, list])

    useEffect(() => {
        if (targeProduct) {
            // agregar a la lista de venstas
            addFromNewSales(listSales, targeProduct, setTargetProduct)
        }
    }, [targeProduct])

    useEffect(() => {
        if (listSales?.length >= 0) {
            let currentTotal = 0
            listSales?.forEach((item) => {
                currentTotal += item.product?.netPrice * item.quantity
                // TODO: agregar logica de ofertas
            })

            setTotalPrice(currentTotal)
        }
    }, [listSales])

    useEffect(() => {
        /* Add in the future refreshToken in this useEffect */
        getCategories()
        getListInventory()
    }, [])

    return (
        <section className=''>
            <section className="z-10 h-[3rem] w-[290px] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">
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
            <section className="p-[2rem]  shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]">
                <ScrollShadow className="h-[38rem] w-[44rem] p-1">
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-5">
                        {listInventory.map((item, index) => (
                            <CardUi className key={index} item={item} index={index} isFromSales={true} setTargetProduct={setTargetProduct}/>
                        ))}
                    </div>
                </ScrollShadow>
            </section>
            <DetailedProduct targeProduct={targeProduct} isOpen={isOpen} onClose={onClose} setTargetProduct={setTargetProduct}/>
        </section>
    )
}
