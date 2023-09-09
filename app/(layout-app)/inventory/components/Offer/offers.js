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
import useOffersStore from '@/stores/offers'
import CreateOffer from './createOffer'
import { DeleteIcon } from '@/components/ui/DeleteIcon'

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

const OffertCard = ({ item }) => {
    const { id, quantity, unitPrice, productId } = item
    const products = useInventoryStore.getState().listInventory
    const product = useInventoryStore.getState().getProductById(products, productId)
    return <div className="flex gap-2 flex-row w-full items-center border rounded-xl pr-2">
        <Image
            shadow="none"
            radius="lg"
            width="50"
            height="50"
            alt={name}
            className="w-[4rem] object-cover h-[4rem] rounded-lg bg-slate-100 dark:bg-white"
            // src={'https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg'}
            src={product?.image?.length ? ConvertBytesToImage({ imageBytes: product?.image }) : DefaultImageMarinaMarket()}
        />
        <div className="flex w-full flex-col">
            <span className="text-small">{name}</span>
            <span className="text-tiny text-default-400">{product?.salePrice}</span>
        </div>
        <Button className='' variant='flat' color='danger' isIconOnly /* onClick={ dlete } */>
            <DeleteIcon/>
        </Button>
    </div>
}

export default function Offers () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [searchInput, setSearchInput] = useState('')
    const [filteredList, setFilteredList] = useState([])
    const [sectionCreateOffer, setSectionCreateOffer] = useState(false)
    const [messageSearch, setMessageSearch] = useState('')

    const { data, setFormData, requestCreateOffer, loading, error, setError, complete, hasRequeredValues, clearStore } = useOfferFormStore()
    const { listInventory } = useInventoryStore()
    const { offers } = useOffersStore()

    useEffect(() => {
        if (isOpen) {
            useSalesStore.getState()?.disabledRedirectSales()
        } else {
            useSalesStore.getState()?.enabledRedirectSales()
            setFilteredList([])
            setSearchInput(null)
            setSectionCreateOffer(false)
        }
    }, [isOpen])

    /* useEffect(() => {
        // Create copy of item list
        const searchSize = searchInput?.length || 0
        if (searchSize >= 3) {
            let updatedList = [...listInventory]
            updatedList = updatedList.filter((item) => {
                return item?.meta?.toLowerCase().includes(searchInput?.toLowerCase())
                // return item?.meta?.toLowerCase().indexOf(searchInput?.toLowerCase()) !== -1
            })

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
    }, [searchInput, listInventory]) */

    useEffect(() => {
        if (complete && !error) {
            clearStore()
            onClose()
        }
    }, [complete, error])

    return (
        <section>
            <header className="flex justify-end">
                <Button className='bg-primary-400 dark:bg-primary-400' color='primary' onClick={onOpen}>Ofertas</Button>
            </header>
            <Modal size={'xl'}
                isOpen={isOpen}
                backdrop='blur'
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                {!sectionCreateOffer
                    ? <ModalContent>
                        <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">{'Ofertas'}</ModalHeader>
                        <ModalBody>
                            <section className='flex flex-col gap-2'>
                                {offers?.length
                                    ? offers.map((item) => {
                                        // {id,quantity,unitPrice,productId }
                                        return (<div key={item.id}><OffertCard item={item}/></div>)
                                    })
                                    : null}
                            </section>
                        </ModalBody>
                        <ModalFooter>
                            {error
                                ? <div className='flex mx-5 self-center'>
                                    <h1>{error}</h1>
                                </div>
                                : null}
                            <Button className =" bg-green-500 text-primary-50"
                                onClick={() => { setSectionCreateOffer(true) }}>
                                {'Crear oferta'}
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
                    : <ModalContent>
                        <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">{'Crear nueva oferta'}</ModalHeader>
                        <ModalBody>
                            <section>
                                <CreateOffer/>
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
                                {'Guardar'}
                            </Button>
                            <Button color="danger" variant="flat"
                                onClick={() => {
                                    setSectionCreateOffer(false)
                                    clearStore()
                                }}
                            >
                                {'Cancelar'}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                }
            </Modal>
        </section>
    )
}
