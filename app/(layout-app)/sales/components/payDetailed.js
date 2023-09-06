/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'

export default function PayDetailed ({ isOpen, onClose }) {
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
                        <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Calcular pago</ModalHeader>
                        <ModalBody>

                        </ModalBody>

                    </section>
                </ModalContent>

            </Modal>
        </>
    )
}
