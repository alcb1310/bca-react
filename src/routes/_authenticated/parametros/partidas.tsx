import { createFileRoute } from '@tanstack/react-router'
import BudgetItems from '~/pages/parametros/budget-items'
import { useGetAllBudgetItemsQuery } from '~/queries/parametros/partidas'

export const Route = createFileRoute('/_authenticated/parametros/partidas')({
  component: BudgetItems,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['budget-items'],
      queryFn: () => useGetAllBudgetItemsQuery({}),
    })
  },
})
