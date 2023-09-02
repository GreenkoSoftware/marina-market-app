/* eslint-disable camelcase */
import { create } from 'zustand'

const useSalesStore = create(
    (set) => ({
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
        addFromNewSales: (listSales, product, setTargetProduct, units, setUnits) => {
            const searhProduct = listSales?.find((item) => { return item?.product?.id === product?.id })
            if (!searhProduct) {
                set({ listSales: [...listSales, { product, quantity: units }] })
                setUnits(1)
            } else {
                const newList = listSales?.filter((item) => item?.product?.id !== product?.id)
                set({ listSales: [...newList, { product, quantity: searhProduct?.quantity + 1 }] })
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
        loading: false,
        error: null
    }),
    {
        name: 'sales'
    }

)

export default useSalesStore
/*
code,cost_price, image, name, net_price, product_category_id, stock_type_id
*/
