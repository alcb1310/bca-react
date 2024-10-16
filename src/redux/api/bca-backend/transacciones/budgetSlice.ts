import { BudgetResponseType } from "../../../../types/budget";
import { bcaApiSlice } from "../bcaSlice";

const budgetApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: builder => ({
    getAllBudgets: builder.query<BudgetResponseType[], { query: string }>({
      query(body) {
        return {
          url: '/transacciones/presupuestos',
          method: 'GET',
          params: {
            query: body.query
          }
        }
      },

      providesTags: ['presupuesto', 'proyectos', 'partidas']
    }),
  })
})

export const { useGetAllBudgetsQuery } = budgetApiSlice
