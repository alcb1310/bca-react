import type { BudgetEditType, BudgetResponseType } from '~types/budget'
import { bcaApiSlice } from '../bcaSlice'

const budgetApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    updateBudget: builder.mutation<BudgetResponseType, BudgetEditType>({
      query(body) {
        return {
          url: `/transacciones/presupuestos/${body.project_id}/${body.budget_item_id}`,
          method: 'PUT',
          body,
        }
      },

      invalidatesTags: ['presupuesto'],
    }),
  }),
})

export const { useUpdateBudgetMutation } = budgetApiSlice
