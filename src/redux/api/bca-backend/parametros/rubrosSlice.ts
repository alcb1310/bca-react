import { RubrosType } from '../../../../types/rubros'
import { bcaApiSlice } from '../bcaSlice'

const rubrosApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllRubros: builder.query<RubrosType[], void>({
      query: () => ({
        url: '/parametros/rubros',
        method: 'GET',
      }),

      providesTags: ['rubros'],
    }),
  }),
})

export const { useGetAllRubrosQuery } = rubrosApiSlice
