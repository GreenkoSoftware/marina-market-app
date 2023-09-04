'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure, ScrollShadow } from '@nextui-org/react'
import DetailedProduct from './detailedProduct'
import useSalesStore from '../store'
import useInventoryStore from '../../inventory/store'
import WeighingScaleModal from './weighingScaleModal'
export default function tableProducts (props) {
    const { searchInput } = props
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selected, setSelected] = useState(1)
    const [isAcepted, setIsAcepted] = useState()
    const [selectedKL, setSelectedKL] = useState()
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
    }, [selected, searchInput, list])

    useEffect(() => {
        if (targeProduct) {
            if (targeProduct.stockTypeId === 1) {
                setSelectedKL(Object.assign({}, targeProduct))
            } else {
                addFromNewSales(listSales, targeProduct, setTargetProduct, units, setUnits)
            }
        }
    }, [targeProduct])

    useEffect(() => {
        if (targeProduct != null) { onOpen() }
    }, [selectedKL])

    useEffect(() => {
        if (isAcepted) {
            addFromNewSales(listSales, selectedKL, setTargetProduct, units, setUnits)
            setIsAcepted(false)
        }
    }, [isAcepted])

    useEffect(() => {
        if (listSales?.length >= 0) {
            let currentTotal = 0
            listSales?.forEach((item) => {
                if (item?.product?.stockTypeId !== 1) {
                    currentTotal += item.product?.price * item.quantity
                } else {
                    currentTotal += item.product?.price
                }
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
        <section className=" h-full w-full">
            <section className="z-10 h-[6%] w-[280px] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450">
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
            <section className='flex flex-col h-3/4  sm:h-[93%] items-center px-5 py-[1rem] shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]'>
                <ScrollShadow className="w-full pb-4">
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-5 p-1">
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
            <DetailedProduct targeProduct={targeProduct} setTargetProduct={setTargetProduct} />
            <WeighingScaleModal isOpen={isOpen} onClose={onClose} product={selectedKL} value={4.20} setIsAcepted = {setIsAcepted} setUnits={setUnits}/>
        </section>
    )
}
