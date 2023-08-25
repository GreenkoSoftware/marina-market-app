'use client'
import React from 'react'
import DeleteButton from './DeleteButton'

export default function SaleListItem (props) {
    const { product, quantity = 1 } = props
    const { name, code, salePrice } = product
    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                    <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                        {name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {code}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <div className='flex flex-row gap-3'>
                        <div>{quantity}</div>
                        <div>x</div>
                        <div>{salePrice}</div>
                        <div>CLP</div>
                        <DeleteButton></DeleteButton>
                    </div>

                </div>
            </div>
        </li>
    )
}
