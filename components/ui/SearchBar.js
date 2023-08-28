import React from 'react'
import { Input } from '@nextui-org/react'
import { SearchIcon } from './SearchIcon'

export default function SearchBar (props) {
    const { onChange } = props
    return (
        <div className="w-auto h-[80px] px-6 rounded-t-[12px] flex justify-center items-center  text-white bg-secondary-50 dark:bg-secondary-450">
            <Input
                label="Busqueda"
                isClearable
                radius="lg"
                classNames={{
                    label: 'text-black/50 dark:text-white/90',
                    input: [
                        'bg-transparent',
                        'text-black/90 dark:text-white/90',
                        'placeholder:text-default-700/50 dark:placeholder:text-white/60'
                    ],
                    innerWrapper: 'bg-transparent'
                }}
                placeholder="Toca para buscar un producto..."
                onChange={onChange}
                startContent={
                    <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
            />
        </div>
    )
}
