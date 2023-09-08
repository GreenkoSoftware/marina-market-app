'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure, Input, Skeleton, ScrollShadow, Button } from '@nextui-org/react'
import useInventoryStore from './store'
import CreateProduct from './components/NewProduct/createProduct'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { SearchIcon } from '@/components/ui/SearchIcon'
import useSalesStore from '../sales/store'
import ProductDetail from './components/productDetail'
import LoadingCard from '@/components/ui/Loading'
import CreateOffer from './components/NewOffer/createOffer'
export default function Card () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selected, setSelected] = useState(1)
    const [listInventory, setListInventory] = useState([])
    const [sectionSearch, setSectionSearch] = useState(false)
    const [searchInput, setSearchInput] = useState(null)
    const [messageSearch, setMessageSearch] = useState('')

    const listEmpty = new Array(20).fill(null)
    const { listCategories, listInventory: list, getCategories, getStockTypes, getListInventory, loadingCategories, loading } = useInventoryStore(
        ({ listCategories, listInventory, getCategories, getStockTypes, getListInventory, loadingCategories, loading }) => (
            { listCategories, listInventory, getCategories, getStockTypes, getListInventory, loadingCategories, loading }))
    const onChangeValue = (event) => {
        setSearchInput(event.target.value)
    }
    const [filteredList, setFilteredList] = useState([])
    useEffect(() => {
        if (selected) {
            if (parseInt(selected) === -1) {
                setSectionSearch(true)
                setListInventory(list)
            } else {
                setSectionSearch(false)
                setListInventory(list.filter((item) => item.productCategoryId === parseInt(selected)))
            }
        }
    }, [selected, list])
    useEffect(() => {
        if (targeProduct) {
            onOpen()
        }
    }, [targeProduct])

    useEffect(() => {
        if (isOpen) {
            useSalesStore.getState()?.disabledRedirectSales()
        } else {
            useSalesStore.getState()?.enabledRedirectSales()
        }
    }, [isOpen])

    useEffect(() => {
        const searchSize = searchInput?.length || 0
        if (searchSize >= 3) {
            let updatedList = [...list]
            // Include all elements which includes the search query
            updatedList = updatedList.filter((item) => {
                return item?.meta?.toLowerCase().indexOf(searchInput?.toLowerCase()) !== -1
            })
            // Trigger render with updated values
            if (!updatedList?.length) {
                setMessageSearch('Ups.. no lo hemos podido encontrar, intenta buscar otro producto.')
            } else {
                setMessageSearch(null)
            }
            setFilteredList(updatedList)
        } else if (searchSize >= 1) {
            setFilteredList([])
            setMessageSearch('Escribe al menos 3 carácteres para realizar una búsqueda.')
        } else {
            setFilteredList([])
            setMessageSearch('Realiza una búsqueda.')
        }
    }, [searchInput])
    useEffect(() => {
        /* Add in the future refreshToken in this useEffect */
        getCategories()
        getStockTypes()
        getListInventory()
    }, [])
    return (
        <section className='h-full flex flex-col'>
            <section className="flex items-start justify-between z-10">
                <section className='flex flex-row rounded-t-[12px] space-x-5 bg-secondary-50 dark:bg-secondary-450 pr-5 pt-1 items-center'>
                    <div style={{ scrollbarGutter: 'stable' }} className='h-[3rem]  w-[400px] top-[0px] overflow-x-auto overflow-hidden flex items-center  pb-2'>
                        {loadingCategories

                            ? <section className="pt-3 pl-3 pr-3 ">
                                <Skeleton className="w-full h-1 pt-10 rounded-lg"></Skeleton>
                            </section>

                            : <Tabs
                                aria-label="Options"
                                items={listCategories}
                                selectedKey={selected}
                                onSelectionChange={setSelected}
                                variant={'light'}
                                className="pt-3 pl-3"
                            >
                                {listCategories
                                    ? listCategories.map(
                                        (item) => (
                                            <Tab key={item.id} size={'lg'} title={item.label}>
                                            </Tab>
                                        )
                                    )
                                    : null}
                            </Tabs>}

                    </div>
                    <Button variant={sectionSearch ? 'solid' : 'ghost'} isIconOnly onClick={() => setSelected('-1')}>
                        <MagnifyingGlassIcon className='w-5 h-5'/>
                    </Button>
                </section>
                <div className="flex space-x-2">
                    {/* <ScannerDetection/> */}
                    <CreateOffer/>
                    <CreateProduct/>
                </div>
            </section>
            <section className="flex flex-1 p-[1rem] w-auto shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]">
                { loading
                    ? <ScrollShadow className="w-full pb-4">
                        <div className="gap-4 grid grid-cols-2 md:grid-cols-5 p-1">{listEmpty?.map((item, key) => (<LoadingCard key={key}/>))}</div> </ScrollShadow>
                    : sectionSearch
                        ? <section className='h-full w-full'>
                            <Input
                                label="Busqueda"
                                isClearable
                                radius="lg"
                                onChange={onChangeValue}
                                onFocusChange={(value) =>
                                    value
                                        ? useSalesStore.getState()?.disabledRedirectSales()
                                        : useSalesStore.getState()?.enabledRedirectSales()
                                }
                                classNames={{
                                    label: 'text-black/50 dark:text-white/90',
                                    input: [
                                        'bg-transparent',
                                        'text-black/90 dark:text-white/90',
                                        'placeholder:text-default-700/50 dark:placeholder:text-white/60'
                                    ],
                                    innerWrapper: 'bg-transparent'
                                }}
                                className='my-4 w-full'
                                placeholder="Toca para buscar un producto..."
                                startContent={
                                    <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                                }
                            />
                            <section style={{ scrollbarGutter: 'stable' }} className='max-h-[38rem] w-full overflow-y-auto flex flex-wrap snap-y snap-mandatory content-start'>
                                {filteredList?.map((item, index) => (
                                    <div key={'productSearch' + index} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 xlg:w-[12.5%] snap-start shrink-0'>
                                        <div className='mx-1 my-1'>
                                            <CardUi item={item} setTargetProduct={setTargetProduct}/>
                                        </div>
                                    </div>
                                ))}
                                {!listInventory?.length
                                    ? <div>No hay productos</div>
                                    : (!filteredList.length && messageSearch)
                                        ? <div>{messageSearch}</div>
                                        : null
                                }
                            </section>
                        </section>
                        : <section style={{ scrollbarGutter: 'stable' }} className='max-h-[44rem] w-full overflow-y-auto flex flex-wrap snap-y snap-mandatory content-start'>
                            {listInventory?.map((item, index) => (
                                <div key={'productList' + index} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 xlg:w-[12.5%] snap-start shrink-0'>
                                    <div className='mx-1 my-1'>
                                        <CardUi item={item} setTargetProduct={setTargetProduct}/>
                                    </div>
                                </div>
                            ))}

                        </section> }

            </section>
            <ProductDetail targeProduct={targeProduct} isOpen={isOpen} onClose={onClose} setTargetProduct={setTargetProduct}/>
        </section>
    )
}
