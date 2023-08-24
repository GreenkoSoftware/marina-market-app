/* eslint-disable no-unused-vars */
'use client'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { Suspense, createRef, useEffect, useMemo, useState } from 'react'
import ProductImage from './productImage'
import BarcodeScanner from './scanner'
import { generateProductCode } from '@/utils/barcode'
import Barcosde from '@/components/barcode'
import useProductFormStore from './store'

const SectionProduct = ({ title, children, showDivider }) => {
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

const SelectItems = ({ title, items, selectedValue, selectedKeys, setSelectedKeys }) => {
    return (
        <section className="space-y-2 w-full">
            <label className="block text-small font-medium text-foreground pb-0">{title}</label>
            <Dropdown className="">
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="capitalize w-full border"
                    >
                        {selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection actions"
                    variant="bordered"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                >
                    {items?.map((item) => {
                        return (
                            <DropdownItem key={item}>{item?.toUpperCase()}</DropdownItem>
                        )
                    })}
                </DropdownMenu>
            </Dropdown>
        </section>
    )
}

const InputComponent = ({ title, type, placeholder, isPrice, isBarCode, ...rest }) => {
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
    const productName = 'COCA-COLA'
    const productCode = generateProductCode(productName)
    const { isOpen, onClose, onOpen } = useDisclosure()

    const {
        data,
        setFormData,
        requestCreateProduct
    } = useProductFormStore()

    useEffect(() => {
        console.log('Setore name: ' + data?.name)
        console.log('Setore barcode: ' + data?.barcode)
        console.log('Setore image: ' + data?.image?.length)
    }, [data])

    const [selectedKeys, setSelectedKeys] = useState(new Set(['Seleccione']))
    const [scanProduct, setScanProduct] = useState(false)

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
        [selectedKeys]
    )

    const handleInputChange = ({ field, value }) => {
        const newFormValues = { ...data, [field]: !isNaN(value) ? parseFloat(value) : value }
        console.log(value)
        console.log(newFormValues)
        setFormData(newFormValues)
    }

    return (
        <section>
            <header className="flex justify-end">
                <Button onClick={onOpen}>Crear nuevo producto</Button>
            </header>
            <Modal size={'2xl'}
                isOpen={isOpen}
                onClose={() => onClose}
                scrollBehavior={'inside'}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Nuevo producto</ModalHeader>
                    <ModalBody>
                        <section>
                            {/* <Barcosde showDetail={true} productName = {productName} productCode ={ productCode } productCost={"1790"}/> */}
                            <SectionProduct title={'Producto'}>
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
                                        {/*  <SelectItems title={'Categoria'} items={['PAN', 'BEBIDA', 'carne', 'AAAAAAASDSAD']}/> */}
                                    </div>
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
                                        title="Precio neto"
                                        placeholder="0"
                                        isPrice
                                        onValueChange={(value) => { handleInputChange({ field: 'net_price', value }) }}

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
                        <Button className =" bg-green-500 text-primary-50" onClick={() => {
                            requestCreateProduct(data)
                        }
                        }>
                        Guardar
                        </Button>
                        <Button color="danger" variant="light"
                            onClick={() => {
                                onClose()
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
