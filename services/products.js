/* eslint-disable camelcase */
import { PRODUCT_API_URL, CATEGORIES_API_URL, TYPE_STOCK_API_URL } from '@/settings/constants'
import { getToken } from '@/services/user'
export const fetchGetproducts = async () => {
    try {
        return await fetch(PRODUCT_API_URL,
            {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
/*  next: { revalidate: 60 }, cache: 'no-store' }) */
export const fetchGetCategories = async () => {
    try {
        return await fetch(CATEGORIES_API_URL,
            {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const fetchGetTypeStocks = async () => {
    try {
        return await fetch(TYPE_STOCK_API_URL,
            {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const updateProduct = async (
    {
        id,
        name,
        cost_price,
        sale_price,
        net_price,
        image,
        code,
        category_id,
        stock_type_id
    }) => {
    try {
        const queryParams = new URLSearchParams(
            {
                id: id || '',
                name: name || '',
                cost_price: cost_price || '',
                sale_price: sale_price || '',
                net_price: net_price || '',
                image: image || '',
                code: code || '',
                product_category_id: category_id || '',
                stock_type_id: stock_type_id || ''
            })
        return await fetch(`${PRODUCT_API_URL}?${queryParams}`,
            {
                method: 'PUT',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const updateProductStock = async ({ stock_min, stock }) => {
    try {
        const queryParams = new URLSearchParams({ stock, stock_min })
        return await fetch(`${PRODUCT_API_URL}/stock?${queryParams}`,
            {
                method: 'PUT',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const deleteProduct = async ({ id }) => {
    try {
        const queryParams = new URLSearchParams({ id })
        return await fetch(`${PRODUCT_API_URL}?${queryParams}`,
            {
                method: 'delete',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-cache'
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
