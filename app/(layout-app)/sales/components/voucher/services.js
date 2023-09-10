import { pdf as pdff } from '@react-pdf/renderer'
import { Voucher } from './voucher'
export const generatePdfDocument = async ({ listSales }) => {
    const blob = await pdff(
        <Voucher listSales={listSales}/>
    ).toBlob()
    const fileURL = URL.createObjectURL(blob)
    window.open(fileURL)
}
