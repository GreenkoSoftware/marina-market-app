import { PRODUCT_OFFER } from '@/settings/constants'
import { getToken } from './user'

export const deleteOffer = async ({ id }) => {
    try {
        return await fetch(`${PRODUCT_OFFER}/${id}`,
            {
                method: 'DELETE',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors'
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
