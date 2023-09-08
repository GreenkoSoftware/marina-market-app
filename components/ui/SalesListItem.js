'use client'
import React from 'react'
import DeleteButton from './DeleteButton'
import { formatter } from '@/utils/number'
export default function SaleListItem (props) {
    const { product: productDetail } = props
    const { product, quantity, discount } = productDetail
    const { id, name, code, price } = product
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

                    <div className='flex flex-col'>
                        <div className='flex flex-row gap-3'>
                            <div>{quantity}</div>
                            <div>x</div>
                            <div>{formatter.format(price) }</div>
                            <div>CLP</div>
                            <DeleteButton productId={id}/>
                        </div>
                        <div className='flex flex-row gap-3'>
                            <div>{ discount > 0 ? '- $ ' + discount : null}</div>

                        </div>
                    </div>

                </div>
            </div>
        </li>
    )
}
