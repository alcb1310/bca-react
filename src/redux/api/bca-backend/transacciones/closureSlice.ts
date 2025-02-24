import { bcaApiSlice } from '../bcaSlice'
import { CierreTypes } from '@/types/cierre'

const closureSlice = bcaApiSlice.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
        createClosure: builder.mutation<void, CierreTypes>({
            query: (body) => {
                return {
                    url: '/transacciones/cierre',
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
})

export const { useCreateClosureMutation } = closureSlice
