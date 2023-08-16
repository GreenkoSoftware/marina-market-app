import React from "react";
import { Modal,Switch, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function SettingModal({ isOpen, onClose }) {
  return (
    <>
      <div className="flex flex-wrap gap-3">
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <Switch defaultSelected color="success">
                Al escanear un producto, se genera automaticamente una venta
              </Switch>
              <Switch defaultSelected color="success">
                Al escanear un producto, se despliega automaticamente la informacion
              </Switch>
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
