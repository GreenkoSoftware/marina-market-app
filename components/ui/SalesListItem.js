'use client'
import React from 'react'
import DeleteButton from './DeleteButton'

export default function SaleListItem (props) {
    const { product: productDetail } = props
    const { product, quantity } = productDetail
    const { id, name, code, price, stockTypeId } = product
    return (
        <li className="py-3 sm:py-4 animation-fade-in">
            <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                    <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                        {name?.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {code}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <div className='flex flex-row gap-3'>
                        <div>{quantity}</div>
                        {stockTypeId === 1 ? <div>kg x </div> : <div>x</div>}

                        <div>{Math.ceil(price)}</div>
                        <div>CLP</div>
                        <DeleteButton productId={id}/>
                    </div>

                </div>
            </div>
        </li>
    )
}
