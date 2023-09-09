/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image, PDFViewer
} from '@react-pdf/renderer'
import { StylePdf } from './stylePdf'

// Create Document Component
export const Pdf = () => {
    return (

        <PDFViewer width="100%" height="500px">
            <Document>
                <Page size="A4">
                    <View>
                        <Text>Hello, this is a PDF document generated with react-pdf!</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}
/*
       <Document>
            <Page size="A4" style={StylePdf.page}>
                <h1>example</h1>
            </Page>
        </Document>
*/
