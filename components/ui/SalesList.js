'use client'
import React from 'react'
import SaleListItem from './SalesListItem'
import { Divider, ScrollShadow, Button } from '@nextui-org/react'
import SearchBar from './SearchBar'
import useSalesStore from '@/app/(layout-app)/sales/store'
export default function SaleList () {
    const { listSales } = useSalesStore(({ listSales }) => ({ listSales }))

    return (
        <section className='flex flex-col rounded-[12px] h-[42rem] ' >
            <div className="w-full h-full flex-initial max-w-md rounded-[12px] bg-white border border-gray-200 dark:border-secondary-450 shadow   dark:bg-secondary-450">
                <section >
                    <SearchBar></SearchBar>
                </section>
                <div className="flex items-center justify-between mb-4 px-8">
                    <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white pt-2">Productos</h5>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y  divide-gray-200 dark:divide-white pr-8 pl-8">
                        <ScrollShadow className="w-[420px] h-[30rem] pr-6">
                            {listSales?.map((product, index) =>
                                <section key={index}>
                                    <Divider orientation="horizontal" />
                                    <SaleListItem product={product} />
                                    <Divider orientation="horizontal" />
                                </section>
                            )}
                        </ScrollShadow>
                    </ul>
                </div>
            </div>
            <Button color="success" variant="shadow" className='text-white mt-3 h-16 w-auto font-bold text-2xl'>
                <div className="text-2xl font-bol flex flex-row gap-4 items-center">
                    <a>PAGAR </a>
                    <a className=''>$200.000 </a>
                </div>
            </Button>
        </section>
    )
}
