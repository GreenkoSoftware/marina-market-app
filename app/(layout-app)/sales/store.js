/* eslint-disable camelcase */
import { create } from 'zustand'

const useSalesStore = create(
    (set) => ({
        totalPrice: 0,
        listSales: [],
        setTotalPrice: (value) => set({ totalPrice: value }),
        addFromNewSales: (listSales, product, setTargetProduct) => {
            const searhProduct = listSales?.find((item) => { return item?.product?.id === product?.id })
            if (!searhProduct) {
                set({ listSales: [...listSales, { product, quantity: 1 }] })
            } else {
                const newList = listSales?.filter((item) => item?.product?.id !== product?.id)
                set({ listSales: [...newList, { product, quantity: searhProduct?.quantity + 1 }] })
            }
            if (setTargetProduct) { setTargetProduct(null) }
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