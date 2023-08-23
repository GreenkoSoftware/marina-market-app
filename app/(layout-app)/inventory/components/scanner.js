'use client'
import React, { useEffect, useRef, useState } from 'react';
import Quagga from '@ericblade/quagga2';
import BarCodeScanner from 'barcode-react-scanner';


const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const [scannedCode, setScannedCode] = useState('');
  const [code, setCode] = useState('')


  useEffect(() => {
    const initScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          Quagga.init(
            {
              inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: videoRef.current,
              },
              decoder: {
                readers: ['code_128_reader'], // Tipo de código de barras a escanear (puedes ajustarlo)
              },
            },
            function (err) {
              if (err) {
                console.error('Error al iniciar Quagga:', err);
                return;
              }
              Quagga.start(); // Inicia el escáner
            }
          );

          Quagga.onDetected(handleBarcodeDetection); // Asigna un manejador para los códigos detectados
        }
      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
      }
    };

    const handleBarcodeDetection = (result) => {
      if (result && result.codeResult && result.codeResult.code) {
        console.log("Result2: ", result)
        setScannedCode(result.codeResult.code); // Guarda el código en el estado
        Quagga.stop(); // Detiene el escáner después de encontrar un código
      }
    };

    initScanner();

    return () => {
      Quagga.stop(); // Detiene el escáner al desmontar el componente
    };
  }, []);

  return (
    <div>
         <>
     { code && <p>Code: {code} </p> }
     <BarCodeScanner onUpdate={ (err, resp) => {
         if(resp) {
             console.log(resp)
             setCode(resp.getText())
            }
        }}
        />
    </>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '500px' }}></video>
      {<p>Código escaneado: {scannedCode}</p>}
    </div>
  );
};

export default BarcodeScanner;
