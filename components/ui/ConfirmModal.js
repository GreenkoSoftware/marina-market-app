import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import { deleteProduct } from '@/services/products'
import toast from 'react-hot-toast'

export default function ConfirmModal (props) {
    const {
        product,
        type,
        setLoadingDelete,
        setTargetProduct,
        getListInventory
    } = props
    const [productData, setProductData] = useState(product)
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const [value, setValue] = React.useState('')
    const notify = (text) => toast(text)

    const handleModal = () => {
        const newValue = value
        if (newValue === productData?.name && productData !== undefined) {
            console.log('diarrea')
            setLoadingDelete(false)
            deleteProduct({ id: productData?.id, notify }).then(
                (response) => {
                    console.log(response)
                    setTargetProduct(null)
                    setLoadingDelete(false)
                    getListInventory()
                    onClose()
                })
        } else {
            console.log(newValue)
        }
    }

    useEffect(() => {
        onOpen(true)
        setProductData(product)
    }, [])

    return (
        <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
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
                            isRequired
                            type="text"
                            label="Producto"
                            placeholder={product?.name}
                            className="max-w-xs"
                            onValueChange={setValue}
                        />
                    </div>
                </ModalBody>
                <ModalFooter className='justify-center'>
                    <Button color="foreground" variant="light" onPress={onClose}>
                                    Cancelar
                    </Button>
                    <Button color="danger" className="shadow-lg shadow-indigo-500/20" onPress={handleModal()}>
                                    Aceptar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
