/* eslint-disable no-unused-vars */
'use client'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useProductFormStore from './store'

export default function ProductImage () {
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedImageBytes, setSelectedImageBytes] = useState(null)

    const {
        data,
        setFormData
    } = useProductFormStore()

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
        }
    }

    const removeSelectedImage = () => {
        setSelectedImage(null)
        setSelectedImageBytes(null)
    }

    useEffect(() => {
        setFormData({ ...data, image: selectedImageBytes })
    }, [selectedImageBytes])

    useEffect(() => {
        if (selectedImage) {
            const reader = new FileReader()
            reader.readAsArrayBuffer(selectedImage)

            reader.onload = async () => {
                const imageBytes = reader.result
                const base64 = btoa(
                    new Uint8Array(imageBytes)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                )

                setSelectedImageBytes(base64)
            }
        }
    }, [selectedImage])

    return (
        <section>
            <div className="flex items-center justify-center min-w-[200px] w-full">
                { selectedImage
                    ? (
                        <div className="rounded-lg flex items-center flex-col space-y-2 p-2 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <label htmlFor={selectedImage ? 'dropzone-file' : ''}>
                                <Image
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Image name"
                                    width={200}
                                    height={100}
                                />
                            </label>
                            <Button color="danger" variant="faded" onClick={removeSelectedImage}>
                                {'Borrar imagen'}
                            </Button>
                        </div>
                    )
                    : (
                        <label htmlFor={!selectedImage ? 'dropzone-file' : ''} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-200" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Subir imagen</span>.</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                            </div>
                        </label>
                    )}
                <input id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={imageChange}
                />
            </div>
        </section>
    )
}
