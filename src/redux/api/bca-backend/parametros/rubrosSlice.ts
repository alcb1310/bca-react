import type { RubrosType } from '~types/rubros'
import { bcaApiSlice } from '../bcaSlice'

const rubrosApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
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

export const { useUpdateRubroMutation } = rubrosApiSlice
