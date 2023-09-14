import { useState, useEffect } from 'react'

export const useViewport = () => {
    const [height, setHeight] = useState(window.innerHeight)

    useEffect(() => {
        const handleWindowResize = () => setHeight(window.innerHeight)
        window.addEventListener('resize', handleWindowResize)
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    return { height }
}
