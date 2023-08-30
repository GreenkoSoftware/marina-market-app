import React, { useEffect, useMemo, useState } from 'react'
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { InputComponent, SectionProduct, SelectComponent } from './NewProduct/createProduct'
import ProductImage from './NewProduct/productImage'
import useInventoryStore from '../store'
import Image from 'next/image'
import { ConvertBytesToImage } from '@/utils/image'

export default function ProductDetail ({ targeProduct, isOpen, onClose, setTargetProduct }) {
    const [edit, setEdit] = useState(false)
    const [categoryOptions, setCategoryOptions] = useState([])
    const [stockTypeOptions, setStockTypeOptions] = useState([])
    const { listCategories, listStockTypes } = useInventoryStore()

    useEffect(() => {
        setCategoryOptions(listCategories)
        setStockTypeOptions(listStockTypes)
    }, [listCategories, listStockTypes])

    return (
        <>
            <div className="flex flex-wrap gap-3">
            </div>
            <Modal size={'2xl'}
                isOpen={isOpen}
                backdrop='opaque'
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent>

                    <section>
                        <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Detalles del producto</ModalHeader>
                        <ModalBody>
                            <section>
                                <SectionProduct title={null}>
                                    <div className="my-4 items-center gap-4 grid grid-cols-1 md:grid-cols-2">
                                        <div className="flex-3">
                                            {
                                                edit
                                                    ? <ProductImage defaultImg={targeProduct?.image}/>
                                                    : <div className="rounded-lg flex items-center m-auto w-[250px] flex-col space-y-2 p-2 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                                                        <Image id='imageProduct'
                                                            src={ConvertBytesToImage({ imageBytes: targeProduct?.image })}
                                                            alt="Image name"
                                                            width={250}
                                                            height={200}
                                                        />
                                                    </div>
                                            }
                                        </div>
                                        <div className="flex flex-1 items-start flex-col w-full gap-4">
                                            <InputComponent
                                                isBarCode={true}
                                                type="text"
                                                title="Codigo de barra"
                                                defaultValue={targeProduct?.code}
                                                disabled={!edit}
                                                onValueChange={(value) => { console.log({ field: 'barcode', value }) }}
                                            />
                                            <InputComponent
                                                type="text"
                                                title="Nombre"
                                                defaultValue={targeProduct?.name}
                                                onValueChange={(value) => { console.log({ field: 'name', value }) }}
                                                disabled={!edit}
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
                                            // defaultValue={targeProduct?.}
                                            onSelectionChange={(value) => { console.log({ field: 'category_id', value: value?.currentKey }) }}
                                            disabled={!edit}
                                        />
                                        <SelectComponent
                                            isRequired
                                            title="Tipo de stock"
                                            placeholder="Seleccione"
                                            // defaultSelectedKeys={['']}
                                            options={stockTypeOptions}
                                            // defaultValue={targeProduct?.}
                                            onSelectionChange={(value) => { console.log({ field: 'stock_type_id', value: value?.currentKey }) }}
                                            disabled={!edit}
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
                                            defaultValue={targeProduct?.price}
                                            onValueChange={(value) => { console.log({ field: 'cost_price', value }) }}
                                            disabled={!edit}
                                        />
                                        <InputComponent
                                            type="number"
                                            title="Precio neto"
                                            placeholder="0"
                                            isPrice
                                            defaultValue={targeProduct?.price}
                                            onValueChange={(value) => { console.log({ field: 'net_price', value }) }}
                                            disabled={!edit}
                                        />
                                    </div>
                                </SectionProduct>
                                <SectionProduct title={'Stock'} showDivider>
                                    <div className="my-4 flex items-center gap-4">
                                        <InputComponent
                                            type="number"
                                            title="Stock mínimo"
                                            placeholder="0"
                                            defaultValue={targeProduct?.stock}
                                            onValueChange={(value) => { console.log({ field: 'stock_min', value }) }}
                                            disabled={!edit}
                                        />
                                        <InputComponent
                                            type="number"
                                            title="Stock disponible"
                                            placeholder="0"
                                            defaultValue={targeProduct?.stock}
                                            onValueChange={(value) => { console.log({ field: 'stock', value }) }}
                                            disabled={!edit}
                                        />
                                    </div>
                                </SectionProduct>
                            </section>
                        </ModalBody>
                        {edit

                            ? <ModalFooter>
                                <Button className =" bg-green-500 text-primary-50" onClick={() => {
                                    setEdit(false)
                                    setTargetProduct(null)
                                    onClose()
                                }
                                }>
                            Guardar
                                </Button>
                                <Button color="danger" variant="light"
                                    onClick={() => {
                                        setEdit(false)
                                    }}
                                >
                            Cancelar
                                </Button>
                            </ModalFooter>
                            : <ModalFooter>
                                <Button className =" bg-blue-500 text-primary-50"
                                    onClick={() => {
                                        setEdit(true)
                                    }}>
                            Editar
                                </Button>
                                <Button color="danger" variant="light"
                                    onClick={() => {
                                        setEdit(false)
                                        setTargetProduct(null)
                                        onClose()
                                    }}
                                >
                            Cerrar
                                </Button>
                            </ModalFooter>
                        }
                    </section>
                </ModalContent>

            </Modal>
        </>
    )
}
