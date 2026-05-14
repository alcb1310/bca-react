import type { BudgetResponseType } from '@/types/budget'
import { bcaApiSlice } from '../bcaSlice'

const budgetApiSlice = bcaApiSlice.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
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
    }),
})

export const { useGetAllBudgetsByProjectAndLevelQuery } = budgetApiSlice
