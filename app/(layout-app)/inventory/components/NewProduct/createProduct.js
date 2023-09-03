/* eslint-disable no-unused-vars */
'use client'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, dropdown, useDisclosure } from '@nextui-org/react'
import React, { Suspense, createRef, useEffect, useMemo, useState } from 'react'
import ProductImage from './productImage'
import BarcodeScanner from './scanner'
import { generateProductCode } from '@/utils/barcode'
import Barcosde from '@/components/barcode'
import useProductFormStore from './store'
import useInventoryStore from '../../store'
import useSalesStore from '@/app/(layout-app)/sales/store'

export const SectionProduct = ({ title, children, showDivider }) => {
    return (
        <section className="mt-3 space-y-2">
            { showDivider ? <Divider/> : null}
            <h3 className="text-medium pt-1">{title}</h3>
            <section className="space-y-3">
                {children}
            </section>
        </section>
    )
}

export const SelectComponent = ({ title, type, placeholder, options, ...rest }) => {
    return (
        <Select
            isRequired
            className="max-w-xs"
            type={type}
            variant={'underlined'}
            label={title}
            labelPlacement={'outside'}
            placeholder={placeholder || ('Ingrese el ' + title)}
            {...rest}

        >
            {options?.filter((item) => item?.id !== -1).map(({ id, label }) => (
                <SelectItem key={id} value={label}>
                    {label}
                </SelectItem>
            ))}
        </Select>
    )
}

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

export default function CreateProduct () {
    /*  const productName = 'COCA-COLA'
    const productCode = generateProductCode(productName) */

    const { isOpen, onClose, onOpen } = useDisclosure()
    const [scanProduct, setScanProduct] = useState(false)

    const [categoryOptions, setCategoryOptions] = useState([])
    const [stockTypeOptions, setStockTypeOptions] = useState([])

    const { data, setFormData, requestCreateProduct, loading, error, setError, complete, hasRequeredValues, clearStore } = useProductFormStore()
    const { listCategories, listStockTypes, getCategories, getStockTypes } = useInventoryStore()

    useEffect(() => {
        if (isOpen) {
            getStockTypes()
            getCategories()
            useSalesStore.getState()?.disabledRedirectSales()
        } else {
            useSalesStore.getState()?.enabledRedirectSales()
        }
    }, [isOpen])

    useEffect(() => {
        setCategoryOptions(listCategories)
        setStockTypeOptions(listStockTypes)
    }, [listCategories, listStockTypes])

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
                <Button className='bg-primary-400 dark:bg-primary-400' color='primary' onClick={onOpen}>Crear nuevo producto</Button>
            </header>
            <Modal size={'2xl'}
                isOpen={isOpen}
                backdrop='opaque'
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Nuevo producto</ModalHeader>
                    <ModalBody>
                        <section>
                            {/* <Barcosde showDetail={true} productName = {productName} productCode ={ productCode } productCost={"1790"}/> */}
                            <SectionProduct title={null}>
                                <div className="my-4 items-center gap-4 grid grid-cols-1 md:grid-cols-2">
                                    {/*  <div>
                        <Button onClick={() => {scanProduct ? setScanProduct(false) : setScanProduct(true)}}>{!scanProduct ? 'Scanner' : 'Finalizar Scanner'}</Button>
                        {scanProduct ?
                        <BarcodeScanner stopScan={() => setScanProduct(false)}/>
                        : null}
                        </div> */}
                                    <div className="flex-3">
                                        <ProductImage/>
                                    </div>
                                    <div className="flex flex-1 items-start flex-col w-full gap-4">
                                        <InputComponent
                                            isRequired
                                            isBarCode={true}
                                            type="text"
                                            title="Codigo de barra"
                                            onValueChange={(value) => { handleInputChange({ field: 'barcode', value }) }}
                                        />
                                        <InputComponent
                                            type="text"
                                            title="Nombre"
                                            onValueChange={(value) => { handleInputChange({ field: 'name', value }) }}
                                        />

                                    </div>
                                </div>
                                <div className="my-4 flex items-center gap-4">

                                    <SelectComponent
                                        isRequired
                                        title="Categoria"
                                        placeholder="Seleccione"
                                        // defaultSelectedKeys={['']}
                                        options={categoryOptions}
                                        onSelectionChange={(value) => { handleInputChange({ field: 'category_id', value: value?.currentKey }) }}
                                    />
                                    <SelectComponent
                                        isRequired
                                        title="Tipo de stock"
                                        placeholder="Seleccione"
                                        // defaultSelectedKeys={['']}
                                        options={stockTypeOptions}
                                        onSelectionChange={(value) => { handleInputChange({ field: 'stock_type_id', value: value?.currentKey }) }}
                                    />
                                </div>
                            </SectionProduct>
                            <SectionProduct title={'Precio'} showDivider>
                                <div className="my-4 flex items-center gap-4">
                                    <InputComponent
                                        type="number"
                                        title="Precio costo"
                                        placeholder="0"
                                        isPrice
                                        onValueChange={(value) => { handleInputChange({ field: 'cost_price', value }) }}
                                    />
                                    <InputComponent
                                        type="number"
                                        title="Precio venta"
                                        placeholder="0"
                                        isPrice
                                        onValueChange={(value) => { handleInputChange({ field: 'sale_price', value, isSalePrice: true }) }}

                                    />
                                </div>
                            </SectionProduct>
                            <SectionProduct title={'Stock'} showDivider>
                                <div className="my-4 flex items-center gap-4">
                                    <InputComponent
                                        type="number"
                                        title="Stock mínimo"
                                        placeholder="0"
                                        onValueChange={(value) => { handleInputChange({ field: 'stock_min', value }) }}
                                    />
                                    <InputComponent
                                        type="number"
                                        title="Stock disponible"
                                        placeholder="0"
                                        onValueChange={(value) => { handleInputChange({ field: 'stock', value }) }}
                                    />
                                </div>
                            </SectionProduct>
                        </section>
                    </ModalBody>
                    <ModalFooter>
                        {error
                            ? <div className='flex mx-5 self-center'>
                                <h1>{error}</h1>
                            </div>
                            : null}
                        <Button className =" bg-green-500 text-primary-50"
                            onClick={() => { requestCreateProduct(data) }}
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
