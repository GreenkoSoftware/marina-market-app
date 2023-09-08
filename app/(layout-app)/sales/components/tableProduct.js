/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure, ScrollShadow, Skeleton } from '@nextui-org/react'
import DetailedProduct from './detailedProduct'
import useSalesStore from '../store'
import useInventoryStore from '../../inventory/store'
import LoadingCard from '@/components/ui/Loading'
import WeighingScaleModal from './weighingScaleModal'

export default function tableProducts (props) {
    const { searchInput } = props
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selected, setSelected] = useState(1)
    const [isAcepted, setIsAcepted] = useState()
    const [selectedKL, setSelectedKL] = useState()
    const [listInventory, setListInventory] = useState([])
    const { listCategories, listInventory: list, getCategories, getListInventory, loading, loadingCategories } = useInventoryStore(({ listCategories, listInventory: list, getCategories, getListInventory, loading, loadingCategories }) => ({ listCategories, listInventory: list, getCategories, getListInventory, loading, loadingCategories }))
    const [filteredList, setFilteredList] = useState([])
    const { listSales, addFromNewSales, setTotalPrice, units, setUnits, getOffers, offers } = useSalesStore()
    const listEmpty = new Array(20).fill(null)

    useEffect(() => {
        if (selected) {
            setListInventory(list.filter((item) => item.productCategoryId === parseInt(selected)))
        }
    }, [selected, list])

    useEffect(() => {
        if (targeProduct) {
            // agregar a la lista de venstas
            addFromNewSales(listSales, targeProduct, setTargetProduct, units, setUnits, offers)
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
                currentTotal += item?.discount ? item.product?.price * item.quantity - item?.discount : item.product?.price * item.quantity
                // TODO: agregar logica de ofertas
            })
            setTotalPrice(currentTotal)
        }
    }, [listSales])

    useEffect(() => {
        /* Add in the future refreshToken in this useEffect */
        getCategories()
        getListInventory()
        getOffers()
    }, [])
    useEffect(() => {
        const searchSize = searchInput?.length || 0
        if (searchSize >= 3) {
            let updatedList = [...list]
            // Include all elements which includes the search query
            updatedList = updatedList.filter((item) => {
                return item?.meta?.toLowerCase().includes(searchInput?.toLowerCase())
                // return item?.meta?.toLowerCase().indexOf(searchInput?.toLowerCase()) !== -1
            })
            // Trigger render with updated values
            setFilteredList(updatedList)
        } else if (searchSize >= 1) {
            setFilteredList([])
        } else {
            setFilteredList([])
        }
    }, [searchInput])

    return (
        <section className='animation-fade-in h-full w-full flex flex-col'>
            <section style={{ scrollbarGutter: 'stable' }} className="z-10 h-[6%] w-[280px] top-[52px] rounded-t-[12px] bg-secondary-50 dark:bg-secondary-450 overflow-x-auto flex items-center pb-2">
                {loadingCategories
                    ? <section className="pt-3 pl-3 pr-3 w-full">
                        <Skeleton className="w-full h-1 pt-10 rounded-lg"></Skeleton>
                    </section>

                    : <Tabs
                        aria-label="Options"
                        items={listCategories?.filter((category) => category?.id !== -1)}
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                        variant={'light'}
                        className="pt-3 pl-3"
                    >
                        {(item) => (
                            <Tab key={item.id} size={'lg'} title={item.label} className='pb-2'>
                            </Tab>
                        )}
                    </Tabs>}
            </section>
            <section className='flex-1 rounded-xl rounded-tl-[0px] p-[1rem] bg-secondary-50 dark:bg-secondary-450'>
                {/*  <section className='flex flex-col h-3/4  sm:h-[93%] items-center px-5 py-[1rem] shadow-md hover:shadow-lg  rounded-tl-[0px] rounded-[14px]'>
                    <ScrollShadow className="w-full pb-4">
                        <div className="gap-4 grid grid-cols-2 md:grid-cols-5 p-1">
                            {loading
                                ? listEmpty?.map((item, key) => (<LoadingCard key={key}/>))
                                : sectionSearch
                                    ? filteredList?.map((item, index) => (
                                        <CardUi className key={index} item={item} index={index} isFromSales={true} setTargetProduct={setTargetProduct}/>
                                    ))
                                    : listInventory.map((item, index) => (
                                        <CardUi className key={index} item={item} index={index} isFromSales={true} setTargetProduct={setTargetProduct}/>
                                    ))}
                            {
                            }
                        </div>
                    </ScrollShadow>
                </section> */}

                <section style={{ scrollbarGutter: 'stable' }} className='max-h-[44rem] w-full overflow-y-auto flex flex-wrap snap-y snap-mandatory content-start '>
                    {loading
                        ? <div className="gap-4 grid grid-cols-2 md:grid-cols-5 p-1 w-full">
                            {listEmpty?.map((item, key) => (<LoadingCard key={key}/>))}
                        </div>
                        : (filteredList.length ? filteredList : listInventory)?.map((item, index) => (
                            <div key={'productList' + index} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 xlg:w-1/6 snap-start shrink-0'>
                                <div className='mx-1 my-1 h-[95%] w-auto'>
                                    <CardUi className key={index} item={item} index={index} isFromSales={true} setTargetProduct={setTargetProduct}/>
                                </div>
                            </div>
                        ))}

                </section>
            </section>
            <DetailedProduct targeProduct={targeProduct} setTargetProduct={setTargetProduct} />
            <WeighingScaleModal isOpen={isOpen} onClose={onClose} product={selectedKL} value={4.20} setIsAcepted = {setIsAcepted} setUnits={setUnits} setTargetProduct={setTargetProduct}/>
        </section>
    )
}
