import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'


export default function ScannerDetection () {
    const [detected, setDetected] = useState(null)
    const [scanner, setScanner] = useState(null)

    let onComplete = (barcode)=>{
      // Do stuff with the barcode
      console.log("PRODUCTO: "+barcode)
      alert("PRODUCTO: "+barcode)
    }
    let onError = (value) => console.log(value)   // Devolución de llamada después de la detección de un escaneo fallido 
    let onReceive = (value) => console.log(value)   // Devolución de llamada después de recibir un char 
    let timeBeforeScanTest = 100   // Duración de la espera (ms) después evento de pulsación de tecla para verificar si el escaneo finalizó 
    let avgTimeByChar = 30   // Tiempo promedio (ms) entre 2 caracteres. Se usa para hacer la diferencia entre escribir con el teclado y escanear 
    let minLength = 6   // Longitud mínima para un escaneo
    let endChar = [ 9, 13 ]   // Caracteres para eliminar y significa el final del escaneo 
    let stopPropagation = (value) => console.log(value)   // Detiene la propagación inmediata en el evento de pulsación de tecla 
    let preventDefault = (value) => console.log(value)  // Impide la acción predeterminada en el evento de pulsación de tecla 

    let options = {
      onComplete: onComplete,
      onError: onError,
      //onReceive: onReceive,
      //timeBeforeScanTest: timeBeforeScanTest,
      //avgTimeByChar: avgTimeByChar,
      //minLength: minLength,
      //endChar: endChar,
      stopPropagation: stopPropagation,
      preventDefault: preventDefault,
    }
    async function startScanning() {
        if (typeof window !== 'undefined') {
            import('js-scanner-detection').then(({ default: ScannerDetector }) => {
                let scannerDetector = new ScannerDetector(options)
                setScanner(scannerDetector)
            })
          }
    }

      useEffect(() => {
        console.log(scanner)
        console.log(detected)
        if(detected){
            console.log(scanner)
            startScanning()
        } else {
            if(scanner){
                console.log(scanner)
                scanner?.stopScanning()
            }
        }
      }, [detected])

    return (<section>
        <Button onClick={() => {detected ? setDetected(false) : setDetected(true)}} >{'Detectar scanner: ' + (detected ? 'ACTIVADO' : 'DESACTIVADO')}</Button>
    </section>)
}
