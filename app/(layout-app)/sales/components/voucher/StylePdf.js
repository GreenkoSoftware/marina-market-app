import { StyleSheet /* , Font */ } from '@react-pdf/renderer'

export const StylePdf = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 3,
        paddingLeft: 6,
        paddingRight: 6,
        lineHeight: 1.5,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        align: 'justify'
    },
    logo: {
        width: 60,
        height: 60,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    container: {
        alignContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        marginTop: 0,
        marginBottom: 10
    },
    reportTitle: {
        color: '#000000',
        letterSpacing: 1,
        fontSize: 4,
        textTransform: 'uppercase',
        fontFamily: 'Helvetica-Bold'
    }
})
