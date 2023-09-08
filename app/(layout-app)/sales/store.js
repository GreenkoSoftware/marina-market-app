/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { TYPE_PAYMENT_API_URL, TYPE_VOUCHER_API_URL, SALE_TICKET_CREATE } from '@/settings/constants'
import { fetchGet, fetchPost } from '@/services/sales'
import { fetchGetOfferById, fetchGetOffers } from '@/services/products'
import { formatter } from '@/utils/number'
const useSalesStore = create(
    (set) => ({
        loading: false,
        error: null,
        totalPrice: 0,
        listSales: [],
        scannerEnabled: false,
        enabledRedirect: false,
        units: 1,
        enabledScanner: (value) => set({ scannerEnabled: true, enabledRedirect: false }),
        disabledScanner: (value) => set({ scannerEnabled: false }),
        setTotalPrice: (value) => set({ totalPrice: formatter.format(value) }),
        enabledRedirectSales: (value) => set({ enabledRedirect: true }),
        disabledRedirectSales: (value) => set({ enabledRedirect: false }),
        setUnits: (value) => set({ units: parseInt(value) }),
        addFromNewSales: (listSales, product, setTargetProduct, units, setUnits, offers, setKeyFocus, setSelectedKL) => {
            const searhProduct = listSales?.find((item) => { return item?.product?.id === product?.id })
            const offersProduct = offers?.find((item) => { return item?.productId === product?.id })
            if (offersProduct) {
                // agregar el arreglo de las ofertas en el list sales
                if (searhProduct) {
                    const quantitySale = searhProduct?.quantity + units
                    const offersOfProduct = Math.trunc(quantitySale / offersProduct.quantity)
                    const newList = listSales?.filter((item) => item?.product?.id !== product?.id)
                    const total = ((product?.price * offersProduct?.quantity) - (offersProduct?.quantity * offersProduct?.unitPrice)) * offersOfProduct
                    set({ listSales: [...newList, { product, quantity: searhProduct?.quantity + units, offers: offersOfProduct, discount: offersOfProduct > 0 ? total : 0, total: product?.price * quantitySale }] })
                } else {
                    const quantitySale = units
                    const offersOfProduct = Math.trunc(quantitySale / offersProduct.quantity)
                    const total = ((product?.price * offersProduct?.quantity) - (offersProduct?.quantity * offersProduct?.unitPrice)) * offersOfProduct
                    set({ listSales: [...listSales, { product, quantity: units, offers: offersOfProduct, discount: offersOfProduct > 0 ? total : 0, total: product?.price * quantitySale }] })
                }
            } else {
                if (!searhProduct) {
                    set({ listSales: [...listSales, { product, quantity: units, discount: 0, total: product?.price * 1 }] })
                } else {
                    const newList = listSales?.filter((item) => item?.product?.id !== product?.id)
                    set({ listSales: [...newList, { product, quantity: searhProduct?.quantity + units, discount: 0, total: product?.price * searhProduct?.quantity + 1 }] })
                }
            }
            setUnits(1)
            if (setTargetProduct) {
                setKeyFocus(product?.code)
                setTargetProduct(null)
                setSelectedKL(null)
            }
        },
        removeProduct: (listSales, productId) => {
            const newList = listSales?.filter((item) => item?.product?.id !== productId)
            set({ listSales: newList })
        },
        clearList: () => {
            set({ listSales: [], totalPrice: 0 })
        },
        /* Added method pay and voucher, ticket,etc */
        paymentTarget: null,
        voucherTarget: 1,
        setPaymentTarget: (value) => set({ paymentTarget: value }),
        setVoucherTarget: (value) => set({ voucherTarget: value }),
        payment: [],
        voucher: [],
        offers: [],
        loadingPayment: false,
        loadingVoucher: false,
        loadingOffers: false,
        loadingSale: false,
        getPaymentType: () => {
            set({ loadingPayment: true, error: null })
            try {
                fetchGet(TYPE_PAYMENT_API_URL).then(result => {
                    if (result?.code === 200) {
                        set({
                            payment: result?.data?.reduce((acc, { ID, name }) => {
                                return [...acc,
                                    {
                                        id: ID,
                                        name
                                    }
                                ]
                            }, []),
                            loadingPayment: false
                        })
                    } else {
                        return null
                    }
                })
            } catch {
                set({ loadingPayment: false })
            }
        },
        getVoucherType: () => {
            set({ loadingVoucher: true, error: null })
            try {
                fetchGet(TYPE_VOUCHER_API_URL).then(result => {
                    if (result?.code === 200) {
                        set({
                            voucher: result?.data?.reduce((acc, { ID, name }) => {
                                return [...acc,
                                    {
                                        id: ID,
                                        name
                                    }
                                ]
                            }, []),
                            loadingVoucher: false
                        })
                    } else {
                        return null
                    }
                })
            } catch {
                set({ loadingVoucher: false })
            }
        },
        getOffers: () => {
            set({ loadingOffers: true, error: null })
            try {
                fetchGetOffers().then(result => {
                    if (result?.code === 200) {
                        set({
                            offers: result?.data?.reduce((acc, value) => {
                                return [...acc, { id: value?.ID, quantity: value?.quantity, unitPrice: value?.unit_price, productId: value?.product_id }]
                            }, [])
                        })
                    } else {
                        return null
                    }
                })
            } catch {
                set({ loadingOffers: false })
            }
        },
        /* Create sale */
        createSale: (paymentTarget, voucherTarget, listSales, notify, setPayment, onClose, setGoPay, clearList, setPageTarget, pageTarget) => {
            const body = {
                sales_receipt: listSales?.map((sale) => {
                    return {
                        product_id: sale?.product?.id,
                        quantity: sale?.quantity,
                        total_price: sale?.total
                    }
                }),
                payment_type_id: paymentTarget,
                voucher_type_id: voucherTarget
            }
            set({ loadingSale: true, error: null })
            try {
                fetchPost(SALE_TICKET_CREATE, body).then(result => {
                    setPageTarget(false)
                    set({ loadingSale: false })
                    if (result?.code === 200) {
                        if (pageTarget) {
                            notify('✅ Pago con tarjeta con éxito')
                        } else {
                            notify('✅ Pago con éxito')
                        }

                        setPayment(false)
                        onClose()
                        setGoPay(false)
                        clearList()
                    } else {
                        if (pageTarget) {
                            notify('❌ Problemas con el pago con la tarjeta')
                        } else {
                            notify('❌ Problemas con el pago, intente efectuar el pago nuevamente')
                        }

                        onClose()
                        setGoPay(false)
                        setPageTarget(null)
                    }
                })
            } catch {
                set({ loadingSale: false })
            }
        }
    }),
    {
        name: 'sales'
    }

)

export default useSalesStore

/* Encontrar si se encuentra una oferta de dicho producto */
/* Si ya existe el topde de la cantidad en la oferta del producto, se deberia agregar el mismo
            producto en la lista de venta
            */
/*             const quantity = searhProduct?.quantity ? searhProduct?.quantity + 1 : 1
            const priceUpdate = offersProduct && quantity === offersProduct?.quantity ? offersProduct?.unitPrice : product?.price
            const productUpdate = { ...product, price: priceUpdate } */
