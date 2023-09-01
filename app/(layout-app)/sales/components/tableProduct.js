'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure, ScrollShadow } from '@nextui-org/react'
import DetailedProduct from './detailedProduct'
import useSalesStore from '../store'
import useInventoryStore from '../../inventory/store'
export default function tableProducts (props) {
    const { searchInput } = props
    const { isOpen, onClose } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selected, setSelected] = useState(1)
    const [listInventory, setListInventory] = useState([])
    const { listCategories, listInventory: list, getCategories, getListInventory } = useInventoryStore()
    const [filteredList, setFilteredList] = useState([])
    const [sectionSearch, setSectionSearch] = useState(false)
    const { listSales, addFromNewSales, setTotalPrice, units, setUnits } = useSalesStore()

    useEffect(() => {
        if (selected) {
            setFilteredList(list)
            if (parseInt(selected) === -1 || searchInput?.length > 0) {
                setSectionSearch(true)
                setListInventory(list)
            } else {
                setSectionSearch(false)
                setListInventory(list.filter((item) => item.productCategoryId === parseInt(selected)))
            }
        }
        /*  if (selected) {
            setListInventory(list.filter((item) => item.productCategoryId === parseInt(selected)))
        } */
    }, [selected, searchInput, list])

    useEffect(() => {
        if (targeProduct) {
            // agregar a la lista de venstas
            addFromNewSales(listSales, targeProduct, setTargetProduct, units, setUnits)
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
    useEffect(() => {
        // Create copy of item list
        if (searchInput) {
            let updatedList = [...list]
            // Include all elements which includes the search query
            updatedList = updatedList.filter((item) => {
                return item?.meta?.toLowerCase().indexOf(searchInput?.toLowerCase()) !== -1
            })
            // Trigger render with updated values
            setFilteredList(updatedList)
        } else if (searchInput === '') {
            setFilteredList([...list])
        }
    }, [searchInput])
    return (
        <section className='max-h-[56rem] w-full'>
            <section className="z-10 h-[3rem] w-[390px] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">
                <Tabs
                    disabledKeys={['reports']}
                    aria-label="Options"
                    items={listCategories?.filter((category) => category?.id !== -1)}
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
            <section className="p-[2rem] max-h-[56rem] w-full  shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]">
                <ScrollShadow className="h-[54rem] w-full">
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-5">
                        {/*   {listInventory.map((item, index) => (
                            <CardUi className key={index} item={item} index={index} isFromSales={true} setTargetProduct={setTargetProduct}/>
                        ))} */}
                        { sectionSearch
                            ? filteredList?.map((item, index) => (
                                <CardUi className key={index} item={item} index={index} isFromSales={true} setTargetProduct={setTargetProduct}/>
                            ))
                            : listInventory.map((item, index) => (
                                <CardUi className key={index} item={item} index={index} isFromSales={true} setTargetProduct={setTargetProduct}/>
                            ))

                        }
                    </div>
                </ScrollShadow>
            </section>
            <DetailedProduct targeProduct={targeProduct} isOpen={isOpen} onClose={onClose} setTargetProduct={setTargetProduct}/>
        </section>
    )
}
