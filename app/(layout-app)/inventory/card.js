'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure } from '@nextui-org/react'
import DetailedProduct from './components/detailedProduct'
import useInventoryStore from './store'
import CreateProduct from './components/NewProduct/createProduct'
import ScannerDetection from '@/components/ScannerDetection/ScannerDetection'
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
        <section className='h-full flex flex-col'>
            <section className="flex items-start justify-between z-10">
                <div className='h-[3rem] top-[0px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450'>
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
                </div>
                <div className="flex space-x-2">
                    <ScannerDetection/>
                    <CreateProduct/>
                </div>
            </section>
            <section className="flex flex-1 p-[1rem] w-auto shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]">
                <section style={{ scrollbarGutter: 'stable' }} className='max-h-[44rem] w-full overflow-y-auto flex flex-wrap snap-y snap-mandatory content-start'>
                    {listInventory?.map((item, index) => (
                        <div key={index} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 xlg:w-[12.5%] snap-start shrink-0'>
                            <div className='mx-1 my-1'>
                                <CardUi key={index} item={item} index={index} setTargetProduct={setTargetProduct}/>
                            </div>
                        </div>
                    ))}

                </section>

            </section>
            {/* Modal with detailed product */}
            <DetailedProduct targeProduct={targeProduct} isOpen={isOpen} onClose={onClose} setTargetProduct={setTargetProduct}/>
        </section>
    )
}
