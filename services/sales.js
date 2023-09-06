/* eslint-disable camelcase */
import { getToken } from '@/services/user'
export const fetchGet = async (url) => {
    try {
        return await fetch(url,
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
