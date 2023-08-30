/* eslint-disable no-unused-vars */
import useInventoryStore from '@/app/(layout-app)/inventory/store'
import useSalesStore from '@/app/(layout-app)/sales/store'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ScannerDetection () {
    const [detected, setDetected] = useState(true)
    const [scanner, setScanner] = useState(null)
    const router = useRouter()
    const { listInventory, getProductByCode } = useInventoryStore()
    const { addFromNewSales, scannerEnabled, enabledRedirect } = useSalesStore()

    const onComplete = (barcode) => {
        // get current status from store
        const currentListSales = useSalesStore.getState().listSales
        const enabledRedirectSales = useSalesStore.getState().enabledRedirect

        const product = useInventoryStore.getState().getProductByCode(useInventoryStore.getState().listInventory, barcode)
        console.log(currentListSales)
        console.log(product)

        if (product) {
            if (enabledRedirectSales) {
                router.push('/sales')
                console.log('/sales')
            }
            addFromNewSales(currentListSales, product)
        } else {
            alert(`El producto ${barcode} no ha sido encontrado.`)
        }
    }
    const onError = (value) => console.log(value) // Devolución de llamada después de la detección de un escaneo fallido
    const stopPropagation = (value) => console.log(value) // Detiene la propagación inmediata en el evento de pulsación de tecla

    async function startScanning (options) {
        if (typeof window !== 'undefined') {
            import('js-scanner-detection').then(({ default: ScannerDetector }) => {
                const scannerDetector = new ScannerDetector(options)
                setScanner(scannerDetector)
            })
        }
    }

    useEffect(() => {
        console.log('redirect: ', enabledRedirect, ' scanner: ', scannerEnabled)

        const options = {
            onComplete,
            onError
        }

        // disabled scanner
        if (scanner !== null) {
            scanner?.stopScanning()
            setScanner(null)
        }

        if (scannerEnabled || enabledRedirect) {
            console.log('New scanner')
            startScanning(options)
        } else {
            /*       if (scanner) {
                scanner?.stopScanning()
                setScanner(null)
            } */
        }
    }, [detected, scannerEnabled, enabledRedirect])

    return (
        <section>
            {/*             <Button onClick={() => { detected ? setDetected(false) : setDetected(true) }} >{'Detectar scanner: ' + (detected ? 'ACTIVADO' : 'DESACTIVADO')}</Button>
 */}        </section>)
}
