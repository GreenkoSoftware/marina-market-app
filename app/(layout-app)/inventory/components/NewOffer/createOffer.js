/* eslint-disable no-unused-vars */
'use client'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Select, SelectItem, dropdown, useDisclosure } from '@nextui-org/react'
import React, { Suspense, createRef, useEffect, useMemo, useState } from 'react'
import useInventoryStore from '../../store'
import useOfferFormStore from './store'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { SearchIcon } from '@/components/ui/SearchIcon'
import CardUi from '@/components/ui/Card'
import Image from 'next/image'
import { ConvertBytesToImage, DefaultImageMarinaMarket } from '@/utils/image'

export const InputComponent = ({ title, type, placeholder, isPrice, isBarCode, ...rest }) => {
    return (
        <Input
            autoFocus={!!isBarCode}
            type={type}
            variant={'underlined'}
            label={title}
            labelPlacement={'outside'}
            placeholder={placeholder || ('Ingrese el ' + title)}
            endContent={isPrice
                ? <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                </div>
                : null}
            min={isPrice ? 0 : null}
            {...rest}
        />
    )
}

const ProductCard = ({ item, closeButton, onClose }) => {
    const { id, name, image, code, costPrice, salePrice } = item
    return <div className="flex gap-2 flex-row w-full items-center border rounded-xl">
        <Image
            shadow="none"
            radius="lg"
            width="50"
            height="50"
            alt={name}
            className="w-[4rem] object-cover h-[4rem] rounded-lg bg-slate-100 dark:bg-white"
            // src={'https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg'}
            src={image?.length ? ConvertBytesToImage({ imageBytes: image }) : DefaultImageMarinaMarket()}
        />
        <div className="flex w-full flex-col">
            <span className="text-small">{name}</span>
            <span className="text-tiny text-default-400">{salePrice}</span>
        </div>
        {closeButton &&
        <Button className='m-auto mr-2 rounded-full' variant='light' isIconOnly onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
        </Button>
        }
    </div>
}

export default function CreateOffer () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [searchInput, setSearchInput] = useState('')
    const [filteredList, setFilteredList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)

    const { data, setFormData, requestCreateOffer, loading, error, setError, complete, hasRequeredValues, clearStore } = useOfferFormStore()
    const { listInventory } = useInventoryStore()

    useEffect(() => {
        if (isOpen) {
            useSalesStore.getState()?.disabledRedirectSales()
        } else {
            useSalesStore.getState()?.enabledRedirectSales()
        }
    }, [isOpen])

    useEffect(() => {
        // Create copy of item list
        if (searchInput) {
            let updatedList = [...listInventory]
            // Include all elements which includes the search query
            updatedList = updatedList.filter((item) => {
                return item?.meta?.toLowerCase().indexOf(searchInput?.toLowerCase()) !== -1
            })
            // Trigger render with updated values
            setFilteredList(updatedList)
        } else if (searchInput === '') {
            setFilteredList([...listInventory])
        }
    }, [searchInput, listInventory])

    useEffect(() => {
        let value = null
        if (selectedProduct) {
            value = selectedProduct?.id
        }
        handleInputChange({ field: 'product_id', value })
    }, [selectedProduct])

    useEffect(() => {
        if (complete && !error) {
            clearStore()
            onClose()
        }
    }, [complete, error])

    const handleInputChange = ({ field, value, isSalePrice }) => {
        const newFormValues = { ...data, [field]: !isNaN(value) ? parseInt(value) : value }
        if (isSalePrice) {
            newFormValues.net_price = newFormValues?.sale_price / 1.19
        }
        console.log(newFormValues)
        setFormData(newFormValues)
    }

    return (
        <section>
            <header className="flex justify-end">
                <Button className='bg-primary-400 dark:bg-primary-400' color='primary' onClick={onOpen}>Crear oferta</Button>
            </header>
            <Modal size={'xl'}
                isOpen={isOpen}
                backdrop='blur'
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Nueva oferta</ModalHeader>
                    <ModalBody>
                        <section>
                            {
                                selectedProduct
                                    ? <div className='flex flex-col gap-5'>
                                        <ProductCard item={selectedProduct} closeButton onClose={() => setSelectedProduct(null)}/>
                                        <div className="my-4 flex items-center gap-4">
                                            <InputComponent
                                                type="number"
                                                title="Precio unitario"
                                                placeholder="0"
                                                isPrice
                                                onValueChange={(value) => { handleInputChange({ field: 'unit_price', value }) }}
                                            />
                                            <InputComponent
                                                type="number"
                                                title="Cantidad"
                                                placeholder="0"
                                                onValueChange={(value) => { handleInputChange({ field: 'quantity', value }) }}
                                            />
                                        </div>
                                    </div>
                                    : <section>
                                        <div className="my-4 items-center gap-4 grid">
                                            <Input
                                                label="Busqueda"
                                                isClearable
                                                radius="lg"
                                                value={searchInput}
                                                onClear={() => setSearchInput('')}
                                                onChange={(e) => setSearchInput(event.target.value)}
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
                                        </div>

                                        <ScrollShadow isEnabled={false} className="w-full h-[30rem] flex flex-col items-center snap-y snap-mandatory ">
                                            {/* <section className='flex flex-col items-center justify-center gap-2'> */}
                                            {filteredList?.map((item, index) => (
                                                <div key={'productSearch' + index}
                                                    onClick={() => setSelectedProduct(item)}
                                                    className='m-2 self-center w-full sm:w-3/4 items-center justify-center snap-start shrink-0'>
                                                    <ProductCard item={item}/>
                                                </div>

                                            ))}
                                        </ScrollShadow>

                                    </section>
                            }

                        </section>
                    </ModalBody>
                    <ModalFooter>
                        {error
                            ? <div className='flex mx-5 self-center'>
                                <h1>{error}</h1>
                            </div>
                            : null}
                        <Button className =" bg-green-500 text-primary-50"
                            onClick={() => { requestCreateOffer(data) }}
                            isLoading={!!loading}>
                            Guardar
                        </Button>
                        <Button color="danger" variant="flat"
                            onClick={() => {
                                onClose()
                                clearStore()
                            }}
                        >
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    )
}