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
