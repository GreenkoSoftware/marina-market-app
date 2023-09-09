/* eslint-disable no-unused-vars */
import React from 'react'
import { saveAs } from 'file-saver'
import { pdf as pdff } from '@react-pdf/renderer'
import { Pdf } from './pdf'
const handleOpenPDF = () => {
    window.open('/pdf', '_blank')
}

export const generateVoucher = async () => {
    const blob = await pdff(
        <Pdf />
    ).toBlob(() => {}, 'application/pdf')
    const fileUrl = URL.createObjectURL(blob)
    window.open(fileUrl, '_blank')
    // saveAs(blob, 'boleta')
}
