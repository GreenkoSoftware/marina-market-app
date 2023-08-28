/* eslint-disable no-unused-vars */
import useInventoryStore from '@/app/(layout-app)/inventory/store'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export default function ScannerDetection () {
    const [detected, setDetected] = useState(true)
    const [scanner, setScanner] = useState(null)
    const { listInventory, getProductByCode } = useInventoryStore()
    const { addFromNewSales } = useSalesStore()

    const onComplete = (barcode) => {
    // Do stuff with the barcode
        const currentListSales = useSalesStore.getState().listSales
        const product = useInventoryStore.getState().getProductByCode(useInventoryStore.getState().listInventory, barcode)
        console.log(currentListSales)
        console.log(product)
        // alert('PRODUCTO: ' + (product?.name || 'NO EXISTE'))
        if (product) { addFromNewSales(currentListSales, product) }
    }
    const onError = (value) => console.log(value) // Devolución de llamada después de la detección de un escaneo fallido
    const stopPropagation = (value) => console.log(value) // Detiene la propagación inmediata en el evento de pulsación de tecla

    const options = {
        onComplete,
        onError,
        // onReceive: onReceive,
        // timeBeforeScanTest: timeBeforeScanTest,
        // avgTimeByChar: avgTimeByChar,
        // minLength: minLength,
        // endChar: endChar,
        stopPropagation
    }
    async function startScanning () {
        if (typeof window !== 'undefined') {
            import('js-scanner-detection').then(({ default: ScannerDetector }) => {
                const scannerDetector = new ScannerDetector(options)
                setScanner(scannerDetector)
            })
        }
    }

    useEffect(() => {
        // console.log(scanner)
        // console.log(detected)
        if (detected) {
            // console.log(scanner)
            startScanning()
        } else {
            if (scanner) {
                // console.log(scanner)
                scanner?.stopScanning()
            }
        }
    }, [detected])

    return (
        <section>
            <Button onClick={() => { detected ? setDetected(false) : setDetected(true) }} >{'Detectar scanner: ' + (detected ? 'ACTIVADO' : 'DESACTIVADO')}</Button>
        </section>)
}
