/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image
} from '@react-pdf/renderer'
import { StylePdf } from './stylePdf'

// Create Document Component
export const Pdf = () => {
    return (
        <Document>
            <Page size="A4" style={StylePdf.page}>
                <h1>example</h1>
            </Page>
        </Document>
    )
}
