'use client'
import { Option, Select } from "@material-tailwind/react";
import { Button, Card, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import React from "react";
import ProductImage from "./productImage";



export default function CreateProduct({ trigger }){
    const { isOpen, onClose, onOpen } = useDisclosure();

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Seleccione"]))

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

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

  const SelectItems = ({ title, items }) => {
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

  const InputComponent = ({ title, type, placeholder, isPrice }) => {
    return (
        <Input 
            type={type} 
            variant={"underlined"} 
            label={title} 
            labelPlacement={'outside'}
            placeholder={placeholder || ("Ingrese el " + title)}
            endContent={isPrice ? 
                <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
                </div> : null}
            min={isPrice ? 0 : null}
        />
    )
  }


    return (
        <section>
            <header className="flex justify-end">
                <Button onClick={onOpen}>Crear nuevo producto</Button>
            </header>
            <Modal size={"2xl"} 
                isOpen={isOpen} 
                onClose={() => onClose}
                scrollBehavior={"inside"}    
            >
            <ModalContent>
               <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Nuevo producto</ModalHeader>
               <ModalBody>
                <section>
                    <SectionProduct title={'Producto'}>
                        <div className="my-4 items-center gap-4 grid grid-cols-1 md:grid-cols-2">
                            <div className="flex-3">
                            <ProductImage/>
                            </div>
                            <div  className="flex flex-1 items-start flex-col w-full gap-4">
                                <InputComponent 
                                    type="text" 
                                    title="Nombre" 
                                    />
                                <InputComponent 
                                    type="text" 
                                    title="Codigo de barra" 
                                    />
                                <SelectItems title={'Categoria'} items={['PAN', 'BEBIDA', 'carne', 'AAAAAAASDSAD']}/>
                            </div>
                        </div>
                    </SectionProduct>
                    <SectionProduct title={'Precio'} showDivider>
                        <div className="my-4 flex items-center gap-4">
                            <InputComponent
                                type="number"
                                title="Precio compra"
                                placeholder="0"
                                isPrice
                            />
                            <InputComponent
                                type="number"
                                title="Precio neto"
                                placeholder="0"
                                isPrice
                            />
                        </div>
                    </SectionProduct>
                    <SectionProduct title={'Stock'} showDivider>
                        <div className="my-4 flex items-center gap-4">
                            <InputComponent
                                type="number"
                                title="Stock mínimo"
                                placeholder="0"
                            />
                            <InputComponent
                                type="number"
                                title="Stock disponible"
                                placeholder="0"
                            />
                        </div>
                    </SectionProduct>
                </section>
               </ModalBody>
                <ModalFooter>
                    <Button className =" bg-green-500 text-primary-50" onClick={()=>{
                        onClose()
                    }
                    }>
                        Guardar
                    </Button> 
                    <Button color="danger" variant="light" 
                        onClick={()=>{
                            onClose()
                        }}
                    >
                        Cerrar
                    </Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </section>
    );
}