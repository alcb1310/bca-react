import type { BudgetItem, BudgetItemResponse } from '@/types/partidas'
import { bcaApiSlice } from '../bcaSlice'

const partidasEndpoints = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllBudgetItems: builder.query<
      BudgetItemResponse[],
      {
        query?: string
        accum?: boolean
      }
    >({
      query(body) {
        return {
          url: '/parametros/partidas',
          method: 'GET',
          params: {
            query: body.query,
            accum: body.accum,
          },
        }
      },

      providesTags: ['partidas'],
    }),

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
  }),
})

export const {
  useGetAllBudgetItemsQuery,
  useGetAllBudgetItemsByAccumulateQuery,
} = partidasEndpoints
