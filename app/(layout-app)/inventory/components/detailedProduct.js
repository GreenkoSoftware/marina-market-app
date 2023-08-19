import React,{ useCallback } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button ,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";

import { EditIcon } from "@/assets/icons/EditIcon";
import { DeleteIcon } from "@/assets/icons/DeleteIcon";
import { EyeIcon } from "@/assets/icons/EyeIcon";
import { columns, users } from "../data";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function DetailedProduct({ targeProduct, isOpen, onClose,setTargetProduct }){

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
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
                <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={users}>
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
                </Table>
                </ModalBody>
                <ModalFooter>
                  <Button className ="dark" onClick={onClose}>
                    Agregar mejor una tabla para dsp editar
                  </Button> 
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

/* 
 <ModalBody>
                <div className="flex flex-row space-x-1">
                  <p className="text-primary-500 dark:text-primary-200 font-bold">  { 'Nombre :'}</p>
                  <p className="text-primary-500 dark:text-primary-200">  { targeProduct?.title}</p>
                </div>
                <div className="flex flex-row space-x-1">
                  <p className="text-primary-500 dark:text-primary-200 font-bold">  { 'Stock :'}</p>
                  <p className="text-primary-500 dark:text-primary-200">  { targeProduct?.stock + ' unidades'}</p>
                </div>
                <div className="flex flex-row space-x-1">
                  <p className="text-primary-500 dark:text-primary-200 font-bold">  { 'Precio :'}</p>
                  <p className="text-primary-500 dark:text-primary-200">  { targeProduct?.price}</p>
                </div>
                </ModalBody>

*/