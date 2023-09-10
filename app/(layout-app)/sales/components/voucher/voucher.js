/* eslint-disable no-unused-vars */
import { Document, Page, Text, View, Svg, G, Line, Image } from '@react-pdf/renderer'
// Create StylePdf
import { StylePdf } from './StylePdf'
import { DefaultImageMarinaMarket } from '@/utils/image'
import { TableProductVoucher } from './components/table/table'

// Create Document Component
export const Voucher = ({ listSales }) => (
    <Document>
        <Page size={[180]} style={StylePdf.page}>
            <View style={StylePdf.container}>
                <View style={StylePdf.logo}>
                    <Image
                        width="50"
                        height="50"
                        src={DefaultImageMarinaMarket()}/>
                </View>
            </View>
            <View style={StylePdf.container}>
                <Text style={StylePdf.reportTitle}>{'MARINA MARKET'}</Text>
                <Text style={StylePdf.reportTitle}>{'RUT: 77426986-K'}</Text>
                <Text style={StylePdf.reportTitle}>{'MINIMARKET'}</Text>
                <Text style={StylePdf.reportTitle}>{'LA MARINA 200'}</Text>
                <Text style={StylePdf.reportTitle}>{'COQUIMBO'}</Text>
                <Text style={StylePdf.reportTitle}>{'944226305'}</Text>
            </View>
            <View style={StylePdf.container}>
                <Text style={StylePdf.reportTitle}>Boleta electrónica</Text>
            </View>
            {/* Table products */}
            <View style={StylePdf.containerFlexCol}>
                <TableProductVoucher listSales={listSales}/>
            </View>
        </Page>
    </Document>
)
/*
    <Svg height="10" width="495"><Line x1="0" y1="5" x2="140" y2="5" strokeWidth={5} stroke="rgb(0,0,0)" /></Svg>
*/
