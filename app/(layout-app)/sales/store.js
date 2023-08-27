/* eslint-disable camelcase */
import { create } from 'zustand'
import { fetchGetproducts, fetchGetCategories } from '@/services/products'

const useSalesStore = create(
    (set) => ({
        listInventory: [],
        listCategories: [],
        listSales: [],
        setListInventory: () => set((state) => ({ listInventory: state })),
        loading: false,
        error: null,
        addFromNewSales: (listSales, product, setTargetProduct) => {
            set({ listSales: [...listSales, product] })
            if (setTargetProduct) { setTargetProduct(null) }
        },
        getListInventory: () => {
            set({ loading: true, error: null })
            try {
                fetchGetproducts().then(result => {
                    if (result?.code === 200) {
                        set({
                            listInventory: result?.data?.reduce((acc, { ID, code, cost_price, image, name, net_price, product_categories_id, stock_types_id, product_stock, sale_price }) => {
                                return [...acc,
                                    {
                                        id: ID,
                                        code,
                                        costPrice: cost_price,
                                        image,
                                        name,
                                        netPrice: net_price,
                                        productCategoryId: product_categories_id,
                                        stockTypeId: stock_types_id,
                                        stock: product_stock?.stock,
                                        stockMin: product_stock?.stock_min,
                                        salePrice: sale_price
                                    }
                                ]
                            }, [])
                        })
                    } else {
                        return null
                    }
                })
            } catch {
                set({ loading: false })
            }
        },
        getCategories: () => {
            set({ loading: true, error: null })
            try {
                fetchGetCategories().then(result => {
                    if (result?.code === 200) {
                        set({
                            listCategories: result?.data?.reduce((acc, value) => {
                                return [...acc, { id: value?.ID, label: value?.name }]
                            }, [])
                        })
                    } else {
                        return null
                    }
                })
            } catch {
                set({ loading: false })
            }
        },
        clearState: () => {
            set({ error: null, loading: false, listInventory: [], listCategories: [] })
        }
    }),
    {
        name: 'sales'
    }

)

export default useSalesStore
/*
code,cost_price, image, name, net_price, product_category_id, stock_type_id
*/
