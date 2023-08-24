/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect } from 'react'
import Auth from '@/app/auth'
import TableProducs from './card'
import CreateProduct from './components/NewProduct/createProduct'
import ScannerDetection from '@/components/ScannerDetection/ScannerDetection'
import useInventoryStore from './store'
// import { fetchGetproducts } from '@/services/products'
export default async function Inventory () {
    const { getListInventory, getCategories, listCategories, listInventory } = useInventoryStore(
        ({ getListInventory, getCategories, listCategories, listInventory }) => (
            { getListInventory, getCategories, listCategories, listInventory }))
    useEffect(() => {
        /* Add in the future refreshToken in this useEffect */
        getCategories()
        getListInventory()
    }, [])
    return (
        <section>
            <ScannerDetection/>
            <CreateProduct/>
            <Auth/>
            { listInventory?.length > 0 && listCategories?.length > 0 ? <TableProducs listInventory={listInventory} listCategories={listCategories}/> : null}
        </section>
    )
}

/*

*/
