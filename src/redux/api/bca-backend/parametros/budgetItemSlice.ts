import type { BudgetItem } from '~types/partidas'
import { bcaApiSlice } from '../bcaSlice'

const partidasEndpoints = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllBudgetItemsByAccumulate: builder.query<
      BudgetItem[],
      {
        accumulate: boolean
      }
    >({
      query(body) {
        return {
          url: '/parametros/partidas',
          method: 'GET',
          params: {
            accumulate: body.accumulate,
          },
        }
      },

      providesTags: ['partidas'],
    }),

    createBudgetItem: builder.mutation<BudgetItem, BudgetItem>({
      query(body) {
        return {
          url: '/parametros/partidas',
          method: 'POST',
          body,
        }
      },

      invalidatesTags: ['partidas'],
    }),

    updateBudgetItem: builder.mutation<BudgetItem, BudgetItem>({
      query(body) {
        return {
          url: `/parametros/partidas/${body.id}`,
          method: 'PUT',
          body,
        }
      },

      invalidatesTags: ['partidas'],
    }),
  }),
})

export const {
  useGetAllBudgetItemsByAccumulateQuery,
  useCreateBudgetItemMutation,
  useUpdateBudgetItemMutation,
} = partidasEndpoints
