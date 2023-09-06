/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { TYPE_PAYMENT_API_URL, TYPE_VOUCHER_API_URL } from '@/settings/constants'
import { fetchGet } from '@/services/sales'
import { fetchGetOfferById, fetchGetOffers } from '@/services/products'
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
        setTotalPrice: (value) => set({ totalPrice: value }),
        enabledRedirectSales: (value) => set({ enabledRedirect: true }),
        disabledRedirectSales: (value) => set({ enabledRedirect: false }),
        setUnits: (value) => set({ units: value }),
        addFromNewSales: (listSales, product, setTargetProduct, units, setUnits, offers) => {
            const searhProduct = listSales?.find((item) => { return item?.product?.id === product?.id })
            const offersProduct = offers?.find((item) => { return item?.productId === product?.id })
            if (offersProduct) {
                // agregar el arreglo de las ofertas en el list sales
                if (searhProduct) {
                    const quantitySale = searhProduct?.quantity + 1
                    const offersOfProduct = Math.trunc(quantitySale / offersProduct.quantity)
                    const newList = listSales?.filter((item) => item?.product?.id !== product?.id)
                    const total = ((product?.price * offersProduct?.quantity) - (offersProduct?.quantity * offersProduct?.unitPrice)) * offersOfProduct
                    set({ listSales: [...newList, { product, quantity: searhProduct?.quantity + 1, offers: offersOfProduct, discount: offersOfProduct > 0 ? total : 0 }] })
                } else {
                    const quantitySale = 1
                    const offersOfProduct = Math.trunc(quantitySale / offersProduct.unitPrice)
                    set({ listSales: [...listSales, { product, quantity: 1, offers: offersOfProduct, discount: offersOfProduct > 0 ? (offersProduct.quantity * offersProduct.unitPrice) * offersOfProduct : 0 }] })
                }
            } else {
                if (!searhProduct) {
                    set({ listSales: [...listSales, { product, quantity: 1 }] })
                } else {
                    const newList = listSales?.filter((item) => item?.product?.id !== product?.id)
                    set({ listSales: [...newList, { product, quantity: searhProduct?.quantity + 1 }] })
                }
            }
            if (setTargetProduct) { setTargetProduct(null) }
        },
        removeProduct: (listSales, productId) => {
            const newList = listSales?.filter((item) => item?.product?.id !== productId)
            set({ listSales: newList })
        },
        clearList: () => {
            set({ listSales: [] })
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
        getOfferById: (id) => {
            // set({ loading: true, error: null })
            try {
                fetchGetOfferById(id).then(result => {
                    if (result?.code === 200) {
                        /*  set({
                            listStockTypes: result?.data?.reduce((acc, value) => {
                                return [...acc, { id: value?.ID, label: value?.name }]
                            }, [])
                        }) */
                    } else {
                        return null
                    }
                })
            } catch {
                // set({ loading: false })
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
