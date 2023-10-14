import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import { deleteProduct, /* deleteProduct, */ updateProduct } from '@/services/products'
import toast from 'react-hot-toast'

export default function ConfirmModal (props) {
    const {
        product,
        type,
        setLoadingDelete,
        setTargetProduct,
        getListInventory,
        targeProduct,
        onCloseTargetModal,
        setConfirm,
        setLoadingEdit,
        setEdit,
        newProductData
    } = props
    const [productData, setProductData] = useState(product)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = React.useState('')
    const [invalid, setInvalid] = React.useState(false)
    const notify = (text) => toast(text)

    const target = () => {
        const newValue = value
        if (newValue === productData?.name && productData !== undefined) {
            setInvalid(true)
            if (type === 'Eliminar') {
                console.log('diarrea')
                const productId = targeProduct?.id
                setLoadingDelete(false)
                deleteProduct({ id: productId, notify }).then(
                    (response) => {
                        console.log(response)
                        setTargetProduct(null)
                        getListInventory()
                        onClose()
                        onCloseTargetModal()
                    })
            } else {
                if (type === 'Editar') {
                    const productId = targeProduct?.id
                    try {
                        updateProduct({ id: productId, ...newProductData, notify }).then(
                            (response) => {
                                console.log(response)
                                setLoadingEdit(false)
                                setEdit(false)
                                setTargetProduct(null)
                                onClose()
                                getListInventory()
                            }
                        )
                    } catch (err) {
                        console.log(err)
                        setConfirm(false)
                        setLoadingEdit(false)
                        setEdit(false)
                        setTargetProduct(null)
                        onClose()
                    }
                }
            }
        } else {
            setInvalid(true)
        }
    }

    const close = () => {
        setLoadingDelete(false)
        setLoadingEdit(false)
        onOpen(false)
        setConfirm(false)
        onClose()
    }

    useEffect(() => {
        onOpen(true)
        setProductData(product)
    }, [])

    return (
        <Modal
            backdrop="opaque"
            isOpen={isOpen}
            radius="2xl"
            classNames={{
                body: 'py-6',
                backdrop: 'bg-[#C70039]/50 backdrop-opacity-40',
                base: 'border-[#C70039] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
                header: 'border-b-[1px] border-[#C70039]',
                footer: 'border-t-[1px] border-[#C70039]',
                closeButton: 'hover:bg-white/5 active:bg-white/10'
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 font-bold items-center">{type} producto</ModalHeader>
                <ModalBody>
                    <div className='flex flex-col justify-between mx-10 gap-4'>
                        {type === 'Eliminar'
                            ? <p>Se eliminara el producto:<p className='font-bold'>{product?.name}</p></p>
                            : <p>Se modificara el producto:<p className='font-bold'>{product?.name}</p></p>
                        }
                        <p>Para confirmar, debes ingresar el nombre del producto</p>
                        <Input
                            classNames={'max-w-xs' }
                            isInvalid={invalid}
                            color={invalid ? 'danger' : ''}
                            errorMessage={invalid && 'Respuesta invalida'}
                            isRequired
                            type="text"
                            label="Producto"
                            placeholder={product?.name}
                            onValueChange={setValue}
                        />

                    </div>
                </ModalBody>
                <ModalFooter className='justify-center'>
                    <Button color="foreground" variant="light" onPress={close}>
                                    Cancelar
                    </Button>
                    <Button color="danger" className="shadow-lg shadow-indigo-500/20" onPress={target}>
                                    Aceptar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
