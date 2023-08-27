/* eslint-disable camelcase */
import { create } from 'zustand'

const useSalesStore = create(
    (set) => ({
        totalPrice: 0,
        listSales: [],
        setTotalPrice: (value) => set({ totalPrice: value }),
        addFromNewSales: (listSales, product, setTargetProduct) => {
            set({ listSales: [...listSales, product] })
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
