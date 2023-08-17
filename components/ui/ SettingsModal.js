import React from "react";
import { Modal,Checkbox, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function SettingModal({ isOpen, onClose }) {
  const [isSelected, setIsSelected] = React.useState(false);
  const [isSelected2, setIsSelected2] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Atajos</ModalHeader>
              <ModalBody>
              <p className="text-primary-500 dark:text-primary-200">Al escanear un producto</p>
              <Checkbox isSelected={isSelected} onValueChange={setIsSelected} color="danger">
                se genera automaticamente una venta
              </Checkbox>
              <Checkbox isSelected={isSelected2} onValueChange={setIsSelected2} color="danger">
                se obtiene la informacion del producto
              </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button className ="dark" onClick={onClose}>
                  Aceptar
                </Button>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
