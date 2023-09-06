/* eslint-disable camelcase */
import { create } from 'zustand'

const hubScale = create(
    (set) => ({
        connect: null,
        connection: () => {

        }
    }),
    {
        name: 'hub'
    }

)

export default hubScale
