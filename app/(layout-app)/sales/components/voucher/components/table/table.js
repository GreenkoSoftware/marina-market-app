/* eslint-disable no-unused-vars */
import { Text, View } from '@react-pdf/renderer'
// Create StylePdf
import { StylePdf } from './styleTable'
import { formatter } from '@/utils/number'

export const TableProductVoucher = ({ listSales }) =>
    (
        <View>
            <View style={StylePdf.table}>
                <View style={StylePdf.rowTable}>
                    <View style={StylePdf.tableColumn1}>
                        <Text style={StylePdf.textRow}>{'N°'}</Text>
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
                            <View style={StylePdf.tableColumn1}>
                                <Text style={StylePdf.textRow}>{index + 1 ?? '-'}</Text>
                            </View>
                            <View style={StylePdf.tableColumn2}>
                                <Text style={StylePdf.textRow}>{element?.product?.name ?? '-'}</Text>
                            </View>
                            <View style={StylePdf.tableColumn3}>
                                <Text style={StylePdf.textRow}>{element?.quantity}</Text>
                            </View>
                            <View style={StylePdf.tableColumn4}>
                                <Text style={StylePdf.textRow}>{ formatter.format(element?.total ?? 0)}</Text>
                            </View>
                        </View>)
                    )}
                </View>
            </View>
        </View>
    )
