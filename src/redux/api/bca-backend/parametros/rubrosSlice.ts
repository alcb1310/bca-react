import type { RubrosType } from '~types/rubros'
import { bcaApiSlice } from '../bcaSlice'

const rubrosApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
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

export const { useCreateRubroMutation, useUpdateRubroMutation } = rubrosApiSlice
