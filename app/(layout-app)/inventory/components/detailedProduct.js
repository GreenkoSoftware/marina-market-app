import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
export default function DetailedProduct({ targeProduct, isOpen, onClose,setTargetProduct }){

  
    return (
      <>
        <div className="flex flex-wrap gap-3">
        </div>
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Detalles del producto</ModalHeader>
                <ModalBody>
                <p className="text-primary-500 dark:text-primary-200">  { 'Nombre : ' + targeProduct?.title}</p>
                </ModalBody>
                <ModalFooter>
                 {/*  <Button className ="dark" onClick={onClose}>
                    Aceptar
                  </Button> */}
                  <Button color="danger" variant="light" 
                    onClick={()=>{
                        setTargetProduct(null)
                        onClose()
                    }}
                   >
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}