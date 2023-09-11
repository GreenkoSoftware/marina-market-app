import { pdf as pdff } from '@react-pdf/renderer'
import { Voucher } from './voucher'
export const generatePdfDocument = async ({ listSales, totalPay }) => {
    const blob = await pdff(
        <Voucher listSales={listSales} totalPay={totalPay}/>
    ).toBlob()
    const fileURL = URL.createObjectURL(blob)
    window.open(fileURL, 'Boleta.pdf')
}
