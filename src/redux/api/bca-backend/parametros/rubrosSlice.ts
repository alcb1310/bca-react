import { bcaApiSlice } from '../bcaSlice'
import { RubrosType } from '@/types/rubros'

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
  useGetAllRubrosQuery,
  useGetOneRubroQuery,
  useCreateRubroMutation,
  useUpdateRubroMutation,
} = rubrosApiSlice
