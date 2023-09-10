import { pdf as pdff } from '@react-pdf/renderer'
import { MyDocument } from './voucher'
export const generatePdfDocument = async ({ listSales }) => {
    const blob = await pdff(
        <MyDocument/>
    ).toBlob()
    const fileURL = URL.createObjectURL(blob)
    window.open(fileURL)
}
