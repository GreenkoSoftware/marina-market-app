import { StyleSheet /* , Font */ } from '@react-pdf/renderer'
// Register font
// Font.register({ family: 'Calibri', src: source });
export const StylePdf = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        align: 'justify'
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})
