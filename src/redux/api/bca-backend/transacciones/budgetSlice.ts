import { BudgetEditType, BudgetResponseType } from '../../../../types/budget'
import { bcaApiSlice } from '../bcaSlice'

const budgetApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllBudgets: builder.query<BudgetResponseType[], { query?: string }>({
      query(body) {
        return {
          url: '/transacciones/presupuestos',
          method: 'GET',
          params: {
            query: body.query,
          },
        }
      },

      providesTags: ['presupuesto', 'proyectos', 'partidas'],
    }),

    createBudget: builder.mutation<BudgetResponseType, BudgetEditType>({
      query(body) {
        return {
          url: '/transacciones/presupuestos',
          method: 'POST',
          body,
        }
      },

      invalidatesTags: ['presupuesto'],
    }),
  }),
})

export const { useGetAllBudgetsQuery, useCreateBudgetMutation } = budgetApiSlice
