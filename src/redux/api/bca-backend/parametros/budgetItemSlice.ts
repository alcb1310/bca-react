import type { BudgetItem, BudgetItemResponse } from '@/types/partidas'
import { bcaApiSlice } from '../bcaSlice'

const partidasEndpoints = bcaApiSlice.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
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

export const { useUpdateBudgetItemMutation } = partidasEndpoints
