/* eslint-disable no-unused-vars */
import React from 'react'
import { saveAs } from 'file-saver'
import { pdf as pdff } from '@react-pdf/renderer'
import { Pdf } from './pdf'
export const generateVoucher = async () => {
    const blob = await pdff(
        <Pdf />
    ).toBlob()
    // return (<a href={blob} without rel="noopener noreferrer" target="_blank"></a>)
    window.open(blob, 'boleta')
    // saveAs(blob, 'boleta')
}
