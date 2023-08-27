/* eslint-disable no-unused-vars */
import useInventoryStore from '@/app/(layout-app)/inventory/store'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export default function ScannerDetection () {
    const [detected, setDetected] = useState(null)
    const [scanner, setScanner] = useState(null)
    const { listInventory, getProductByCode } = useInventoryStore()
    const { listSales, addFromNewSales } = useSalesStore()

    const onComplete = (barcode) => {
    // Do stuff with the barcode
        const product = getProductByCode(listInventory, barcode)
        console.log(product)
        // alert('PRODUCTO: ' + (product?.name || 'NO EXISTE'))
        if (product) { addFromNewSales(listSales, product) }
    }
    const onError = (value) => console.log(value) // Devolución de llamada después de la detección de un escaneo fallido
    const onReceive = (value) => console.log(value) // Devolución de llamada después de recibir un char
    const timeBeforeScanTest = 100 // Duración de la espera (ms) después evento de pulsación de tecla para verificar si el escaneo finalizó
    const avgTimeByChar = 30 // Tiempo promedio (ms) entre 2 caracteres. Se usa para hacer la diferencia entre escribir con el teclado y escanear
    const minLength = 6 // Longitud mínima para un escaneo
    const endChar = [9, 13] // Caracteres para eliminar y significa el final del escaneo
    const stopPropagation = (value) => console.log(value) // Detiene la propagación inmediata en el evento de pulsación de tecla
    const preventDefault = (value) => console.log(value) // Impide la acción predeterminada en el evento de pulsación de tecla

    const options = {
        onComplete,
        onError,
        // onReceive: onReceive,
        // timeBeforeScanTest: timeBeforeScanTest,
        // avgTimeByChar: avgTimeByChar,
        // minLength: minLength,
        // endChar: endChar,
        stopPropagation,
        preventDefault
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
