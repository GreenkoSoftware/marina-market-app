/* eslint-disable camelcase */
import { create } from 'zustand'
import { fetchGetproducts, fetchGetCategories, fetchGetTypeStocks, fetchGetOffers, fetchGetOfferById } from '@/services/products'

const useInventoryStore = create(
    (set) => ({
        listInventory: [],
        listCategories: [],
        listStockTypes: [],
        setListInventory: () => set((state) => ({ listInventory: state })),
        loading: false,
        loadingCategories: false,
        error: null,
        getListInventory: () => {
            set({ loading: true, error: null })
            try {
                fetchGetproducts().then(result => {
                    if (result?.code === 200) {
                        set({
                            listInventory: result?.data?.reduce((acc, { ID, code, cost_price, image, name, net_price, sale_price, product_categories_id, stock_types_id, product_stock }) => {
                                return [...acc,
                                    {
                                        id: ID,
                                        code,
                                        costPrice: cost_price,
                                        image,
                                        name,
                                        netPrice: net_price,
                                        price: sale_price,
                                        productCategoryId: product_categories_id,
                                        stockTypeId: stock_types_id,
                                        stock: product_stock?.stock,
                                        stockMin: product_stock?.stock_min,
                                        meta: name + ' ' + code
                                    }
                                ]
                            }, []),
                            loading: false
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
            set({ loadingCategories: true, error: null })
            try {
                fetchGetCategories().then(result => {
                    if (result?.code === 200) {
                        const data = result?.data?.reduce((acc, value) => {
                            return [...acc, { id: value?.ID, label: value?.name }]
                        }, [])
                        data.push({ id: -1, label: 'search' })
                        set({ listCategories: data, loadingCategories: false })
                    } else {
                        return null
                    }
                })
            } catch {
                set({ loadingCategories: false })
            }
        },
        getStockTypes: () => {
            set({ loading: true, error: null })
            try {
                fetchGetTypeStocks().then(result => {
                    if (result?.code === 200) {
                        set({
                            listStockTypes: result?.data?.reduce((acc, value) => {
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
        getProductByCode: (products, searchCode) => {
            const result = products?.find(({ code }) => code === searchCode)
            return result || undefined
        },
        getTypeById: (types, typeId) => {
            const result = types?.find(({ id }) => id === typeId)
            return result?.label || undefined
        },
        getOffers: () => {
            // set({ loading: true, error: null })
            try {
                fetchGetOffers().then(result => {
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
        },
        clearState: () => {
            set({ error: null, loading: false, listInventory: [], listCategories: [], listStockTypes: [] })
        }
    }),
    {
        name: 'inventory'
    }

)

export default useInventoryStore
/*
code,cost_price, image, name, net_price, product_category_id, stock_type_id
*/
