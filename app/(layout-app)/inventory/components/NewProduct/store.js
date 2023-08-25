import { getToken } from '@/services/user'
import { CREATE_PRODUCT_API_URL } from '@/settings/constants'
import { create } from 'zustand'

const useProductFormStore = create((set) => ({
    data: {
        name: null,
        barcode: null,
        image: null,
        cost_price: null,
        net_price: null,
        category_id: null,
        stock_type_id: null,
        stock: null,
        stock_min: null
    },
    error: null,
    loading: false,
    complete: false,
    setFormData: (newData) => set({ data: { ...newData } }),
    setLoading: (value) => set({ loading: value }),
    requestCreateProduct: async (data) => {
        set({ loading: true, error: null })
        try {
            await fetch(CREATE_PRODUCT_API_URL,
                {
                    method: 'POST',
                    cache: 'no-store',
                    body: JSON.stringify({
                        name: data.name?.toString(),
                        cost_price: data.cost_price,
                        net_price: data.net_price,
                        code: data.barcode?.toString(),
                        image: data.image,
                        product_categories_id: data.category_id,
                        stock_types_id: data.stock_type_id,
                        product_stock: {
                            stock: data.stock,
                            stock_min: data.stock_min
                        }
                    }),
                    headers: { Authorization: 'Bearer ' + getToken() }
                })
                .then(response => {
                    console.log(response)
                    // const statusCode = response?.status
                    // const statusText = response?.statusText
                    try {
                        return response.json()
                    } catch {
                        data.error = response?.statusText
                        return undefined
                    }
                }).then(response => {
                    set({ loading: false })
                    console.log(response)
                    if (response?.code === 200) {
                    //
                    } else {
                    //
                    }
                })
        } catch (err) {
            set({ loading: false, error: err })
        }
    },
    clearStore: () => set({
        data: {
            name: null,
            barcode: null,
            image: null,
            cost_price: null,
            net_price: null,
            category_id: null,
            stock_type_id: null,
            stock: null,
            stock_min: null
        },
        loading: false,
        error: false,
        complete: false
    })
}))

export default useProductFormStore
