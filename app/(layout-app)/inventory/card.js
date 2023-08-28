'use client'
import React, { useEffect, useState } from 'react'
import CardUi from '@/components/ui/Card'
import { Tabs, Tab, useDisclosure, Input } from '@nextui-org/react'
import DetailedProduct from './components/detailedProduct'
import useInventoryStore from './store'
import CreateProduct from './components/NewProduct/createProduct'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { SearchIcon } from '@/components/ui/SearchIcon'
export default function Card () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [targeProduct, setTargetProduct] = useState(null)
    const [selected, setSelected] = useState(1)
    const [listInventory, setListInventory] = useState([])
    const [sectionSearch, setSectionSearch] = useState(false)
    const [searchInput, setSearchInput] = useState(null)

    const { listCategories, listInventory: list, getCategories, getListInventory } = useInventoryStore(
        ({ listCategories, listInventory, getCategories, getListInventory }) => (
            { listCategories, listInventory, getCategories, getListInventory }))
    const onChangeValue = (event) => {
        setSearchInput(event.target.value)
    }
    const [filteredList, setFilteredList] = useState([])
    useEffect(() => {
        if (selected) {
            setFilteredList(list)
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
                        aria-label="Options"
                        items={listCategories}
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                        variant={'light'}
                        className="pt-3 pl-3"
                    >
                        {(item) => (
                            <Tab key={item.id} size={'lg'} title={item.label === 'search' ? <MagnifyingGlassIcon className='w-5 h-5'/> : item?.label}>
                            </Tab>
                        )}
                    </Tabs>

                </div>
                <div className="flex space-x-2">
                    {/* <ScannerDetection/> */}
                    <CreateProduct/>
                </div>
            </section>
            <section className="flex flex-1 p-[1rem] w-auto shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]">
                {sectionSearch
                    ? <section style={{ scrollbarGutter: 'stable' }} className='max-h-[44rem] w-full overflow-y-auto flex flex-wrap snap-y snap-mandatory content-start'>
                        <Input
                            label="Busqueda"
                            isClearable
                            radius="lg"
                            onChange={onChangeValue}
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
                        {filteredList?.map((item, index) => (
                            <div key={index} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 xlg:w-[12.5%] snap-start shrink-0'>
                                <div className='mx-1 my-1'>
                                    <CardUi key={index} item={item} index={index} setTargetProduct={setTargetProduct}/>
                                </div>
                            </div>
                        ))}

                    </section>
                    : <section style={{ scrollbarGutter: 'stable' }} className='max-h-[44rem] w-full overflow-y-auto flex flex-wrap snap-y snap-mandatory content-start'>
                        {listInventory?.map((item, index) => (
                            <div key={index} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 xlg:w-[12.5%] snap-start shrink-0'>
                                <div className='mx-1 my-1'>
                                    <CardUi key={index} item={item} index={index} setTargetProduct={setTargetProduct}/>
                                </div>
                            </div>
                        ))}

                    </section>}

            </section>
            {/* Modal with detailed product */}
            <DetailedProduct targeProduct={targeProduct} isOpen={isOpen} onClose={onClose} setTargetProduct={setTargetProduct}/>
        </section>
    )
}
