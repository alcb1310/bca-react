import type { RubrosType } from '@/types/rubros'
import { bcaApiSlice } from '../bcaSlice'

const rubrosApiSlice = bcaApiSlice.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
        getOneRubro: builder.query<RubrosType, string>({
            query: (rubroId) => ({
                url: `/parametros/rubros/${rubroId}`,
                method: 'GET',
            }),

            providesTags: ['rubros'],
        }),

        createRubro: builder.mutation<RubrosType, RubrosType>({
            query: (rubro) => {
                return {
                    url: '/parametros/rubros',
                    method: 'POST',
                    body: rubro,
                }
            },

            invalidatesTags: ['rubros'],
        }),

        updateRubro: builder.mutation<RubrosType, RubrosType>({
            query: (rubro) => {
                return {
                    url: `/parametros/rubros/${rubro.id}`,
                    method: 'PUT',
                    body: rubro,
                }
            },

            invalidatesTags: ['rubros'],
        }),
    }),
})

export const {
    useGetOneRubroQuery,
    useCreateRubroMutation,
    useUpdateRubroMutation,
} = rubrosApiSlice
