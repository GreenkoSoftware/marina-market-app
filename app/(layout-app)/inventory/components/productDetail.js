import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import { InputComponent, SectionProduct, SelectComponent } from './NewProduct/createProduct'
import ProductImage from './NewProduct/productImage'
import useInventoryStore from '../store'
import Image from 'next/image'
import { ConvertBytesToImage } from '@/utils/image'
import { DeleteIcon } from '@/components/ui/DeleteIcon'
import { deleteProduct, updateProduct } from '@/services/products'

export default function ProductDetail ({ targeProduct, isOpen, onClose, setTargetProduct }) {
    const { listCategories, listStockTypes } = useInventoryStore()
    const [edit, setEdit] = useState(false)
    const [categoryOptions, setCategoryOptions] = useState([])
    const [stockTypeOptions, setStockTypeOptions] = useState([])

    const defaultState = {
        image: null,
        code: null,
        name: null,
        category_id: null,
        stock_type_id: null,
        cost_price: null,
        net_price: null,
        price: null,
        stock: null,
        stock_min: null
    }
    const [productData, setProductData] = useState(defaultState)
    const [newProductData, setNewProductData] = useState(defaultState)

    useEffect(() => {
        setCategoryOptions(listCategories)
        setStockTypeOptions(listStockTypes)
    }, [listCategories, listStockTypes])

    const handleInputChange = ({ field, value, isSalePrice }) => {
        const newProductValues = { ...newProductData, [field]: !isNaN(value) ? parseInt(value) : value }
        if (isSalePrice) {
            newProductValues.net_price = newProductValues?.price / 1.19
        }
        console.log(newProductValues)
        setNewProductData(newProductValues)
    }

    useEffect(() => {
        if (targeProduct && !edit) {
            console.log(targeProduct)
            setProductData({
                image: targeProduct?.image,
                code: targeProduct?.code,
                name: targeProduct?.name,
                category_id: targeProduct?.productCategoryId,
                stock_type_id: targeProduct?.stockTypeId,
                cost_price: targeProduct?.costPrice,
                price: targeProduct?.price,
                stock: targeProduct?.stock,
                stock_min: targeProduct?.stockMin
            })
        }
    }, [targeProduct, edit])

    const handleDeleteProduct = () => {
        const productId = targeProduct?.id
        deleteProduct({ id: productId }).then(
            (response) => {
                console.log(response)
            }
        )
    }

    const handleUpdateProduct = () => {
        const productId = targeProduct?.id
        try {
            updateProduct({ id: productId, ...newProductData }).then(
                (response) => {
                    console.log(response)
                }
            )
        } catch (err) {
            console.log(err)
        } finally {
            setEdit(false)
            setTargetProduct(null)
            onClose()
        }
    }

    const handleCancelUpdateProduct = () => {
        setEdit(false)
        setNewProductData(defaultState)
    }

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
                                                    ? <ProductImage defaultImg={productData?.image}/>
                                                    : <div className="rounded-lg flex items-center m-auto w-[250px] flex-col space-y-2 p-2 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                                                        <Image id='imageProduct'
                                                            src={ConvertBytesToImage({ imageBytes: productData?.image })}
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
                                                defaultValue={productData?.code}
                                                disabled={!edit}
                                                onValueChange={(value) => { handleInputChange({ field: 'code', value }) }}
                                            />
                                            <InputComponent
                                                type="text"
                                                title="Nombre"
                                                defaultValue={productData?.name}
                                                onValueChange={(value) => { handleInputChange({ field: 'name', value }) }}
                                                disabled={!edit}
                                            />

                                        </div>
                                    </div>
                                    <div className="my-4 flex items-center gap-4">

                                        <SelectComponent
                                            isRequired
                                            title="Categoria"
                                            placeholder="Seleccione"
                                            defaultSelectedKeys={[productData?.category_id?.toString()]}
                                            options={categoryOptions}
                                            // defaultValue={targeProduct?.}
                                            onSelectionChange={(value) => { handleInputChange({ field: 'category_id', value: value?.currentKey }) }}
                                            isDisabled={!edit}
                                        />
                                        <SelectComponent
                                            isRequired
                                            title="Tipo de stock"
                                            placeholder="Seleccione"
                                            defaultSelectedKeys={[productData?.stock_type_id?.toString()]}
                                            options={stockTypeOptions}
                                            // defaultValue={targeProduct?.}
                                            onSelectionChange={(value) => { handleInputChange({ field: 'stock_type_id', value: value?.currentKey }) }}
                                            isDisabled={!edit}
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
                                            defaultValue={productData?.cost_price}
                                            onValueChange={(value) => { handleInputChange({ field: 'cost_price', value }) }}
                                            disabled={!edit}
                                        />
                                        <InputComponent
                                            type="number"
                                            title="Precio venta"
                                            placeholder="0"
                                            isPrice
                                            defaultValue={productData?.price}
                                            onValueChange={(value) => { handleInputChange({ field: 'sale_price', value }) }}
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
                                            defaultValue={productData?.stock_min}
                                            onValueChange={(value) => { handleInputChange({ field: 'stock_min', value }) }}
                                            disabled={!edit}
                                        />
                                        <InputComponent
                                            type="number"
                                            title="Stock disponible"
                                            placeholder="0"
                                            defaultValue={productData?.stock}
                                            onValueChange={(value) => { handleInputChange({ field: 'stock', value }) }}
                                            disabled={!edit}
                                        />
                                    </div>
                                </SectionProduct>
                            </section>
                        </ModalBody>
                        {edit

                            ? <ModalFooter>
                                <Button className =" bg-green-500 text-primary-50"
                                    onClick={handleUpdateProduct}>
                                    {'Guardar'}
                                </Button>
                                <Button color="danger" variant="light"
                                    onClick={handleCancelUpdateProduct}
                                >
                                    {'Cancelar'}
                                </Button>
                            </ModalFooter>
                            : <ModalFooter>
                                <Button color="danger" variant="bordered"
                                    startContent={<DeleteIcon/>}
                                    onClick={handleDeleteProduct}>
                                    {'Eliminar'}
                                </Button>
                                <Button className =" bg-blue-500 text-primary-50"
                                    onClick={() => {
                                        setEdit(true)
                                    }}>
                                    {'Editar'}
                                </Button>
                                <Button color="danger" variant="light"
                                    onClick={() => {
                                        setEdit(false)
                                        setTargetProduct(null)
                                        onClose()
                                    }}
                                >
                                    {'Cerrar'}
                                </Button>
                            </ModalFooter>
                        }
                    </section>
                </ModalContent>

            </Modal>
        </>
    )
}
