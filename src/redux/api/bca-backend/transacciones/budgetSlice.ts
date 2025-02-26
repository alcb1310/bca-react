import { bcaApiSlice } from '../bcaSlice'
import { BudgetEditType, BudgetResponseType } from '@/types/budget'

const budgetApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllBudgets: builder.query<
      BudgetResponseType[],
      { query?: string; project?: string }
    >({
      query(params) {
        return {
          url: '/transacciones/presupuestos',
          method: 'GET',
          params: {
            query: params.query,
            project: params.project,
          },
        }
      },

      providesTags: ['presupuesto', 'proyectos', 'partidas'],
    }),

    getAllBudgetsByProjectAndLevel: builder.query<
      BudgetResponseType[],
      {
        project_id: string
        level: string
      }
    >({
      query(params) {
        return {
          url: '/reportes/actual',
          method: 'GET',
          params,
        }
      },

      providesTags: ['presupuesto'],
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

export const {
  useGetAllBudgetsQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useGetAllBudgetsByProjectAndLevelQuery,
} = budgetApiSlice
