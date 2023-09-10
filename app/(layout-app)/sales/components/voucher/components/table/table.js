/* eslint-disable no-unused-vars */
import { Text, View } from '@react-pdf/renderer'
// Create StylePdf
import { StylePdf } from './styleTable'

export const TableProductVoucher = ({ listSales }) =>
    (
        <View>
            <View style={StylePdf.table}>
                <View style={StylePdf.rowTable}>
                    <View style={StylePdf.tableColumn1}>
                        <Text style={StylePdf.textRow}>{'Código'}</Text>
                    </View>
                    <View style={StylePdf.tableColumn2}>
                        <Text style={StylePdf.textRow}>{'Descripción'}</Text>
                    </View>
                    <View style={StylePdf.tableColumn3}>
                        <Text style={StylePdf.textRow}>{'Cant.'}</Text>
                    </View>
                    <View style={StylePdf.tableColumn4}>
                        <Text style={StylePdf.textRow}>{'Precio T.'}</Text>
                    </View>
                </View>
                <View>
                    {listSales?.map((element, index) => (
                        <View key={index} style={StylePdf.rowTableMandatory}>
                            <View style={StylePdf.rowTable}>
                                <View style={StylePdf.tableColumn1}>
                                    <Text style={StylePdf.textRow}>{element?.product?.code ?? '-'}</Text>
                                </View>
                                <View style={StylePdf.tableColumn2}>
                                    <Text style={StylePdf.textRow}>{element?.product?.name ?? '-'}</Text>
                                </View>
                            </View>
                            <View style={StylePdf.rowTable}>
                                <View style={StylePdf.tableColumn1}>
                                </View>
                                <View style={StylePdf.tableColumn2}>
                                </View>
                                <View style={StylePdf.tableColumn3}>
                                    <Text style={StylePdf.textRow}>{element?.quantity}</Text>
                                </View>
                                <View style={StylePdf.tableColumn4}>
                                    <Text style={StylePdf.textRow}>{element?.total}</Text>
                                </View>
                            </View>
                        </View>)
                    )}
                </View>
            </View>
        </View>
    )
